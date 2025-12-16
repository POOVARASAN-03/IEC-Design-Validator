import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function ErrorMessage({ error }: any) {
  if (!error) return null;

  return (
    <Grid >
      <Typography color="error">{error}</Typography>
    </Grid>
  );
}
