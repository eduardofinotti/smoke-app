import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const next = require('../../assets/next-black.png')
const ok = require('../../assets/check.png')

const data = [
  {
    title: 'Inicie um assunto',
    text: 'Inicie um assunto e aguarde outras pessoas comentarem',
    image: require('../../assets/conversa.png'),
    bg: '#212121',
  },
  {
    title: '24 horas de duração',
    text: 'Todas as mensagens e comentários \nexistem por apenas 24 horas. \nDepois disso são deletadas',
    image: require('../../assets/cronometro.png'),
    bg: '#212121',
  },
  {
    title: 'Anonimato',
    text: "Tudo isso de forma \ntotalmente anonima e secreta",
    image: require('../../assets/agente.png'),
    bg: '#212121',
  },
];

export default function Onboarding({navigation}) {
  const _renderItem = ({item}) => {
    return (
      <View style={[ styles.slide, { backgroundColor: item.bg }]}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Image source={next} style={{ width: 20, height: 20}}></Image>
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Image source={ok} style={{ width: 25, height: 25}}></Image>
      </View>
    );
  };

  const _renderSkipButton = () => {
    return (
      <View style={styles.skipText}>
        <Text style={styles.skip}>Skip</Text>
      </View>
    );
  };

  const openLogin = () => {
    navigation.navigate('Login')
  }

  const _keyExtractor = (item) => item.text;

    return (
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={_keyExtractor}
          renderDoneButton={_renderDoneButton}
          renderNextButton={_renderNextButton}
          renderSkipButton={_renderSkipButton}
          renderItem={_renderItem}
          showSkipButton
          data={data}
          onDone={() => {openLogin()}}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  image: {
    marginTop: -100,
    width: 220 ,
    height: 220,
  },

  title: {
    marginTop: 80,
    fontSize: 24,
    textAlign: 'center',
    color: '#fff'
  },

  text: {
    marginTop: 30,
    color: '#fff',
    textAlign: 'center',
    fontSize: 18
  },

  buttonCircle: {
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },

  skipText: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },

  skip: {
    color:"#fff", 
    fontWeight: 'bold', 
    fontSize: 18
  }
});