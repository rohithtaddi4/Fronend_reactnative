import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text,  Pressable, View, Image} from 'react-native';
import { Button, TextInput } from 'react-native-web';
import axios from 'axios';

const Compos = (props) => {
  console.log(props.visible)
  console.log(display)
  const [Email, setusername] = useState('');
  const [password, setpassword] = useState('')
  const [loginmae, setloginname] = useState('')
  const [showbook, setshowbook] = useState(false)
  const [display, setdisplay] = useState(true)
  const [message, setmessage ] = useState('')
  const [date, setdate] = useState('')
  function userhandler (text){
    console.log(text)
    setusername(text)
  }
  function passwordhandler (text){
    setpassword(text)
    console.log(text)
  }
  function tryBook () {
    setshowbook(true)
  }
  function trylogin(){
    console.log(`user name ${Email}`)
    console.log(`user name ${password}`)
    //props.handleslog()
    let reqObj = {
      email : Email,
      password : password
    }
    axios({
      url: 'http://localhost:2023/login',
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      data: reqObj
    }).then(response => {
      console.log(response)
      console.log(response.data.user.Name)
      setloginname(response.data.user.Name)
      //props.navigation.navigate('Home')
      alert(`welcome ${response.data.user.Name}`)
      props.handleuser(response.data.user.Name, response.data.user.email)
      setdisplay(false)
    })
    .catch(err => {
      alert('wrong creds')
      props.handleslog()
      setdisplay(false)
      console.log(err)
    })
  }
  function dateinput(text){
    console.log(text)
    setdate(text)
    props.usersdata()
  }

  function Booknow (){
    console.log(`user name ${Email}`)
    console.log(props.users)
    const reqObj = {
      date : date,
      By : props.users
    }
    if(props.users){
    if(date.length === 6){
      console.log(reqObj)
      axios({
        url: `http://localhost:2023/book/${props.datas.name}`,
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        data: reqObj
      }).then(response => {
       console.log(response.data.message)
       alert(response.data.message)
       setmessage(response.data.message)
      })
    }
    else {
      alert('please enter date in valid format shown in eg')
    } } 
    else {
      alert('Please login to book')
      setshowbook(false)
    }
  }
  function homeback (){
    setshowbook(false)
  }
  return (
        <View >
         {props.visible && display ? <Modal animationType='slide'>
          <View style={styles.Top}>
          <View style= {styles.boxModal}>
          <Text style={styles.Login}>Login Page</Text>
          <Text style={styles.Email}>Email</Text>
          <TextInput style={styles.Input} onChangeText={userhandler} placeholder = 'Enter your Email'/>
          <Text style={styles.Password}>Password</Text>
          <TextInput style={styles.Input} onChangeText={passwordhandler} placeholder = 'Enter your Password'/>
          <View style={styles.Button}>
          <Button onPress={trylogin} title = "LogIn" />
          </View>
          </View>
          </View>
          </Modal> :
          <View style={styles.box}>
          <Image style={{width: 200, height: 200}} source={require(`../images/mer.jpeg`)} />
          <View styles={{flexDirection: "coloumn"}}>
           <Text style={styles.hotel}>{props.datas.name}</Text>
           <Text style={styles.hotel}>{props.datas.category}</Text>
           <View style={styles.but}>
           <Button  onPress={tryBook} title = "Book Now" />
           </View>
           </View>
           { showbook ?
           <Modal>
           <View style={styles.modals}>
           <Text style={styles.hotels}>{props.datas.name}</Text>
           <Text style={styles.hotelss}>{props.datas.category} Hotel</Text>
           <Text style={styles.hotelss}>Book on</Text>
           <TextInput style={styles.Input} onChangeText={dateinput} placeholder = 'eg : 03 mar'/>
           <Button  onPress={Booknow} title = "Book Now" />
           <Text style={styles.hotelss}>{message}</Text>
           </View>
           <Button onPress={homeback} title = "Back T0 home"/>
           </Modal> : null}
          </View> }
       </View>
  );
};

const styles = StyleSheet.create({
  modals :{
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
    but : {
     marginLeft : 25,
     marginTop: 30
    },
    hotelss :{
      color: 'red',
       marginTop: 100,
       fontWeight: 'bold',
       fontSize: 27
    },
    hotels :{    
        color: 'red',
        fontWeight: 'bold',
        fontSize: 57
    },
    hotel : {
      marginLeft: 25,
      marginTop : 35,
      fontWeight: 'bold',
      fontSize: 20
    },
    cat : {
      marginLeft: 225,
      position: 'absolute',
      marginTop : 95,
      fontWeight: 'bold',
      fontSize: 20
    },
    Top : {
      marginTop: 100,
    },
    box : {
        height: 200,
        width: 400,
        flexDirection: 'row',
        marginTop: 40,
        marginLeft: 40,
        backgroundColor: "cornsilk"
      },
      boxModal : {
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
      Login : {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 57
      },
      Email : {
        color: 'red',
         marginTop: 100,
         fontWeight: 'bold',
         fontSize: 27
      },
      Password: {
        color: 'red',
         fontWeight: 'bold',
         fontSize: 27,
         marginTop: 20
      },
      Input : {
        height: 27,
        width: 250,
        marginTop: 20,
        marginBottom: 20
      },
      Button : {
        marginTop : 30
      }

})

export default Compos;