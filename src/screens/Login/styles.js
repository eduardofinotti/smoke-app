import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#212121',
    },

    headerContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Platform.OS == 'android' ? '15%' : 10
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

    nickContainer:{
        marginTop: 50,
        marginHorizontal: 30
    },

    nickTitle:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff'
    },  
    
    inputContainer:{
        backgroundColor: '#383838',
        marginTop: 10,
        borderRadius: 10,
        paddingLeft: 15,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },

    nickInput:{
        color: '#fff',
        width: '100%',
        fontSize: 18
    },

    readyContainer: {
        alignItems: 'flex-end',
        marginHorizontal: 30,
    },

    avatarContainer:{
        marginTop: 50,
        marginHorizontal: 30,
    },

})