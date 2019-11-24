/**
 * Tela de Serviço Individual
 */

import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { FlatList, StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window')

import { Buffer } from 'buffer';
global.Buffer = Buffer;

import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  shadow,
  Button } from 'material-bread';

import StarRating from 'react-native-star-rating';

export default class Service extends Component {


  // ====================== Carousel ======================= //
  _renderItem = ({item, index}, parallaxProps) => {
    return (
        <View style={styles.item}>
          <ParallaxImage
            source={{uri: `data:image/webp;base64,${Buffer.from(item).toString('base64')}`}}
            containerStyle={ styles.imageContainer }
            style={ styles.image }
            parallaxFactor={0.4}
            {...parallaxProps}
          />
        </View>
    );
  }
  // ====================== Carousel ======================= //

  // ====================== Preços ======================= //
  pricesComponent = ({ item }) => (
    <Text>R${item.price}/{item.priceFor}</Text>
  );
  // ====================== Preços ======================= //

  // ====================== Comentarios ======================= //
  commentsComponet = ({ item }) => {
    return (
      <Card style={{ marginTop: '2%', marginLeft: '1%', marginRight: '1%' }}>
        <CardHeader
          thumbnail={
            <Avatar
              type="image"
              image={<Image source={{uri: `data:image/webp;base64,${Buffer.from(item.author.avatar).toString('base64')}`}} /> }
              size={40}
              style={{ elevation: 4, ...shadow(4) }}
            />
          }
          title={ item.author.name }
          action={
            <StarRating
              disabled={true}
              maxStars={5}
              starSize={10}
              rating={ item.rank }
            />}
        />
        <CardContent style={styles.commentContent}>
          <Text
            numberOfLines={ 2 }
            style={ styles.serviceDescripion }>
            { item.comment }
          </Text>
        </CardContent>
      </Card>);
    };
  // ====================== Comentarios ======================= //

  render(){
    const { navigation } = this.props;
    return(
      <ScrollView>
        <LinearGradient colors={[ '#69A1F4', '#8B55FF']} style={ styles.container }>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Avatar
              type="image"
              image={<Image source={{uri: `data:image/webp;base64,${Buffer.from(navigation.state.params.service.user.avatar).toString('base64')}`}} /> }
              size={40}
              style={{ elevation: 6, position: 'absolute', ...shadow(4) }}
            />
            <Card style={ styles.serviceContainer }>
              <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                <Text style={{ color: '#000' }}>{navigation.state.params.service.name}</Text>
                <Text>{navigation.state.params.service.user.name}</Text>
              </View>
              <CardContent style={ styles.serviceContent }>
                <Text style={ styles.serviceDescripion }>
                  { navigation.state.params.service.description }
                </Text>
                <Text style={ styles.serviceDescripion }>
                  { 'Preços' }
                </Text>
                <FlatList
                    contentContainerStyle={ styles.list }
                    data={ navigation.state.params.service.prices }
                    keyExtractor={item => item._id}
                    renderItem={ this.pricesComponent }
                    ListHeaderComponent={ this.searchComponent }
                    onEndReachedThreshold={0.1}
                />
                <Text></Text>
                <Button text={'Contratar'} type="contained"
                  onPress={() => { this.props.navigation.navigate('ContractService', { service: navigation.state.params.service }); }}
                />
              </CardContent>
            </Card>
          </View>
          <Carousel
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth - 60}
            data={ navigation.state.params.service.images }
            renderItem={ this._renderItem }
            hasParallaxImages={true}
          />
          <View style={ styles.ranks }>
            <Text style={{ color: '#000', paddingLeft: 10 }}>
              { 'Notas e Comentarios' }
            </Text>
            <Text style={{ fontSize: 30, color: '#000', paddingLeft: 35, paddingTop: 5 }}>
              { (navigation.state.params.service.rank).toFixed(1) }
            </Text>
            <View style={{ paddingLeft: 34.4, paddingTop: 5, width: 50 }}>
              <StarRating
                disabled={true}
                maxStars={5}
                starSize={10}
                rating={ navigation.state.params.service.rank }
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginLeft: 5, marginRight: 5 }}>
            <FlatList
              contentContainerStyle={ styles.list }
              data={ navigation.state.params.service.comments }
              keyExtractor={item => item._id}
              renderItem={ this.commentsComponet }
              ListHeaderComponent={ this.searchComponent }
              onEndReachedThreshold={0.1}
            />
          </View>
        </LinearGradient>
      </ScrollView>
)}};

Service.navigationOptions = ({ navigation }) => ({
  title: navigation.state.params.service.name
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  ranks: {
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#FFF',
    width: '98%',
    padding: 5,
    borderColor: '#DDD',
    borderRadius: 5,
    ...shadow(20),
  },

  serviceContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
    elevation: 5,
    height: '90%',
    width: '90%',
    ...shadow(20),
  },

  commentContent: {
    flexDirection: 'row',
    width: '100%',
  },

  commentsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    elevation: 5,
    height: '90%',
    width: '90%',
    ...shadow(20),
  },

  serviceDescripion: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
    lineHeight: 24,
  },

  item: {
    marginTop: 10,
    marginBottom: 10,
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
