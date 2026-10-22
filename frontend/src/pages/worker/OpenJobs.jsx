import { useEffect, useState } from 'react';
import {
  Container, Typography, Paper, Box, Button, Chip, CircularProgress
} from '@mui/material';
import { listJobs, acceptJob, completeJob, startChatForJob } from '../../api/jobs';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function OpenJobs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await listJobs();
      setJobs(data.jobs || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const accept = async (id) => {
    try { await acceptJob(id); toast.success('Job accepted'); load(); }
    catch (e) { toast.error(e.response?.data?.detail || 'Failed'); }
  };

  const complete = async (id) => {
    try { await completeJob(id); toast.success('Job completed'); load(); }
    catch (e) { toast.error(e.response?.data?.detail || 'Failed'); }
  };

  const message = async (job) => {
    try {
      await startChatForJob(job.jobId, job.employerUid, user.uid);
      navigate('/chat');
    } catch (e) {
      toast.error('Could not open chat');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>Open Jobs</Typography>
      {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
        : jobs.length === 0 ? <Typography color="text.secondary">No open jobs right now.</Typography>
        : jobs.map((j) => (
          <Paper key={j.jobId} sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6">{j.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{j.description}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip label={j.status} size="small" />
              {j.status === 'open' && (
                <Button size="small" variant="contained" onClick={() => accept(j.jobId)}>Accept</Button>
              )}
              {j.status === 'in_progress' && j.workerUid === user.uid && (
                <>
                  <Button size="small" variant="outlined" onClick={() => complete(j.jobId)}>Mark Complete</Button>
                  <Button size="small" onClick={() => message(j)}>Message Employer</Button>
                </>
              )}
            </Box>
          </Paper>
        ))}
    </Container>
  );
}