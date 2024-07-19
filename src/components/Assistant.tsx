import React, { useState } from 'react';
import { Box, Typography, ThemeProvider, CssBaseline, TextareaAutosize, IconButton, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ParseResEngine from './ParseResEngine';
import colorTheme from '../assets/theme.ts'

const Assistant: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isRequestInProgress, setIsRequestInProgress] = useState<boolean>(false);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (isRequestInProgress || inputValue.trim() === '') return;
    setIsRequestInProgress(true);
    const res = await sendPromptToGPT(inputValue);
    setResponse(res);
    setInputValue(''); // Clear input after submitting
    setIsRequestInProgress(false);
  };

  const sendPromptToGPT = async (prompt: string): Promise<string> => {
    const response = await fetch('https://pklqotlaz5.execute-api.us-east-1.amazonaws.com/production/send_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'message': prompt }),
    });
    const data = await response.json();
    return data.response;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <ThemeProvider theme={colorTheme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: 'background.default', minHeight: '95vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 2, mt: '2rem' }}>
        <Box sx={{
          backgroundColor: 'background.paper',
          width: '120%',
          maxWidth: '1000px',
          borderRadius: 2,
          boxShadow: 1,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '600px'
        }}>
          <Typography variant="h1" sx={{ mb: 2, color: 'text.primary' }}>Quiet Time Assistant</Typography>
          <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
            {response && (
              <Box sx={{
                textAlign: 'left',
                backgroundColor: 'background.paper',
                borderRadius: 2,
                p: 2,
                boxShadow: 1,
              }}>
                <ParseResEngine response={response} />
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextareaAutosize
              minRows={1}
              placeholder="Type your prompt here..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              maxRows={7}
              style={{
                width: '100%',
                marginRight: '1rem',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                resize: 'none',
                fontSize: '1rem'
              }}
            />
            <IconButton color="primary" onClick={handleSubmit}>
              <SendIcon />
            </IconButton>
            {isRequestInProgress && (
                <CircularProgress 
                  size={24} 
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Assistant;
