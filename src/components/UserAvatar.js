import React, { useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Icon } from "react-native-elements";

const UserAvatar = props => {
  let styleAvatar = styles.avatar
  if(props.style) {
    styleAvatar = props.style
  }
  
  return (
    <View>
      <Avatar
        style={styleAvatar}
        rounded
        source={{
          uri: props.uri
        }}
        onPress={() => {
          if(props.onPress) props.onPress("Works!")
        }}
        activeOpacity={0.7}
      />
      { props.selected ? 
        <Icon
          name='checkmark-circle-outline'
          type='ionicon'
          color='#20b307'
          size={20}
        /> : null
      }
    </View>
    );
}

const styles = StyleSheet.create({
  avatar: {
    width: 35,
    height: 35
  }
});

export default UserAvatar