import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  View,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "./redux/store";
import { useEffect, useState } from "react";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function UserProfile() {


  const profileItem = useAppSelector((state)=> state.reduxPersistedReducer.profileSlice.profileItem)
  // const orderMessage = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `http://192.168.1.12:3004/api/orders/${profileItem.uid}`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${profileItem.accessToken}`,
          },
        });
        console.log('Response:', response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error (e.g., log it)
          console.log('Resource not found:', error.response.data);
        } else {
          // Handle other errors
          console.error('Error:', error);
        }
      }
    };
    fetchData();
  }, []);

  const navigation = useNavigation();
  return (
    <LinearGradient colors={["white", "#91C8E4"]} style={styles.linearGradient}>
      <View style={styles.container}>
        <View style={styles.circle}>
        <Icon name="account" size={80} color="#4682A9"/>
        </View>

        <View className="bg-white w-3/4 rounded-xl my-10 py-2">
          <Text className="text-black text-center text-xl">{profileItem.username}</Text>
        </View>

        <View>
          <Text style={{ textAlign: 'center', color: 'white' }}>uid: {profileItem.uid}</Text>
        </View>

        <View>
          <Text style={{ textAlign: 'center', color: 'white', paddingTop: 30 }}>
            Recent Order:
            {"\n"}
            "You don't have any order right now!"
            {/* oid1 */}
            {"\n"}
            {/* oid2 */}
          </Text>
        </View>
      </View>

      <View className="flex-1 items-center justify-center">
        <TouchableOpacity
          className="bg-red-500 rounded p-3"
          onPress={() => navigation.navigate("Login")}
        >
          <Text className="text-white">Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center">
        <TouchableOpacity
          className="bg-slate-500 rounded p-3"
          onPress={() => navigation.navigate("Branch")}
        >
          <Text className="text-white">Go To Branch Page</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
        width: 270,
        height: 500,  
        borderRadius: 5,  
        justifyContent: 'center',
        backgroundColor: '#749BC2',
        marginTop: 110,
        padding: 20
  },
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: "100%",
    width: "100%",
  },
  textbox: {
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 0,
    padding:20,
    width: 210,
    height: 30,
    borderRadius: 4,

  },
  button: {
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 5,
    width: 50,
    height: 20,
    borderRadius: 4,
  },
  create_acc: {
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#749BC2",
    margin: 5,
    width: 150,
    height: 20,
    borderRadius: 4,
  },
  text_create_acc: {
    color: "#FFFFFF",
  },
  setrow: {
    flexDirection: "row",
    marginTop: 10,
  },
  setcol: {
    // flexDirection: "col",
    marginTop: 20,
  },
  header: {
    color: "#FFFFFF",
    alignItems: "center",
    fontWeight: "bold",
    // fontSize: 20,
    marginBottom: 10,
    fontSize: 40,
    // fontFamili: "Noto Sans",
  },
  text_button: {
    color: "#749BC2",
    fontWeight: "bold",
    alignItems: "center",
  },
  circle: {
    width: 100,
    height: 100,
    backgroundColor: "#91C8E4",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  userIcon: {
    // fontSize: 40,
    color: "#4682A9",
  },
});
