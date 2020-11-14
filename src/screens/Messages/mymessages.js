import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios'
import Questions from '../../components/Question'
const logo = require('../../assets/logo.png')
import styles from './styles'

export default function MyMessages({ route, navigation }) {

    const { userId } = route.params;
    console.log('UserId: ' + userId)

    const [messages, setMessages] = useState()
    const back = require('../../assets/back.png')
    
    useEffect(() => {
      loadMyMessages()
    }, [])

    function loadMyMessages() {
      axios.get(`http://162.241.90.38:7003/v1/usuario/${userId}/mensagem`)
      .then(function (response) {
        setMessages(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
          <TouchableOpacity style={styles.header} onPress={()=>navigation.navigate('Home')}>
            <Image source={back} />
          </TouchableOpacity>

          <View style={{width: '50%', alignItems: 'flex-end', marginRight: 20}}>
            <Image source={logo} style={{width: 45, height: 40, }}/>
          </View>
        </View>

        <View>
          <Text style={styles.title}>Minhas Mensagens</Text>
        </View>

        <View style={{ marginTop: 10, marginHorizontal: 20, paddingBottom: '28%'}}>
          <FlatList 
            showsVerticalScrollIndicator={false}
            data={messages}
            renderItem={({item}) => <Questions item={item}/>}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </SafeAreaView>
    );
}