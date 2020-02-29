import React, { Component } from 'react';

import { StyleSheet, Image } from 'react-native';

import {
  Container,
  Body,
  Text,
  H3,
  Card,
  CardItem,
  Thumbnail,
  Right,
  Button,
  Icon,
  List,
  ListItem,
  Left} from 'native-base';

import { Buffer } from 'buffer';
global.Buffer = Buffer;

export class DrawerContent extends Component {
  render() {

    const { name, email, avatar } = this.props;

    return (
      <Container>
        <Card transparent>
          <CardItem header>
            <Thumbnail
                source={{uri: `data:image/webp;base64,${avatar}`}}
              />
            <Body>
              <Right>
                <H3>{ name }</H3>
                <Text>{ email }</Text>
              </Right>
            </Body>
          </CardItem>
          <CardItem style={{ marginTop: 50 }}>
            <List>
              <ListItem icon onPress={() => {this.props.navigation.navigate('ViewContractedServices');}}>
                <Left>
                  <Button style={{ backgroundColor: "#8B55FF" }} >
                    <Icon name='send' />
                  </Button>
                </Left>

                  <Text> Serviços Contratatos </Text>

              </ListItem>
              <ListItem icon onPress={() => {this.props.navigation.navigate('ViewToAcceptService');}}>
                <Left>
                  <Button style={{ backgroundColor: "#8B55FF" }} >
                    <Icon name='send' />
                  </Button>
                </Left>
                <Body>
                  <Text> Serviços para Aceitar </Text>
                </Body>
              </ListItem>
              <ListItem icon onPress={() => {this.props.navigation.navigate('ViewAcceptedService');}}>
                <Left>
                  <Button style={{ backgroundColor: "#8B55FF" }} >
                    <Icon name='send' />
                  </Button>
                </Left>
                <Body>
                  <Text> Serviços Aceitos </Text>
                </Body>
              </ListItem>
              <ListItem icon onPress={() => {this.props.navigation.navigate('Options');}}>
                <Left>
                  <Button style={{ backgroundColor: "#8B55FF" }} >
                    <Icon name='adb' />
                  </Button>
                </Left>
                <Body>
                  <Text> Perfil </Text>
                </Body>
              </ListItem>
            </List>
          </CardItem>
        </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    marginTop: 10
  }
});
