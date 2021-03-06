import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#bbe1fa',
    },

    titleContainer:{
        marginTop: 30,
        marginLeft: 20
    },

    wellcome:{
        marginBottom: 10,
        color: '#3282b8',
        fontWeight: 'bold',
        fontSize: 16
    },

    title:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0f4c75'
    },

    subtitle:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#3282b8'
    },

    addDiscus: {
        backgroundColor: '#0f4c75',
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
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
        width: '100%',
        height: '80%',
        backgroundColor: '#bbe1fa',
        padding: 35
      },

      header: {
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      },    

      title: {
        color: "#3282b8",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 22
      },

      messageAreaInput: {
        backgroundColor: '#89B4D1',
        height: 20,
        borderRadius: 10,
        padding: 7,
        marginTop: '8%'
    },

    inputNewMessage: {
        height: 20, 
        textAlignVertical: 'top', 
        color: '#0f4c75', 
        fontSize: 14
    },

    readyContainer: {
        flex: 1,
        alignItems: 'flex-end',
        paddingTop: 20,
    },

    textInputParentView: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    textInputView: {
        flex: 1,
        marginRight: 15,
        justifyContent: 'center',
    },
    textInputStyle: {
        fontSize: 14,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingLeft: 20,
        paddingTop: 8,
        textAlign: 'left',
        borderRadius: 20,
    },
    sendButtonStyle: {
        paddingVertical: 15,
        paddingLeft: 20,
        paddingRight: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40
    },
    placeholderStyle:{
        fontSize: 12,
        textAlignVertical: 'center'
    }


})