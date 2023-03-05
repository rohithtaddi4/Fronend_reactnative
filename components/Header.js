import React, {useState} from 'react';
import {Alert, StyleSheet, Text,Button, Pressable, View} from 'react-native';
import axios from 'axios';
import { Modal } from 'react-native-web';

const Header = (props) => {
  const [datas, setdatas] = useState([]) 
  const [openmodal, setopenmodal] = useState(false)
  function handleshistory (){
    const reqObj = {
      email : props.email
    }
    axios({
      url: 'http://localhost:2023/loginhistory',
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      data: reqObj
    }).then(response => {
      console.log('Bookings')
      console.log(response.data.data.bookings)
      setdatas(response.data.data.bookings)
    })
    setopenmodal(true)
  }  

  function back(){
    setopenmodal(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.innerText}>Book your Hotel Now</Text>
      {!(props.users) ?
      <Button style={styles.button} onPress = {props.handleslog} title="Login" /> :
      <Text style={styles.username}>{props.users}</Text> }
      {(props.users) ? <Button style={styles.buttonH} onPress = {handleshistory} title="History" /> : null}
      { openmodal ?<Modal>
        
        <View style={styles.inners}>
        <Text style={styles.login}>Booking History</Text>
        <Text style={styles.email}>Booked On</Text>
        {datas.map((item) => <Text style={styles.texts} key={item}>Date : {item.date} Hotel : {item.HotelId}</Text> )}
        </View>
        <Button onPress={back} title = "Back To Home" />
      </Modal> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  outer:{
    fontSize: 50
  },
  texts: {
    fontSize : 25,
    marginTop: 20,
    marginBottom: 20
  },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 100,
        width : "100%",
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inners:{
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
      innerText: {
        color: 'white',
        width: "80%",
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 27
      },
      email : {
        color: 'red',
         marginTop: 100,
         fontWeight: 'bold',
         fontSize: 27
      },
      username: {
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        marginRight: 20,
        fontSize: 20
      },
      button: {
        position: 'absolute',
        color: 'red',
        marginLeft : '200'
      },
      login: {       
       color: 'red',
       fontWeight: 'bold',
       fontSize: 57
      }
})

export default Header;