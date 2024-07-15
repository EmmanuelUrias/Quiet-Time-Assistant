import React from 'react';
import { Box, Typography } from '@mui/material';

const ParseResEngine: React.FC<{ response: string }> = ({ response }) => {
    // Split the response by "###" to get sections
    const sections = response.split('###');

    // Function to parse each section into headers and bullet points
    const parseSection = (section: string) => {
        const lines = section.split('\n').filter(line => line.trim() !== '');
        const elements = [];
        let currentListItems = [];

        for (const line of lines) {
            if (line.startsWith('-')) {
                currentListItems.push(line.slice(1).trim());
            } else {
                if (currentListItems.length > 0) {
                    elements.push(
                        <Box component="ul" pl={3}>
                            {currentListItems.map((item, index) => (
                                <Typography key={index} component="li" variant="body1">{item}</Typography>
                            ))}
                        </Box>
                    );
                    currentListItems = [];
                }
                elements.push(<Typography key={elements.length} component="h3" variant="h6">{line.trim()}</Typography>);
            }
        }

        if (currentListItems.length > 0) {
            elements.push(
                <Box component="ul" pl={3}>
                    {currentListItems.map((item, index) => (
                        <Typography key={index} component="li" variant="body1">{item}</Typography>
                    ))}
                </Box>
            );
        }

        return elements;
    };

    return (
        <Box>
            {sections.map((section, index) => (
                <Box key={index} mb={3}>
                    {parseSection(section)}
                </Box>
            ))}
        </Box>
    );
}

export default ParseResEngine;
