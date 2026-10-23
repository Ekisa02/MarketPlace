import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Container, Typography, TextField, Button, Paper, 
  Grid, CircularProgress, Avatar, Stack 
} from '@mui/material';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import PageHeader from '../../components/common/PageHeader';
import toast from 'react-hot-toast';

export default function WorkerProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', skill: '', city: '', bio: '' });

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'workers', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm({
            name: data.name || '',
            skill: data.skill || '',
            city: data.city || '',
            bio: data.bio || ''
          });
        } else {
          // Fallback: prefill with auth data if no workers doc exists yet
          setForm({
            name: user.displayName || '',
            skill: '',
            city: '',
            bio: ''
          });
        }
      } catch (err) {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Use setDoc with merge:true — creates doc if missing, updates if exists
      await setDoc(
        doc(db, 'workers', user.uid),
        {
          ...form,
          email: user.email,
          uid: user.uid,
          updatedAt: new Date().toISOString()
        },
        { merge: true }
      );
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <PageHeader title="Edit Profile" backTo="/worker" />

      <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: '1px solid #E5E7EB', boxShadow: 'none' }}>
        <Box component="form" onSubmit={handleSave}>
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 2 }}>
              <Avatar src={user?.photoURL} sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: 32, fontWeight: 700 }}>
                {user?.email?.[0].toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{user?.email}</Typography>
                <Typography variant="body2" color="text.secondary">Freelancer Account</Typography>
              </Box>
            </Stack>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Full Name</Typography>
                <TextField 
                  fullWidth required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Primary Skill</Typography>
                <TextField 
                  fullWidth required placeholder="e.g. React Developer, Plumber"
                  value={form.skill}
                  onChange={(e) => setForm({ ...form, skill: e.target.value })}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>City / Location</Typography>
                <TextField 
                  fullWidth placeholder="e.g. Nairobi, Kenya"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Bio / About Me</Typography>
                <TextField 
                  fullWidth multiline rows={4}
                  placeholder="Tell clients about your experience, skills, and what you offer..."
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
              <Button 
                onClick={() => navigate('/worker')} 
                variant="outlined" 
                sx={{ textTransform: 'none', borderColor: '#E5E7EB', color: 'text.primary' }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                disabled={saving} 
                sx={{ bgcolor: '#00A86B', textTransform: 'none', '&:hover': { bgcolor: '#008F5A' } }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}