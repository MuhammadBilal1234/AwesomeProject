import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const AdminScreen = props => {
  return (
    <ScrollView>
      <TouchableOpacity onPress={() => props.navigation.navigate('AddBranch')}>
        <Image
          source={require('../../assets/building.png')}
          style={styles.img}
        />
        <Text style={styles.text}>ADD OFFICE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Staff')}>
        <Image source={require('../../assets/staff.jpg')} style={styles.img2} />
        <Text style={styles.text}>STAFF</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('AllDepartments')}>
        <Image source={require('../../assets/dept.png')} style={styles.img2} />
        <Text style={styles.text}>DEPARTMENTS</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 27,
    marginBottom: 20,
    marginLeft: 15,
  },
  img: {
    width: 140,
    height: 120,
    marginLeft: 115,
    marginTop: 50,
  },
  img2: {
    width: 120,
    height: 120,
    marginLeft: 125,
    marginTop: 100,
  },
});

export default AdminScreen;
