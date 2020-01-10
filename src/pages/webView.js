import React, { Component } from 'react';

import { WebView } from 'react-native';


export default class Maps extends Component {
  render() {
    const { navigation } = this.props;
    const address = navigation.state.params.address;



    return (
      <WebView
        source={{ uri: `http://maps.google.co.in/maps?q=${ address.streetName.replace(' ', '+') },+${ address.number }+,-${ address.district.replace(' ', '+') }+,${ address.city.replace(' ', '+') },${ address.state.replace(' ', '+') },+${ address.zipcode }` }}
      />
    );
  }
}

Maps.navigationOptions = ({ navigation }) => ({
  title: 'Maps'
});
