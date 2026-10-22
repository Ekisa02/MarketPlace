import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Stack, Alert, MenuItem } from '@mui/material';
import { createJob } from '../../api/jobs';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CATEGORIES = ['Plumbing', 'Electrical', 'Cleaning', 'Tutoring', 'Design', 'Moving', 'Carpentry', 'Photography'];

export default function PostJob() {
  const [form, setForm] = useState({ title: '', description: '', category: 'Plumbing', budget_cents: 5000, city: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createJob({ ...form, budget_cents: Number(form.budget_cents) });
      toast.success('Job posted');
      navigate('/employer');
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Post a Job</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={submit}>
          <Stack spacing={2}>
            <TextField label="Title" required fullWidth value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <TextField label="Description" required fullWidth multiline rows={4}
              value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <TextField select label="Category" fullWidth value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
            <TextField label="Budget (cents)" type="number" fullWidth required
              value={form.budget_cents} onChange={(e) => setForm({ ...form, budget_cents: e.target.value })} />
            <TextField label="City (optional)" fullWidth value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <Button type="submit" variant="contained" size="large">Publish Job</Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}