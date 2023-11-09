import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { InputComponent, ButtonComponent } from '../components/elements';
import { TypingAnimation } from '../components/animations';
import { SafeAreaView } from 'react-native-safe-area-context';
const Login = ({navigation}) => {
    const navigate = (view) => {
        navigation.navigate(view); // Asegúrate de que 'SignUp' es el nombre de la ruta de tu pantalla de registro
    };
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors]= useState({username: '', password: ''});

    const validateUsername = (username)=>{
        username = username.trim();
        if(username === ""){
            setErrors(prev => ({ ...prev, username: '*UserName cannot be empty.*' }));
            setUsername('');
            return false;
        }else{
            setErrors(prev => ({ ...prev, username: '' }));
            setUsername(username);
            return true;
        }
    }
    const validatePassword = (password) => {
        password = password.trim();
        if(password == ""){
            setErrors(prev => ({ ...prev, password: '*password cannot be empty.*' }));
            setPassword('');
            return false;
        }else{
            setErrors(prev => ({ ...prev, password: '' }));
            setPassword(password);
            return true;
        }
    }
    const submit = async() => {
        const isvalid = validateUsername(username) || validatePassword(password);
        if(isvalid){
            //validamos si el usuario existe
        }
    }
    return (
        <SafeAreaView style={{backgroundColor: '#001524', width: '100%', height: '100%'}}>
            <View style={styles.container}>
                <Text style={styles.title}>Hello!</Text>
                <TypingAnimation
                lines={[
                    "we are really happy to see you again!",
                    "Let's make today a fantastic day",
                    "Ready to dive in?"
                ]}
                typingSpeed={100}
                deletingSpeed={50}
                delayBetweenLines={1000}
                />

            </View>
            
            <View style={styles.formContent}>
                <View style={styles.inputContainer}>
                    {errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}
                    <InputComponent icon={'person'} placeholder={'Username'} onChangeText={validateUsername} value={username}/>
                </View>
               
                <View style={[styles.inputContainer, {marginBottom: '10%'}]}>
                    {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
                    <InputComponent icon={'lock-closed'} placeholder={'Password'} onChangeText={validatePassword} value={password} secureTextEntry={true}/>
                </View>
                
            </View>
            
            
            <View style={{alignItems: 'flex-end', marginRight: '7%', marginBottom: '10%'}}>
                <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
                    <Text style={styles.link}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
            
            
            <View style={{marginLeft: '7%',marginRight: '7%', marginBottom: '5%'}}>
                <ButtonComponent backgroundColor={'#8E8FFA'} text={'Login'} color={'#5E32FE'} evento={submit}/>
            </View>
            <View style={{marginLeft: '7%',marginRight: '7%', marginBottom:'5%'}}>
                <ButtonComponent backgroundColor={'transparent'} text={'Google'} color={'#5E32FE'}/>
            </View>
            <View style={{flexDirection:'row', gap: 10, alignItems: 'center', justifyContent: 'center',}}>
                <Text style={{color: '#fff', fontWeight: '400', fontSize: 13}}>Don't have  account?</Text>
                <TouchableOpacity onPress={() => navigate('SignUp')}>
                    <Text style={styles.link}>Sign Up</Text>
                </TouchableOpacity>
                
            </View>
            
        </SafeAreaView>
    );
};



//LISTA DE ESTILOS QUE USAREMOS SOBRE EL FORMULARIO
const styles = StyleSheet.create({
    container: {
        marginTop: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginLeft: '7%',
        marginRight: '7%',
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#8E8FFA'
    },
    formContent:{
        elevation:10,
        backgroundColor:'#051B2C',  
        marginLeft: '7%',
        marginRight: '7%',
        marginBottom: '10%',
        borderRadius: 16,
        paddingTop: 20,
        paddingBottom: 20,
    },
    inputContainer:{
        marginTop:'10%',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
        marginLeft: '7%',
        marginRight: '7%',
    },
    link:{
        color: '#7752FE',
        fontWeight: 'bold',
        fontSize: 13,

    },
    error:{
        position: 'absolute',
        left: '50%',
        top: 5,
        color: 'red',
        fontWeight: 'bold',
        fontSize: 13,
    }
});

export default Login;
