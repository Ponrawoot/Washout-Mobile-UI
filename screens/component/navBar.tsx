import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NavBar() {

    const navigation = useNavigation()

    const navigateToProfile = () => {
        navigation.navigate('UserProfile');
      };  
  return (
    <View style={styles.container}>
      <View style={styles.box}>
      <TouchableOpacity style={styles.circle} onPress={navigateToProfile} >
        <Icon name="account" size={20} color="#4682A9" style={styles.userIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  box: {
    backgroundColor: '#749BC2',
    width: '100%',
    height: 50,
    justifyContent: 'center', // center the icon vertically
    alignItems: 'center', // center the icon horizontally
  },
  circle: {
    backgroundColor: '#FFFFFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
    alignSelf: 'flex-end',
    margin: 10
  },
  userIcon: {
    alignSelf:"center",
    marginTop: 3
  }
});
