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

import { StyleSheet, FlatList } from 'react-native';
import { shadow } from 'material-bread';

import {
  Container,
  Header,
  Card,
  CardItem,
  Body,
  Title,
  Text,
  Button,
  H3,
  Right,
  Left,
  Thumbnail,
  Drawer,
  Icon } from 'native-base';

import LinearGradient from 'react-native-linear-gradient';

import { DrawerContent } from './Components/drawer.js';

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

    closeControlPanel = () => {
      this.drawer._root.close();
    };
    openControlPanel = () => {
      this.drawer._root.open();
    };

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
    // ====================== Carregar Itens da API ======================= //

    // ====================== Renderizar Item ======================= //
    renderItem = ({ item }) => (
      <Card style={ styles.productContainer }>
        <CardItem header>
            <Thumbnail
              source={{uri: `data:image/webp;base64,${Buffer.from(item.user.avatar).toString('base64')}`}}
            />
          <Body>
            <Right>
              <H3>{ item.name }</H3>
              <Text>{ item.user.name }</Text>
            </Right>

          </Body>
        </CardItem>
        <CardItem button onPress={() => { this.props.navigation.navigate('Service', { service: item }); }}>
          <Text style={ styles.productDescripion }>
            { item.description }
          </Text>
        </CardItem>
        <CardItem footer>
          <Right>
            <StarRating
              disabled={true}
              maxStars={5}
              starSize={20}
              rating={item.rank}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
          </Right>
        </CardItem>
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

      GLOBAL.main = this;

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
          ref={(ref) => { this.drawer = ref; }}
          onClose={() => this.closeControlPanel()}
          type="overlay"
          content={ <DrawerContent name={this.state.name} email={this.state.email} avatar={this.state.avatar} navigation={this.props.navigation} /> }
          tapToClose={true}
          negotiatePan={true}
          openDrawerOffset={0.2}
          panCloseMask={0.2}
          closedDrawerOffset={-3}
          styles={ styles.drawerStyles }
          tweenHandler={(ratio) => ({
            main: { opacity:(2-ratio)/2 }
          })}>
        <Container>
          <LinearGradient colors={[ '#69A1F4', '#8B55FF']} style={styles.container}>
            <Header>
              <Left>
                <Button transparent onPress={ this.openControlPanel }>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Title>Header</Title>
              </Body>
            </Header>
              <FlatList
                contentContainerStyle={styles.list}
                data={this.state.services}
                keyExtractor={item => item._id}
                renderItem={ this.renderItem }

                // onEndReached={ this.loadMore } Desabilitado provisoriamente por motivos de bug
                onEndReachedThreshold={0.1}
                />
            </LinearGradient>
        </Container>
      </Drawer>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    drawer: {
      shadowColor: '#000000',
      shadowOpacity: 0.8,
      shadowRadius: 3
    },
    main: {paddingLeft: 3},
});
