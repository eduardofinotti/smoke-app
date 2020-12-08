import React, { useState, useContext } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import UserAvatar from './UserAvatar'
import UsuarioContext from '../contexts/usuario'

/*
    props recebidas
    show boolean,
    closeModal function,
    sendMessage function
*/
const SendMessage = (props) => {

    const [message, setMessage] = useState()
    const [countChar, setCountChar] = useState(0)
    const { usuarioLogado } = useContext(UsuarioContext);  

    function handleMessage(text) {
        setMessage(text)
        setCountChar(text.length)
    }

    function clear() {
        setMessage('')
        setCountChar(0)
    }

    function close() {
        props.closeModal()
        clear()
    }

    return (
      <Modal isVisible={props.show} style={{margin: 0}}
          propagateSwipe
          onSwipeComplete={() => close() } 
          onBackdropPress={() => close() }
          swipeDirection="down">

        <View  style={styles.centeredView}>
          <View style={styles.modalView} >
          
            <View style={styles.headerContainerModal} >
              <UserAvatar uri={usuarioLogado.avatarUrl} />
              <Text style={styles.nick}>{usuarioLogado.nick}</Text>
            </View>

            <View style={styles.messageAreaInput} >
              <TextInput
                autoFocus
                maxLength={150} 
                placeholder='Inicie um assunto...'
                returnKeyType='send'
                color='white'
                placeholderTextColor='#c4c4c4'
                onChangeText={(text) => handleMessage(text)}
                onSubmitEditing={() => { 
                  props.sendMessage(message)
                  close()
                }}
                value={message}/>
            </View>
            <View style={{alignItems: 'flex-end', marginRight: 5}}>
              <Text style={styles.cont} >{countChar}/150</Text>
            </View>
          </View>
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: { 
        flex: 1,
        justifyContent: "flex-end",
        alignContent: "flex-end",
    },
    modalView: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        width: '100%',
        height: '80%',
        backgroundColor: '#1a1a1a',
    },
    headerContainerModal: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    nick: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8
    },
    messageAreaInput: {
        backgroundColor: '#383838',
        height: 160,
        borderRadius: 10,
        padding: 7,
        marginTop: 10
    },
    inputNewMessage: {
        height: 160, 
        textAlignVertical: 'top', 
        color: '#fff', 
        fontSize: 14
    },
    cont: {
        marginTop: 8,
        color: '#c4c4c4'
    },
    readyContainer: {
        flex: 1,
        alignItems: 'flex-end',
        paddingTop: 20,
    }
  });

export default SendMessage