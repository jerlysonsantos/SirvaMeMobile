import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

export default class Login extends Component {
    static navigationOptions = {
        header: null,
    };
    render () {
        return (
            <View style={styles.container}>
                <Image source={require('../../imgs/download.png')} style={ styles.image }></Image>
                <Text style={styles.title}>Sirva.Me</Text>
                <TextInput  style={styles.input} underlineColorAndroid="transparent" placeholder="Email" />
                <TextInput  style={styles.input} underlineColorAndroid="transparent" placeholder="Senha" />
                <TouchableOpacity 
                style={ styles.loginButton } 
                onPress={() => {
                    this.props.navigation.navigate('Tabstext');
                }}>
                <Text style={ styles.loginButtonText } >Acessar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={ {
                    backgroundColor: '#ff0000',
                    width: '60%',
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: '#ff0000',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10} } 
                onPress={() => {
                    this.props.navigation.navigate('Singin');
                }}>
                <Text style={ { color: '#fff' } } >Cadastrar</Text>
            </TouchableOpacity>
            </View>
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
        color: '#000',
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
        backgroundColor: 'transparent',
        width: '60%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#9900cc',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
    },

    loginButtonText: {
        color: '#000',
    },
    
    image: {
        width: '50%',
        height: '30%',
    }
});