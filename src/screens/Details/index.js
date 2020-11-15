import React, { useState, useEffect } from 'react';
import UserAvatar from '../../components/UserAvatar'
import { SafeAreaView, Text, View, TouchableOpacity, Image, 
    StyleSheet, FlatList, TextInput, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native';
import axios from 'axios'

const pen = require('../../assets/caneta.png')
const comentLogo = require('../../assets/comentarios.png')
const next = require('../../assets/next.png')
const back = require('../../assets/back.png')
const enviar = require('../../assets/enviar.png')
const logo = require('../../assets/logo.png')

const Details = ({ route, navigation }) => {

  const { item } = route.params;

  const [comentario, setComentario] = useState('')
  const [height, setHeight] = useState(0)
  const [comentarios, setComentarios] = useState('')
  const [fetching, setFetching] = useState(false)
  const [userAvatar, setUserAvatar] = useState('https://cdn.pixabay.com/photo/2013/07/12/16/34/vampire-151178_960_720.png')
  const [userId, setUserId] = useState(0)

  useEffect(()=>{
    getComents()
  }, [])

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

    return (
      <SafeAreaView style={styles.container}>

      <View style={{ paddingTop: 30, flexDirection: 'row', alignItems: 'center', 
        alignContent: 'center', justifyContent: 'space-between', marginHorizontal: 10}}>
        <TouchableOpacity style={styles.header} onPress={()=>navigation.dispatch(CommonActions.goBack())}>
          <Image source={back} />
        </TouchableOpacity>

        <View style={{alignItems: 'flex-end', marginRight: 20}}>
          <Image source={logo} style={{width: 45, height: 40, }}/>
        </View>
      </View>

      <View style={styles.containerMessage}>
        
        <View style={styles.headerMessage}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <UserAvatar uri={item.usuarioAvatar} style={{height: 50, width: 50}}/>
            <Text style={styles.userName}>{item.usuarioNick}</Text>
          </View>
        </View>
      
        <View style={styles.body}>
          <Text style={styles.discuss}>
            {item.texto}
          </Text>
        </View> 
        
        <View style={styles.footer, {flexDirection: 'row', alignItems: 'center',}} >
          <Image source={comentLogo} style={styles.imageComents}/>
          <Text style={styles.time}>{item.totalComentario} comentários </Text>
        </View>
      </View>

      <View style = {styles.lineStyle} />

      <View style={{ marginTop: 0, marginHorizontal: 20, height: '57%'}}>
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={comentarios}
          renderItem={({item}) => <Coment height={height} item={item}/>}
          keyExtractor={item => item.id.toString()}
          onRefresh={() => refresh()}
          refreshing={fetching}
        />
      </View>
        
        <View style={{ position: 'absolute', width: '105%', bottom: 0 }}>
            <View style={[styles.textInputParentView, {
                borderTopColor: '#f5f5f5',
                backgroundColor: '#fff'}]}>
                <View style={styles.textInputView}>
                    <TextInput
                        editable={true}
                        multiline={true}
                        placeholder='Aa'
                        placeholderTextColor='#9e9e9e'
                        placeholderStyle={[styles.placeholderStyle,{color: '#9e9e9e'}]}
                        underlineColorAndroid='transparent'
                        keyboardType='default'
                        value={comentario}
                        onChangeText={(editedText) => {setComentario(editedText)}}
                        onContentSizeChange={(event) =>setHeight(event.nativeEvent.contentSize.height)}
                        style={[styles.textInputStyle,{
                            backgroundColor: '#f5f5f5',
                            color: 'black'
                        }]}
                    />
                </View>
                <TouchableOpacity
                    disabled={validateTextInput(comentario)}
                    onPress={sendComentario}>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <View style={styles.sendButtonStyle}>
                            <Image style={{ width: 30, height: 30 }} source={enviar} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

      </SafeAreaView>
    );
}

const Coment = (props) => {

  return(
    <>
    <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', marginVertical: 2}}>
      <UserAvatar uri={props.item.usuarioAvatar} />
      <Text style={{marginVertical: 10, marginHorizontal: 5}}>{props.item.texto}</Text>
    </View>
    <View style = {styles.lineStyle} />
    </>
  )
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: '#F3F8FF',
    paddingHorizontal: 10
  },

  header: {
    marginTop: 0,
  },  

  containerMessage: {
    backgroundColor: '#F3F8FF',
    height: 160,
    borderRadius: 10,
    padding: 8,
    marginTop: '5%',
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

  textInputParentView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
},
textInputView: {
    flex: 1,
    marginRight: 15,
    justifyContent: 'center',
},
textInputStyle: {
    fontSize: 14,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingLeft: 20,
    paddingTop: 8,
    textAlign: 'left',
    borderRadius: 20,
},
sendButtonStyle: {
    paddingVertical: 15,
    paddingLeft: 20,
    paddingRight: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40
},
placeholderStyle:{
    fontSize: 12,
    textAlignVertical: 'center'
}
});

export default Details
