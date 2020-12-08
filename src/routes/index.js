import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { View, ActivityIndicator } from "react-native"

import Login from '../screens/Login'
import Home from '../screens/Home'
import Onboarding from '../screens/Onboarding'
import Details from '../screens/Details'
import MyMessages from '../screens/MyMessages'

import UsuarioContext from '../contexts/usuario'

const Stack = createStackNavigator();

const Routes = () => {
  
    const { signed, loading } = useContext(UsuarioContext);

    if(loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large" color="#666" />
            </View>
        )
    }

    return !signed ?
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
        :
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} 
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

export default Routes;