import client from './client';
import { buildChatId, ensureChat, indexChatForUser } from './chat';

export const listMyJobs = () => client.get('/jobs/my');
export const listJobs = () => client.get('/jobs');
export const createJob = (payload) => client.post('/jobs', payload);
export const acceptJob = (jobId) => client.post(`/jobs/${jobId}/accept`);
export const completeJob = (jobId) => client.post(`/jobs/${jobId}/complete`);

export async function startChatForJob(jobId, employerUid, workerUid) {
  const chatId = buildChatId(jobId, employerUid, workerUid);
  await ensureChat(chatId, [employerUid, workerUid]);
  await indexChatForUser(employerUid, chatId);
  await indexChatForUser(workerUid, chatId);
  return chatId;
}