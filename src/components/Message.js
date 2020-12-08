import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import UserAvatar from './UserAvatar'

import UsuarioContext from '../contexts/usuario';

import axios from 'axios'

const comentarios = require('../assets/comentarios.png')
const favorito_icon = require('../assets/favorito-on.png')
const not_favorito_icon = require('../assets/favorito-off.png')

const Message = (props) => {

  const { usuarioLogado } = useContext(UsuarioContext);
  const [favorito, setFavorito] = useState(props.item.favorita);
  
  const navigation = useNavigation();

  function goToDetails(item) {
    navigation.navigate('Details', {item, avatar: props.avatar, user: props.user})
  }

  async function saveFavorito(){

    await setFavorito(!favorito)

    axios.post('http://162.241.90.38:7003/v1/usuario/favoritar-mensagem', 
      {
        "usuarioId": usuarioLogado.id,
        "mensagemId": props.item.id
      }
    )
    .then(async function (response) {
      console.log('salvou favorito')
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          
          <UserAvatar uri={props.item.usuarioAvatar} style={{width: 46, height: 46}}/>
          
          <View style={styles.nameContainer}>
            <View style={styles.headerMessageContainer}>
              <Text style={styles.userName}>{props.item.usuarioNick}</Text>
              <TouchableOpacity onPress={() => {
                saveFavorito(favorito)
              }}>
                <Image source={favorito ? favorito_icon : not_favorito_icon} style={styles.favoriteIcon}/>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.time}>{props.item.timeout}</Text>
          </View>

        </View>
      </View>
      <TouchableOpacity onPress={()=> goToDetails(props.item)}>  
        <View style={styles.body}>
          <Text style={styles.message}>{props.item.texto}</Text>
        </View> 
      </TouchableOpacity>
    
      <Image source={comentarios} style={styles.imageComents}/>
      <Text style={styles.comentsText}>{props.item.totalComentario} comentários...</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 10,
    backgroundColor: '#212121',
    borderRadius: 10,
    paddingHorizontal: 5
  },

  header: {
    flexDirection: 'row',
  },

  nameContainer: {
    paddingLeft: 5,
    width: '88%',
  },
  
  headerMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  favoriteIcon: {
    width: 20,
    height: 20,
    marginRight: 10
  },  

  userName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },

  time: {
    color: '#c4c4c4',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5
  },

  body: {
    flex: 1,
    width: '90%',
    padding: 15
  },

  message: {
    color: '#fff',
    fontSize: 14
  },

  footer: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 30,
  },

  imageComents: {
    width: 17,
    height: 17,
    marginRight: 7
  },

  comentsText: {
    color: '#c4c4c4',
    fontSize: 12,
  },

});

export default Message