import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as firebase from "firebase";
import db from "../config";

export default class ExchangeScreen extends Component {
  state = {
    name: "",
    description: "",
    uid: firebase.auth().currentUser.email,
  };
  addItem = (name, description) => {
    db.collection("requestedItems")
      .add({
        itemName: name,
        itemDescription: description,
      })
      .then(() => {
        Alert.alert("Item Has Been Requested");
        this.setState({
          name: "",
          description: "",
        });
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <MaterialIcons
          style={styles.icon}
          name="add-circle-outline"
          size={150}
          color="#2d4059"
        />
        <TextInput
          style={styles.form}
          placeholder="Item Name"
          onChangeText={(text) => this.setState({ name: text })}
          value={this.state.name}
        />
        <TextInput
          style={styles.form}
          placeholder="Description"
          onChangeText={(text) => this.setState({ description: text })}
          value={this.state.description}
        />
        <TouchableOpacity
          onPress={() => this.addItem(this.state.name, this.state.description)}
          style={styles.addButton}
        >
          <MaterialIcons name="add" size={17} color="#e5e5e5" />
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    bottom: 50,
  },
  form: {
    borderWidth: 0.7,
    borderRadius: 10,
    borderColor: "#2d4059",
    color: "#2d4059",
    width: "75%",
    marginBottom: 20,
    height: 50,
    paddingLeft: 7,
  },
  addButton: {
    backgroundColor: "#2d4059",
    width: "75%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 7,
  },
  buttonText: {
    color: "#e5e5e5",
    fontSize: 17,
  },
});
