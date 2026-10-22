import { useEffect, useRef, useState } from 'react';
import {
  Box, Paper, Typography, TextField, IconButton, Stack, Avatar, Divider, CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../../context/AuthContext';
import { subscribeMessages, sendMessage } from '../../api/chat';

export default function ChatWindow({ chatId }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [ready, setReady] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!chatId) return;
    setReady(false);
    const unsub = subscribeMessages(chatId, (msgs) => {
      setMessages(msgs);
      setReady(true);
    });
    return unsub;
  }, [chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await sendMessage(chatId, user.uid, text.trim());
    setText('');
  };

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', height: 520 }}>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Chat</Typography>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {!ready && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress size={20} /></Box>}
        {messages.map((m) => {
          const mine = m.senderUid === user.uid;
          return (
            <Stack key={m.id} direction={mine ? 'row-reverse' : 'row'} spacing={1} alignItems="flex-end">
              <Avatar sx={{ width: 28, height: 28, bgcolor: mine ? 'primary.main' : 'secondary.main' }}>
                {mine ? 'Me' : 'U'}
              </Avatar>
              <Box
                sx={{
                  maxWidth: '70%',
                  bgcolor: mine ? 'primary.main' : 'action.hover',
                  color: mine ? 'primary.contrastText' : 'text.primary',
                  px: 1.75, py: 1, borderRadius: 2
                }}
              >
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{m.text}</Typography>
              </Box>
            </Stack>
          );
        })}
        <div ref={bottomRef} />
      </Box>

      <Divider />
      <Box component="form" onSubmit={submit} sx={{ p: 1.5, display: 'flex', gap: 1 }}>
        <TextField
          fullWidth size="small" placeholder="Type a message…"
          value={text} onChange={(e) => setText(e.target.value)}
        />
        <IconButton type="submit" color="primary"><SendIcon /></IconButton>
      </Box>
    </Paper>
  );
}