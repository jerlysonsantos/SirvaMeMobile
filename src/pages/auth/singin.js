import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button, TextField } from 'material-bread';
import LinearGradient from 'react-native-linear-gradient';
export default class Login extends Component {
    static navigationOptions = {
        header: null,
    };
    render () {
        return (
            <LinearGradient colors={[ '#69A1F4', '#8B55FF']} style={styles.container}>
                <Text style={styles.title}>Cadastro</Text>
                <TextField
                    label={'Nome Completo'} 
                    type={'filled'}
                    labelColor={'#fafafa'}
                    underlineColor={'#5849FF'}
                    style={{ backgroundColor: 'rgba(52, 52, 52, 0.2)'}}
                    containerStyle={{ width: '60%' }} />     
                <Text></Text>
                <TextField
                    label={'Nome de Usuário'} 
                    type={'filled'}
                    labelColor={'#fafafa'}
                    underlineColor={'#5849FF'}
                    style={{ backgroundColor: 'rgba(52, 52, 52, 0.2)'}}
                    containerStyle={{ width: '60%' }} /> 
                <Text></Text>
                <TextField
                    label={'Email'} 
                    type={'filled'}
                    labelColor={'#fafafa'}
                    underlineColor={'#5849FF'}
                    style={{ backgroundColor: 'rgba(52, 52, 52, 0.2)'}}
                    containerStyle={{ width: '60%' }} 
                />
                <Text></Text>
                <TextField 
                    label={'Senha'} 
                    type={'filled'}
                    labelColor={'#fafafa'}
                    underlineColor={'#5849FF'}
                    style={{ backgroundColor: 'rgba(52, 52, 52, 0.2)'}}
                    containerStyle={{ width: '60%' }} />
                <Text></Text>
                <Button 
                    text={'Cadastar'}
                    type="contained"
                    dense
                    style={styles.loginButton}
                    textStyle={{ paddingRight: '20%' }}
                    color={'#4385E9'}
                    >
                </Button>
                <Text></Text>
                <Button 
                    text={'Voltar'}
                    type="contained"
                    dense
                    style={styles.loginButton}
                    textStyle={{ paddingRight: '27%' }}
                    color={'#4385E9'}
                    onPress={() => {
                        this.props.navigation.navigate('Login');
                    }}>
                </Button>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa',
    },
    title: {
        fontSize: 30,
        color: '#fafafa',
        marginBottom: 20,
    },

    input: {
        backgroundColor: '#FFF',
        width: '60%',
        borderWidth: 0,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },

    loginButton: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    loginButtonText: {
        color: '#000',
    },
    
    image: {
        width: '50%',
        height: '30%',
    }
});