import React, {useState} from 'react';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {View, Text, Image, StyleSheet} from 'react-native';
import axios from 'axios';
import ModalDropdown from 'react-native-modal-dropdown';
import IP from '../IP';

const ComplainItem = ({data, nav}) => {
  const [status, setstatus] = useState(data.status);
  const [index, setindex] = useState(0);
  const states = ['InProcess', 'Complete', 'Reject', 'Pending'];

  const handlepress = () => {
    console.log(data._id);
    console.log(nav.navigate('SupComplain', {data: data}));
  };

  return (
    <Card>
      <Card.Title> COMPLAIN </Card.Title>
      <Card.Divider />
      <Card.Image
        source={{
          uri: data.uri,
        }}></Card.Image>
      <View>
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            backgroundColor: 'red',
          }}
          title="VIEW NOW"
          onPress={handlepress}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({});

export default ComplainItem;
