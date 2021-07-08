import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const MainScreen = props => {
  return (
    <View>
      <Text style={styles.heading}>Complain Screen</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('ComplainMap')}>
        <Image source={require('../../assets/map.jpg')} style={styles.img} />
        <Text style={styles.text}>VIEW COMPLAINS MAP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('AllComplains')}>
        <Image
          source={require('../../assets/complain.jpg')}
          style={styles.img}
        />
        <Text style={styles.text}>ALL COMPLAINTS</Text>
      </TouchableOpacity>
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
    width: 190,
    height: 120,
    marginLeft: 85,
    marginTop: 50,
  },
  text: {
    textAlign: 'center',
    fontSize: 27,
    marginBottom: 20,
    marginLeft: 5,
    marginTop: 7,
  },
});

export default MainScreen;
