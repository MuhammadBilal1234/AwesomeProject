import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Input, Button } from "react-native-elements";

import axios from "axios";

const SignUpSup = (props) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cnic, setcnic] = useState("");
  const [phone, setphone] = useState("");

  const submithandler = () => {
    axios
      .post(
        `http://10.0.2.2:3000/user/?name=${name}&email=${email}&password=${password}&cnic=${cnic}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuTop}>
        <TouchableOpacity
          style={styles.m1}
          onPress={() => props.navigation.navigate("SignUp")}
        >
          <Text style={styles.menuText}>As Citizen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.m2}
          onPress={() => props.navigation.navigate("SignUpSup")}
        >
          <Text style={styles.menuText}>As Supervisor</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>Create Your Account</Text>

      <Input
        label="Name"
        value={name}
        onChangeText={(text) => setname(text)}
        style={styles.input}
      />

      <Input
        label="Worker Id"
        value={email}
        onChangeText={(text) => setemail(text)}
        style={styles.input}
      />

      <Input
        label="Password"
        value={password}
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(text) => setpassword(text)}
      />

      <Input
        label="Cnic"
        style={styles.input}
        value={cnic}
        onChangeText={(text) => setcnic(text)}
      />

      <Input
        label="Contact Number"
        style={styles.input}
        value={phone}
        onChangeText={(text) => setphone(text)}
      />

      <Button
        buttonStyle={styles.btn}
        mode="Solid"
        title=" Sign Up!"
        titlestyle={{ color: "red" }}
        onPress={submithandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  btn: {
    marginLeft: 100,
    backgroundColor: "grey",
    width: 200,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
  },
  heading: {
    height: 50,
    fontSize: 28,
    paddingLeft: 77,
    paddingTop: 10,
    marginTop: 19,
  },
  menuTop: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10,
  },
});

export default SignUpSup;
