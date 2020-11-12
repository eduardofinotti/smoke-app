import React, { useState, useEffect } from 'react';
import UserAvatar from '../../components/UserAvatar'
import { SafeAreaView, Text, View, TouchableOpacity, Image, StyleSheet, FlatList, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
// import WhatsAppTextInput from 'react-native-whatsapp-textinput'
import WhatsAppTextInput from '../../components/WhatsAppTextInput'

import axios from 'axios'

const pen = require('../../assets/caneta.png')
const comentLogo = require('../../assets/comentarios.png')
const next = require('../../assets/next.png')
const back = require('../../assets/back.png')
const enviar = require('../../assets/enviar.png')
const logo = require('../../assets/logo.png')

const Details = ({ route, navigation }) => {

  const { item } = route.params;

  console.log(item.id)

  const [comentarios, setComentarios] = useState('')
  const [comentario, setComentario] = useState('')
  const [fetching, setFetching] = useState(false)
  
  const [userAvatar, setUserAvatar] = useState('https://cdn.pixabay.com/photo/2013/07/12/16/34/vampire-151178_960_720.png')
  const [userId, setUserId] = useState(0)

  useEffect(()=>{
    async function getComents() {

      var userAvatar = await AsyncStorage.getItem('@user_avatar')
      var userId = await AsyncStorage.getItem('@user_id')
      await setUserAvatar(userAvatar)
      await setUserId(userId)

      await axios.get(`http://162.241.90.38:7003/v1/mensagem/${item.id}/comentario`)
      .then(async function (response) {
        await setComentarios(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    getComents()
  }, [])

  async function sendComentario() {


    console.log

    await axios.post('http://162.241.90.38:7003/v1/comentario', 
    {
      "texto": comentario,
      "usuarioId": userId,
      "mensagemId": item.id
    }
  )
  .then(async function (response) {

    let list = [
      response.data,
      ...comentarios
    ]

    await setComentarios(list)
    await setComentario('')
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
            <Image source={comentLogo} style={styles.imageComents}/>
            <Text style={styles.time}>234 comentários </Text>
          </View>
        </View>

        <View style = {styles.lineStyle} />

        {/* <View>
          <View style={styles.textAreaSendComent}>
            <UserAvatar uri={userAvatar} />
            <TextInput style={styles.comentarioInput} 
              multiline={true}
              placeholder='Comente...'
              placeholderTextColor='#2E6B93'  
              onChangeText={(text => {setComentario(text)})}
              value={comentario}
            />
            <TouchableOpacity style={{justifyContent: 'flex-end', marginRight: 5}}
              onPress={() => sendComentario()}>
              <Image source={enviar} style={{width: 25, height: 25}} />
            </TouchableOpacity>
          </View>
        </View> */}
        
        <View style={{ marginTop: 10, marginHorizontal: 20}}>
          <FlatList 
            showsVerticalScrollIndicator={false}
            data={comentarios}
            renderItem={({item}) => <Coment item={item}/>}
            keyExtractor={item => item.id.toString()}
            // onRefresh={() => refresh()}
            // refreshing={fetching}
          />
        </View>
        <WhatsAppTextInput
          backgroundColor={'#fff'}
          borderTopColor={'#f5f5f5'}
          placeholderText={'Aa'}
          placeholderTextColor='#9e9e9e'
          messageTextColor={'#000'}
          textInputBgColor={'#f5f5f5'}
          editable={true}
          multiline={true}
          keyboardType={'default'}
          sendButtonBgColor={'#1a75ff'}
          sendButtonDisableColor={'#f5f5f0'}
          sendButtonEnableColor={'#002080'}
        />      
        
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
    backgroundColor: '#F3F8FF',
    paddingHorizontal: 10
  },

  header: {
    marginTop: 30,
  },  

  containerMessage: {
    backgroundColor: '#F3F8FF',
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3282b8'
  },

  timeContainer: {
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

  imageComents: {
    width: 17,
    height: 17,
    marginHorizontal: 7,
  },

  lineStyle:{
    borderWidth: 0.2,
    borderColor:'gray',
    margin: 10,
  },

  textAreaSendComent:{
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
    marginTop: 15,
    borderRadius: 15,
    height: 80,
    padding: 8,
    justifyContent: 'center',
    width: '97%',
  },

  comentarioInput:{
    color: '#0f4c75',
    width: '90%',
    fontSize: 14,
    textAlignVertical: 'top', 
  },

});

export default Details
