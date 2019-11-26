import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient'
import { ScrollView, Text, Dimensions, FlatList, Image, View } from 'react-native';
import openMap from 'react-native-open-maps';

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
    this.getContractedServices();
  }

  cancelService = async(serviceId, id) => {
    try {
      await api.delete(`/operations/cancelService/${serviceId}/${id}`, {
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
        <CardHeader
          title={ item.service.name }
          subtitle={ item.service.type }
        />
        <CardContent>
          <Text style={{ color: '#000'}}>Data e Hora do contrato </Text>
          <Text style={{ color: '#69A1F4'}}>  { `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} às ${date.getHours()}:${date.getMinutes()}`}</Text>
          <Text></Text>
          <Text style={{ color: '#000'}}>Informações Extras de Endereço </Text>
          <Text>  { item.extraInfo }</Text>
        </CardContent>
        <CardActions
          rightActionItems={[
            <Button
              text={'Cancel'}
              type="outlined"
              textColor={'#E91E63'}
              style={{ marginRight: 8 }}
              onPress={() => {
                this.cancelService(item.service._id, item._id)
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
