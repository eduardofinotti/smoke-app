import React from 'react';

import {NavigationContainer} from '@react-navigation/native'
import { StatusBar } from 'react-native';
import Routes from './src/routes';
import { UsuarioProvider } from './src/contexts/usuario';

export default function App() {
  
  StatusBar.setBarStyle('light-content', true);
  
  return (
    <NavigationContainer>
      <StatusBar />
      <UsuarioProvider>
        <Routes />
      </UsuarioProvider>
    </NavigationContainer>
  );
}