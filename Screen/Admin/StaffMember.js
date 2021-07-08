import * as React from 'react';
import {Avatar, Button, Card, Title, Paragraph, FAB} from 'react-native-paper';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import IP from '../IP';
const StaffMember = props => {
  const [branch, setbranch] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://${IP}:3000/user/staffbranch?id=${props.data._id}`,
      );
      console.log(res.data);
      setbranch(res.data);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{props.data.name}</Text>
      <Text style={styles.role}>{props.data.role}</Text>
      <Text style={styles.branch}>Branch Name</Text>
      {branch.map(branch => (
        <Text style={styles.branchname}>{branch.name}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    backgroundColor: 'grey',
    borderWidth: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    marginBottom: 10,
  },
  name: {
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
  },
  role: {
    color: 'white',
    textAlign: 'center',
  },
  branch: {
    fontSize: 20,
    color: 'white',
  },
  branchname: {
    fontSize: 15,
    color: 'white',
    paddingLeft: 20,
  },
});

export default StaffMember;
