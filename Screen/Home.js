import React from 'react';
import {Button} from 'react-native-elements';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/img.jpg')}
        style={styles.image}
        imageStyle={{opacity: 0.4}}>
        <Text style={styles.Heading}> Muncipal Watch</Text>
        <View style={styles.box}>
          <Button
            title="Sign In"
            style={styles.btn}
            type="solid"
            onPress={() => navigation.push('SignIn')}
          />
          <Text></Text>
          <Button
            title="Sign Up"
            type="solid"
            onPress={() => navigation.push('SignUp')}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  box: {
    width: 150,
    marginLeft: 130,
  },
  btn: {
    paddingTop: 55,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  Heading: {
    color: 'black',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 50,
  },
});

export default Home;
