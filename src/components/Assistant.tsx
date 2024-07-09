import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

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
    // Replace this with your actual API call to the custom GPT
    const response = await fetch('https://your-gpt-api-endpoint.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    return data.response; // Adjust according to your API response structure
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
      {response && (
        <Typography variant="body1" sx={{ mt: '2rem', backgroundColor: 'white', padding: '1rem', borderRadius: '4px' }}>
          {response}
        </Typography>
      )}
    </Box>
  );
};

export default Assistant;
