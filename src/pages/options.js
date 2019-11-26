import React, { Component } from 'react';

import { StyleSheet, Text, FlatList, Image, View } from 'react-native';
import {
  Drawer,
  DrawerHeader,
  DrawerSection,
  DrawerItem,
  Appbar } from 'material-bread';
import LinearGradient from 'react-native-linear-gradient';
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  shadow,
  Menu,
  Button,
  MenuItem,
  Icon } from 'material-bread';

import { Buffer } from 'buffer';
global.Buffer = Buffer;

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

export default class Options extends Component {

  state = {
    name:'',
    avatar: '',
    email: '',
  };

  async componentDidMount() {
    this.getAvatar();
  }

  getAvatar = async() => {
    const user = JSON.parse(await AsyncStorage.getItem('@_user'));
    this.setState({ name:user.name, email:user.email, avatar: user.avatar });

  };

  render() {
    return(
      <LinearGradient colors={[ '#69A1F4', '#8B55FF']} style={styles.container}>
      <View style={{ height:130}}>
        <Icon style={ styles.iconFinal } name="create" size={24}  onPress={() => { this.props.navigation.navigate('Main'); }}/>
        <Avatar type="image"
        image={<Image source={{uri: `data:image/webp;base64,${Buffer.from(this.state.avatar).toString('base64')}`}} /> }
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
