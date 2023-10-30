import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {StatusBar,ActivityIndicator} from "react-native";
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';

import Login from './login';
import Register from './register';
import Welcome from './welcome';
import GoogleMap from './google_map';
//import { customerAuth } from '../len_modules/customer/customer_action';
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CRM from './crm_reports';
const Auth = createStackNavigator();
function AuthNavigator({ navigation }) {
  return (
    <Auth.Navigator>
      <Auth.Screen name="Register" component={Register}/>      
      <Auth.Screen name="login" component={Login}/>
    </Auth.Navigator>
  )
};

const Drawer = createDrawerNavigator();

function MyDrawer(data) {
  return (
    <Drawer.Navigator initialRouteName="Home" >
      <Drawer.Screen name="Home" component={Welcome} />
      <Drawer.Screen name="GoogleMap" component={GoogleMap} />
      <Drawer.Screen name="CRM Reports" component={CRM} />
    </Drawer.Navigator>
  );
}

const RootStack = createStackNavigator();

export default () => {
    const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  function onAuthStateChanged(user) {
    if(user !== null){
        setUser(user.uid);
        AsyncStorage.setItem('user',JSON.stringify(user));        
    }    
    //auth().signOut();
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
   auth().onAuthStateChanged(onAuthStateChanged);    
  }, []);
  if(initializing){
    return (
        <View style={{position:'absolute',backgroundColor:"rgba(0,0,0,0.5)",flex:1,height:'100%',width:'100%',alignSelf: "stretch",borderRadius:10}}>
        <View style={{top:'50%',right:'50%',position:'absolute'}}>
            <ActivityIndicator size="large" color="#FFF" />
        </View>
    </View>
    )
  }
  return (
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerMode: 'none' }}>
          {
            !user?
            <RootStack.Screen 
              name="Auth"
              component={AuthNavigator}
              options={{
                animationEnabled: false
              }}
            />
            :
            <RootStack.Screen
              name="App"
              component={MyDrawer}
              options={{
                animationEnabled: false
              }}
            />
          }
          
        
      </RootStack.Navigator>
      </NavigationContainer>
  );
}; 