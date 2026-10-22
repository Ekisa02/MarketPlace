import { useEffect, useState } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { rtdb } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import { Paper, List, ListItemButton, ListItemText, Typography, Box, CircularProgress } from '@mui/material';

// Chat list needs member lookup. We use a separate index in RTDB:
// userChats/{uid}/{chatId} = true  — written when a chat is created.
export default function ChatList({ onSelect }) {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const idxRef = ref(rtdb, `userChats/${user.uid}`);
    const listener = onValue(idxRef, async (snap) => {
      const ids = snap.exists() ? Object.keys(snap.val()) : [];
      const results = await Promise.all(
        ids.map(async (id) => {
          const chatSnap = await new Promise((res) => {
            const r = ref(rtdb, `chats/${id}/lastMessage`);
            onValue(r, (s) => { off(r); res(s); }, { onlyOnce: true });
          });
          return { id, last: chatSnap.val() };
        })
      );
      setChats(results.sort((a, b) => (b.last?.at || 0) - (a.last?.at || 0)));
      setLoading(false);
    });
    return () => off(idxRef, 'value', listener);
  }, [user]);

  if (loading) return <Box sx={{ p: 2 }}><CircularProgress size={20} /></Box>;
  if (chats.length === 0) return <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>No conversations yet.</Typography>;

  return (
    <Paper>
      <List>
        {chats.map((c) => (
          <ListItemButton key={c.id} onClick={() => onSelect(c.id)}>
            <ListItemText
              primary={`Chat ${c.id.slice(0, 8)}…`}
              secondary={c.last?.text || 'No messages yet'}
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
}