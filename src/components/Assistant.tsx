import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import ParseResEngine from './ParseResEngine';

const Assistant: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    const res = await sendPromptToGPT(inputValue); // Function to send prompt to GPT
    setResponse(res);
  };

  const sendPromptToGPT = async (prompt: string): Promise<string> => {
    const response = await fetch('http://127.0.0.1:5000/send_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'message': prompt }),
    });
    const data = await response.json();
    return data.response;
  };

  return (
    <Box sx={{ backgroundColor: 'gray', width: '80%', height: '600px', mt: '4rem', p: '2rem' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your prompt here..."
        value={inputValue}
        onChange={handleInputChange}
        sx={{ mb: '1rem' }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      <Box sx={{
        textAlign: 'left'
      }}>
      {response && (
        <ParseResEngine response={response} />
      )}
      </Box>
    </Box>
  );
};

export default Assistant;
