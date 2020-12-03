import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Image, FlatList, TextInput, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { Header, Right, Left } from "native-base";

import SplashScreen from 'react-native-splash-screen'

import Message from '../../components/Message'
import UserAvatar from '../../components/UserAvatar'

const enviados = require('../../assets/enviar.png')
const comentarios = require('../../assets/comentarios.png')
const favoritos = require('../../assets/favorito-on.png')

const pen = require('../../assets/caneta.png')

const next = require('../../assets/next.png')
const logo = require('../../assets/logo.png')
const logoText = require('../../assets/texto.png')

import axios from 'axios'
import UsuarioContext from '../../contexts/usuario';

import styles from './styles'

export default function Home({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [discuss, setDiscuss] = useState()
    const [message, setMessage] = useState()
    const [countChar, setCountChar] = useState(0)
    const [page, setPage] = useState(0)
    const { usuarioLogado } = useContext(UsuarioContext);

    useEffect(() => {
      SplashScreen.hide()
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
            <View style={styles.logoContainer}>
              <Image source={logo} style={styles.logo}/>
              <Image source={logoText} style={styles.logoText}/>
            </View>
          </Left>
          
          <Right style={{marginRight: 10}}>
            <TouchableOpacity onPress={() => goToMyMessages()}>
                <Image source={enviados} style={styles.icon}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => goToMyMessages()}>
                <Image source={comentarios} style={styles.icon}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => goToMyMessages()}>
                <Image source={favoritos} style={styles.icon}/>
            </TouchableOpacity>
          </Right>
        </Header>

        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <View style={styles.inputContainer}>
            <UserAvatar uri={usuarioLogado.avatarUrl} />
            <Text style={styles.nickInput}> Inicie um assunto...</Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={{ flex: 1,marginTop: 10, marginHorizontal: 10, marginBottom: 20}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={discuss}
            renderItem={({item}) => <Message user={usuarioLogado.nick} avatar={usuarioLogado.userAvatar} item={item}/>}
            keyExtractor={(item, index) => item.id.toString()}
            onRefresh={() => refresh()}
            refreshing={fetching}
            // onEndReached={() => infinitScroll()}
            // onEndReachedThreshold={0.5}
            // initialNumToRender={10}
          />
        </View>

        <Modal isVisible={modalVisible} style={{margin: 0}} propagateSwipe
          onSwipeComplete={() => closeModal()} onBackdropPress={() => setModalVisible(false)}
          swipeDirection="down">

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            
              <View style={styles.headerContainerModal}>
                <UserAvatar uri={usuarioLogado.avatarUrl} />
                <Text style={styles.nick}>{usuarioLogado.nick}</Text>
              </View>

              <View style={styles.messageAreaInput}>
                <TextInput
                  maxLength={150} 
                  placeholder='Inicie um assunto...'
                  style={styles.inputNewMessage}
                  placeholderTextColor='#c4c4c4'
                  multiline={true}
                  numberOfLines={10}
                  onChangeText={(text) => handleMessage(text)}
                  value={message}/>
              </View>
              <View style={{alignItems: 'flex-end', marginRight: 5}}>
                <Text style={styles.cont} >{countChar}/150</Text>
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