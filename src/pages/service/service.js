/**
 * Tela de Serviço Individual
 */

import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { FlatList, StyleSheet, View, ScrollView, Image, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

import { Buffer } from 'buffer';
global.Buffer = Buffer;

import { Button, Card, CardItem, Text, H3,Right, Body } from 'native-base';
import { Avatar } from 'react-native-elements';
import { shadow } from 'material-bread';

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

  // ====================== Contacts ======================= //
  contactComponent = ({ item }) => {
    return (
      <View>
       <Text>
         <Text style={{ fontWeight: "bold" }}>{item.contactType}:</Text> {item.contact}
        </Text>
      </View>
    );
  };
  // ====================== Contacts ======================= //

  // ====================== Comentarios ======================= //
  commentsComponet = ({ item }) => {
    return (
      <Card style={{ marginTop: '2%', marginLeft: '1%', marginRight: '1%' }}>
        <CardItem>
          <Body>
            <Text
              numberOfLines={ 2 }>
              { item.comment }
            </Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Right>
            <StarRating
              disabled={true}
              maxStars={5}
              starSize={15}
              rating={ item.rank }
            />
          </Right>
        </CardItem>
      </Card>);
    };
  // ====================== Comentarios ======================= //

  render(){
    const { navigation } = this.props;
    return(
      <ScrollView>
        <LinearGradient colors={[ '#69A1F4', '#8B55FF']} style={ styles.container }>
          <View style={{ zIndex: 0 }}>
            <Body>
            <View style={{ position: 'absolute', zIndex: 2 }}>
              <Avatar
                rounded
                size={'medium'}
                source={{uri: `data:image/webp;base64,${Buffer.from(navigation.state.params.service.user.avatar).toString('base64')}`}}
              />
            </View>
            </Body>
            <View style={{ zIndex: 1, marginTop: 25 }}>
              <Body>
                <Card style={{ width: screenWidth - 20 }}>
                  <CardItem header>
                    <Body style={ styles.serviceContent }>
                      <H3>{navigation.state.params.service.name}</H3>
                      <Text>{navigation.state.params.service.user.name}</Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Text>
                      { navigation.state.params.service.description }
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text>
                      Preços
                    </Text>
                    <FlatList
                        contentContainerStyle={ styles.list }
                        data={ navigation.state.params.service.prices }
                        keyExtractor={item => item._id}
                        renderItem={ this.pricesComponent }
                        ListHeaderComponent={ this.searchComponent }
                        onEndReachedThreshold={0.1}
                    />
                  </CardItem>
                  <CardItem>
                    <Text>
                      Contatos
                    </Text>
                    <FlatList
                        contentContainerStyle={ styles.list }
                        data={ navigation.state.params.service.contacts }
                        keyExtractor={item => item._id}
                        renderItem={ this.contactComponent }
                        ListHeaderComponent={ this.searchComponent }
                        onEndReachedThreshold={0.1}
                    />
                  </CardItem>
                  <CardItem footer>
                    <Body>
                      <Button
                      full
                        onPress={() => {
                          this.props.navigation.navigate('ContractService', { service: navigation.state.params.service });
                          }}>
                          <Text>
                            Contratar
                          </Text>
                      </Button>
                    </Body>
                  </CardItem>
                </Card>
              </Body>
            </View>
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
    paddingTop: 10,
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
    marginTop: 40,
    height: '90%',
    width: '90%',
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
