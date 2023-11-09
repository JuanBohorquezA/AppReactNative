import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { InputComponent, ButtonComponent } from '../components/elements';
import { TypingAnimation } from '../components/animations';
import { SafeAreaView } from 'react-native-safe-area-context';
const ForgotPassword = ({navigation}) => {
    const navigate = (view) => {
        navigation.navigate(view); // Asegúrate de que 'SignUp' es el nombre de la ruta de tu pantalla de registro
    };
    return (
        <SafeAreaView style={{backgroundColor: '#001524', width: '100%', height: '100%'}}>
            <View style={styles.container}>
                <Text style={styles.title}>Reset Your Password!</Text>
                <TypingAnimation
                lines={[
                    "Quick reset, swift return.",
                    "Reclaim access swiftly.",
                    "Secure, speedy recovery."
                ]}
                typingSpeed={100}
                deletingSpeed={50}
                delayBetweenLines={1000}
                />

            </View>
            
            <View style={styles.formContent}>
                <View style={styles.inputContainer}>
                    <InputComponent icon={'mail'} placeholder={'Email Address'} />
                </View>
                <View style={{paddingLeft: '20%',paddingRight: '20%', marginBottom: '10%'}}>
                    <ButtonComponent backgroundColor={'#8E8FFA'} text={'Send Code'} color={'#5E32FE'}/>
                </View>

                <View style={styles.linkContainer}>
                    <View style={{alignItems: 'flex-start', marginLeft: '7%'}}>
                        <TouchableOpacity onPress={() => navigate('Login')}>
                            <Text style={styles.link}>Back to Login</Text>
                        </TouchableOpacity>
                      
                    </View>
                    <View style={{alignItems: 'flex-end', marginRight: '7%', marginBottom: '10%'}}>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 13}}>Didn't receive the email?</Text>
                        <TouchableOpacity onPress={() => alert('Email sent!,check your inbox')}>
                            <Text style={styles.link}>To resend</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            
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
        textAlign: 'center',
        width: '50%',
        flexWrap: 'wrap',
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
        marginBottom: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
        marginLeft: '7%',
        marginRight: '7%',
    },
    linkContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    link:{
        color: '#7752FE',
        fontWeight: 'bold',
        fontSize: 13,

    },
});

export default ForgotPassword;
