import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Avatar } from 'react-native-elements';
import {
  Container,
  Body,
  Card,
  CardItem,
  Form,
  Item,
  Input,
  Button,
  Icon,
  Text,
  Label} from 'native-base';

import { Buffer } from 'buffer';
global.Buffer = Buffer;

import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';

import api from '../services/api';
import GLOBAL from './global';

export default class Options extends Component {

  state = {
    name: 'name',
    avatar: '',
    email: 'email',
    password: '',
    avatarSource: {},
  };

  async componentDidMount() {
    this.getAvatar();
  }

  getAvatar = async() => {
    const user = JSON.parse(await AsyncStorage.getItem('@_user'));
    this.setState({ name: user.name, email: user.email, avatar: Buffer.from(user.avatar).toString('base64') });
  };

  pickImage = () => {
    const options = {
      title: 'Selecione Uma Imagem',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri, type: response.type, fileName: response.fileName };
        this.setState({ avatar: response.data });
        this.setState({
          avatarSource: source,
        });
      }
    });
  };

  updateProfile = async () => {
    try {
      const data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      };

      const response = await api.put('/options/updateProfile', data, {
        headers: {
          'Authorization':  `Bearrer ${await AsyncStorage.getItem('@token')}`
        }
      });
      console.log(response)
      this.updateAvatar();

      GLOBAL.main.setState({ name: this.state.name, email: this.state.name });

    } catch (error) {
      console.log(error)
    }
  };

  updateAvatar = () => {
    return new Promise (async (resolve, reject) => {
    try {
      const data = new FormData();
      data.append('image', {
        uri: this.state.avatarSource.uri,
        name: this.state.avatarSource.fileName,
        type: this.state.avatarSource.type,
      });

      console.log(data);
      const response = await api.post('/options/avatarUpload', data, {
        headers: {
          'Authorization':  `Bearrer ${await AsyncStorage.getItem('@token')}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      GLOBAL.main.setState({ avatar: response.avatar });
      console.log(GLOBAL.main.state)
      console.log(this.state.avatar)

    } catch (error) {
      console.log(error)
    }});
  };

  render() {
    return(
      <Container>
        <LinearGradient colors={[ '#69A1F4', '#8B55FF']} style={styles.container}>
          <Body style={{ height:130, marginTop: 70 }}>
            <View style={{ zIndex: 0 }}>
              <Body>
                <View style={{ position: 'absolute', zIndex: 2 }}>
                  <Avatar
                    size="xlarge"
                    rounded
                    onPress={() => { this.pickImage(); }}
                    source={{ uri: `data:image/webp;base64,${ this.state.avatar }`}}
                    showEditButton/>
                </View>

              <View style={{ zIndex: 1, marginTop: 125 }}>
                <Card style={ styles.cardContainer }>
                  <CardItem>
                    <Form style={{ width: '100%' }}>
                      <Item floatingLabel style={{ width: '95%' }}>
                        <Label>Nome</Label>
                        <Input
                          value={ this.state.name }
                          onChangeText={value => this.setState({ name: value })}
                          style={{ color: '#000' }}
                          />
                      </Item>
                      <Item floatingLabel style={{ width: '95%' }}>
                        <Label>Senha</Label>
                        <Input
                          value={ this.state.password }
                          onChangeText={value => this.setState({ password: value })}
                          style={{ color: '#000' }}
                          />
                      </Item>
                      <Item floatingLabel style={{ width: '95%' }}>
                        <Label>Email</Label>
                        <Input
                          value={ this.state.email }
                          onChangeText={value => this.setState({ email: value })}
                          style={{ color: '#000' }}
                          />
                      </Item>
                      <Button
                        style={{ backgroundColor: '#8B55FF' }}
                        full onPress={() => {
                        this.updateProfile();
                      }}>
                        <Text>
                          Atualizar Dados
                        </Text>
                      </Button>
                    </Form>

                  </CardItem>
                </Card>
              </View>
              </Body>
            </View>
          </Body>
        </LinearGradient>
      </Container>
    );
  }
}
Options.navigationOptions = ({ navigation }) => ({
  title: 'Opções'
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer:{
    width: Dimensions.get('window').width - 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

