import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import BottomNavigation, {
    FullTab
  } from 'react-native-material-bottom-navigation'

import { Main } from './main';
  
export default class App extends Component {

    static navigationOptions = {
        header: null,
    };

    tabs = [
        {
            key: 'gamepad',
            icon: 'gamepad',
            label: 'Games',
            barColor: '#388E3C',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'gamepad1',
            icon: 'gamepad',
            label: 'Movies & TV',
            barColor: '#B71C1C',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'music',
            icon: 'music',
            label: 'Music',
            barColor: '#E64A19',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        }
    ]
    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="white" name={icon} />
    )

    renderTab = ({ tab, isActive }) => (
        <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
        />
    )

    render() {
        const renderA = <Text>AAAAAAAAAAA</Text>;
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {renderA}
                </View>
                <BottomNavigation
                    onTabPress={newTab => this.setState({ activeTab: newTab.key })}
                    renderTab={this.renderTab}
                    tabs={this.tabs}
                />
            </View>
        )
    }
}