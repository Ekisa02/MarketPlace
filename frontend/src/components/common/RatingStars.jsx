import { Rating } from '@mui/material';

export default function RatingStars({ value = 0 }) {
  return <Rating value={value} precision={0.1} readOnly size="small" />;
}