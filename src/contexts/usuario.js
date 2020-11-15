import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

const UsuarioContext = createContext({});
/*
id: user.id,
nick: user.nick,
avatar: user.avatarUrl,
*/
export const UsuarioProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            var userName = await AsyncStorage.getItem('@SmokeApp:user')
            var userAvatar = await AsyncStorage.getItem('@SmokeApp:user_avatar')
            var userId = await AsyncStorage.getItem('@SmokeApp:user_id')

            console.log('userName: ' + userName);
            console.log('userId: ' + userId);
            console.log('userAvatar: ' + userAvatar);
            if(userName && userAvatar && userId) {
                setUser({
                    id: userId,
                    nick: userName,
                    avatarUrl: userAvatar,
                })
            }
            setLoading(false);
        }

        loadStorageData()
    }, [])

    async function signIn(dadosUsuario) {
        console.log(dadosUsuario.nick + ' - ' + dadosUsuario.id)
        setUser(dadosUsuario);
        
        await AsyncStorage.setItem('@SmokeApp:user', dadosUsuario.nick)
        await AsyncStorage.setItem('@SmokeApp:user_avatar', dadosUsuario.avatarUrl)
        await AsyncStorage.setItem('@SmokeApp:user_id', String(dadosUsuario.id))

    }

    // todas as variaveis que precisar acessar via contexto, tem q passa aqui nesse value
    return ( <UsuarioContext.Provider value={{
        signed: !!user,
        usuarioLogado: user,
        loading,
        signIn // metodo que devera ser chamado quando o usuario abre o App pela primeira vez
    }}>
        {children}
    </UsuarioContext.Provider>)
}

export default UsuarioContext;