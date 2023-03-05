import { StatusBar } from 'expo-status-bar';
import { SafeAreaViewBase, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Button } from 'react-native-web';
import Compos from './components/Hotelcompos';
import Header from './components/Header';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'

const stcak = createNativeStackNavigator()
//import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function App() {
 const [data , setdata] = useState([])
  useEffect(()=> {
       async function fetchdata() {
        console.log('entered fetch')
        const response = await fetch('http://localhost:2023/Hotels')
        const result = await response.json()
        console.log('response')
        console.log(result.Hotels)
        const final = result.Hotels
        setdata(final)
       }
       fetchdata()
  }, [])

  console.log(data)
  
  const [showmodal, setshowmodal] = useState(false)
  const [user, setuser] = useState('')
  const [emai, setemail] = useState('')
  function loginhandler (){
  console.log("clicked the login")
  setshowmodal(true)
  }

  function updatesuser (){
    console.log('user')
    console.log(user)
  }

  function userhandle(user, email){
    console.log('user function')
    console.log(user)
    setuser(user)
    setshowmodal(false)
    setemail(email)
  }
  return (
    <View style={styles.main}>
    {/* <View style={styles.container}>
      <Text style={styles.innerText}>Book your Hotel Now</Text>
      <Button style={styles.button} onPress = {loginhandler} title="Login" />
      {showmodal ? <Button style={styles.button} onPress = {loginhandler} title="History" /> : null}
    </View> */}
    {/* <View style={styles.box}>
       
    </View> */}



    <Header handleslog = {loginhandler} visible = {showmodal}  users={user} email={emai} />
    <View style = {styles.sub}>
    {data.map((item, index) => <Compos datas={item} users={user} key={index} usersdata = {updatesuser} handleslog={loginhandler} visible = {showmodal} handleuser={userhandle} /> )}
    </View>
    {/* <Compos datas={data} handleslog={loginhandler} visible = {showmodal} handleuser={userhandle} />  */}
    {/* <Compos handleslog={loginhandler} visible = {showmodal} handleuser={userhandle} /> */}

    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    //alignItems: 'center',
    flexDirection: 'column',
    //justifyContent: 'space-between',
    flex: 1
  },
  sub : {
   flexDirection: 'row'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //flex: 0.5,
    height: 100,
    width : "100%",
    backgroundColor: 'red',
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
  button: {
    position: 'absolute',
    color: 'red',
    marginLeft : '200'
  },
  box : {
    height: 200,
    width: 400,
    //flex:1,
    marginTop: 40,
    marginLeft: 40,
    backgroundColor: "blue"
  }
});
