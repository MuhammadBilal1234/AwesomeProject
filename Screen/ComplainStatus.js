import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';

const ComplainStatus = props => {
  return (
    <Card>
      <Card.Title> COMPLAIN </Card.Title>
      <Card.Divider />
      <Card.Image
        source={{
          uri: props.data.uri,
        }}></Card.Image>
      <View>
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            marginTop: 15,
            BackgroundColor:
              props.data.status == 'pending'
                ? 'green'
                : props.data.status == 'InProcess'
                ? 'blue'
                : props.data.status == 'Complete'
                ? 'black'
                : props.data.status == 'Reject'
                ? 'red'
                : 'green',
          }}
          title={props.data.status}
          onPress={() =>
            props.nav.navigate('SingleComplain', {data: props.data})
          }
        />
      </View>
    </Card>
  );
};

export default ComplainStatus;
