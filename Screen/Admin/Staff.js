import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import axios from 'axios';
import StaffMember from './StaffMember';
import IP from '../IP';
import {FAB} from 'react-native-paper';

const Staff = props => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://${IP}:3000/user/staff`);
      console.log(res.data);
      setdata(res.data);
    };
    fetchData();
  }, []);

  const renderItem = ({item}) => <StaffMember data={item} />;
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
      <FAB
        style={styles.fab}
        label="+"
        onPress={() => props.navigation.navigate('AddStaff')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Staff;
