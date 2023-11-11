import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Button } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient';
export default function Register() {
  return (
    <LinearGradient colors={['#91C8E4', 'white' ]} style={styles.linearGradient}>
        <View style={styles.container}>
            <StatusBar style='light' />
            <View>
                <Text Text style={styles.header}>
                    Register
                </Text>
            </View>

            <View style={styles.setcol}>
                <View style={styles.textbox}>
                    <TextInput placeholder='Username' placeholderTextColor={'gray'}></TextInput>
                </View>

                <View style={styles.textbox}>
                    <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry></TextInput>
                </View>

                <View style={styles.textbox}>
                    <TextInput placeholder='Confirm Password' placeholderTextColor={'gray'} secureTextEntry></TextInput>
                </View>
            </View>

            <View>
                <View style={styles.button}>
                    <TouchableOpacity >
                        <Text style={styles.text_button}>Create an account</Text>
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
        alignItems: 'center',
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
        alignItems: 'left',
        padding: 3,
        backgroundColor: '#FFFFFF',
        margin: 10,
        width: 210,
        height: 30,
        borderRadius: 4,
        fontSize: 100,
        fontFamili: 'Noto Sans'
        
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
        flexDirection: 'col',
        marginTop: 20
    },
    header: {
        color: '#FFFFFF',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        fontSize: 40,
        fontFamili: 'Noto Sans'
    },
    text_button: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        alignItems: 'center'
    }
  });