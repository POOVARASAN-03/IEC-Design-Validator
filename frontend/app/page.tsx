'use client';

import { useState } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import InputSelector from './components/InputSelector';
import TextInput from './components/TextInput';
import JsonInput from './components/JsonInput';
import ValidateButton from './components/ValidateButton';
import ErrorMessage from './components/ErrorMessage';
import ResultTable from './components/ResultTable';

export default function Page() {
  const [inputType, setInputType] = useState<'text' | 'json'>('text');
  const [textInput, setTextInput] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReasoning, setShowReasoning] = useState(false);

  const validate = async () => {
    setError('');
    setResult(null);
    setLoading(true);

    if (inputType === 'text' && !textInput.trim()) {
      setError('Please enter cable design text');
      setLoading(false);
      return;
    }

    if (inputType === 'json' && !jsonInput.trim()) {
      setError('Please enter cable design JSON');
      setLoading(false);
      return;
    }

    let payload;

    try {
      payload =
        inputType === 'text'
          ? { text: textInput }
          : { data: JSON.parse(jsonInput) };
    } catch {
      setError('Invalid JSON format');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/design/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      const hasInputError = data.validation?.some(
        (v: any) => v.field === 'input' && v.status === 'FAIL'
      );

      if (hasInputError || data.confidence?.overall === 0) {
        const errorMsg =
          data.validation?.find((v: any) => v.field === 'input')?.comment ||
          'Please enter valid cable design information.';
        setError(errorMsg);
        setResult(null);
      } else {
        setResult(data);
      }
    } catch {
      setError('Failed to validate. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={3} sx={{ backgroundColor: 'white', minHeight: '100vh', p: 3 }}>
      <Grid>
        <Typography variant="h5" >IEC Design Validator</Typography>
      </Grid>

      <InputSelector inputType={inputType} setInputType={setInputType} />

      {inputType === 'text' && (
        <TextInput value={textInput} onChange={setTextInput} />
      )}

      {inputType === 'json' && (
        <JsonInput value={jsonInput} onChange={setJsonInput} />
      )}

      <ValidateButton onClick={validate} loading={loading} />

      <ErrorMessage error={error} />

      {result && (
        <ResultTable
          result={result}
          showReasoning={showReasoning}
          toggleReasoning={() => setShowReasoning(!showReasoning)}
        />
      )}
    </Grid>
  );
}
