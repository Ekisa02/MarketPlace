import { useEffect, useState } from 'react';
import {
  Container, Typography, Paper, Box, Chip, CircularProgress, Button
} from '@mui/material';
import { listJobs, startChatForJob } from '../../api/jobs';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function MyJobs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await listJobs();
        setJobs(data.jobs || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const message = async (job) => {
    try {
      await startChatForJob(job.jobId, user.uid, job.workerUid);
      navigate('/chat');
    } catch {
      toast.error('Could not open chat');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>My Jobs</Typography>
      {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
        : jobs.length === 0 ? <Typography color="text.secondary">No jobs yet.</Typography>
        : jobs.map((j) => (
          <Paper key={j.jobId} sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6">{j.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{j.description}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip label={j.status} size="small" color={
                j.status === 'open' ? 'info' : j.status === 'in_progress' ? 'warning' : 'success'
              } />
              {j.workerUid && (
                <Button size="small" onClick={() => message(j)}>Message Worker</Button>
              )}
            </Box>
          </Paper>
        ))}
    </Container>
  );
}