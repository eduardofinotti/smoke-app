import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Login from './src/screens/Login'
import Home from './src/screens/Home'
import Onboarding from './src/screens/Onboarding'
import Details from './src/screens/Details'
import MyMessages from './src/screens/Messages/mymessages'

const Stack = createStackNavigator()

export default function App() {

  const [firstAccess, setFirstAccess] = useState(false)

  useEffect(()=>{

    async function getAccess() {

      var user = await AsyncStorage.getItem('@user')

      if(user === null || user === '') {
        console.log('User: ' + user)
        setFirstAccess(true)
      }
    }

    getAccess()
  }, [])

  return (
    
    <NavigationContainer>

      {firstAccess &&
      <Stack.Navigator>
        <Stack.Screen name="Onboarding" component={Onboarding} 
          options={{
            headerShown: false,
            animationEnabled: true
          }}
        />
        <Stack.Screen name="Home" component={Home} 
          options={{
            headerShown: false,
            animationEnabled: false
          }}
        />
       <Stack.Screen name="Login" component={Login} 
          options={{
            headerShown: false,
            animationEnabled: false
          }}
        />
        <Stack.Screen name="Details" component={Details} 
          options={{
            headerShown: false,
            animationEnabled: true
          }}
        />
        <Stack.Screen name="MyMessages" component={MyMessages} 
          options={{
            headerShown: false,
            animationEnabled: true
          }}
        />
      </Stack.Navigator>
      
      }

      {!firstAccess &&
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Details" component={Details} 
          options={{
            headerShown: false,
            animationEnabled: true
          }}
        />
        <Stack.Screen name="MyMessages" component={MyMessages} 
          options={{
            headerShown: false,
            animationEnabled: true
          }}
        />
      </Stack.Navigator>   
      }      
    </NavigationContainer>
  );
}