import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import {
  Card,
  CardContent,
  shadow,
  Button,
  TextField } from 'material-bread';

import DatePicker from 'react-native-datepicker'

import api from '../../services/api';

export default class ContractService extends Component {
  state = {
    date: new Date(),
    info: '',
    geoLoc: {
      coordinate: {
        latitude: 0.0,
        longitude: 0.0
      }
    },
    currentLoc: {
      coordinate: {
        latitude: 0.0,
        longitude: 0.0
      }
    },

    regionLoc: {
      coordinate: {
        latitude: 0.0,
        longitude: 0.0
      }
    }
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          currentLoc: {
            coordinate: {
              latitude: position.coords.latitude || 0.0,
              longitude: position.coords.longitude || 0.0,
            }
          },

          geoLoc: {
            coordinate: {
              latitude: position.coords.latitude || -25.4333664,
              longitude: position.coords.longitude || -49.10990411,
            }
          },

          regionLoc: {
            coordinate: {
              latitude: position.coords.latitude || -25.4333664,
              longitude: position.coords.longitude || -49.10990411,
            }
          }
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  _renderMarkers() {
    return (
      <Marker
        draggable
        coordinate={this.state.geoLoc.coordinate}
        onDragEnd={coord => {
          console.log(coord.nativeEvent);
          const { coordinate } = coord.nativeEvent;

          this.setState({
            geoLoc: {
              coordinate: {
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
              }
            }
          })

        }}
      />
    )

  }


  contractService = async (service) => {
    try {
      await api.post(`/operations/contractService/${service._id}`, {
        date: this.state.date,
        location: {
          type: 'Point',
          coordinates: [
            this.state.geoLoc.coordinate.latitude,
            this.state.geoLoc.coordinate.longitude
          ]
        },
        extraInfo: this.state.info,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  render() {
    const { navigation } = this.props;
    const service = navigation.state.params.service;
    const date = new Date();

    return (
      <ScrollView>
        <LinearGradient colors={[ '#69A1F4', '#8B55FF']} style={ styles.container }>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Card style={ styles.serviceContainer }>
                <CardContent style={ styles.serviceContent }>
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
                    onDateChange={(date) => { this.setState({ from: date }) }}
                  />
                  <Text></Text>

                  <MapView
                    style={ styles.map }
                    showsUserLocation={ true }
                    followsUserLocation={ true }
                    toolbarEnabled={ true }
                    loadingEnabled={ true }

                    onPress={coord => {
                      const { coordinate } = coord.nativeEvent;

                      this.setState({
                        geoLoc: {
                          coordinate: {
                            latitude: coordinate.latitude,
                            longitude: coordinate.longitude,
                          }
                        },

                      })

                    }}
                    initialRegion={{
                      latitude: this.state.geoLoc.coordinate.latitude,
                      longitude: this.state.geoLoc.coordinate.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  >{ this._renderMarkers() }
                  </MapView>

                  <Text style={ styles.texts }>Digite informações para auxiliar a localização</Text>
                  <TextField
                    label={'Informações Extras'}
                    type={'filled'}
                    labelColor={'#000'}
                    underlineColor={'#5849FF'}
                    focusedLabelColor={'#000'}
                    value={this.state.info}
                    onChangeText={value => this.setState({ info: value })}
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#000'}}
                    containerStyle={{ width: '100%' }}
                  />
                  <Text></Text>
                  <Button text={'Contratar'} type="contained"/>
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

  map: {
    paddingTop: 20,
    height: 500,
    width: '100%'
  },

});

