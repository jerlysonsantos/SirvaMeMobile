import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient'
import { ScrollView, Dimensions, FlatList, View } from 'react-native';

const { height: screenHeight } = Dimensions.get('window')

import { Buffer } from 'buffer';
global.Buffer = Buffer;

import {
  Card,
  CardItem,
  Text,
  H3,
  Button,
  Right,
  Body} from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

export default class viewToAcceptService extends Component {

  state = {
    services: [],
  };

  async componentDidMount() {
    this.getContractedServices();
  }

  cancelService = async(serviceId) => {
    try {
      await api.delete(`/operations/cancelService/${serviceId}`, {
        headers: {
          'Authorization':  `Bearrer ${await AsyncStorage.getItem('@token')}`,
        }
      })
        .then((res) => {
          this.getContractedServices();
        })
    } catch (error) {
      console.log(error.response)

      alert(error.response.data.error)
    }
  };

  getContractedServices = async () => {
    try {
      const response = await api.get('/operations/getContractedServices', {
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
        <CardItem header>
          <Body>
            <H3>{item.service.name}</H3>
            <Text>{ item.service.type }</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <Text>Data e Hora do contrato </Text>
            <Text style={{ color: '#69A1F4'}}>  { `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} às ${date.getHours()}:${date.getMinutes()}`}</Text>
            <Text>Informações Extras de Endereço </Text>
            <Text>  { item.extraInfo }</Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Button
            dark
            onPress={() => {
              this.cancelService(item.service._id)
            }}>
              <Text>Cancel</Text>
            </Button>
        </CardItem>
      </Card>
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
  title: 'Serviços Contratados'
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
