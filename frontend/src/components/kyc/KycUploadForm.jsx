import { useState } from 'react';
import { Stack, Button, Alert } from '@mui/material';
import { getKycSignature, uploadToCloudinary } from '../../api/uploads';
import { submitKyc } from '../../api/workers';
import toast from 'react-hot-toast';

/**
 * Reusable KYC upload form. Same logic as pages/worker/KycStatus.jsx
 * but exposed as a component (e.g. for use inside a modal).
 */
export default function KycUploadForm({ onSubmitted }) {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const { data: sig } = await getKycSignature();
      const url = await uploadToCloudinary(file, {
        ...sig,
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      });
      await submitKyc({ documentUrl: url, documentType: file.type });
      toast.success('KYC submitted');
      onSubmitted?.();
    } catch (e) {
      setError(e.response?.data?.detail || e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Stack spacing={2}>
      {error && <Alert severity="error">{error}</Alert>}
      <Button variant="outlined" component="label">
        {file ? file.name : 'Choose ID file'}
        <input
          hidden
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </Button>
      <Button variant="contained" onClick={submit} disabled={!file || busy}>
        {busy ? 'Uploading…' : 'Submit for Review'}
      </Button>
    </Stack>
  );
}