require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { verifyFirebaseToken } = require('./middleware/auth');
const workersRoute = require('./routes/workers');
const kycRoute = require('./routes/kyc');
const adminRoute = require('./routes/admin');
const uploadsRoute = require('./routes/uploads');
const jobsRoute = require('./routes/jobs');
const stripeRoute = require('./routes/stripe');

const app = express();
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }));
app.use(express.json({ limit: '10mb' }));

app.get('/health', (_, res) => res.json({ ok: true }));

app.use('/api/workers', verifyFirebaseToken, workersRoute);
app.use('/api/kyc', verifyFirebaseToken, kycRoute);
app.use('/api/admin', verifyFirebaseToken, adminRoute);
app.use('/api/uploads', verifyFirebaseToken, uploadsRoute);
app.use('/api/jobs', verifyFirebaseToken, jobsRoute);
app.use('/api/stripe', verifyFirebaseToken, stripeRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Gateway running on http://localhost:${PORT}`));