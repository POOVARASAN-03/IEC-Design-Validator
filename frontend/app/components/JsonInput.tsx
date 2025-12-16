import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function JsonInput({ value, onChange }: any) {
  return (
    <Grid >
      <TextField
        fullWidth
        multiline
        rows={5}
        label="Cable Design JSON"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='{"standard":"IEC","voltage":"1.1kV"}'
      />
    </Grid>
  );
}
