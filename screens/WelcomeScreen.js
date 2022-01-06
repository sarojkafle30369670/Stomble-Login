import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button, Avatar } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import { auth, db } from "../firebase";

const WelcomeScreen = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL,
            }}
          />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 30,
          }}
          onPress={signOut}
        >
          <Entypo name="log-out" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigation.replace("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const subscriber = db
      .collection(auth.currentUser.uid)
      .onSnapshot((querySnapshot) => {
        const users = [];

        querySnapshot.forEach((documentSnapshot) => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Button
        title="Add Contact"
        onPress={() => navigation.navigate("Contact")}
        style={styles.button}
      />
      <View
        style={{
          flex: 5,
          justifyContent: "fill",
          alignItems: "left",
          marginTop: "2%",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{ width: 170, border: "solid line", backgroundColor: "red" }}
          >
            <Text style={{ color: "white" }}>Name</Text>
          </View>
          <View
            style={{ width: 170, border: "solid line", backgroundColor: "red" }}
          >
            <Text style={{ color: "white" }}>Photo</Text>
          </View>
          <View
            style={{ width: 170, border: "solid line", backgroundColor: "red" }}
          >
            <Text style={{ color: "white" }}>Email</Text>
          </View>
          <View
            style={{ width: 170, border: "solid line", backgroundColor: "red" }}
          >
            <Text style={{ color: "white" }}>Phone</Text>
          </View>
        </View>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 170,
                  border: "solid line",
                  backgroundColor: "yellow",
                }}
              >
                <Text>{item.name}</Text>
              </View>
              <View
                style={{
                  width: 170,
                  border: "solid line",
                  backgroundColor: "yellow",
                }}
              >
                <Text>{item.photo}</Text>
              </View>
              <View
                style={{
                  width: 170,
                  border: "solid line",
                  backgroundColor: "yellow",
                }}
              >
                <Text>{item.email}</Text>
              </View>
              <View
                style={{
                  width: 170,
                  border: "solid line",
                  backgroundColor: "yellow",
                }}
              >
                <Text>{item.phone}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );

  // ...
};
export default WelcomeScreen;
const styles = StyleSheet.create({
  button: {
    width: 150,
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    padding: 10,
  },
});
