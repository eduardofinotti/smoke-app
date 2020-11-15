import React from 'react';

import {NavigationContainer} from '@react-navigation/native'
import { StatusBar } from 'react-native';
import Routes from './src/routes';
import { UsuarioProvider } from './src/contexts/usuario';

export default function App() {
  
  return (
    <NavigationContainer>
      <StatusBar barStyle='dark-content'/>
      <UsuarioProvider>
        <Routes />
      </UsuarioProvider>
    </NavigationContainer>
  );
}