import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient'
import { ScrollView, Text, Dimensions, FlatList, Image, View } from 'react-native';

const { height: screenHeight } = Dimensions.get('window')

import { Buffer } from 'buffer';
global.Buffer = Buffer;

import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button
  } from 'material-bread';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

export default class viewToAcceptService extends Component {

  state = {
    services: [],
  };

  async componentDidMount() {
    this.getAcceptedServices();
  }

  getAcceptedServices = async () => {
    try {
      const response = await api.get('/operations/getAcceptedServices', {
        headers: {
          'Authorization':  `Bearrer ${await AsyncStorage.getItem('@token')}`,
        }
      });

      const { services } = response.data;

      this.setState({ services });

    } catch (error) {
      alert(error.response.data.error)
    }
  };

  _renderContracts = ({ item }) => {
    const date = new Date(item.date);

    return (
      <View>
      <Card styles={{ height: '20%' }}>
        <CardHeader
          thumbnail={
            <Avatar
              type="image"
              image={<Image source={{uri: `data:image/webp;base64,${Buffer.from(item.client.avatar).toString('base64')}`}} /> }
              size={40}
              style={{ elevation: 4 }}
            />
          }
          title={ item.service.name }
          subtitle={ item.client.name }
        />
        <CardContent>
          <Text style={{ color: '#000'}}>Data e Hora do contrato </Text>
          <Text style={{ color: '#69A1F4'}}>  { `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} às ${date.getHours()}:${date.getMinutes()}`}</Text>
          <Text></Text>
          <Button text={'Checkar Endereço'} type="contained"
          />
          <Text></Text>
          <Text style={{ color: '#000'}}>Informações Extras de Endereço </Text>
          <Text>  { item.extraInfo }</Text>
        </CardContent>
      </Card>
      <Text></Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <LinearGradient colors={[ '#69A1F4', '#8B55FF']} style={ styles.container }>
          <FlatList
            contentContainerStyle={styles.list}
            data={ this.state.services }
            keyExtractor={item => item._id}
            renderItem={ this._renderContracts }
            onEndReachedThreshold={0.1}
          />
        </LinearGradient>
      </ScrollView>
    );
  }
}

viewToAcceptService.navigationOptions = ({ navigation }) => ({
  title: 'Serviços Aceitos'
});

const styles = {
  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    height: screenHeight,
    backgroundColor: '#fafafa',
  },

  list: {
    paddingBottom: 20,
  },
}
