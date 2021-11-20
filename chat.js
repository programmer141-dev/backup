import * as React from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text, TextInput } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {io} from 'socket.io-client'


export default function Chat() {
  const [msg, setMsg] = React.useState('')
  const [rmsg, setrMsg] = React.useState('')
  
  const socket = io('http://localhost:6000/')
  
  
  const sendMessage = (e) => {
    socket.emit('sendmessage', msg )
  }
  socket.on('rmessage', (message) => setrMsg(message))
  
  const onPress = React.useCallback(async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync();
      if(result){
        console.log('s')
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.msgcont}>
        <View style={styles.incoming}>
          <Text style={styles.msg}>hi</Text>
        </View>
        <View style={styles.outgoing}>
          <Text style={styles.msg}>{rmsg}</Text>
        </View>
      </View>
      <View style={styles.inputcon}>
        <TouchableOpacity style={[styles.send, {marginRight:0, marginLeft:5}]}>
          <Ionicons style={styles.btntext} name='attach' color='white' />
        </TouchableOpacity>
        <TextInput value={msg} onChangeText={text => setMsg(text) } style={styles.input} />
        <TouchableOpacity style={styles.send} onPress={() => sendMessage()}>
          <Ionicons style={styles.btntext} name='send' color='white' />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop:40
  },
  inputcon:{
    width:'100%',
    height:45,
    backgroundColor:'transparent',
    position:'absolute',
    bottom:70,
    flexDirection:'row',
    justifyContent:'center'
  },
  input:{
    width:'70%',
    height:'100%',
    backgroundColor:'white',
    borderRadius:5,
    marginHorizontal:5,
    padding:5,
    fontFamily:'Poppins',
  },
  send:{
    width:45,
    height:45,
    borderRadius:5,
    backgroundColor:'rgb(159,196,251)',
    justifyContent:'center',
    alignItems:'center',
    marginRight:5
  },
  btntext:{
    fontSize:18,
  },
  msgcont:{
    width:'100%',
    height:580,
    backgroundColor:'transparent'
  },
  incoming:{
    width:'100%',
    height:40,
    alignItems:'flex-start',
    justifyContent:'center',
    paddingHorizontal:15
  },
  outgoing:{
    width:'100%',
    height:40,
    alignItems:'flex-end',
    justifyContent:'center',
    paddingHorizontal:15
  },
  msg:{
    width:120,
    height:'100%',
    backgroundColor:'lightgrey',
    borderRadius:5,
    fontFamily:'Poppins',
    paddingHorizontal:15,
    paddingVertical:5,
  }
});
