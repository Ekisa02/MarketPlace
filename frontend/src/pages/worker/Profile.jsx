import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Stack } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function WorkerProfile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', skill: '', city: '', bio: '' });

  const save = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'workers', user.uid), form);
    toast.success('Profile saved');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Stack component="form" spacing={2} onSubmit={save}>
          <TextField label="Name" fullWidth value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField label="Primary skill" fullWidth value={form.skill}
            onChange={(e) => setForm({ ...form, skill: e.target.value })} />
          <TextField label="City" fullWidth value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <TextField label="Bio" fullWidth multiline rows={4} value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          <Button type="submit" variant="contained">Save</Button>
        </Stack>
      </Paper>
    </Container>
  );
}