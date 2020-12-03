import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserAvatar from './UserAvatar'

const comentarios = require('../assets/comentarios.png')
var moment = require('moment'); // require

const Message = (props) => {

  const navigation = useNavigation();

  function goToDetails(item) {
    console.log('item: ', item)
    navigation.navigate('Details', {item, avatar: props.avatar, user: props.user})
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          
          <UserAvatar uri={props.item.usuarioAvatar} style={{width: 45, height: 45}}/>
          
          <View style={styles.nameContainer}>
            <Text style={styles.userName}>{props.item.usuarioNick}</Text>
            <Text style={styles.time}>{props.item.timeout}</Text>
          </View>

        </View>
      </View>
      
      <View style={styles.body}>
        <Text style={styles.message}>{props.item.texto}</Text>
      </View> 
        
      <TouchableOpacity style={styles.footer} onPress={()=> goToDetails(props.item)}>
        <Image source={comentarios} style={styles.imageComents}/>
        <Text style={styles.comentsText}>{props.item.totalComentario} comentários...</Text>
      </TouchableOpacity>
    </View>
  );
  
}

const styles = StyleSheet.create({

  container: {
    marginTop: 10,
    backgroundColor: '#212121',
    height: 170,
    borderRadius: 10,
    padding: 8,
  },

  header: {
    flexDirection: 'row',
  },

  nameContainer: {
    paddingLeft: 5
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
    paddingTop: 15
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