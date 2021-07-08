import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const SeniorScreen = props => {
  return (
    <View>
      <Text style={styles.heading}>Home Screen</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('UnresolvedComplinList')}>
        <Image
          source={require('../../assets/complainsenior.jpg')}
          style={styles.img}
        />
        <Text style={styles.text}>UNRESOLVED COMPLAINS</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Summary')}>
        <Image source={require('../../assets/report.png')} style={styles.img} />
        <Text style={styles.text}>SUMMARY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    paddingLeft: 105,
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

export default SeniorScreen;
