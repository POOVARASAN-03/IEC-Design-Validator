import { Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function InputSelector({ inputType, setInputType }: any) {
  return (
    <Grid >
      <Select
        fullWidth
        value={inputType}
        onChange={(e) => setInputType(e.target.value)}
      >
        <MenuItem value="text">Free Text</MenuItem>
        <MenuItem value="json">Structured JSON</MenuItem>
      </Select>
    </Grid>
  );
}
