import React, { useState, useEffect } from 'react';
import UserAvatar from '../../components/UserAvatar'
import { SafeAreaView, Text, View, TouchableOpacity, Image, StyleSheet, FlatList, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from 'axios'

const pen = require('../../assets/caneta.png')
const comentLogo = require('../../assets/comentarios.png')
const next = require('../../assets/next.png')
const back = require('../../assets/back.png')

const Details = ({ route, navigation }) => {

  const { item } = route.params;

  console.log(item.id)

  const [comentarios, setComentarios] = useState('')
  const [fetching, setFetching] = useState(false)
  
  const [userAvatar, setUserAvatar] = useState('https://cdn.pixabay.com/photo/2013/07/12/16/34/vampire-151178_960_720.png')

  useEffect(()=>{
    async function getComents() {

      var userAvatar = await AsyncStorage.getItem('@user_avatar')
      await setUserAvatar(userAvatar)

      console.log('avatar: ', userAvatar)

      await axios.get(`http://162.241.90.38:7003/v1/mensagem/${item.id}/comentario`)
      .then(async function (response) {
        // console.log(response.data)
        await setComentarios(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    getComents()
  }, [])

    return (
      <SafeAreaView style={styles.container}>

        <TouchableOpacity style={styles.header}>
          <Image source={back} />
        </TouchableOpacity>

        <View style={styles.containerMessage}>
          <View style={styles.headerMessage}>
            <UserAvatar uri={item.usuarioAvatar} />
            <Text style={styles.userName}>{item.usuarioNick}</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{item.timeout}</Text>
            </View>
          </View>
        
          <View style={styles.body}>
            <Text style={styles.discuss}>
              {item.texto}
            </Text>
          </View> 
          
          <View style={styles.footer, {flexDirection: 'row', alignItems: 'center',}} >
            <Image source={comentLogo} />
            <Text style={styles.time}>234 comentários </Text>
          </View>
        </View>

        <View>
          <View style={styles.textAreaSendComent}>
            <UserAvatar uri={userAvatar} />
            <TextInput style={styles.nickInput} 
              placeholder='Comente...'
              placeholderTextColor='#2E6B93'  
              // onChangeText={(text => {setUser(text)})}
              value="user"
            />
          </View>
        </View>

        <View style={{ marginTop: 20, marginHorizontal: 20, paddingBottom: '28%'}}>
          <FlatList 
            showsVerticalScrollIndicator={false}
            data={comentarios}
            renderItem={({item}) => <Coment item={item}/>}
            keyExtractor={item => item.id.toString()}
            onRefresh={() => refresh()}
            refreshing={fetching}
          />
        </View>
      </SafeAreaView>
    );
}

const Coment = (props) => {

  return(
    <View style={{flexDirection: 'row', height: 55}}>
      <UserAvatar uri={props.item.usuarioAvatar} />
      <Text>{props.item.texto}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: '#bbe1fa',
    paddingLeft: 20
  },

  header: {
    marginLeft: 20
  },  

  containerMessage: {
    backgroundColor: '#89B4D1',
    height: 160,
    borderRadius: 10,
    padding: 8,
    marginTop: '5%',
    marginHorizontal: 20
  },

  headerMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center'
  },

  userName: {
    marginLeft: -50,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3282b8'
  },

  timeContainer: {
    width: '55%',
    alignItems: 'flex-end',
  },

  time: {
    color: '#0f4c75',
    fontSize: 12,
    fontWeight: 'bold'
  },

  body: {
    flex: 1,
    width: '90%',
    paddingLeft: 15,
    paddingTop: 8
  },

  discuss: {
    color: '#0f4c75',
    fontSize: 14
  },

  footer: {
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
    padding: 7,
    borderRadius: 10
  },

  textAreaSendComent:{
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 15,
    height: 40,
    paddingHorizontal: 8,
    alignItems: 'center'
  },

});

export default Details
