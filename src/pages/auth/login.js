import React, { Component } from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Button, TextField } from 'material-bread';
import LinearGradient from 'react-native-linear-gradient';


import api from '../../services/api';

export default class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    emailOrUser: '',
    password: ''
  };

  login = async (state) => {
    try {
      await api.post('/auth/login', state)
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
        <Image source={require('../../imgs/download.png')} style={ styles.image }></Image>
        <Text style={styles.title}>Sirva.Me</Text>
        <TextField
          label={'Email ou Nome de Usuário'}
          type={'filled'}
          labelColor={'#fafafa'}
          underlineColor={'#5849FF'}
          focusedLabelColor={'#ddd'}
          value={this.state.emailOrUser}
          onChangeText={value => this.setState({ emailOrUser: value })}
          style={{ backgroundColor: 'rgba(52, 52, 52, 0.2)', color: '#fafafa'}}
          containerStyle={{ width: '60%' }}
        />
        <Text></Text>
        <TextField
          label={'Senha'}
          type={'filled'}
          secureTextEntry={true}
          labelColor={'#fafafa'}
          underlineColor={'#5849FF'}
          focusedLabelColor={'#ddd'}
          value={this.state.password}
          onChangeText={value => this.setState({ password: value })}
          style={{ backgroundColor: 'rgba(52, 52, 52, 0.2)', color: '#fafafa'}}
          containerStyle={{ width: '60%' }}
        />
        <Text></Text>
        <Button
          text={'Acessar'}
          type="contained"
          dense
          style={styles.loginButton}
          textStyle={{ paddingRight: '25%' }}
          color={'#4385E9'}
          onPress={() => {
            this.login(this.state);
            }}>
        </Button>
        <Text></Text>
        <Button
          text={'Cadastro'}
          type="contained"
          dense
          style={styles.loginButton}
          textStyle={{ paddingRight: '20%' }}
          color={'#4385E9'}
          onPress={() => {
              this.props.navigation.navigate('Singin');
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

  image: {
    width: '50%',
    height: '30%',
  }
});
