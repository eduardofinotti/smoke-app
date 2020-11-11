import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#bbe1fa',
    },

    nickContainer:{
        marginTop: 100,
        marginHorizontal: 30
    },

    nickTitle:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0f4c75'
    },  
    
    inputContainer:{
        backgroundColor: '#0f4c75',
        marginTop: 20,
        borderRadius: 20,
        paddingLeft: 15,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },

    nickInput:{
        color: '#bbe1fa',
        width: '100%',
        fontSize: 18
    },

    readyContainer: {
        flex: 1,
        alignItems: 'flex-end',
        paddingTop: 20,
        marginHorizontal: 30
    }

})