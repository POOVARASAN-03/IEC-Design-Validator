import { Typography, Chip } from '@mui/material';

export default function AiReasoning({ result }: any) {
  return (
    <div style={{ marginTop: '16px', border: '1px solid #ddd', padding: '12px' }}>
      <Typography variant="h6">AI Reasoning</Typography>
      <p>{result.ai_reasoning}</p>

      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        Confidence Score
      </Typography>
      <Chip label={`${(result.confidence?.overall ?? 0) * 100}%`} color="success" />
    </div>
  );
}
