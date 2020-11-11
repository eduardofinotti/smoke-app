import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { Avatar } from "react-native-elements";

import axios from 'axios'

const pen = require('../../assets/caneta.png')
const comentarios = require('../../assets/comentarios.png')
const next = require('../../assets/next.png')

const Details = ({ route, navigation }) => {

  const { item } = route.params;

  console.log(item.id)

  const [comentarios, setComentarios] = useState('')
  const [fetching, setFetching] = useState(false)

  useEffect(()=>{
    async function getComents() {
      await axios.get(`http://162.241.90.38:7003/v1/mensagem/${item.id}/comentario`)
      .then(async function (response) {
        // console.log(response.data)
        await setComentarios(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    getComents()
  }, [])

  

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerMessage}>
          <View style={styles.header}>
            {/* <View style={styles.avatar}></View> */}
            <Avatar
            style={styles.avatar}
              rounded
              icon={{name: 'user', type: 'font-awesome'}}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
              containerStyle={{backgroundColor: 'red', marginRight: 10, marginTop: 0}}
            />
            <Text style={styles.userName}>{item.usuarioNick}</Text>
            <View style={styles.timeContainer}>
              {/* <Text style={styles.time}>{props.item.dataHora}</Text> */}
              <Text style={styles.time}>7 horas</Text>
            </View>
          </View>
        
          <View style={styles.body}>
            <Text style={styles.discuss}>
              {item.texto}
            </Text>
          </View> 
          
          <View style={styles.footer, {flexDirection: 'row', alignItems: 'center',}} >
            {/* <Image source={comentarios} style={styles.imageComents}/> */}
            <Text style={styles.time}>234 comentários </Text>
          </View>
        </View>

        <View style={{ marginTop: 20, marginHorizontal: 20, paddingBottom: '28%'}}>
          <FlatList 
            showsVerticalScrollIndicator={false}
            data={comentarios}
            renderItem={({item}) => <Coment item={item}/>}
            keyExtractor={item => item.id.toString()}
            onRefresh={() => refresh()}
            refreshing={fetching}
          />
        </View>
      </SafeAreaView>
    );
}

const Coment = (props) => {

  return(
    <View style={{flexDirection: 'row', height: 55}}>
      {/* <Image source={{uri: props.item.usuarioAvatar}} style={{width: 40, height: 60}}></Image> */}
      <Avatar
        rounded
        icon={{name: 'user', type: 'font-awesome'}}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
        containerStyle={{backgroundColor: 'green', marginRight: 10}}
      />
      <Text>{props.item.texto}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    padding: 20,
    backgroundColor: '#bbe1fa'
  },

  containerMessage: {
    marginTop: 10,
    backgroundColor: '#89B4D1',
    height: 160,
    borderRadius: 10,
    padding: 8,
    marginTop: '10%'
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center'
  },

  avatar: {
    backgroundColor: '#0f4c75',
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  userName: {
    marginLeft: -50,
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

export default Details