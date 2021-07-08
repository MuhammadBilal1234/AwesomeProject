import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import axios from 'axios';
import {Button} from 'react-native-paper';
import {Divider} from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from '../IP';

const UnresolvedComplainList = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let authToken = await AsyncStorage.getItem('@token');
      const res = await axios(
        `http://${IP}:3000/user/unresolved?token=${authToken}`,
      );
      console.log(res.data);
    };
    fetchData();
  }, []);


  return (
    <View>
      <Text style={styles.heading}>Unresolved Complains</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    paddingLeft: 55,
    paddingTop: 14,
    height: 70,
    width: 1000,
    backgroundColor: 'red',
    color: 'white',
  },
  sub: {
    fontSize: 25,
    marginTop: 15,
    textAlign: 'center',
  },
  bnh: {
    fontSize: 25,
    marginTop: 15,
    marginRight: 10,
    textAlign: 'center',
  },
  dept: {
    marginTop: 60,
    fontSize: 25,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  deptname: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'green',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  dd: {
    fontSize: 30,
    marginBottom: 20,
  },
  ddHead: {
    fontSize: 20,
  },
});

export default UnresolvedComplainList;
