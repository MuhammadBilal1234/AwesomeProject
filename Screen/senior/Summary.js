import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-paper';
import DatePicker from '@dietime/react-native-date-picker';
import {Divider} from 'react-native-elements';
import {Table, Row, Rows} from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import IP from '../IP';

const Summary = () => {
  const [startdate, setstartDate] = useState();
  const [enddate, setendDate] = useState();
  const [startshow, setstartshow] = useState(false);
  const [endshow, setendshow] = useState(false);

  const [tableHead, settableHead] = useState([
    'Branch',
    'Note',
    'Date',
    'Status',
  ]);

  const [tableData, setTableData] = useState([]);

  function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  const handlesubmit = async () => {
    let authToken = await AsyncStorage.getItem('@token');
    const res = await axios.get(
      `http://${IP}:3000/user/daterange/?sdate=${startdate}&edate=${enddate}&token=${authToken}`,
    );
    // ['branch' , 'note' , 'date' , 'status']
    let data = [];

    console.log(res.data.length);

    for (let i = 0; i < res.data.length; i++) {
      //console.log(res.data[i].date);
      const branchname = res.data[i].BranchId[0].name;
      const note = res.data[i].message;
      const date = new Date(res.data[i].date.toString()).toDateString();

      const status = res.data[i].status;
      const arr = [branchname, note, date, status];
      data.push(arr);
    }
    console.log(data);
    setTableData(data);
  };

  return (
    <>
      <Text style={styles.sdate}>Starting Date </Text>
      <Text style={styles.sdatepicker}>
        {startdate ? startdate.toDateString() : 'Select date'}
      </Text>
      {startshow ? (
        <DatePicker
          value={startdate}
          onChange={value => setstartDate(value)}
          format="yyyy-mm-dd"
        />
      ) : null}
      <Button onPress={() => setstartshow(!startshow)}>
        <Text>Add Date</Text>
      </Button>
      <Divider orientation="horizontal" style={{marginTop: 14}} />

      <Text style={styles.sdate}>Ending Date </Text>
      <Text style={styles.sdatepicker}>
        {enddate ? enddate.toDateString() : 'Select date'}
      </Text>
      {endshow ? (
        <DatePicker
          value={enddate}
          onChange={value => setendDate(value)}
          format="yyyy-mm-dd"
        />
      ) : null}
      <Button onPress={() => setendshow(!endshow)}>
        <Text>Add Date</Text>
      </Button>
      <Divider orientation="horizontal" style={{marginTop: 14}} />

      <Button
        style={styles.btn}
        mode="contained"
        color="green"
        onPress={handlesubmit}>
        <Text>Submit</Text>
      </Button>
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableData} textStyle={styles.text} />
        </Table>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sdate: {
    marginTop: 20,
    fontSize: 19,
    paddingLeft: 15,
  },
  sdatepicker: {
    fontSize: 17,
    textAlign: 'center',
  },
  btn: {
    color: 'green',
    marginTop: 10,
  },
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
});

export default Summary;
