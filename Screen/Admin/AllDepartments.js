import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {List} from 'react-native-paper';
import axios from 'axios';
import IP from '../IP';

const AllDepartments = ({navigation}) => {
  const [departments, setdepartments] = useState([]);
  const [branch, setbranch] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://${IP}:3000/user/allbranchpop`);
      const dept = await axios.get(`http://${IP}:3000/user/getdept`);
      setbranch(res.data);
      setdepartments(dept.data);
    };
    fetchData();
  }, []);

  return (
    <View>
      {departments.map(dept => (
        <List.Accordion title={dept.label}>
          {branch.map(branch =>
            branch.DeptId[0].label === dept.label ? (
              <List.Item
                title={branch.name}
                onPress={() =>
                  navigation.navigate('Department', {branchId: branch._id})
                }
                key={dept.label}
                style={{marginLeft: 15}}
              />
            ) : null,
          )}
        </List.Accordion>
      ))}
    </View>
  );
};

export default AllDepartments;
