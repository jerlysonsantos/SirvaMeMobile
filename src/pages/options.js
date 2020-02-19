import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {
  Avatar,
  Card,
  Button,
  CardContent,
  shadow,
  Icon,
  TextField } from 'material-bread';

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
      <LinearGradient colors={[ '#69A1F4', '#8B55FF']} style={styles.container}>
      <View style={{ height:130}}>
        <Icon style={ styles.iconFinal } name="create" size={24}  onPress={() => { this.pickImage(); }}/>
        <Avatar type="image"
        image={<Image source={{uri: `data:image/webp;base64,${ this.state.avatar }`}} /> }
        size={150}
        style={{elevation: 4,...shadow(4) }}/>
      </View>
      <Card style={ styles.cardContainer }>
        <CardContent>
          <View style={styles.divItem}>
            <TextField
              label={'Nome'}
              value={ this.state.name }
              onChangeText={value => this.setState({ name: value })}
              leadingIcon= {
                <Icon name="account-box" size={16}/>
              }
              containerStyle={{ width: '90%' }}
              dense
            />
          </View>
          <View style={styles.divItem}>
            <TextField
                label={'Password'}
                value={ this.state.password }
                onChangeText={value => this.setState({ password: value })}
                leadingIcon= {
                  <Icon name="lock" size={16}/>
                }
                containerStyle={{ width: '90%' }}
                dense
                secureTextEntry
              />
          </View>
          <View style={styles.divItem}>
            <TextField
              label={'Email'}
              value={ this.state.email }
              onChangeText={value => this.setState({ email: value })}
              leadingIcon= {
                <Icon name="email" size={16}/>
              }
              containerStyle={{ width: '90%' }}
              dense
            />

          </View>
          <Button
            text={'Atualizar Dados'}
            type="contained"
            dense
            onPress={() => {
              this.updateProfile();
            }}
          />
        </CardContent>
       </Card>
      </LinearGradient>
    );
  }
}
Options.navigationOptions = ({ navigation }) => ({
  title: 'Opções'
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  cardContainer:{
    marginTop:10,
    paddingTop:30,
    paddingBottom:25,
  },
  divItem: {
    flexDirection:"row",
    marginBottom:5,
    alignItems:"center",
  },
  iconInicial: {
    marginRight:5,
  },
  iconFinal: {
    padding:3,
    alignSelf:"flex-end",
    backgroundColor: '#e6e6e6',
    borderRadius:100/2,
  },
});
