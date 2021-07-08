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
import DropDownPicker from 'react-native-dropdown-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import {Input} from 'react-native-elements';
import IP from '../IP';

import axios from 'axios';

const AddBranch = () => {
  const [allbranch, setallbranch] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cities, setcities] = useState([]);
  const [regions, setregions] = useState([]);
  const [dept, setdept] = useState([]);
  const [refresh, setrefresh] = useState(false);

  // Branch Data
  const [selectdept, setselectdept] = useState('');
  const [selectcity, setselectcity] = useState(null);
  const [selectregion, setselectregion] = useState('');
  const [lt, setlt] = useState('');
  const [ln, setln] = useState('');
  const [name, setname] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const branch = await axios(`http://${IP}:3000/user/allbranch`);
      const city = await axios(`http://${IP}:3000/user/getcity`);
      const dep = await axios(`http://${IP}:3000/user/getdept`);
      city.data.forEach(element => (element.label = element.name));
      setallbranch(branch.data);
      setcities(city.data);
      setdept(dep.data);
      console.log(city.data);
    };
    fetchData();
  }, []);

  const getregion = async city => {
    setselectcity(city);
  };

  const submitbranch = async () => {
    const branch = await axios.post(
      `http://${IP}:3000/user/addbranch/?city=${selectcity}&dept=${selectdept}&lt=${lt}&ln=${ln}&name=${name}`,
    );
    console.log(branch.data);
    alert('Branch Added');
  };

  const newBranch = data => {
    setlt(data.nativeEvent.coordinate.latitude);
    setln(data.nativeEvent.coordinate.longitude);
    setModalVisible(true);
  };
  return (
    <View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Input
                label="Branch Name"
                value={name}
                onChangeText={text => setname(text)}
              />
              <Text style={styles.ddHead}>Select City</Text>
              <ModalDropdown
                style={styles.dd}
                options={cities.map(city => city.name)}
                onSelect={(index, value) => getregion(value)}
              />

              <Text style={styles.ddHead}>Select Department</Text>
              <ModalDropdown
                style={styles.dd}
                onSelect={(index, value) => setselectdept(value)}
                options={dept.map(dept => dept.value)}
              />
              {/* 
              {selectcity ? (
                <View>
                  <Text style={styles.ddHead}>Select Region</Text>
                  <ModalDropdown
                    style={styles.dd}
                    onSelect={(index, value) => setselectregion(value)}
                    options={regions.map(region => region.name)}
                  />
                </View>
              ) : null} */}

              <Button
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginTop: 0,
                  backgroundColor: 'green',
                }}
                title="Sumbit"
                onPress={submitbranch}
              />
            </View>
          </View>
        </Modal>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.626057,
          longitude: 73.071442,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={e => newBranch(e)}>
        {allbranch
          ? allbranch.map((branch, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: branch.latitude,
                  longitude: branch.longitude,
                }}
                title={branch.DeptId.value}
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

export default AddBranch;
