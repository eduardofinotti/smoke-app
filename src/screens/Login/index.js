 import React, { useContext, useState } from 'react';
import { SafeAreaView, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import UserAvatar from '../../components/UserAvatar'
import axios from 'axios'
import UsuarioContext from '../../contexts/usuario'

const ok = require('../../assets/ok.png')

import styles from './styles'

export default function Login({ navigation }) {

  const [ user, setUser ] = useState('')
  const [ avatar, setAvatar ] = useState('https://cdn.pixabay.com/photo/2016/03/31/20/27/avatar-1295773_960_720.png')
  const { signIn } = useContext(UsuarioContext)

  const listAvatarUrl = [
    'https://cdn.pixabay.com/photo/2016/03/31/20/27/avatar-1295773_960_720.png',
    'https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635449_960_720.png',
    'https://cdn.pixabay.com/photo/2016/04/01/12/11/avatar-1300582_1280.png',
    'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png',
    'https://cdn.pixabay.com/photo/2016/12/13/16/17/dancer-1904467_960_720.png',
    'https://cdn.pixabay.com/photo/2016/09/01/08/25/smiley-1635454_960_720.png',
    'https://cdn.pixabay.com/photo/2016/04/01/10/04/amusing-1299756_960_720.png',
    'https://cdn.pixabay.com/photo/2016/04/01/10/04/amusing-1299757_960_720.png',
    'https://cdn.pixabay.com/photo/2013/07/13/12/06/woman-159169_960_720.png',
    'https://cdn.pixabay.com/photo/2016/03/31/20/11/avatar-1295575_960_720.png',
    'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png',
    'https://cdn.pixabay.com/photo/2016/09/01/08/25/smiley-1635456_960_720.png',
    'https://cdn.pixabay.com/photo/2016/11/01/21/11/avatar-1789663_960_720.png',
    'https://cdn.pixabay.com/photo/2016/04/01/10/04/amusing-1299761_960_720.png',
    'https://cdn.pixabay.com/photo/2016/03/31/20/31/amazed-1295833_960_720.png',
    'https://cdn.pixabay.com/photo/2013/07/12/16/34/vampire-151178_960_720.png'
  ]
  
  async function goToHome(){

    axios.post('http://162.241.90.38:7003/v1/usuario', 
      {
        "nick": user,
        "avatarUrl": avatar
      }
    )
    .then(async function (response) {
      signIn(response.data) // chama o método de login do UsuarioContext
      navigation.navigate('Home')
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  renderGridAvatar = () => {
    return listAvatarUrl.map(item => (
      <UserAvatar uri={item}
        key={item}
        selected={item === avatar }
        style={{
          width: 54,
          height: 54,
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
          marginBottom: 10
        }}
        onPress={()=> setAvatar(item)}  
      />
    ));
  }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.nickContainer}>
          <Text style={styles.nickTitle}>escolha um apelido</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.nickInput} 
            placeholder='ex: jonny bravo'
            placeholderTextColor='#2E6B93'  
            onChangeText={(text => {setUser(text)})}
            value={user}
          />
        </View>

        <View style={styles.avatarContainer}>
          <Text style={styles.nickTitle}>escolha seu avatar</Text>
        </View>

        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginLeft: 20, marginTop: 10}}>
          {renderGridAvatar()}
        </View>

        <View style={styles.readyContainer} >
          <TouchableOpacity onPress={goToHome}>
            <Image source={ok}></Image>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
}