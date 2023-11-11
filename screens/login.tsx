import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Button } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function Login() {

  const navigation = useNavigation()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'test' && password === '1234') {
      // Username and password are correct, navigate to UserProfile
      navigation.navigate('UserProfile');
    }
  }

  return (
    <LinearGradient colors={['white', '#91C8E4' ]} style={styles.linearGradient}>
        <View style={styles.container}>
            <StatusBar style='light' />
            <View>
                <Text style={styles.header}>
                    Login
                </Text>
            </View>

            <View>
                <Image source={require('./img/LOGO.png')}></Image>
            </View>

            <View style={styles.setcol}>
                <View style={styles.textbox}>
                    <TextInput placeholder='Username' placeholderTextColor={'gray'}
                    value={username} onChangeText={(text) => setUsername(text)}></TextInput>
                </View>

                <View style={styles.textbox}>
                    <TextInput placeholder='Password' placeholderTextColor={'gray'} 
                    value={password} secureTextEntry onChangeText={(text) => setPassword(text)}></TextInput>
                </View>
            </View>

            <View style={styles.setrow}>
                <View style={styles.button}>
                    <TouchableOpacity >
                        <Text style={styles.text_button} onPress={handleLogin}>Log In</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.create_acc}>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.text_create_acc}>Create an account</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    </LinearGradient>


  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 270,
        height: 500,  
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: '#749BC2'
    },
    linearGradient:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        height: '100%',
        width: '100%',
    },
    textbox: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        margin: 5,
        width: 210,
        height: 20,
        borderRadius: 4
    },
    button: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        margin: 5,
        width: 50,
        height: 20,
        borderRadius: 4
    },    
    create_acc: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#749BC2',
        margin: 5,
        width: 150,
        height: 20,
        borderRadius: 4
    },
    text_create_acc: {
        color: '#FFFFFF'
    },
    setrow: {
        flexDirection: 'row',
        marginTop: 10
    },
    setcol: {
        flexDirection: 'col',
        marginTop: 20
    },
    header: {
        color: '#FFFFFF',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10
    },
    text_button: {
        color: '#749BC2',
        fontWeight: 'bold',
        alignItems: 'center'
    }
  });
