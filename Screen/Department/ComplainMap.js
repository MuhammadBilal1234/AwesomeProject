import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Modal,
  Button,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';
import IP from '../IP';

const ComplainMap = () => {
  const [complain, setcomplain] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let authToken = await AsyncStorage.getItem('@token');
      const complainMap = await axios.post(
        `http://${IP}:3000/user/complainmap?token=${authToken}`,
      );
      console.log(complainMap.data);
      setcomplain(complainMap.data);
    };
    fetchData();
  }, []);

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.626057,
          longitude: 73.071442,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {complain
          ? complain.map((complain, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: complain.lt,
                  longitude: complain.ln,
                }}
                title={complain.message}
              />
            ))
          : null}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: 470,
    width: 400,
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
    backgroundColor: '#2196F3',
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

export default ComplainMap;
