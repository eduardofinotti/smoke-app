import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios'
import Message from '../../components/Message'
const logo = require('../../assets/logo.png')
import styles from './styles'
import UsuarioContext from '../../contexts/usuario';

export default function MyMessages({ route, navigation }) {

    const { usuarioLogado } = useContext(UsuarioContext);

    const [messages, setMessages] = useState()
    const back = require('../../assets/back.png')
    
    useEffect(() => {
      loadMyMessages()
    }, [])

    function loadMyMessages() {
      axios.get(`http://162.241.90.38:7003/v1/usuario/${usuarioLogado.id}/mensagem`)
      .then(function (response) {
        setMessages(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={{marginLeft: 10 }} onPress={()=>navigation.navigate('Home')}>
            <Image source={back} />
          </TouchableOpacity>
          
          <Text style={styles.title}>Minhas Mensagens</Text>
          
          <View style={{ marginRight: 10,  alignItems: 'flex-end'}}>
            <Image source={logo} style={{width: 45, height: 40, }}/>
          </View>
        </View>

        <View style={{ marginTop: 10, marginHorizontal: 20, paddingBottom: '28%'}}>
          <FlatList 
            showsVerticalScrollIndicator={false}
            data={messages}
            renderItem={({item}) => <Message item={item}/>}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </SafeAreaView>
    );
}