import { useEffect, useState } from 'react';
import { Container, Paper, Typography, Button, Stack, Chip, Alert } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { submitKyc, getKycStatus } from '../../api/workers';
import { getKycSignature, uploadToCloudinary } from '../../api/uploads';
import toast from 'react-hot-toast';

export default function KycStatus() {
  const { user } = useAuth();
  const [status, setStatus] = useState('none');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getKycStatus();
        setStatus(data.status || 'none');
      } catch {}
    })();
  }, []);

  const submit = async () => {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const { data: sig } = await getKycSignature();
      const url = await uploadToCloudinary(file, {
        ...sig,
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      });
      await submitKyc({ documentUrl: url, documentType: file.type });
      setStatus('pending');
      toast.success('KYC submitted — pending review.');
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const chipColor = status === 'approved' ? 'success'
    : status === 'pending' ? 'warning'
    : status === 'rejected' ? 'error' : 'default';

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>KYC Verification</Typography>
        <Chip label={`Status: ${status}`} color={chipColor} sx={{ mb: 3 }} />
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {status !== 'approved' && (
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              Upload a clear photo of your government-issued ID (JPG, PNG, or PDF, max 5MB).
            </Typography>
            <Button variant="outlined" component="label">
              {file ? file.name : 'Choose ID file'}
              <input hidden type="file" accept="image/*,application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </Button>
            <Button variant="contained" onClick={submit} disabled={!file || uploading}>
              {uploading ? 'Uploading…' : 'Submit for Review'}
            </Button>
          </Stack>
        )}
        {status === 'approved' && (
          <Alert severity="success">You're verified! You can now receive job requests.</Alert>
        )}
        {status === 'rejected' && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Your submission was rejected. Please re-upload a clearer document.
          </Alert>
        )}
      </Paper>
    </Container>
  );
}