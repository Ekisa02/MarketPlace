import axios from 'axios';
import client from './client';

// Ask backend for a signed upload payload
export const getKycSignature = () => client.post('/uploads/kyc-signature');

// Direct unsigned POST to Cloudinary (works with signed signature too)
export async function uploadToCloudinary(file, { signature, timestamp, api_key, folder, cloudName }) {
  const form = new FormData();
  form.append('file', file);
  form.append('api_key', api_key);
  form.append('timestamp', timestamp);
  form.append('signature', signature);
  form.append('folder', folder);

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    form
  );
  return res.data.secure_url;
}