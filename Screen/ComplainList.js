import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import ComplainStatus from './ComplainStatus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import IP from './IP';

const ComplainList = ({navigation}) => {
  const renderItem = ({item}) => <ComplainStatus data={item} nav={navigation} />;
  const [Data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const authToken = await AsyncStorage.getItem('@token');

      const res = await axios(
        `http://${IP}:3000/user/usercomplain?token=${authToken}`,
      );
      setData(res.data);
      console.log(res.data);
    };
    fetchData();
  }, []);
  return (
    <View>
      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={item => item.imageName}
      />
    </View>
  );
};

export default ComplainList;
