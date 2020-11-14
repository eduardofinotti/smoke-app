import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import Modal from 'react-native-modal';

import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from 'axios'

import Questions from '../../components/Question'

const pen = require('../../assets/caneta.png')
const comentarios = require('../../assets/comentarios.png')
const next = require('../../assets/next.png')
const logo = require('../../assets/logo.png')

import styles from './styles'
import UserAvatar from '../../components/UserAvatar';

export default function Home({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false)
    const [user, setUser] = useState('')
    const [userId, setUserId] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [fetching, setFetching] = useState(false)
    const [discuss, setDiscuss] = useState()
    const [message, setMessage] = useState()
    const [countChar, setCountChar] = useState(0)
    const [page, setPage] = useState(0)

    useEffect(() => {
      // AsyncStorage.clear()

      getUser()
      getMessages()
    }, [])

    async function getUser(){
      var userName = await AsyncStorage.getItem('@user')
      var userAvatar = await AsyncStorage.getItem('@user_avatar')
      var userId = await AsyncStorage.getItem('@user_id')

      await setUser(userName)
      await setUserAvatar(userAvatar)
      await setUserId(userId)
    }

    function getMessages() {
      axios.post('http://162.241.90.38:7003/v1/mensagem/pagination', 
        {
          "pageNo": page,
          "pageSize": 50
        }
      )
      .then(async function (response) {
        await setDiscuss(response.data.content)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    function refresh() {
      setFetching(true)
      getMessages()
      setFetching(false)
    }

    function handleMessage(text) {
      setMessage(text)
      setCountChar(text.length)
    }

    function saveMessage() {
      axios.post('http://162.241.90.38:7003/v1/mensagem', 
      {
        "texto": message,
        "usuarioId": userId
      }
    )
    .then(async function (response) {

      let list = [
        response.data,
        ...discuss
      ]
      await setDiscuss(list)
      
      setModalVisible(false)
      setMessage('')
      setCountChar(0)
    })
    .catch(function (error) {
      console.log(error);
    });
    }

    function closeModal() {
      setMessage('') 
      setModalVisible(false)
      setCountChar(0)
    }

    function goToMyMessages() {
      navigation.navigate('MyMessages', {userId})
    }

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          
          <View style={{paddingTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <UserAvatar uri={userAvatar} />
              <Text style={styles.wellcome}>Olá, @{user}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Image source={logo} style={{width: 45, height: 40}}/>
            </View>
            
            <Image source={logo} style={{width: 45, height: 40, marginRight: 80}}/>
              
            <TouchableOpacity 
              style={{ right: 0}}
              onPress={() => goToMyMessages()}
            >
                <Image source={comentarios} style={{width: 25, height: 25, marginRight: 20}}/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 10, marginHorizontal: 20, paddingBottom: '28%'}}>
          <FlatList 
            showsVerticalScrollIndicator={false}
            data={discuss}
            renderItem={({item}) => <Questions item={item}/>}
            keyExtractor={item => item.id.toString()}
            onRefresh={() => refresh()}
            refreshing={fetching}
          />
        </View>

        <View style={{margin: 30, position: 'absolute', right: 0, bottom: 0}}>
          <TouchableOpacity style={styles.addDiscus} onPress={() => setModalVisible(true)}>
            <Image source={pen}/>
          </TouchableOpacity>
        </View>

        <Modal isVisible={modalVisible} style={{margin: 0}} propagateSwipe
          onSwipeComplete={() => closeModal()} onBackdropPress={() => setModalVisible(false)}
          swipeDirection="down">

          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <View style={styles.header}>
                <Text style={styles.title}>inicie um assunto</Text>
              </View>

              <View style={styles.messageAreaInput}>
                <TextInput
                  maxLength={150} 
                  style={styles.inputNewMessage}
                  multiline={true}
                  numberOfLines={10}
                  onChangeText={(text) => handleMessage(text)}
                  value={message}/>
              </View>
              <View style={{alignItems: 'flex-end', marginRight: 5}}>
                <Text>{countChar}/150</Text>
              </View>

              <View style={styles.readyContainer} >
                <TouchableOpacity onPress={saveMessage}>
                  <Image source={next} />
                </TouchableOpacity>
              </View>
              
            </View>
          </View>
        </Modal>

      </View>
    );
}