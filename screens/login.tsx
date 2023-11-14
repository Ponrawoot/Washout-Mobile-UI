import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Button, Alert } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import axios from 'axios';
import { login } from './redux/features/profileSlice';
import { ProfileItem } from '../interfaces';
import { useFonts } from 'expo-font';


export default function Login() {

  const fontsLoaded = useFonts({
    'NotoSans-Regular': require('./fonts/NotoSans-Regular.ttf'),
  }
  )

  const dispatch = useDispatch<AppDispatch>()

  const navigation = useNavigation()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://192.168.1.12:3004/api/login', {
            username: username,
            password: password,
        });

        // Check if the login was successful based on the response status
        if (response.status === 200) {
            console.log('Login successful');
            // console.log(response.data);

            const { access_token, user } = response.data;

            const item:ProfileItem = {
                accessToken: access_token,
                username: username,
                uid: user.uid
            }

            dispatch(login(item))
            setUsername('')
            setPassword('')
            navigation.navigate('Branch');
        } else {
          
            console.error('Login failed:', response.data.error);
        
        }
    } catch (error) {

        console.error('Error during login:', error);

    }
};

  return (
    <LinearGradient colors={['white', '#91C8E4' ]} style={styles.linearGradient}>
        <View style={styles.container}>
            <StatusBar style='light' />
            <View>
                <Text style={[styles.header]}>
                    Login
                </Text>
            </View>

            <View>
                <Image source={require('./img/LOGO.png')}></Image>
            </View>

            <View style={styles.setcol}>
                <View style={styles.textbox}>
                    <TextInput placeholder='Username' placeholderTextColor={'gray'} style={{ fontFamily:"NotoSans-Regular"}}
                    value={username} onChangeText={(text) => setUsername(text)}></TextInput>
                </View>
                <View style={styles.textbox}>
                    <TextInput placeholder='Password' placeholderTextColor={'gray'}  style={{ fontFamily:"NotoSans-Regular"}}
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
        // flexDirection: 'col',
        marginTop: 20
    },
    header: {
        color: '#FFFFFF',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        margin: 10
    },
    text_button: {
        color: '#749BC2',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: "NotoSans-Regular"
    }
  });
