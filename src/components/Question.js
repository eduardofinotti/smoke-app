import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserAvatar from './UserAvatar'

const comentarios = require('../assets/comentarios.png')
var moment = require('moment'); // require

const Question = (props) => {
  
  const navigation = useNavigation();

  function goToDetails(item) {
    console.log('item: ', item)
    navigation.navigate('Details', {item})
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <UserAvatar uri={props.item.usuarioAvatar} />
        <Text style={styles.userName}>{props.item.usuarioNick}</Text>
        <View style={styles.timeContainer}>
          {/* <Text style={styles.time}>{props.item.dataHora}</Text> */}
          <Text style={styles.time}>7 horas</Text>
        </View>
      </View>
      
      <View style={styles.body}>
        <Text style={styles.discuss}>
          {props.item.texto}
        </Text>
      </View> 
        
      <TouchableOpacity style={styles.footer, {flexDirection: 'row', alignItems: 'center',}} 
        onPress={()=> goToDetails(props.item)}>
        <Image source={comentarios} style={styles.imageComents}/>
        <Text style={styles.time}>234 comentários </Text>
      </TouchableOpacity>
    </View>
  );
  
}

const styles = StyleSheet.create({

  container: {
    marginTop: 10,
    backgroundColor: '#89B4D1',
    height: 160,
    borderRadius: 10,
    padding: 8
  },

  header: {
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
    width: '55%',
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
    // backgroundColor: '#99C7E5',
    padding: 7,
    borderRadius: 10
  },

  imageComents: {
    width: 17,
    height: 17,
    marginHorizontal: 7
  }

});

export default Question