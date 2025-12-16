import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function TextInput({ value, onChange }: any) {
  return (
    <Grid >
      <TextField
        fullWidth
        label="Cable Design Text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Grid>
  );
}
