import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native'
import { StatusBar } from 'react-native';
import Routes from './src/routes';
import { UsuarioProvider } from './src/contexts/usuario';

import SplashScreen from 'react-native-splash-screen'

export default function App() {
  
  StatusBar.setBarStyle('light-content', true);

  useEffect(() => {
    SplashScreen.hide()
  }, [])
  
  return (
    <NavigationContainer>
      <StatusBar/>
      <UsuarioProvider>
        <Routes />
      </UsuarioProvider>
    </NavigationContainer>
  );
}