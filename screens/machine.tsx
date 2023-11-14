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

export default function Machine() {

  const [selectedCard, setSelectedCard] = useState({number:'',type:''});

  const startMachine = () => {
    // POST start machine
    // GET machine
    closeModal()
  }

  useEffect(() => {
    
    console.log("Selected card changed:", selectedCard);

  }, [selectedCard]);


  const WashingMachineCard = ({
    machineNumber,
    Type,
    status = "Available",
    
  }: {
    status: string,
    machineNumber: string;
    Type: string,
  }) => {

    

    const handlePress = () => {
      if (status === "Available" && selectedCard.number===machineNumber && selectedCard.type=== Type) {
        setSelectedCard({number:machineNumber,type:Type});
        openModal()
      }
      else if (status === "Available") {
        setSelectedCard({number:machineNumber,type:Type});
      }
    };

    const cardStyle = {
      ...styles.card,
      backgroundColor:
        selectedCard.number === machineNumber && selectedCard.type === Type 
          ? "#FFA0A0"
          : status === "Unavailable"
          ? "#D9D9D9"
          : "#91C8E4",
    };

    return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={styles.cardContainer}
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
  const [selectedCardData, setSelectedCardData] = useState({});

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
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
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Icon name="close" size={25} color="#FFFF" style={styles.closeIcon}/>
            </Pressable>
            <Text style={styles.modalText}>Selected machine: Number {selectedCard.number}</Text>
            <Text style={styles.modalText}>Machine type: {selectedCard.type}</Text>

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
          <WashingMachineCard machineNumber="1"  Type="7kg" status="Unavailable"/>
          <WashingMachineCard machineNumber="2"  Type="7kg" />
          <WashingMachineCard machineNumber="3"  Type="7kg" />
          <WashingMachineCard machineNumber="4"  Type="7kg" />
        </View>
      </View>

      <View style={styles.whiteBox}>
        <Text style={styles.boxText}>16kg</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <WashingMachineCard machineNumber="1" Type="16kg"/>
          <WashingMachineCard machineNumber="2" Type="16kg" />
          <WashingMachineCard machineNumber="3" Type="16kg" />
        </View>
      </View>

      <View style={styles.whiteBox}>
        <Text style={styles.boxText}>20kg</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <WashingMachineCard machineNumber="1" Type="20kg"/>
          <WashingMachineCard machineNumber="2" Type="20kg" />
          <WashingMachineCard machineNumber="3" Type="20kg" />
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
