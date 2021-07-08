import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';

const NewRequests = ({data}) => {
  const [department, setDepartment] = useState('');
  const [branch, setbranch] = useState('');
  const [allDepartments, setallDepartments] = useState([]);
  const [cities, setcities] = useState([]);
  const [regions, setregions] = useState([]);
  const [allbranch, setallbranch] = useState([]);

  const [selectdept, setselectdept] = useState('');
  const [selectcity, setselectcity] = useState(null);
  const [selectregion, setselectregion] = useState('');
  const [selectbranch, setselectbranch] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      const dep = await axios(`http://192.168.10.4:3000/user/getDept`);
      const city = await axios(`http://192.168.10.4:3000/user/getcity`);
      setcities(city.data);
      setallDepartments(dep.data);
    };
    fetchData();
  }, []);
  const changePermission = async () => {
    const user = await axios.post(
      `http://192.168.10.4:3000/user/updateuser/?id=${data._id}&branch=${selectbranch}`,
    );
    console.log(user.data);
  };

  const getregion = async city => {
    const Region = await axios(
      `http://192.168.10.4:3000/user/getregion/?name=${city}`,
    );
    setregions(Region.data);
    setselectcity(city);
  };

  const getbranch = async region => {
    const Branch = await axios(
      `http://192.168.10.4:3000/user/regionbasedbranch/?name=${region}&dept=${selectdept}`,
    );
    setallbranch(Branch.data);
    console.log(Branch.data);
    setselectregion(region);
  };

  return (
    <Card style={styles.card}>
      <Card.Title>{data.name} </Card.Title>
      <Card.Title>{data._id} </Card.Title>
      <Card.Divider />


      <View style={styles.dd}>
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
          options={allDepartments.map(dept => dept.value)}
        />

        {selectcity ? (
          <View>
            <Text style={styles.ddHead}>Select Region</Text>
            <ModalDropdown
              style={styles.dd}
              onSelect={(index, value) => getbranch(value)}
              options={regions.map(region => region.name)}
            />
          </View>
        ) : null}
        {selectregion && selectdept ? (
          <View>
            <Text style={styles.ddHead}>Select Branch</Text>
            <ModalDropdown
              style={styles.dd}
              onSelect={(index, value) => setselectbranch(value)}
              options={allbranch.map(branch => branch._id)}
            />
          </View>
        ) : null}
      </View>
      <View>
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
            backgroundColor: 'green',
          }}
          title="Verify"
          onPress={changePermission}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 140,
  },
  dd: {
    marginBottom: 40,
  },
});

export default NewRequests;
