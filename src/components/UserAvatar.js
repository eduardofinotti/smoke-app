import React, { useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Icon } from "react-native-elements";

const UserAvatar = props => {
  let styleAvatar = styles.avatar
  
  if(props.style) {
    styleAvatar = props.style
  }  
  
  var black = false
  if(props.selected) {
    black = true
  }

  console.log(black)

  return (

    <View style={[black? styles.black: '', styles.avatarContainer]}>
      <Avatar
        style={styleAvatar}
        rounded
        source={{
          uri: props.uri
        }}
        onPress={() => {
          if(props.onPress) props.onPress()
        }}
        activeOpacity={0.7}
      />
    </View>
    );
}

const styles = StyleSheet.create({
  avatar: {
    width: 35,
    height: 35
  },

  black:{
    backgroundColor: '#0f4c75'
  },

  avatarContainer: {
    borderRadius: 40
  }


});

export default UserAvatar