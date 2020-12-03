import React, { useState, useEffect, useContext } from 'react';
import UserAvatar from '../../components/UserAvatar'
import { SafeAreaView, Text, View, TouchableOpacity, Image, 
    StyleSheet, FlatList, TextInput } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios'
import UsuarioContext from '../../contexts/usuario';
import Message from '../../components/Message';
import { Header, Left, Body, Right } from "native-base";

import { useKeyboard } from '@react-native-community/hooks'



const pen = require('../../assets/caneta.png')
const comentLogo = require('../../assets/comentarios.png')
const next = require('../../assets/next.png')
const back = require('../../assets/back.png')
const enviar = require('../../assets/enviar.png')
const logo = require('../../assets/logo.png')
const logoText = require('../../assets/texto.png')

const Details = ({ route, navigation }) => {

  const keyboard = useKeyboard()

  console.log('keyboard isKeyboardShow: ', keyboard.keyboardShown)
  console.log('keyboard keyboardHeight: ', keyboard.keyboardHeight)

  const { item, user } = route.params;

  const [comentario, setComentario] = useState('')
  const [height, setHeight] = useState(0)
  const [comentarios, setComentarios] = useState('')
  const [fetching, setFetching] = useState(false)
  const [userAvatar, setUserAvatar] = useState('https://cdn.pixabay.com/photo/2013/07/12/16/34/vampire-151178_960_720.png')
  const [userId, setUserId] = useState(0)

  const { usuarioLogado } = useContext(UsuarioContext);

  useEffect(()=>{
    getComents()
  }, [])


  async function getComents() {
    // tem q eliminar essas variaveis e usar soh os dados da usuarioLogado
    await setUserAvatar(usuarioLogado.avatarUrl)
    await setUserId(usuarioLogado.id)

    await axios.get(`http://162.241.90.38:7003/v1/mensagem/${item.id}/comentario`)
    .then(async function (response) {
      await setComentarios(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function validateTextInput(text ){
    if(text.length === 0){
        return true;
    }else{
        return false;
    }
  }

  async function sendComentario() {
    await axios.post('http://162.241.90.38:7003/v1/comentario', {
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
  
  function changeKeyboard(event) {
    setHeight(event.nativeEvent.contentSize.height)
    keyboard.keyboardShown = false
    keyboard.keyboardHeight = 0
    console.log('FINOTTI')
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

        <View style={{ marginTop: 0, marginHorizontal: 20, height: '57%'}}>
          <FlatList 
            showsVerticalScrollIndicator={false}
            data={comentarios}
            renderItem={({item}) => <Coment user={usuarioLogado.nick} height={height} item={item}/>}
            keyExtractor={item => item.id.toString()}
            onRefresh={() => refresh()}
            refreshing={fetching}
          />
        </View>

        <View style={{ position: 'absolute', width: '105%', bottom: Platform.OS == 'ios' ? keyboard.keyboardHeight : 0 }}>
          <View style={[styles.textInputParentView, {backgroundColor: '#323334'}]}>

            <UserAvatar uri={usuarioLogado.avatarUrl} style={{ width: 40, height: 40}}/>
            
            <View style={styles.textInputView}>
                <TextInput
                  editable={true}
                  multiline={true}
                  placeholder='Aa'
                  placeholderTextColor='#c4c4c4'
                  placeholderStyle={[styles.placeholderStyle]}
                  underlineColorAndroid='transparent'
                  value={comentario}
                  onChangeText={(editedText) => {setComentario(editedText)}}
                  // onContentSizeChange={(event) => changeKeyboard(event)}
                  onContentSizeChange={(event) => setHeight(event.nativeEvent.contentSize.height)}
                  style={[styles.textInputStyle,{ backgroundColor: '#757575', color: '#fff' }]}/>
            </View>

            <TouchableOpacity disabled={validateTextInput(comentario)} onPress={sendComentario}>
              <View style={{ justifyContent: 'flex-end' }}>
                <View style={styles.sendButtonStyle}>
                  <Image style={{ width: 25, height: 25 }} source={enviar} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      
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

  textInputParentView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },

  textInputView: {
      flex: 1,
      marginRight: 10,
      marginLeft: 8,
  },

  textInputStyle: {
      fontSize: 14,
      overflow: 'hidden',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      paddingLeft: 20,
      paddingTop: 8,
      textAlign: 'left',
      borderRadius: 20,
      height: Platform.OS == 'ios'? 35 : 40
  },

  sendButtonStyle: {
      paddingVertical: 10,
      paddingLeft: 10,
      paddingRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },

  placeholderStyle:{
      fontSize: 12,
      textAlignVertical: 'center'
  }
});

export default Details
