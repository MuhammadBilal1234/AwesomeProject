import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Input, Button, CheckBox} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RadioButtonRN from 'radio-buttons-react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import MultiSelect from 'react-native-multiple-select';
import IP from '../IP';

const AddStaff = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [selectbranch, setselectbranch] = useState('');
  const [type, settype] = useState('Public');
  const [branch, setbranch] = useState([]);
  const [sbranch, setsbranch] = useState([]);
  const [checked, setchecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://${IP}:3000/user/allbranch`);
      res.data = res.data.map(obj => ({...obj, checked: true}));

      setbranch(res.data);
    };
    fetchData();
  }, []);

  const data = [
    {
      label: 'Supervisor',
    },
    {
      label: 'Senior',
    },
  ];

  const onSubmitHandler = async () => {
    // console.log(type);
    const user = await axios.post(
      `http://${IP}:3000/user/?name=${username}&password=${password}&role=${type}`,
    );
    console.log(user.data);
    {
      type === 'Supervisor'
        ? axios.post(
            `http://${IP}:3000/user/addsupervisor/?branch=${selectbranch}&id=${user.data._id}`,
          )
        : null;
    }
    {
      type === 'Senior'
        ? axios.post(
            `http://${IP}:3000/user/addsenior/?branch=${sbranch}&id=${user.data._id}`,
          )
        : null;
    }
  };

  const onSelectedItemsChange = items => {
    setsbranch(items);
  };

  return (
    <ScrollView>
      <Text style={styles.heading}>Create New Account</Text>
      <View style={styles.container}>
        <Input
          label="Username"
          value={username}
          onChangeText={text => setusername(text)}
          style={styles.input}
        />
        <Input
          label="Password"
          value={password}
          onChangeText={text => setpassword(text)}
          style={styles.input}
        />

        {type === 'Supervisor' ? (
          <View style={styles.dd}>
            <Text style={{fontSize: 18}}>Select Branch</Text>
            <ModalDropdown
              options={branch.map(branch => branch.name)}
              onSelect={(index, value) => setselectbranch(value)}
            />
          </View>
        ) : null}

        {type === 'Senior' ? (
          <MultiSelect
            items={branch}
            uniqueKey={branch._id}
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={sbranch}
            submitButtonText="Submit"
            submitButtonColor="#CCC"
            selectText="Select Offices"
          />
        ) : null}
        <RadioButtonRN
          data={data}
          selectedBtn={e => settype(e.label)}
          style={styles.rd}
        />

        <Button
          buttonStyle={styles.btn}
          mode="Solid"
          title="Create Account"
          titlestyle={{color: 'red'}}
          onPress={onSubmitHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
  },
  dd: {
    marginLeft: 100,
    marginTop: 20,
    width: 150,
    backgroundColor: 'white',
    paddingLeft: 30,
  },
  rd: {
    width: 150,
    marginLeft: 100,
  },
  btn: {
    marginLeft: 70,
    marginTop: 20,
    backgroundColor: 'grey',
    width: 200,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
  },
  heading: {
    marginTop: 30,
    height: 50,
    fontSize: 28,
    paddingLeft: 60,
    paddingTop: 10,
  },
  menuTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 25,
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
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10,
  },
});

export default AddStaff;
