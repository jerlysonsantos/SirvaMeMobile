import React, { Component } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {
  Avatar,
  Card,
  Button,
  CardContent,
  shadow,
  Icon } from 'material-bread';

import { Buffer } from 'buffer';
global.Buffer = Buffer;

import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';

import api from '../services/api';
import GLOBAL from './global';

export default class Options extends Component {

  state = {
    name:'',
    avatar: '',
    email: '',
    avatarSource: {},
  };

  async componentDidMount() {
    this.getAvatar();
  }

  getAvatar = async() => {
    const user = JSON.parse(await AsyncStorage.getItem('@_user'));
    this.setState({ name:user.name, email:user.email, avatar: Buffer.from(user.avatar).toString('base64') });

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
        const source = { path: response.path, type: response.type, fileName: response.fileName };
        this.setState({ avatar: response.data });
        this.setState({
          avatarSource: source,
        });
      }
    });
  };

  updateAvatar = async () => {
    try {
      const data = new FormData();
      data.append('image', {
        path: this.state.avatarSource.path,
        type: this.state.avatarSource.type,
        fileName: this.state.avatarSource.fileName
      });
      console.log(data);
      const response = await api.post('/options/avatarUpload', data, {
        headers: {
          'Authorization':  `Bearrer ${await AsyncStorage.getItem('@token')}`,
        }
      });

      GLOBAL.main.setState({ avatar: response.avatar });

    } catch (error) {
      console.log(error)
    }
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
        <CardContent style={{alignItems:'flex-start'}}>
          <View style={styles.divItem}>
            <Icon name="account-box" size={16} style={ styles.iconInicial} />
            <Text>Nome {"\n"}{this.state.name} </Text>
          </View>
          <Icon style={ styles.iconFinal } name="create" size={24}  onPress={() => { this.props.navigation.navigate('Main'); }}/>
          <View style={styles.divItem}>
            <Icon name="lock" size={16} style={ styles.iconInicial} />
            <Text>Senha</Text>
          </View>
          <Icon style={ styles.iconFinal } name="create" size={24}  onPress={() => { this.props.navigation.navigate('Main'); }}/>
          <View style={styles.divItem}>
            <Icon name="email" size={16} style={ styles.iconInicial} />
            <Text>Email{"\n"}{this.state.email}</Text>
          </View>
          <Button
            text={'Atualizar Dados'}
            type="contained"
            onPress={() => {
              this.updateAvatar();
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
    paddingBottom:25

  },
  divItem: {
    flexDirection:"row",
    marginBottom:5,
    alignItems:"stretch",
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
