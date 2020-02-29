import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button, TextField } from 'material-bread';
import LinearGradient from 'react-native-linear-gradient';

import api from '../../services/api';

export default class Login extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        username: '',
        name: '',
        email: '',
        password: '',
        loading: false,
    };

    register = async (state) => {
      try {

        const { loading, ...data } = state;

        this.setState({ loading: true });
        await api.post('/auth/register', data)
          .then(async (res) => {
            const { user, token } = res.data;
            await AsyncStorage.setItem('@token', token);
            await AsyncStorage.setItem('@_user', JSON.stringify(user));
            this.props.navigation.navigate('Main');
          });
      } catch (error) {
        alert(error.response.data.error);
      }

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
                    focusedLabelColor={'#ddd'}
                    value={this.state.name}
                    onChangeText={value => this.setState({ name: value })}
                    style={{ backgroundColor: 'rgba(52, 52, 52, 0.2)', color: '#fafafa'}}
                    containerStyle={{ width: '60%' }} />
                <Text></Text>
                <TextField
                    label={'Nome de Usuário'}
                    type={'filled'}
                    labelColor={'#fafafa'}
                    focusedLabelColor={'#ddd'}
                    underlineColor={'#5849FF'}
                    value={this.state.username}
                    onChangeText={value => this.setState({ username: value })}
                    style={{ backgroundColor: 'rgba(52, 52, 52, 0.2)', color: '#fafafa'}}
                    containerStyle={{ width: '60%' }} />
                <Text></Text>
                <TextField
                    label={'Email'}
                    type={'filled'}
                    labelColor={'#fafafa'}
                    focusedLabelColor={'#ddd'}
                    underlineColor={'#5849FF'}
                    value={this.state.email}
                    onChangeText={value => this.setState({ email: value })}
                    style={{ backgroundColor: 'rgba(52, 52, 52, 0.2)', color: '#fafafa'}}
                    containerStyle={{ width: '60%' }}
                />
                <Text></Text>
                <TextField
                    label={'Senha'}
                    type={'filled'}
                    secureTextEntry={true}
                    labelColor={'#fafafa'}
                    focusedLabelColor={'#ddd'}
                    underlineColor={'#5849FF'}
                    value={this.state.password}
                    onChangeText={value => this.setState({ password: value })}
                    style={{ backgroundColor: 'rgba(52, 52, 52, 0.2)', color: '#fafafa'}}
                    containerStyle={{ width: '60%' }} />
                <Text></Text>
                <Button
                    text={'Cadastar'}
                    type="contained"
                    dense
                    loading={this.state.loading}
                    style={styles.loginButton}
                    onPress={() => {
                        this.register(this.state);
                    }}
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
                    textStyle={{ paddingRight: '30%' }}
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
