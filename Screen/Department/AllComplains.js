import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import ComplainItem from './ComplainItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import IP from '../IP';

const AllComplains = props => {
  const renderItem = ({item}) => (
    <ComplainItem data={item} nav={props.navigation} />
  );
  const [Data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const authToken = await AsyncStorage.getItem('@token');

      const res = await axios.post(
        `http://${IP}:3000/user/complainmap?token=${authToken}`,
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
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default AllComplains;
