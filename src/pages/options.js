import React, { Component } from 'react';

import { StyleSheet, View, Text } from 'react-native';

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


export default class pages extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const AppbarContent = isOpen => {
      return (
        <Appbar
          barType={'normal'}
          color={'#446DAB'}
          title={'SirvaMe'}
          navigation={'menu'}
          onNavigation={() => this.setState({ isOpen: !this.state.isOpen })}
          actionItems={[{ name: 'search' }, { name: 'more-vert' }]}
        />
      );
    };

    return (
      <View style={ styles.container }>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}
          onPress={() => {this.props.navigation.navigate('Main');}}
          >
          <Text
            style={{
              backgroundColor: 'transparent',
              fontSize: 15,
              color: '#fff',
            }}
            onPress={() => {this.props.navigation.navigate('Main');}}
            >
            Voltar
          </Text>
        </LinearGradient>
      </View>
    );
  }


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
});
