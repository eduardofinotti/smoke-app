 import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from 'axios'

const ok = require('../../assets/ok.png')

import styles from './styles'

export default function Login({ navigation }) {

  const [ user, setUser ] = useState('')

  async function goToHome(){

    axios.post('http://162.241.90.38:7003/v1/usuario', 
      {
        "nick": user,
        "avatarUrl": "https://cdn.pixabay.com/photo/2016/03/31/20/27/avatar-1295773_960_720.png"
      }
    )
    .then(async function (response) {

      console.log(response.data.nick + ' - ' + response.data.id)

      await AsyncStorage.setItem('@user', response.data.nick)
      await AsyncStorage.setItem('@user_id', String(response.data.id))
      navigation.navigate('Home')
    })
    .catch(function (error) {
      console.log(error);
    });

  }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.nickContainer}>
          <Text style={styles.nickTitle}>escolha um apelido:</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.nickInput} 
            placeholder='ex: jonny bravo'
            placeholderTextColor='#2E6B93'  
            onChangeText={(text => {setUser(text)})}
            value={user}
          />
        </View>

        <View style={styles.readyContainer} >
          <TouchableOpacity onPress={goToHome}>
            <Image source={ok}></Image>
          </TouchableOpacity>
        </View>
        

      </SafeAreaView>
    );
}