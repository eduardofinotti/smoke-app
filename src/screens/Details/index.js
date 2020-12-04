import React, { useState, useEffect, useContext } from 'react';
import UserAvatar from '../../components/UserAvatar'
import { Text, View, TouchableOpacity, Image, 
    StyleSheet, FlatList, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios'
import UsuarioContext from '../../contexts/usuario';
import Message from '../../components/Message';
import SendMessage from '../../components/SendMessage'
import { Header, Left, Body, Right } from "native-base";

const back = require('../../assets/back.png')
const logo = require('../../assets/logo.png')
const logoText = require('../../assets/texto.png')

const Details = ({ route, navigation }) => {

  const { item } = route.params;

  const [modalVisible, setModalVisible] = useState(false)
  const [height, setHeight] = useState(0)
  const [comentarios, setComentarios] = useState('')
  const [fetching, setFetching] = useState(false)
  
  const { usuarioLogado } = useContext(UsuarioContext);

  useEffect(()=>{
    getComents()
  }, [])


  async function getComents() {
    await axios.get(`http://162.241.90.38:7003/v1/mensagem/${item.id}/comentario`)
    .then(async function (response) {
      await setComentarios(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async function sendComentario(comentario) {
    await axios.post('http://162.241.90.38:7003/v1/comentario', {
      "texto": comentario,
      "usuarioId": usuarioLogado.id,
      "mensagemId": item.id
    }
  )
  .then(async function (response) {

    let list = [
      response.data,
      ...comentarios
    ]

    await setComentarios(list)

    getComents()
  })
  .catch(function (error) {
    console.log(error);
  }); 
  }

  function refresh() {
    setFetching(true)
    getComents()
    setFetching(false)
  }
  
  function closeModal() {
    setModalVisible(false)
  }

    return (
      <View style={styles.container}>

        <Header transparent>
          <Left>
            <TouchableOpacity style={styles.header} onPress={()=>navigation.dispatch(CommonActions.goBack())}>
              <Image source={back} style={{height: 22, width: 22}}/>
            </TouchableOpacity>
          </Left>
          <Body style={{marginLeft: Platform.OS == 'android'? '35%':0}}>
            <View style={styles.logoContainer}>
              <Image source={logo} style={styles.logo}/>
              <Image source={logoText} style={styles.logoText}/>
            </View>
          </Body>
          <Right></Right>
        </Header>

        <Message user={usuarioLogado.nick} avatar={usuarioLogado.userAvatar} item={item}/>

        <View style = {styles.lineStyle} />

        <View style={{ marginTop: 0, marginHorizontal: 20}}>
          <FlatList 
            showsVerticalScrollIndicator={false}
            data={comentarios}
            renderItem={({item}) => <Coment user={usuarioLogado.nick} height={height} item={item}/>}
            keyExtractor={item => item.id.toString()}
            onRefresh={() => refresh()}
            refreshing={fetching}
          />
        </View>
         <KeyboardAvoidingView 
            style={{position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#212121', padding: 8}} 
            behavior="position"
          >
            <TouchableWithoutFeedback 
              onPress={() => setModalVisible(true)}
            >
              <View style={styles.inputContainer}>
                <UserAvatar uri={usuarioLogado.avatarUrl} />
                <Text style={styles.nickInput}> Comentar...</Text>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          
          <SendMessage
            show={modalVisible}
            closeModal={closeModal}
            sendMessage={sendComentario}
          />
      </View>
    );
}

const Coment = (props) => {

  return(
    <>
    <View style={{ marginVertical: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <UserAvatar uri={props.item.usuarioAvatar} />
          <Text style={{fontSize: 15, fontWeight: 'bold', color: '#fff', marginLeft: 5}}>{props.user}</Text>
        </View>
        <Text style={{color: '#c4c4c4', fontSize: 13, marginTop: 8}}> {props.item.texto}</Text>
    </View>
    
    </>
  )
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: '#212121',
    paddingHorizontal: 10
  },

  logoContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginLeft: 10
  },
  
  logo: {
    width: 50,
    height: 45
  },

  logoText: {
      width: 95,
      height: 25,
      marginHorizontal: 8
  },
  inputContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#383838',
    borderRadius: 12,
    paddingLeft: 10,
    height: 50
  },

  nickInput:{
      color: '#c4c4c4',
      fontSize: 18
  },
});

export default Details
