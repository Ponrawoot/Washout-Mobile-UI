import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View,
  Modal,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native";
import NavBar from "./component/navBar";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppSelector } from "./redux/store";
import axios from "axios";
import { MachineItem } from "../interfaces";

export default function Machine() {

  const [selectedCard, setSelectedCard] = useState({number:'',type:'',id:''});
  const profileItem = useAppSelector((state)=> state.reduxPersistedReducer.profileSlice.profileItem)
  const [machines, setMachines] = useState<MachineItem []>([]);


    const startMachine = async () => {
  
      // POST start machine 10.0.0.2
        try {
          const response = await axios.post(
            'http://192.168.1.12:3004/api/machines/start',
            {
              machineId: selectedCard.id,
              userId: profileItem.uid,
            },
            {
              headers: {
                Authorization: `Bearer ${profileItem.accessToken}`,
              },
            }
          );
            console.log("test", selectedCard.id)
    
            // Check if the login was successful based on the response status
            if (response.status === 200) {
                console.log('Start machine successful');
                console.log(response.data);
            } else {
              
                console.error('Start machine failed:', response.data.error);
            
            }
        } catch (error) {
    
            console.error('Error during start machine:', error);
    
        }
    
      // GET machine
      try {
        const apiUrl = `http://192.168.1.12:3004/api/machines/branchId/${profileItem.selectedBranchId}`; // Replace with your actual API endpoint
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${profileItem.accessToken}`,
          },
        });
        setMachines(response.data.machines);
        console.log(response.data)
        console.log(profileItem.selectedBranchId)
      } catch (error) {
        console.error('Error:', error);
      }
      closeModal()
    }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `http://192.168.1.12:3004/api/machines/branchId/${profileItem.selectedBranchId}`; // Replace with your actual API endpoint
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${profileItem.accessToken}`,
          },
        });
        setMachines(response.data.machines);
        // console.log(response.data)
        // console.log(profileItem.selectedBranchId)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);


  const WashingMachineCard = ({
    machineNumber,
    Type,
    status,
    machineId
    
  }: {
    status: string,
    machineNumber: string;
    Type: string,
    machineId: string
  }) => {

    

    const handlePress = () => {
      console.log()
      if (status === "available" && selectedCard.number===machineNumber && selectedCard.type=== Type) {
        // setSelectedCard({number:machineNumber,type:Type,id:machineId});
        openModal()
      }
      else if (status === "available") {
        setSelectedCard({number:machineNumber,type:Type,id:machineId});
      }
    };

    const cardStyle = {
      ...styles.card,
      backgroundColor:
        selectedCard.number === machineNumber && selectedCard.type === Type && selectedCard.id === machineId
          ? "#FFA0A0"
          : status === "working" || status === "finished"
          ? "#D9D9D9"
          : "#91C8E4",
    };

    return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={styles.cardContainer}
        disabled={status === "working" || status === "finished"}
      >
        <View style={cardStyle}>
          <View style={styles.iconContainer}>
            <Icon name="washing-machine" size={80} color="white" />
            <Text style={styles.number}>{machineNumber}</Text>
          </View>
          <Text style={styles.description}>{status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCard({number:'',type:'',id:''})
    setModalVisible(false);
  };

  // const numberOf7KgType = machines.filter(machine => machine.machineType === '7 kg').length;
  // const numberOf16KgType = machines.filter(machine => machine.machineType === '16 kg').length;
  // const numberOf20KgType = machines.filter(machine => machine.machineType === '20 kg').length;

  const filtered7KgTypeMachines = machines.filter(machine => machine.machineType === '7 kg');
  const filtered16KgTypeMachines = machines.filter(machine => machine.machineType === '16 kg');
  const filtered20KgTypeMachines = machines.filter(machine => machine.machineType === '20 kg');
  const numberOf7KgType = filtered7KgTypeMachines.length;
  const numberOf16KgType = filtered16KgTypeMachines.length;
  const numberOf20KgType = filtered20KgTypeMachines.length;
  
  return (
    <ScrollView style={styles.greyBackground}>
      <View style={styles.greyBackground}></View>
      <NavBar/>
      <View style={{marginBottom: 60}}></View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalOverlay}></View>
          <View style={styles.modalView}>
            <Pressable
              style={styles.closeIcon}
              onPress={() => closeModal()}
            >
              <Icon name="close" size={25} color="#FFFF" style={styles.closeIcon}/>
            </Pressable>
            <Text style={styles.modalText}>Selected machine: Number {selectedCard.number}</Text>
            <Text style={styles.modalText}>Machine type: {selectedCard.type}</Text>
            <Text style={styles.modalText}>Machine id: {selectedCard.id}</Text>

            <View style={{ alignItems: "center" , marginTop: 200}}>
              <TouchableOpacity style={styles.button} onPress={startMachine}>
          <Text style={{ color:"white", fontWeight:"bold"}}>Use</Text>
          </TouchableOpacity>
          </View>
        </View>
        </View>
      </Modal>
      <View style={[styles.whiteBox]}>
        <Text style={styles.boxText}>7kg</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {filtered7KgTypeMachines.map((machine, index) => (
            <WashingMachineCard machineNumber={(numberOf7KgType+index).toString()} Type={machine.machineType} key={machine.id} status={machine.status} machineId={machine.id} />
        ))}
        </View>
      </View>

      <View style={styles.whiteBox}>
        <Text style={styles.boxText}>16kg</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {filtered16KgTypeMachines.map((machine, index) => (
            <WashingMachineCard machineNumber={(numberOf16KgType+index).toString()} Type={machine.machineType} key={machine.id} status={machine.status} machineId={machine.id}/>
        ))}
        </View>
      </View>

      <View style={styles.whiteBox}>
        <Text style={styles.boxText}>20kg</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {filtered20KgTypeMachines.map((machine, index) => (
            <WashingMachineCard machineNumber={(numberOf20KgType+index).toString()} Type={machine.machineType} key={machine.id} status={machine.status} machineId={machine.id}/>
        ))}
        </View>
      </View>
    </ScrollView>
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
    backgroundColor: '#85B4E2',
    padding: 10,
    borderRadius: 10,
    width: 180,
    alignItems: "center"
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
  header: {
    color: "#FFFFFF",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
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
  pageContainer: {
    flex: 1,
  },
  greyBackground: {
    flex: 1,
    backgroundColor: "#ccc", 
  },
  whiteBox: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 8,
    paddingBottom: 15,
    marginHorizontal: 8,
    marginBottom: 16,
    justifyContent: "space-between", 
  },
  boxText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardContainer: {
    width: "21%",
    marginBottom: 2,
    margin: 7,
    
  },
  card: {
    backgroundColor: "#91C8E4",
    borderRadius: 10,
    paddingVertical: 15,
    // paddingHorizontal: 5,
    elevation: 3, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  iconContainer: {
    flexDirection: "row",
    
  },
  number: {
    fontSize: 15,
    fontWeight: "bold",
    right: 28,
    top: 8
  
  },
  description: {
    fontSize: 12,
    color: "black",
    fontWeight: "500",
    alignSelf: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 400,
    width: 300,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 10,
    fontSize: 15,
  },
  closeIcon: {
    position: "absolute",
    top: -12,
    right: -8,
    padding: 10,
    zIndex: 1,
    backgroundColor: "#FF7474",
    borderRadius: 30,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
