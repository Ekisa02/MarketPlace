import client from './client';

export const submitKyc = (payload) => client.post('/kyc/submit', payload);
export const getKycStatus = () => client.get('/kyc/status');
export const searchWorkers = (params) => client.get('/workers', { params });
export const getPendingKyc = () => client.get('/admin/pending-kyc');
export const approveKyc = (uid) => client.post('/admin/kyc/approve', { uid });
export const rejectKyc = (uid, reason) => client.post('/admin/kyc/reject', { uid, reason });