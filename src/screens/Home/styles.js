import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#212121',
    },

    logoContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginLeft: 10
    },

    logo: {
        width: 50,
        height: 45
    },

    logoText: {
        width: 95,
        height: 25,
        marginHorizontal: 8
    },

    icon: {
        width: 20, 
        height: 20, 
        marginLeft: 20
    },

    inputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#383838',
        marginTop: 20,
        borderRadius: 12,
        paddingLeft: 10,
        height: 50,
        marginHorizontal: 10
    },

    nickInput:{
        color: '#c4c4c4',
        fontSize: 18
    },

    // modal
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


})