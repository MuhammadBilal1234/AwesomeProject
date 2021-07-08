import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import axios from 'axios';
import IP from '../IP';

const SupComplain = ({route, navigation}) => {
  const [status, setstatus] = useState(route.params.data.status);
  useEffect(() => {
    const fetchData = async () => {
      console.log(route.params.data);
    };

    fetchData();
  }, []);

  const handlestatus = async () => {
    navigation.navigate('MainScreen');
    const res = await axios.post(
      `http://${IP}:3000/user/changestatus?id=${route.params.data._id}&status=${status}`,
    );
  };
  return (
    <ScrollView>
      <Text style={styles.heading}>Complete Complain</Text>
      <Text style={styles.subheading}>IMAGE</Text>
      <Image
        source={{
          uri: route.params.data.uri,
        }}
        style={styles.img}
      />
      <Divider orientation="horizontal" style={{marginTop: 14}} />
      <Text style={styles.note}>NOTE</Text>
      <Text style={styles.note1}> {route.params.data.message}</Text>

      <Divider orientation="horizontal" style={{marginTop: 14}} />

      <Text style={styles.date}>Date</Text>
      <Text style={styles.date1}>{route.params.data.date.split('T')[0]}</Text>
      <Divider orientation="horizontal" style={{marginTop: 14}} />
      <Text style={styles.status}>Current Status</Text>
      <Text style={styles.status1}>{status}</Text>
      <Divider orientation="horizontal" style={{marginTop: 14}} />
      <Text style={styles.status}>Change Status</Text>

      <View style={styles.menuTop}>
        <TouchableOpacity
          style={styles.m1}
          mode="contained"
          onPress={() => setstatus('Pending')}>
          <Text style={styles.menuText}> Pending </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.m2}
          onPress={() => setstatus('InProcess')}>
          <Text style={styles.menuText1}> InProcess </Text>
        </TouchableOpacity>
      </View>
      <Text></Text>
      <View style={styles.menuTop}>
        <TouchableOpacity
          style={styles.m1}
          mode="contained"
          onPress={() => setstatus('Complete')}>
          <Text style={styles.menuText2}> Complete </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.m2} onPress={() => setstatus('Reject')}>
          <Text style={styles.menuText3}> Reject </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.buttonClose]}
        onPress={handlestatus}>
        <Text style={styles.textStyle}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heading: {
    fontSize: 25,
    paddingLeft: 70,
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

    marginLeft: 25,
    marginTop: 10,
  },
  note: {
    fontSize: 25,

    paddingLeft: 20,
    marginTop: 15,
  },
  note1: {
    marginLeft: 100,
    fontSize: 20,
  },
  date: {
    fontSize: 25,
    paddingLeft: 20,
    marginTop: 15,
  },
  date1: {
    marginLeft: 120,
    fontSize: 20,
  },
  status: {
    fontSize: 25,
    paddingLeft: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  status1: {
    marginLeft: 140,
    fontSize: 20,
    marginTop: 15,
  },
  mainHeading: {
    fontSize: 30,
    backgroundColor: 'grey',
    height: 80,
    paddingTop: 18,
    paddingLeft: 90,
  },
  detail: {
    fontSize: 21,
    textAlign: 'center',
    paddingTop: 35,
    paddingBottom: 15,
    margin: 5,
  },
  menuTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  m1: {
    width: 205,
    height: 50,
    borderWidth: 1,
  },
  m2: {
    borderWidth: 1,
    height: 50,
    width: 209,
  },
  menuText: {
    paddingLeft: 70,
    fontSize: 17,
    paddingTop: 10,
    height: 50,
    color: 'white',
    backgroundColor: 'orange',
  },
  menuText1: {
    paddingLeft: 50,
    fontSize: 17,
    paddingTop: 10,
    height: 50,
    color: 'white',
    backgroundColor: 'blue',
  },
  menuText2: {
    paddingLeft: 70,
    fontSize: 17,
    paddingTop: 10,
    color: 'white',
    backgroundColor: 'green',
    height: 50,
  },
  menuText3: {
    height: 50,
    color: 'white',
    backgroundColor: 'red',
    paddingLeft: 60,
    fontSize: 17,
    paddingTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 30,
  },
  buttonOpen: {
    backgroundColor: 'grey',
  },
  buttonClose: {
    backgroundColor: 'grey',
  },
});

export default SupComplain;
