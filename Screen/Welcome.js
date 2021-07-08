import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  FAB,
} from "react-native-paper";

const Welcome = (props) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainHeading}>Muncipal Watch</Text>

      <View style={styles.menuTop}>
        <TouchableOpacity
          style={styles.m1}
          mode="contained"
          onPress={() => props.navigation.navigate("RegisterComplain")}
        >
          <Text style={styles.menuText}> Register Complain </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.m2}
          onPress={() => props.navigation.navigate("ComplainList")}
        >
          <Text style={styles.menuText}> Complain Status </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.detail}>
        {" "}
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis beatae
        sint ullam distinctio recusandae deleniti magni dolores vel hic et.{" "}
      </Text>

      <View style={styles.detail}>
        <Card>
          <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
          <Card.Content>
            <Title>New Constrcution Project in Rawalpindi</Title>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex vero
              id natus tenetur, aut recusandae itaque nesciunt. Aliquid,
              mollitia culpa.
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button>View More</Button>
          </Card.Actions>
        </Card>

        <Text> </Text>

        <Card>
          <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
          <Card.Content>
            <Title>New Constrcution Project in Rawalpindi</Title>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex vero
              id natus tenetur, aut recusandae itaque nesciunt. Aliquid,
              mollitia culpa.
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button>View More</Button>
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  mainHeading: {
    fontSize: 30,
    backgroundColor: "grey",
    height: 80,
    paddingTop: 18,
    paddingLeft: 90,
  },
  detail: {
    fontSize: 21,
    textAlign: "center",
    paddingTop: 35,
    paddingBottom: 15,
    margin: 5,
  },
  menuTop: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
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
    fontSize: 17,
    paddingTop: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Welcome;
