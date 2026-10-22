import { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ChatList from '../../components/chat/ChatList';
import ChatWindow from '../../components/chat/ChatWindow';

export default function Chats() {
  const [active, setActive] = useState(null);
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>Messages</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ChatList onSelect={setActive} />
        </Grid>
        <Grid item xs={12} md={8}>
          {active ? <ChatWindow chatId={active} />
            : <Typography color="text.secondary">Select a conversation.</Typography>}
        </Grid>
      </Grid>
    </Container>
  );
}