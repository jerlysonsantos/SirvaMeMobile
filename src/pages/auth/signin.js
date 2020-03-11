import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
  Button,
  Form,
  Item,
  Input,
  Container,
  Body,
  Text,
  Label } from 'native-base';

import LinearGradient from 'react-native-linear-gradient';

import { toastr } from '../Components/showToast.js';

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
      toastr.showToast(error.response.data.error);
    }
  };

  render () {
    return (
      <Container>
        <LinearGradient colors={[ '#69A1F4', '#8B55FF']} style={styles.container}>
          <Text style={styles.title}>Cadastro</Text>
          <Body>
            <Form>
              <Item floatingLabel style={ styles.input }>
                <Label style={{ color: '#ddd' }}>Nome Completo</Label>
                <Input
                  value={ this.state.name }
                  onChangeText={value => this.setState({ name: value })}
                  style={{ color: '#fff' }}
                  />
              </Item>
              <Item floatingLabel style={ styles.input }>
                <Label style={{ color: '#ddd' }}>Nome de Usuário</Label>
                <Input
                  value={ this.state.username }
                  onChangeText={value => this.setState({ username: value })}
                  style={{ color: '#fff' }}
                  />
              </Item>
              <Item floatingLabel style={ styles.input }>
                <Label style={{ color: '#ddd' }}>Email</Label>
                <Input
                  value={ this.state.email }
                  onChangeText={value => this.setState({ email: value })}
                  style={{ color: '#fff' }}
                  />
              </Item>
              <Item floatingLabel style={ styles.input }>
                <Label style={{ color: '#ddd' }}>Senha</Label>
                <Input
                  value={ this.state.password }
                  onChangeText={value => this.setState({ password: value })}
                  style={{ color: '#fff' }}
                  />
              </Item>
              <Button full style={{ backgroundColor: '#4385E9' }}
                onPress={() => {
                  this.register(this.state);
              }}>
                <Text style={{ color: '#ddd' }}>
                  Cadastar
                </Text>
              </Button>
              <Button full style={{ backgroundColor: '#4385E9', marginTop: 10 }}
                onPress={() => {
                  this.props.navigation.navigate('Login');
              }}>
                <Text style={{ color: '#ddd' }}>
                  Voltar
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
    backgroundColor: '#fafafa',
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

  loginButtonText: {
    color: '#000',
  },

  image: {
    width: '50%',
    height: '30%',
  }
});
