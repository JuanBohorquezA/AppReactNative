import {Text } from 'react-native';
import React, { useState, useEffect } from "react";

export const TypingAnimation = ({ lines, typingSpeed, deletingSpeed, delayBetweenLines }) => {
    const [currentLine, setCurrentLine] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
  
    useEffect(() => {
      if (currentLine >= lines.length) {
        // Hemos terminado todas las líneas. Podemos detener la animación o empezar de nuevo.
        // Por ejemplo, para empezar de nuevo:
        setCurrentLine(0);
        setIsDeleting(false);
        setDisplayedText('');
        return;
      }
  
      let timer;
  
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentLine((prev) => prev + 1); // Pasar a la siguiente línea
        } else {
          timer = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (displayedText === lines[currentLine]) {
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, delayBetweenLines);
        } else {
          timer = setTimeout(() => {
            setDisplayedText((prev) => lines[currentLine].slice(0, prev.length + 1));
          }, typingSpeed);
        }
      }
  
      return () => clearTimeout(timer);
    }, [currentLine, displayedText, isDeleting, lines, typingSpeed, deletingSpeed, delayBetweenLines]);
    const textStyle = {
        
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8E8FFA',
        letterSpacing: 1,
        marginBottom:'20%',
        
    }
  
    return (
        <Text style={textStyle}>{displayedText}</Text>
    );
};
  