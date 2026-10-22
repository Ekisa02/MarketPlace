import client from './client';

export const startOnboarding = () => client.post('/stripe/onboard');
export const getStripeStatus = () => client.get('/stripe/status');
export const getStripeDashboardLink = () => client.get('/stripe/dashboard-link');