import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Button,
  Form,
  Input,
  Item,
  Container,
  Body,
  Label} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

import { toastr } from '../Components/showToast.js';

import api from '../../services/api';

export default class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    emailOrUser: '',
    password: '',
    loading: false,
    showToast: false
  };

  // Caso já exista um Token, pular a tela de login, porem isso tem q mudar
  async componentDidMount() {
    if (await AsyncStorage.getItem('@token')) {
      this.props.navigation.navigate('Main');
    }
  }

  login = async (state) => {
    try {
      const { loading, ...data } = state;

      this.setState({ loading: true });
      await api.post('/auth/login', data)
        .then(async (res) => {
          const { user, token } = res.data;
          await AsyncStorage.setItem('@token', token);
          await AsyncStorage.setItem('@_user', JSON.stringify(user));
          this.props.navigation.navigate('Main');
      });
    } catch (error) {
      toastr.showToast(error.response.data.error);
      this.setState({ loading: false });
    }
  };

  render () {
    return (
      <Container>
        <LinearGradient colors={[ '#69A1F4', '#8B55FF']} style={styles.container}>
          <Text style={styles.title}>Sirva.Me</Text>
          <Body>
            <Form>
              <Item floatingLabel style={ styles.input }>
                <Label style={{ color: '#ddd' }}>Email ou Nome de Usuário</Label>
                <Input
                  value={ this.state.emailOrUser }
                  onChangeText={value => this.setState({ emailOrUser: value.toString() })}
                  style={{ color: '#fff' }}
                  />
              </Item>
              <Item floatingLabel style={ styles.input }>
                <Label style={{ color: '#ddd' }}>Senha</Label>
                <Input
                  value={ this.state.password }
                  secureTextEntry={true}
                  onChangeText={value => this.setState({ password: value })}
                  style={{ color: '#fff' }}
                  />
              </Item>
              <Button full style={{ backgroundColor: '#69A1F4' }}
                onPress={() => {
                  this.login(this.state);
              }}>
                <Text style={{ color: '#ddd' }}>
                  Logar
                </Text>
              </Button>
              <Button full style={{ backgroundColor: '#8B55FF', marginTop: 10 }}
                onPress={() => {
                  this.props.navigation.navigate('SignIn');
              }}>
                <Text style={{ color: '#ddd' }}>
                  Cadastro
                </Text>
              </Button>
            </Form>
          </Body>
        </LinearGradient>
      </Container>

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
    width: '70%',
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
