import { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ChatList from '../../components/chat/ChatList';
import ChatWindow from '../../components/chat/ChatWindow';
import PageHeader from '../../components/common/PageHeader';

export default function Chats() {
  const [active, setActive] = useState(null);
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader title="Messages" backTo="/worker" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ChatList onSelect={setActive} />
        </Grid>
        <Grid item xs={12} md={8}>
          {active ? <ChatWindow chatId={active} />
            : <Typography color="text.secondary" sx={{ mt: 2 }}>Select a conversation to start messaging.</Typography>}
        </Grid>
      </Grid>
    </Container>
  );
}