import React, { useState } from "react";
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {TypingAnimation} from "../components/animations";
import { InputComponent, ButtonComponent } from '../components/elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import {fetchAPI} from "../../integrations/user";

const SignUp = ({ navigation }) => {

    const navigate = (view) => {
        navigation.navigate(view); // Asegúrate de que 'SignUp' es el nombre de la ruta de tu pantalla de registro
    };
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors]= useState({username: '', email: '', password: '', confirmPassword: ''});

    const validateUsername = (username, uservalue)=>{
        username = username.trim();
        if(username === ""){
            setErrors(prev => ({ ...prev, username: '*UserName cannot be empty.*' }));
            setUsername('');
            return false;
        }if(uservalue){
            setErrors(prev => ({ ...prev, username: 'UserName already exists' }));
            setUsername(username);
            return false;
        }
        else{
            setErrors(prev => ({ ...prev, username: '' }));
            setUsername(username);
            return true;
        }
    }
    const validateEmail = (email)=>{
        email = email.trim();
        var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(email === ""){
            setErrors(prev => ({ ...prev, email: '*Email cannot be empty.*' }));
            setEmail('');
            return false;
        }
        if(!regex.test(email)){
            setErrors(prev => ({ ...prev, email: '*Email is not valid.*' }));
            setEmail(email);
            return false;      
        }
        if(email){
            setErrors(prev => ({ ...prev, email: '' }));
            setEmail(email);
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
    const confirmPassword_validation = (confirmPassword) => {
        confirmPassword.trim();
        if(confirmPassword == ""){
            setErrors(prev => ({ ...prev, confirmPassword: '*password cannot be empty.*' }));
            setConfirmPassword('');
            return false;
        }
        else if(confirmPassword != password){
            setErrors(prev => ({ ...prev, confirmPassword: '*passwords do not match.*' }))
            setConfirmPassword(confirmPassword);
            return false;
        }
        else{
            setErrors(prev => ({ ...prev, confirmPassword: '' }));
            setConfirmPassword(confirmPassword);
            return true;
        }

    }
    const submit = () => {
        const isvalid = validateUsername(username) &&  validateEmail(email) && validatePassword(password) && confirmPassword_validation(confirmPassword);
        if(isvalid){
            fetchAPI(username, email, password)
            .then(response => {
                if(response.message === "Error"){
                    console.log(response)
                    let ErrosList = {}
                    var responseFor = response.response
                    responseFor.forEach((response =>{
                        setErrors(prev => ({ ...prev, username: '' },{...prev, email: '' }));
                        if(response.includes("UserName")){
                            ErrosList.username = response          
                        }else if(response.includes("Email")){
                            ErrosList.email = response
                        }
                    }));
                    Object.entries(ErrosList).forEach(([key, value]) => {
                        setErrors(prev => ({ ...prev, [key]: value }));
                    });
                }
                else{
                    alert("User created successfully")
                }
            })
            .catch(error => {
                console.error(error);
            });
        }
    }
   
    return (
        <SafeAreaView style={{backgroundColor: '#001524', width: '100%', height: '100%'}}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome!</Text>
                <TypingAnimation
                lines={[
                    "Join us and start your journey!",
                    "Unlock a world of possibilities.",
                    "Begin exploring your new horizons today."
                ]}
                typingSpeed={100}
                deletingSpeed={50}
                delayBetweenLines={1000}
                />
            </View>
            <View style={styles.formContent}>
                <View style={styles.inputContainer}>
                    {errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}
                    <InputComponent icon={'person'} placeholder={'Username'} onChangeText={validateUsername} value={username} />
                </View>
                <View style={styles.inputContainer}>
                {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
                    <InputComponent icon={'mail'} placeholder={'Email'}onChangeText={validateEmail}  value={email}/>
                </View>
                <View style={styles.inputContainer}>
                {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
                    <InputComponent icon={'lock-closed'} placeholder={'Password'} onChangeText={validatePassword} value={password} secureTextEntry={true}/>
                </View>
                <View style={styles.inputContainer}>
                {errors.confirmPassword ? <Text style={styles.error}>{errors.confirmPassword}</Text> : null}
                    <InputComponent icon={'lock-closed'} placeholder={'Confirm Password'}onChangeText={confirmPassword_validation} value={confirmPassword} secureTextEntry={true}/>
                </View>
            </View>
           
            <View style={{marginLeft: '7%',marginRight: '7%', marginBottom: '5%'}}>
                <ButtonComponent backgroundColor={'#8E8FFA'} text={'Register'} color={'#5E32FE'} evento={submit}/>
            </View>
            <View style={{marginLeft: '7%',marginRight: '7%', marginBottom:'5%'}}>
                <ButtonComponent backgroundColor={'transparent'} text={'Google'} color={'#5E32FE'}/>
            </View>
            <View style={{flexDirection:'row', gap: 10, alignItems: 'center', justifyContent: 'center',}}>
                <Text style={{color: '#fff', fontWeight: '400', fontSize: 13}}>Already have an account</Text>
                <TouchableOpacity onPress={() => navigate('Login')}>
                    <Text style={styles.link}>Login</Text>
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

export default SignUp;
