import React, { useState, useRef } from "react";
import { Text, TextInput, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


 export const InputComponent = ({
    icon,
    placeholder,
    onChangeText,
    onBlur,
    onFocus,
    value,
    secureTextEntry = false, // por defecto es false, lo pones true para passwords
    keyboardType = 'default', // tipo de teclado por defecto
    validationFunction,
})=>{
    const [isFocused, setFocus] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const labelAnim = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

    React.useEffect(() => {
        Animated.timing(labelAnim, {
            toValue: (isFocused || inputValue !== '') ? 1 : 0,
            duration: 200,
            useNativeDriver: false
        }).start();
    }, [isFocused, inputValue]);

    const labelStyle = {
        position: 'absolute',
        left: '10%',
        fontWeight: 'bold',
        color: '#27374D',
        zIndex: 1,
        top: labelAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [5, -25]
        })
    };
    const iconStyle={
        
            position: 'absolute',
            color: '#8E8FFA',
            fontSize: 20,
    }
    const inputStyle={
        borderBottomWidth: 2,
        borderBottomColor: '#8E8FFA',
        paddingLeft:'10%',
        color: '#8E8FFA',
        fontWeight: 'bold',
        width: '100%',
    }
    const handleTextChange = (text) => {
        setInputValue(text);
        if (onChangeText) {
          onChangeText(text);
        }
        // Si se proporcionó una función de validación, la llama
        if (validationFunction) {
          validationFunction(text);
        }
      };
    return (
        <>
        <Icon name={icon} style={iconStyle} />
        <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
        <TextInput
          onFocus={() => {
            setFocus(true);
            if (onFocus) {
              onFocus();
            }
          }}
          onBlur={() => {
            setFocus(false);
            if (onBlur) {
              onBlur();
            }
          }}
          onChangeText={handleTextChange}
          value={value !== undefined ? value : inputValue} // Esto permite control externo si se pasa value
          style={inputStyle}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
      </>
  
    )
}
export const ButtonComponent = ({text, backgroundColor, color, evento})=>{
    const buttonStyle ={
            backgroundColor: backgroundColor,
            borderColor: color,
            borderWidth:2,
            borderRadius:13,
            padding: 25,
            alignItems: 'center',
    }
    const textStyle = {
        fontSize: 18,
        fontWeight: 'bold',
        color: color,
    }

    return(     
        <TouchableOpacity style={buttonStyle} onPress={evento}>
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    )
}
