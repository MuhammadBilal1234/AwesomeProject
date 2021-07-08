import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import IP from './IP';

const SingleComplain = ({route}) => {
  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);
  return (
    <View>
      <Text style={styles.heading}>Detail Complain</Text>
      <Text style={styles.subheading}>IMAGE</Text>
      <Image
        source={{
          uri: route.params.data.uri,
        }}
        style={styles.img}
      />
      <Text style={styles.note}>NOTE</Text>
      <Text style={styles.note1}> {route.params.data.message}</Text>
      <Text style={styles.date}>Date</Text>
      <Text style={styles.date1}>{route.params.data.date.split('T')[0]}</Text>
      <Text style={styles.status}>Current Status</Text>
      <Text style={styles.status1}>{route.params.data.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    paddingLeft: 90,
    paddingTop: 14,
    height: 70,
    width: 1000,
    backgroundColor: 'green',
    color: 'white',
  },
  img: {
    height: 250,
    width: 250,
    marginLeft: 50,
    marginTop: 20,
  },
  subheading: {
    fontSize: 25,
    textDecorationLine: 'underline',
    marginLeft: 25,
    marginTop: 10,
  },
  note: {
    fontSize: 25,
    textDecorationLine: 'underline',
    paddingLeft: 20,
    marginTop: 15,
  },
  note1: {
    marginLeft: 100,
    fontSize: 20,
  },
  date: {
    fontSize: 25,
    textDecorationLine: 'underline',
    paddingLeft: 20,
    marginTop: 15,
  },
  date1: {
    marginLeft: 120,
    fontSize: 20,
  },
  status: {
    fontSize: 25,
    textDecorationLine: 'underline',
    paddingLeft: 20,
    marginTop: 15,
  },
  status1: {
    marginLeft: 140,
    fontSize: 20,
    marginTop: 15,
  },
});

export default SingleComplain;
