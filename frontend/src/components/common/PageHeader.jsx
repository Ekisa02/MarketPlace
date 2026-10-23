import { Stack, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function PageHeader({ title, backTo = -1 }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo === -1) {
      navigate(-1); // Go back to previous page
    } else {
      navigate(backTo); // Go to specific route
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
      <IconButton 
        onClick={handleBack} 
        sx={{ 
          border: '1px solid #E5E7EB', 
          bgcolor: 'white',
          '&:hover': { bgcolor: '#F9FAFB' }
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
    </Stack>
  );
}