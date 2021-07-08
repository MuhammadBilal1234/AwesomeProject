import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Button,
} from 'react-native';
import axios from 'axios';
import {Divider} from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import IP from '../IP';

const Department = ({route, navigation}) => {
  const [branch, setbranch] = useState(null);
  const [dept, setdept] = useState('');
  const [senior, setsenior] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [supdata, setsupdata] = useState([]);
  const [newsup, setnewsup] = useState('');
  const [modalVisiblesenior, setModalVisiblesenior] = useState(false);
  const [seniordata, setseniordata] = useState([]);
  const [newsenior, setnewsenior] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://${IP}:3000/user/searchbranch?id=${route.params.branchId}`,
      );
      setbranch(res.data);

      if (typeof res.data.SeniorId[0] != 'undefined') {
        setsenior(res.data.SeniorId[0].name);
      }
      if (typeof res.data.UserId[0] != 'undefined') {
        setdept(res.data.UserId[0].name);
      }
    };
    fetchData();
  }, []);

  const newdepartmenthead = async () => {
    setModalVisible(true);
    const res = await axios.get(`http://${IP}:3000/user/deph`);
    setsupdata(res.data);
  };
  const setnewsupervisor = async () => {
    try {
      const res = await axios.post(
        `http://${IP}:3000/user/newsup?id=${route.params.branchId}&name=${newsup}`,
      );
      console.log(res.data);
      setdept(newsup);
    } catch (error) {
      console.log(error);
    }
    setModalVisible(!modalVisible);
  };

  const setdeptsenior = async () => {
    try {
      const res = await axios.post(
        `http://${IP}:3000/user/newsenior?id=${route.params.branchId}&name=${newsenior}`,
      );
      console.log(res.data);
      setsenior(newsenior);
    } catch (error) {
      console.log(error);
    }
    setModalVisiblesenior(!modalVisiblesenior);
  };

  const newdeptSenior = async () => {
    setModalVisiblesenior(true);
    const res = await axios.get(`http://${IP}:3000/user/deptsenior`);
    setseniordata(res.data);
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Change Department Head</Text>

            <ModalDropdown
              style={styles.dd}
              options={supdata.map(sup => sup.name)}
              onSelect={(index, value) => setnewsup(value)}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={setnewsupervisor}>
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisiblesenior}
        onRequestClose={() => {
          setModalVisiblesenior(!modalVisiblesenior);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Change Department Manager</Text>

            <ModalDropdown
              style={styles.dd}
              options={seniordata.map(sup => sup.name)}
              onSelect={(index, value) => setnewsenior(value)}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={setdeptsenior}>
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Text style={styles.heading}>OFFICE DETAILS</Text>
      <Text style={styles.sub}>Branch Name</Text>
      <Divider orientation="horizontal" style={{marginTop: 14}} />
      <Text style={styles.bnh}>{branch != null ? branch.name : null}</Text>
      <Divider orientation="horizontal" style={{marginTop: 14}} />

      <TouchableOpacity onPress={newdepartmenthead}>
        <Text style={styles.dept}>Department Head</Text>
        <Text style={styles.deptname}>{dept ? dept : 'Not Assigned'}</Text>
      </TouchableOpacity>

      <Divider orientation="horizontal" style={{marginTop: 14}} />

      <TouchableOpacity onPress={newdeptSenior}>
        <Text style={styles.dept}>Department Head</Text>
        <Text style={styles.deptname}>{senior ? senior : 'Not Assigned'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    paddingLeft: 90,
    paddingTop: 14,
    height: 70,
    width: 1000,
    backgroundColor: 'green',
    color: 'white',
  },
  sub: {
    fontSize: 25,
    marginTop: 15,
    textAlign: 'center',
  },
  bnh: {
    fontSize: 25,
    marginTop: 15,
    marginRight: 10,
    textAlign: 'center',
  },
  dept: {
    marginTop: 60,
    fontSize: 25,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  deptname: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'green',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  dd: {
    fontSize: 30,
    marginBottom: 20,
  },
  ddHead: {
    fontSize: 20,
  },
});

export default Department;
