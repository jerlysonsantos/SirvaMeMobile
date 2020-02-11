/**
 * Tela Principal do Aplicativo
 */

import React, { Component } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

import { Buffer } from 'buffer';
global.Buffer = Buffer;

import StarRating from 'react-native-star-rating';

import GLOBAL from './global.js'

import { StyleSheet, Text, FlatList, Image, View } from 'react-native';
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

import {
  Drawer,
  DrawerHeader,
  DrawerSection,
  DrawerItem,
  Appbar } from 'material-bread';

import LinearGradient from 'react-native-linear-gradient';

export default class Main extends Component {
    static navigationOptions = {
      header: null,
    };

    state = {
        productInfo: {},
        services: [],
        page: 1,
        visible: false,
        isOpen: false,
        name: '',
        email:'',
        avatar: '',
    };

    async componentDidMount() {
      this.loadProducts();
      this.getUser();
    }

    getUser = async () => {
      const user = JSON.parse(await AsyncStorage.getItem('@_user'));
      this.setState({ name: user.name, email: user.email, avatar: Buffer.from(user.avatar).toString('base64') });
    };

    // ====================== Carregar Itens da API ======================= //
    loadProducts = async (page = 1) => {
      try {
        const response = await api.get(`/service/getServices/${page}`, {
          headers: {
            'Authorization':  `Bearrer ${await AsyncStorage.getItem('@token')}`,
          }
        });

        const { services, ...productInfo } = response.data;

        this.setState({ services: [...this.state.services, ...services],
            productInfo,
            page,
          });

      } catch (error) {
        alert(error.response.data.error);
        this.props.navigation.navigate('Login');
        }
      };

    loadMore = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);

    }
    // ====================== /Carregar Itens da API ======================= //

    // ====================== Renderizar Item ======================= //
    renderItem = ({ item }) => (
      <Card style={ styles.productContainer }>
        <CardHeader
          thumbnail={
            <Avatar
              type="image"
              image={<Image source={{uri: `data:image/webp;base64,${Buffer.from(item.user.avatar).toString('base64')}`}} /> }
              size={40}
              style={{ elevation: 4, ...shadow(4) }}
            />
          }
          title={ item.name }
          subtitle={ `Serviço por ${item.user.name}` }
          action={<IconButton name="more-vert" size={24} />}
        />
        <CardContent onPress={() => { this.props.navigation.navigate('Service', { service: item }); }}>
          <Text style={ styles.productDescripion }>
            { item.description }
          </Text>
          <StarRating
            disabled={true}
            maxStars={5}
            starSize={20}
            rating={item.rank}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
          />
        </CardContent>
      </Card>
    );
    // ====================== /Renderizar Item ======================= //
    // ====================== Filtro ======================= //
    searchComponent = () => (
        <Card style={ styles.search }>
            <CardHeader
                title={'Search'}
                titleStyles={{ color: '#fff' }}
            />
            <CardContent style={{ flexDirection: 'row' }}>
                <Menu
                    visible={this.state.visible}
                    button={
                        <Button
                            text={'Filtrar'}
                            onPress={() => {
                                this.setState({ visible: !this.state.visible });
                            }}
                            type="contained"
                            style={{ backgroundColor: '#5B69A9' }}
                            icon={<Icon name="arrow-drop-down" />}
                            iconPosition={'right'}
                            />
                    }>
                    <MenuItem text={'Menu item 1'} onPress={() => this.setState({ visible: false })} />
                    <MenuItem text={'Menu item 2'} onPress={() => this.setState({ visible: false })} />
                    <MenuItem text={'Menu item 3'} onPress={() => this.setState({ visible: false })} />
                    <MenuItem text={'Menu item 4'} onPress={() => this.setState({ visible: false })} />
                </Menu>
                <Menu
                    visible={this.state.visible}
                    button={
                        <Button
                            text={'Ordenar por'}
                            onPress={() => {
                                this.setState({ visible: true });
                            }}
                            type="contained"
                            style={{ backgroundColor: '#5B69A9', marginLeft: 5 }}
                            icon={<Icon name="arrow-drop-down" />}
                            iconPosition={'right'}
                            />
                    }>
                    <MenuItem text={'Menu item 1'} onPress={() => this.setState({ visible: false })} />
                    <MenuItem text={'Menu item 2'} onPress={() => this.setState({ visible: false })} />
                    <MenuItem text={'Menu item 3'} onPress={() => this.setState({ visible: false })} />
                    <MenuItem text={'Menu item 4'} onPress={() => this.setState({ visible: false })} />
                </Menu>
            </CardContent>
        </Card>
    );
    // ====================== /Filtro ======================= //
    render() {
      // ====================== Side Menu ======================= //

      GLOBAL.main = this;

      const DrawerContent = ({ name, email, avatar }) => {
        return (
          <View>
            <DrawerHeader
            title={name}
            subtitle={email}
            avatar={
              <Avatar
                type="image"
                size={48}
                image={<Image source={{uri: `data:image/webp;base64,${avatar}`}} />}
                />
              }
            />
            <DrawerSection bottomDivider>
              <DrawerItem text={'Home'} icon={'mail'} active onPress={() => {this.props.navigation.navigate('Main');}} />
              <DrawerItem text={'Serviços Contratatos'} icon={'send'} onPress={() => {this.props.navigation.navigate('ViewContractedServices');}} />
              <DrawerItem text={'Serviços para Aceitar'} icon={'send'} onPress={() => {this.props.navigation.navigate('ViewToAcceptService');}} />
              <DrawerItem text={'Serviços Aceitos'} icon={'send'} onPress={() => {this.props.navigation.navigate('ViewAcceptedService');}} />
              <DrawerItem text={'Perfil'} icon={'adb'} onPress={() => {this.props.navigation.navigate('Options');}} />
            </DrawerSection>
          </View>
        );
      };
      // ====================== Barra Horizontal ======================= //
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
      // ====================== /Barra Horizontal ======================= //

      // ====================== /Side Menu ======================= //

      return (
        <Drawer
          open={this.state.isOpen}
          fullHeight
          scrimStyles={{position: 'absolute'}}
          drawerContent={<DrawerContent name={this.state.name} email={this.state.email} avatar={this.state.avatar} />}
          onClose={() => this.setState({ isOpen: false })}
          animationTime={250}>
            <LinearGradient colors={[ '#69A1F4', '#8B55FF']} style={styles.container}>
              <AppbarContent />
              <FlatList
                contentContainerStyle={styles.list}
                data={this.state.services}
                keyExtractor={item => item._id}
                renderItem={ this.renderItem }
                ListHeaderComponent={ this.searchComponent }
                // onEndReached={ this.loadMore } Desabilitado provisoriamente por motivos de bug
                onEndReachedThreshold={0.1}
                />
            </LinearGradient>
        </Drawer>
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

    list: {
      padding: 20,
    },

    productContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        marginBottom: 20,
        elevation: 5,
        ...shadow(20),
    },

    productDescripion: {
        fontSize: 16,
        color: '#000',
        marginTop: 5,
        lineHeight: 24,
    },

    search: {
        elevation: 5,
        backgroundColor: '#53619F',
        marginTop: '5%',
        marginBottom: '5%',
        width: '100%',
        ...shadow(20),
    },

});
