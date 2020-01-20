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
    this.getToAcceptServices();
  }

  getToAcceptServices = async () => {
    try {
      const response = await api.get('/operations/getToAcceptServices', {
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

  acceptService = async(id) => {
    try {
      await api.get(`/operations/acceptService/${id}`, {
        headers: {
          'Authorization':  `Bearrer ${await AsyncStorage.getItem('@token')}`,
        }
      })
        .then((res) => {
          this.getToAcceptServices();
        })
    } catch (error) {
      console.log(error.response)
      alert(error.response.data.error)
    }
  };

  rejectService = async(serviceId, clientId) => {
    try {
      await api.delete(`/operations/rejectService/${serviceId}/${clientId}`, {
        headers: {
          'Authorization':  `Bearrer ${await AsyncStorage.getItem('@token')}`,
        }
      })
        .then((res) => {
          this.getToAcceptServices();
        })
    } catch (error) {
      console.log(error.response)

      alert(error.response.data.error)
    }
  };

  _renderContracts = ({ item }) => {


    const date = new Date(item.date);
    console.log(item);
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
          <Text style={{ color: '#000'}}>Data e Hora do Serviço </Text>
          <Text style={{ color: '#69A1F4'}}>  { `${date.getDate()}/${date.getMonth() + 1 }/${date.getFullYear()} às ${date.getHours()}:${date.getMinutes()}`}</Text>
          <Text></Text>
          <Text style={{ color: '#000'}}>Endereço: </Text>
          <View>
            <Text>{`Cidade: ${ item.address.city } - Estado: ${ item.address.state }\nBairro: ${ item.address.district } - Nome da Rua: ${ item.address.streetName } Nº ${item.address.number}\nInformações Extras de Endereço: ${ item.extraInfo }
            `}</Text>
          </View>
          <Text></Text>
          <Button text={'Checkar Endereço'} type="contained"
            onPress={() => { this.props.navigation.navigate('Maps', { address: item.address }) }}
          />
          <Text></Text>
        </CardContent>
        <CardActions
          rightActionItems={[
            <Button
              text={'Rejeitar'}
              type="contained"
              color={'#E91E63'}
              style={{ marginRight: 8 }}
              onPress={() => {
                this.rejectService(item._id, item.client._id)
              }}
            />,
            <Button
              text={'Aceitar'}
              type="contained"
              color={'#00BCD4'}
              onPress={() => {
                this.acceptService(item._id)
              }}
            />
          ]}
        />
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
  title: 'Serviços para Aceitar'
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