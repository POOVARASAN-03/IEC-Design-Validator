import { Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function ValidateButton({ onClick, loading }: any) {
  return (
    <Grid >
      <Button variant="contained" onClick={onClick} disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Validate'}
      </Button>
    </Grid>
  );
}
