import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, RefreshControl, TouchableWithoutFeedback } from 'react-native';
import { Header, Right, Left } from "native-base";

import SplashScreen from 'react-native-splash-screen'

import Message from '../../components/Message'
import UserAvatar from '../../components/UserAvatar'
import SendMessage from '../../components/SendMessage'

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
    const [discuss, setDiscuss] = useState({})
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
          "usuarioId": usuarioLogado.id,
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

      console.log("page: " + page)

      if(page > 0) {
        axios.post('http://162.241.90.38:7003/v1/mensagem/pagination', 
          {
            "usuarioId": usuarioLogado.id,
            "pageNo": 1,
            "pageSize": 5
          }
        )
        .then(async function (response) {
          if(response.data.numberOfElements > 0){

            console.log(...discuss)
            console.log('---------')
            console.log(response.data.content)


            let item = [ 
              ...discuss,
              response.data.content,
            ]

            await setDiscuss(item)
            setPage(page+1)

            console.log('foi')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
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

    function saveMessage(message) {
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
    })
    .catch(function (error) {
      console.log(error);
    });
    }

    function closeModal() {
      setModalVisible(false)
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
            <TouchableOpacity onPress={()=> {
              navigation.navigate('MyMessages', {title: 'Mensagens Criadas'}) }}>
              <Image source={enviados} style={styles.icon}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              navigation.navigate('MyMessages', {title: 'Favoritos'}) }}>
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
            refreshControl={<RefreshControl
              title="Atualizando..."
              tintColor="#fff"
              titleColor="#fff"
              refreshing={fetching}
              onRefresh={() => refresh()} />}

            onEndReached={() => infinitScroll()}
            onEndReachedThreshold={0.1}
            // initialNumToRender={10}
          />
        </View>

        <SendMessage
          show={modalVisible}
          closeModal={closeModal}
          sendMessage={saveMessage}
        />
      </View>
    );
}