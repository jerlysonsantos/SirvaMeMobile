import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import FontsAwesome from 'react-native-vector-icons/FontAwesome';

import Main from './main';
  
  class SettingsScreen extends Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Settings!</Text>
        </View>
      );
    }
  }
  

export default createBottomTabNavigator({
    Home: { screen: Main },
    Settings: { screen: SettingsScreen },
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = FontsAwesome;
      let iconName;
      if (routeName === 'Home') {
        iconName = 'gamepad';
      } else if (routeName === 'Settings') {
        iconName = 'music';
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
});
  
