import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, StyleSheet, View, Text, Dimensions } from 'react-native';
import Geocoder from 'react-native-geocoder-reborn';


const { height: screenHeight } = Dimensions.get('window')

import {
  Card,
  CardContent,
  shadow,
  Button,
  TextField,
 } from 'material-bread';

import DatePicker from 'react-native-datepicker'

import axios from 'axios';

import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

export default class ContractService extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      info: '',
      state: 'Estado',
      city: 'Cidade',
      district: 'Bairro',
      streetName: 'Rua',
      number: 0,
      zipcode: '0000000',
      coords: {
        lat: null,
        lng: null,
      }
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    setTimeout(() => {
      Geocoder.geocodePosition(this.state.coords).then(res => {
        const [address] = res;

        this.setState({
          state: address.adminArea,
          city: address.subAdminArea,
          district: address.subLocality,
          streetName: address.streetName,
          zipcode: address.postalCode.replace(/[^0-9]/g, ''),
        });
      }).catch(err => console.log(err));
    }, 200);

  }

  contractService = async (service) => {
    try {

      await api.post(`/operations/contractService/${service._id}`, {
        date: this.state.date,
        extraInfo: this.state.info,
        address: {
          state: this.state.state,
          city: this.state.city,
          district: this.state.district,
          streetName: this.state.streetName,
          number: this.state.number,
          zipcode: this.state.zipcode,
        },
        location: {
          type: 'Point',
          coordinates: [
            this.state.coords.lat,
            this.state.coords.lng
          ]
        },
      }, {
        headers: {
          'Authorization':  `Bearrer ${await AsyncStorage.getItem('@token')}`,
        }
      });
      alert('Serviço contratado com sucesso')
      this.props.navigation.navigate('Main');
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  getAddress = async () => {
    await Geocoder.geocodePosition({
      lat: 40.7809261,
      lng: -73.9637594
    })
    .then(res => { this.setState({address: res[0].formatedAddress} ); console.log(res[0].formattedAddress)} )
  }

  cepMask = (text) => {
    if (text.length <= 8) {
      this.setState({ zipcode: text.replace(/[^0-9]/g, '') })
    }
    if (text.length == 8) {
      this.getAddressViaCep(text.replace(/[^0-9]/g, ''));
    }
  }

  getAddressViaCep = async (text) => {
    const cep = axios.create({
      baseURL: 'https://viacep.com.br/ws'
    });
    await cep.get(`/${text}/json/`)
      .then((res) => {
        const { data } = res;

        this.setState({
          state: data.uf,
          city: data.localidade,
          district: data.bairro,
          streetName: data.logradouro,
        })

      });
  }

  render() {
    const { navigation } = this.props;
    const service = navigation.state.params.service;
    const date = new Date()

    return (
      <ScrollView>
        <LinearGradient colors={[ '#69A1F4', '#8B55FF']} style={ styles.container }>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Card style={ styles.serviceContainer }>
                <CardContent style={ styles.serviceContent }>

                <View style={{ width: '100%' }}>
                  <Text style={ styles.texts } >Insira Informações de Endereço</Text>
                  <TextField
                    label={'CEP'}
                    type={'filled'}
                    keyboardType = 'numeric'
                    value={ this.state.zipcode }
                    onChangeText={ value => this.cepMask(value) }
                    style={ styles.textField }
                    containerStyle={{ width: '100%' }}
                    helperText={'Apenas Numeros'}
                  />
                  <View style={{ flexDirection: 'row' }}>
                    <TextField
                      label={'Cidade'}
                      type={'filled'}
                      value={ this.state.city }
                      onChangeText={ value => this.setState({ city: value }) }
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#000' }}
                      containerStyle={{ width: '50%', marginRight: 20 }}
                    />
                    <TextField
                      label={'Estado'}
                      type={'filled'}
                      value={ this.state.state }
                      onChangeText={ value => this.setState({ state: value }) }
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#000'}}
                      containerStyle={{ width: '40%' }}
                    />
                  </View>

                  <TextField
                    label={'Bairro'}
                    type={'filled'}
                    value={ this.state.district }
                    onChangeText={ value => this.setState({ district: value }) }
                    style={styles.textField}
                    containerStyle={{ width: '100%' }}
                  />
                  <TextField
                    label={'Nome da Rua'}
                    type={'filled'}
                    value={ this.state.streetName }
                    onChangeText={ value => this.setState({ streetName: value }) }
                    style={styles.textField}
                    containerStyle={{ width: '100%' }}
                  />
                  <TextField
                    label={'Numero da Casa'}
                    type={'filled'}
                    value={ this.state.number }
                    keyboardType = 'numeric'
                    onChangeText={ value => this.setState({ number: value.replace(/[^0-9]/g, '') }) }
                    style={styles.textField}
                    containerStyle={{ width: '100%' }}
                  />
                  <TextField
                    label={'Informações Extras'}
                    type={'filled'}
                    value={ this.state.info }
                    onChangeText={ value => this.setState({ info: value }) }
                    style={styles.textField}
                    containerStyle={{ width: '100%' }}
                  />
                </View>

                  <Text></Text>
                  <Text style={ styles.texts }>Escolha a Data e Horário que você deseja o serviço</Text>
                  <DatePicker
                    style={{ width: 200 }}
                    date={ this.state.from }
                    mode="datetime"
                    format="DD/MM/YYYY HH:MM"
                    minDate={ date }
                    showIcon={ false }
                    is24Hour={ true }
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(date) => { this.setState({ date }) }}
                  />
                  <Text></Text>
                  <Button
                    text={'Contratar'}
                    type="contained"
                    onPress={() => {
                      this.contractService(service);
                    }}
                  />

                </CardContent>
              </Card>
          </View>
        </LinearGradient>
      </ScrollView>
    );
  }
}

ContractService.navigationOptions = ({ navigation }) => ({
  title: 'Selecione a Data e o Horário'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#fafafa',
    height: screenHeight,
  },
  serviceContent: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
    elevation: 5,
    height: '95%',
    width: '90%',
    ...shadow(20),
  },

  texts: {
    textAlign: 'center',
  },

  textField: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#000'
  },

  map: {
    paddingTop: 20,
    height: 500,
    width: '100%'
  },

});

