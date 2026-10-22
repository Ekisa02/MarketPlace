import { useEffect, useState } from 'react';
import {
  Paper, Typography, Box, Button, CircularProgress, Chip, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Link
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getPendingKyc, approveKyc, rejectKyc } from '../../api/workers';
import toast from 'react-hot-toast';

export default function PendingKyc() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectUid, setRejectUid] = useState(null);
  const [reason, setReason] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await getPendingKyc();
      setRows((data.workers || []).map((w) => ({ id: w.uid, ...w })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleApprove = async (uid) => {
    await approveKyc(uid);
    toast.success('KYC approved');
    load();
  };

  const openReject = (uid) => { setRejectUid(uid); setRejectOpen(true); };
  const handleReject = async () => {
    await rejectKyc(rejectUid, reason);
    toast.success('KYC rejected');
    setRejectOpen(false);
    setReason('');
    load();
  };

  const columns = [
    { field: 'name', headerName: 'Worker', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'documentUrl',
      headerName: 'ID Document',
      width: 160,
      renderCell: (p) => p.value ? <Link href={p.value} target="_blank">View</Link> : '—'
    },
    {
      field: 'kycStatus',
      headerName: 'Status',
      width: 130,
      renderCell: () => <Chip label="Pending" color="warning" size="small" />
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      sortable: false,
      renderCell: (p) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" variant="contained" color="success" onClick={() => handleApprove(p.row.uid)}>Approve</Button>
          <Button size="small" variant="outlined" color="error" onClick={() => openReject(p.row.uid)}>Reject</Button>
        </Box>
      )
    }
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Workers → Pending KYC</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Review uploaded IDs and approve or reject worker verification requests.
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
      ) : (
        <Box sx={{ height: 520, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10, 25]} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} disableRowSelectionOnClick />
        </Box>
      )}

      <Dialog open={rejectOpen} onClose={() => setRejectOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Reject KYC</DialogTitle>
        <DialogContent>
          <TextField label="Reason" fullWidth multiline rows={3} value={reason} onChange={(e) => setReason(e.target.value)} sx={{ mt: 1 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleReject}>Reject</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}