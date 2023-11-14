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
  import { ScrollView } from "react-native";
  import NavBar from "./component/navBar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AppDispatch, useAppSelector } from "./redux/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { BranchItem, ProfileItem} from "../interfaces";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { selectBranch } from "./redux/features/profileSlice";


  

  export default function Branch() {

    const navigation = useNavigation()
    const profileItem = useAppSelector((state)=> state.reduxPersistedReducer.profileSlice.profileItem)
    const [branches, setBranches] = useState<BranchItem []>([]);

    const dispatch = useDispatch<AppDispatch>()
    


    useEffect(() => {
      const fetchData = async () => {
        try {
          const apiUrl = 'http://192.168.1.12:3004/api/branches'; // Replace with your actual API endpoint
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${profileItem.accessToken}`,
            },
          });
          setBranches(response.data.branches);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData();
    }, []);

    const BranchCard = ({ branchName, branchId }: { branchName: string, branchId: string }) => {
      

      const handleBranch = () => {
        const item:ProfileItem = {
          accessToken: profileItem.accessToken,
          username: profileItem.username,
          uid: profileItem.uid,
          selectedBranchId: branchId
      } 
        console.log(item.selectedBranchId)
        dispatch(selectBranch(item))
        console.log(profileItem.selectedBranchId)
        navigation.navigate("Machine")
      };
    
        

      
      

      return (
        <TouchableOpacity onPress={handleBranch}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Icon name="washing-machine" size={120} color="white" />
          </View>
          <Text style={[styles.description, styles.topLeft, styles.branchName]}>{branchName}</Text>
          {/* <Text style={[styles.description, styles.bottomLeft, styles.numberOfMachines]}>{numberOfMachines}</Text> */}
        </View>
        </TouchableOpacity>
      );
    }

      return (
        <ScrollView style={{backgroundColor:"white"}}>
        <NavBar/>
          <View style={[styles.whiteBox , { marginTop: 55 }]}>


      {branches.map(branch => (
        <BranchCard branchName={`สาขา${branch.name}`} branchId={branch.id} />
      ))}
    </View>
   
      </ScrollView>
      )
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
        // flexDirection: "col",
        marginTop: 20,
      },
      header: {
        color: "#FFFFFF",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
        // fontSize: 40,
        fontFamiliy: "Noto Sans",
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
      pageContainer: {
          flex: 1,
        },
        greyBackground: {
          flex: 1,
          backgroundColor: '#ccc',
          
        },
        whiteBox: {
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 16,
          marginBottom: 16,
        },
        boxText: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333', // Adjust the color as needed
        },
        card: {
          backgroundColor: '#91C8E4',
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 5,
          margin: 12,
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          position: 'relative',
          height: 150
        },
        iconContainer: {
          position: 'absolute',
          bottom: 5,
          right: 5,
          flexDirection: 'row',
        },
        description: {
          fontSize: 16,
          color: 'black',
          fontWeight: '500',
          alignSelf: 'center',
          position: 'absolute',
          
        },
        topLeft: {
          top: 5,
          left: 15,
        },
        bottomLeft: {
          bottom: 5,
          left: 15,
        },
        branchName: {
          color: '#00264B',
          fontSize: 22,
          fontWeight: "bold"
        },
        numberOfMachines: {
          color: 'white', 
          fontSize: 55
        },
      });

function dispatch(arg0: ProfileItem) {
  throw new Error("Function not implemented.");
}
    