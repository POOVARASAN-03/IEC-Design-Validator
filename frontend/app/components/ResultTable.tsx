import { Typography, Chip, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import AiReasoning from './AiReasoning';

export default function ResultTable({ result, showReasoning, toggleReasoning }: any) {
  return (
    <Grid>
      <Typography variant="h6">Validation Results</Typography>

      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={th}>Attribute</th>
            <th style={th}>Provided</th>
            <th style={th}>Expected</th>
            <th style={th}>Status</th>
            <th style={th}>Comment</th>
          </tr>
        </thead>
        <tbody>
          {result.validation.map((v: any, i: number) => (
            <tr key={i}>
              <td style={td}>{v.field}</td>
              <td style={td}>{v.provided || '-'}</td>
              <td style={td}>{v.expected}</td>
              <td style={td}>
                <Chip
                  label={v.status}
                  color={
                    v.status === 'PASS'
                      ? 'success'
                      : v.status === 'WARN'
                      ? 'warning'
                      : 'error'
                  }
                />
              </td>
              <td style={td}>{v.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button variant="outlined" onClick={toggleReasoning} sx={{ mt: 2 }}>
        {showReasoning ? 'Hide AI Reasoning' : 'Show AI Reasoning'}
      </Button>

      {showReasoning && <AiReasoning result={result} />}
    </Grid>
  );
}

const th = { border: '1px solid #ddd', padding: '8px' };
const td = { border: '1px solid #ddd', padding: '8px' };
