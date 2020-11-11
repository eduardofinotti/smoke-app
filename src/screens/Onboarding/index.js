import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const next = require('../../assets/next.png')
const ok = require('../../assets/ok.png')

const data = [
  {
    title: 'bem-vindo ao \nSmoke App',
    text: 'suas mensagens apagadas em 24 horas!',
    image: require('../../assets/ok.png'),
    bg: '#0f4c75',
  },
  {
    title: 'você pode abrir uma discussão a qualquer comento!',
    text: 'basta escolher um assunto',
    image: require('../../assets/ok.png'),
    bg: '#0f4c75',
  },
  {
    title: 'responda as mensagens de outras pessoas',
    text: "e torne a discussão ainda melhor",
    image: require('../../assets/ok.png'),
    bg: '#0f4c75',
  },
];

export default function Onboarding({navigation}) {
  const _renderItem = ({item}) => {
    return (
      <View
        style={[ styles.slide, { backgroundColor: item.bg }]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
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
  },
  image: {
    marginVertical: 32,
    width: 350 ,
    height: 350
  },
  text: {
    color: '#bbe1fa',
    textAlign: 'center',
    fontSize: 18
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#bbe1fa'
  },
  buttonCircle: {
    width: 44,
    height: 44,
    backgroundColor: '#bbe1fa',
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
    color:"#bbe1fa", 
    fontWeight: 'bold', 
    fontSize: 18
  }
});