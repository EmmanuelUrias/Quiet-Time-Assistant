import React, { useState, useEffect, useRef } from 'react';
import { Typography } from '@mui/material';

const TypingEffect: React.FC<{ text: string, variant: any, component: any }> = ({ text, variant, component }) => {
    const [displayedText, setDisplayedText] = useState('');
    const indexRef = useRef(0);  // Using useRef to keep track of the current index

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDisplayedText(prev => prev + text[indexRef.current]);
            indexRef.current += 1;
            if (indexRef.current === text.length) {
                clearInterval(intervalId);
            }
        }, 50); // Adjust the typing speed by changing the delay

        return () => clearInterval(intervalId);
    }, [text]);

    return <Typography variant={variant} component={component}>{displayedText}</Typography>;
};

export default TypingEffect;
