import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Register() {

    const navigation = useNavigation()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleRegister = async () => {
        if (password !== confirmPassword ) {
            Alert.alert('Error', 'Passwords do not match.');
        } else if (username === "" || password === "") {
            Alert.alert('Error', 'Fill in every blank.');
        } else
     
        try {
            const response = await axios.post('http://192.168.1.12:3004/api/register', {
                username: username,
                password: password,
                deviceToken: ""
            });
    
            if (response.status === 200) {
                Alert.alert('Register successful');
                navigation.navigate('Login');
            } else {
           
                Alert.alert('Register failed:', response.data.error);
                
            }
        } catch (error) {
         
            Alert.alert('Error during Register:', error);
        }
        }
    



  return (
    <LinearGradient colors={['#91C8E4', 'white' ]} style={styles.linearGradient}>
        <View style={styles.container}>
            <StatusBar style='light' />
            <View>
                <Text style={styles.header}>
                    Register
                </Text>
            </View>

            <View style={styles.setcol}>
                <View style={styles.textbox}>
                    <TextInput placeholder='Username' placeholderTextColor={'gray'} onChangeText={(text) => setUsername(text)}></TextInput>
                </View>

                <View style={styles.textbox}>
                    <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry
                    onChangeText={(text) => setPassword(text)}></TextInput>
                </View>

                <View style={styles.textbox}>
                    <TextInput placeholder='Confirm Password' placeholderTextColor={'gray'} secureTextEntry
                    onChangeText={(text) => setConfirmPassword(text)}></TextInput>
                </View>
            </View>

            <View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={handleRegister}>
                        <Text style={styles.text_button}>Create an account</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    </LinearGradient>


  )
};
  

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
        // alignItems: 'left',
        padding: 3,
        backgroundColor: '#FFFFFF',
        margin: 10,
        width: 210,
        height: 30,
        borderRadius: 4,
        fontSize: 100,
        fontFamily: 'Noto Sans'
        
    },
    button: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#4682A9',
        marginTop: 50,
        width: 150,
        height: 30,
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
        // flexDirection: 'col',
        marginTop: 20
    },
    header: {
        color: '#FFFFFF',
        alignItems: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 30,
    },
    text_button: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        alignItems: 'center'
    }
  });