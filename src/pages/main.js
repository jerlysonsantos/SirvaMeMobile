import React, { Component } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

import { StyleSheet, Text, FlatList } from 'react-native';
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
import LinearGradient from 'react-native-linear-gradient';

export default class Main extends Component {
    static navigationOptions = {
        title: 'Serviços',
    };

    state = {
        productInfo: {},
        docs: [],
        page: 1,
        visible: false,
    };

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;

        this.setState({ docs: [...this.state.docs, ...docs], 
            productInfo,
            page,
         });

    };

    loadMore = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);

    }

    renderItem = ({ item }) => (
        <Card style={ styles.productContainer }>
            <CardHeader 
                thumbnail={
                    <Avatar
                        type="icon"
                        content="face"
                        size={40}
                        style={{ elevation: 4, ...shadow(4) }}
                    />
                }
                title={ item.title }
                subtitle={ 'email@gmail.com' }
                action={<IconButton name="more-vert" size={24} />}
            />
            <CardContent onPress={() => { this.props.navigation.navigate('Product', { product: item }); }}>
                <Text style={ styles.productDescripion }>
                    { item.description }
                </Text>
            </CardContent>    
        </Card>
    );

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

    render() {
        return (
            <LinearGradient colors={[ '#69A1F4', '#8B55FF']} style={styles.container}>
                
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={item => item._id}
                    renderItem={ this.renderItem }
                    ListHeaderComponent={ this.searchComponent }
                    onEndReached={ this.loadMore }
                    onEndReachedThreshold={0.1}
                    />
            </LinearGradient>
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