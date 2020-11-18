import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Image, FlatList, TextInput, Platform } from 'react-native';
import Modal from 'react-native-modal';

import axios from 'axios'

import Questions from '../../components/Question'

const pen = require('../../assets/caneta.png')
const comentarios = require('../../assets/comentarios.png')
const next = require('../../assets/next.png')
const logo = require('../../assets/logo.png')

import styles from './styles'
import UserAvatar from '../../components/UserAvatar';
import UsuarioContext from '../../contexts/usuario';
import { Header, Right, Left, Body } from "native-base";

export default function Home({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [discuss, setDiscuss] = useState()
    const [message, setMessage] = useState()
    const [countChar, setCountChar] = useState(0)
    const [page, setPage] = useState(0)
    const { usuarioLogado } = useContext(UsuarioContext);

    useEffect(() => {
      getMessages(0)
    }, [])

    function getMessages() {
      setPage(0)

      axios.post('http://162.241.90.38:7003/v1/mensagem/pagination', 
        {
          "pageNo": 0,
          "pageSize": 5
        }
      )
      .then(async function (response) {
        await setDiscuss(response.data.content)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    function getMessagesInfinity() {

      console.log(page)
      axios.post('http://162.241.90.38:7003/v1/mensagem/pagination', 
        {
          "pageNo": page,
          "pageSize": 5
        }
      )
      .then(async function (response) {
        if(response.data.numberOfElements > 0){

          let list = [ 
            ...discuss,
            response.data.content
          ]

          await setDiscuss(list)
          setPage(page+1)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    async function refresh() {
      console.log('refresh...')
      setFetching(true)
      await getMessages()
      setFetching(false)
    }

    async function infinitScroll() {
      console.log('infinit...')
      setFetching(true)
      await getMessagesInfinity()
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
        "usuarioId": usuarioLogado.id
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
      navigation.navigate('MyMessages', {userId: usuarioLogado.id})
    }

    return (
      <View style={styles.container}>

        <Header transparent>
          <Left>
            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10, width: 500}}>
              <UserAvatar uri={usuarioLogado.avatarUrl} />
              <Text style={styles.wellcome}>Olá, @{usuarioLogado.nick}</Text>
            </View>
          </Left>

          <Body style={{justifyContent: 'flex-end', alignSelf: 'center', marginLeft: Platform.OS == 'android'? '35%': 0}}>
            <Image source={logo} style={{width: 45, height: 40}}/>
          </Body>
          
          <Right>
            <TouchableOpacity
              onPress={() => goToMyMessages()}>
                <Image source={comentarios} style={{width: 25, height: 25, marginRight: 10}}/>
            </TouchableOpacity>
          </Right>
        </Header>

        <View style={{ flex: 1,marginTop: 10, marginHorizontal: 20, marginBottom: 20}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={discuss}
            renderItem={({item}) => <Questions user={usuarioLogado.nick} avatar={usuarioLogado.userAvatar} item={item}/>}
            keyExtractor={item => item.id}
            onRefresh={() => refresh()}
            refreshing={fetching}
            // onEndReached={() => infinitScroll()}
            onEndReachedThreshold={0.2}
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