import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList, StyleSheet, Text } from 'react-native';

import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  shadow,
  Button } from 'material-bread';

import StarRating from 'react-native-star-rating';

const pricesComponent = ({ item }) => (
  <Text>{item.priceFor} {item.price}</Text>
);

const commentsComponet = ({ item }) => (
  <Card style={{ width: '95%' }}>
    <CardHeader
      thumbnail={
        <Avatar
          type="icon"
          content="face"
          size={40}
          style={{ elevation: 4, ...shadow(4) }}
        />
      }
      title={ item.author.name }
      action={<IconButton name="more-vert" size={24} />}
    />
    <CardContent style={ styles.serviceContent }>
      <Text style={ styles.serviceDescripion }>
        { item.comment }
      </Text>
      <StarRating
          disabled={true}
          maxStars={10}
          starSize={10}
          rating={ item.rank }
          selectedStar={(rating) => this.onStarRatingPress(rating)}
        />
    </CardContent>
  </Card>
);

const Service = ({ navigation }) => (
  <LinearGradient colors={[ '#69A1F4', '#8B55FF']} style={styles.container}>
    <Card style={ styles.serviceContainer }>
        <CardHeader
          thumbnail={
            <Avatar
              type="icon"
              content="face"
              size={40}
              style={{ elevation: 4, ...shadow(4) }}
            />
          }
          title={ navigation.state.params.service.name }
          subtitle={ `Serviço por ${navigation.state.params.service.user.name}` }
          action={<IconButton name="more-vert" size={24} />}
        />
        <CardContent style={ styles.serviceContent }>
          <Text style={ styles.serviceDescripion }>
            { navigation.state.params.service.description }
          </Text>
          <Text style={ styles.serviceDescripion }>Tabela de Preços</Text>
          <FlatList
              contentContainerStyle={ styles.list }
              data={ navigation.state.params.service.prices }
              keyExtractor={item => item._id}
              renderItem={ pricesComponent }
              ListHeaderComponent={ this.searchComponent }
              // onEndReached={ this.loadMore } Desabilitado provisoriamente por motivos de bug
              onEndReachedThreshold={0.1}
          />
          <StarRating
            disabled={false}
            maxStars={10}
            starSize={25}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
          />
          <Text></Text>
          <Text style={ styles.serviceDescripion }>Comentarios</Text>
          <FlatList
            contentContainerStyle={styles.list}
            data={ navigation.state.params.service.comments }
            keyExtractor={item => item._id}
            renderItem={ commentsComponet }
            ListHeaderComponent={ this.searchComponent }
            // onEndReached={ this.loadMore } Desabilitado provisoriamente por motivos de bug
            onEndReachedThreshold={0.1}
          />
          <Button
            text={'Contratar'}
            type="contained"
            dense
            color={'#4385E9'}
            onPress={() => {
              alert('Porra Nenhuma')
              }}>
        </Button>
        </CardContent>
      </Card>
  </LinearGradient>
);

Service.navigationOptions = ({ navigation }) => ({
  title: navigation.state.params.service.name
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },

  serviceContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  serviceContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    marginBottom: 10,
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

});

export default Service;
