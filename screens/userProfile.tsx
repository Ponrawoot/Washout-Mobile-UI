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
import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export default function UserProfile() {
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to send notifications has been denied.");
        return;
      }
    })();

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Test Notification",
        body: "Washout.",
      },
      trigger: null,
    });
  };

  const navigation = useNavigation();
  return (
    <LinearGradient colors={["white", "#91C8E4"]} style={styles.linearGradient}>
      <View style={styles.container}>
        <StatusBar style="light" />

        <View style={styles.circle}>
          <Text style={styles.userIcon}>U</Text>
        </View>

        <View className="bg-white w-3/4 rounded-xl my-2">
          <Text className="text-black text-center text-xl">Username</Text>
        </View>

        <View>
          <Text className="text-white">uid: xxxxxxxxxxx</Text>
        </View>

        <View>
          <Text className="text-white">
            Recent Order:
            {"\n"}
            oid1
            {"\n"}
            oid2
            {"\n"}
            oid3
          </Text>
        </View>
      </View>

      <View className="flex-1 items-center justify-center">
        <TouchableOpacity
          className="bg-red-500 rounded p-2"
          onPress={() => navigation.navigate("Login")}
        >
          <Text className="text-white">Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center">
        <TouchableOpacity
          className="bg-purple-500 rounded p-2"
          onPress={sendNotification}
        >
          <Text className="text-white">Mock Noti</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 270,
    height: 500,
    borderRadius: 5,
    justifyContent: "center",
    backgroundColor: "#749BC2",
    marginTop: 60,
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
    margin: 5,
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
    flexDirection: "col",
    marginTop: 20,
  },
  header: {
    color: "#FFFFFF",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    fontSize: 40,
    fontFamili: "Noto Sans",
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
    fontSize: 36,
    color: "#4682A9",
  },
});
