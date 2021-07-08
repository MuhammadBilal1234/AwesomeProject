import React, {useState, useEffect, useRef, Image} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import {Camera} from 'expo-camera';
import ModalDropdown from 'react-native-modal-dropdown';
import IP from './IP';

const createFormData = (photo, body = {}) => {
  const data = new FormData();
  data.append('image', {
    name: 'photo.fileName',
    type: 'jpg/png',
    uri: photo.uri,
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  console.log(data);
  return data;
};

export default function RegisterComplain() {
  const [hasPermission, setHasPermission] = useState(null);
  const [comment, setcomment] = useState('');
  const [lt, setlt] = useState('');
  const [ln, setln] = useState('');
  const [photo, setPhoto] = React.useState(null);
  const [dept, setdept] = useState([]);
  const [selectdept, setselectdept] = useState('');

  const camera = useRef(null);
  const ref = React.createRef();

  useEffect(() => {
    (async () => {
      const dep = await axios(`http://${IP}:3000/user/getdept`);
      setdept(dep.data);
      Location.requestPermissionsAsync();
      const {status} = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const snap = async () => {
    try {
      if (ref) {
        const options = {
          quality: 0.1,
          skipProcessing: true,
        };
        let img = await ref.current.takePictureAsync(options);
        console.log(img.uri);
        let loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        let authToken = await AsyncStorage.getItem('@token');

        setPhoto(img);

        // Req To The Server
        const res = await fetch(
          `http://${IP}:3000/user/complain?uri=${img.uri}&deprt=${selectdept}`,
          {
            method: 'POST',
            body: createFormData(photo, {
              message: comment,
              lt: loc.coords.latitude,
              ln: loc.coords.longitude,
              token: authToken,
            }),
          },
        );

        // console.log(res);
      } else {
        console.log('Ref Not Found');
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        ref={ref}
        style={styles.camera}
        type={Camera.Constants.Type.back}></Camera>

      <Text style={styles.ddHead}>Select Department</Text>
      <ModalDropdown
        style={styles.dd}
        onSelect={(index, value) => setselectdept(value)}
        options={dept.map(dept => dept.value)}
      />

      <View style={styles.Note}>
        <TextInput
          multiline={true}
          placeholder="Enter Your Message"
          numberOfLines={4}
          style={styles.input}
          onChangeText={text => setcomment(text)}
          value={comment}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={snap}>
          <Text style={styles.text}> Register </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    height: 300,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    marginLeft: 100,
  },
  button: {
    backgroundColor: 'grey',
    width: 150,
    padding: 10,
    marginLeft: 5,
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
  },
  input: {
    width: 250,
    marginLeft: 60,
    margin: 20,
    height: 50,
    borderWidth: 1,
  },
  dd: {
    fontSize: 50,
    marginBottom: 20,
    marginLeft: 140,
  },
  ddHead: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 20,
  },
});
