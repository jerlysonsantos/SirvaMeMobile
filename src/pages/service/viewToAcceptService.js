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
  Thumbnail,
  Button,
  Right,
  Body,
  Content} from 'native-base';

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
      <Content>
      <Card>
        <CardItem header>
          <Thumbnail
            source={{uri: `data:image/webp;base64,${Buffer.from(item.client.avatar).toString('base64')}`}}
          />
          <Right>
            <H3>
              { item.client.name }
            </H3>
            <Text>
              { item.service.name }
            </Text>
          </Right>
        </CardItem>
        <CardItem>
          <Body>
            <Text>Data e Hora do Serviço </Text>
            <Text style={{ color: '#69A1F4'}}>   { `${date.getDate()}/${date.getMonth() + 1 }/${date.getFullYear()} às ${date.getHours()}:${date.getMinutes()}`}</Text>
            <Text style={{ color: '#000'}}>Endereço: </Text>
            <View>
              <Text
                onPress={() => { this.props.navigation.navigate('Maps', { address: item.address }) }}
              >{`Cidade: ${ item.address.city } - Estado: ${ item.address.state }\nBairro: ${ item.address.district } - Nome da Rua: ${ item.address.streetName } Nº ${item.address.number}\nInformações Extras de Endereço: ${ item.extraInfo }
              `}</Text>
            </View>
            <Button
              style={{ backgroundColor: '#8B55FF' }}
              onPress={() => { this.props.navigation.navigate('Maps', { address: item.address }) }}
            >
              <Text>Checkar Endereço</Text>
            </Button>
          </Body>
        </CardItem>
        <CardItem footer>
          <Body></Body>
          <Right>
            <Button
                dark
                onPress={() => {
                  this.rejectService(item._id, item.client._id)
                }}
              >
                <Text>Rejeitar</Text>
            </Button>
          </Right>
          <Right>
            <Button
              style={{ backgroundColor: '#69A1F4' }}
              onPress={() => {
                this.acceptService(item._id)
              }}
            >
              <Text>Aceitar</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
      </Content>
    );
  }

  render() {
    return (
      <ScrollView>
        <LinearGradient colors={[ '#69A1F4', '#8B55FF']} style={ styles.container }>
          <FlatList
            contentContainerStyle={ styles.list }
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
