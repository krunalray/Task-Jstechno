
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {View,TouchableOpacity,ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import {getUserProfile} from './action';
import { Button, Card, Text,TextInput } from 'react-native-paper';

const Welcome = (props) =>{
    
    
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
        useEffect(()=>{
            setIsLoading(true);
            dispatch(getUserProfile(function(err,result){
                if(!err){
                    setIsLoading(false);
                }else{
                    setIsLoading(false);
                    props.navigation.navigate('Register');  
                }
            }))
        },[])
    
     if(props.user === undefined)  {
        return(
            <View style={{position:'absolute',backgroundColor:"rgba(0,0,0,0.5)",flex:1,height:'100%',width:'100%',alignSelf: "stretch",borderRadius:10}}>
                    <View style={{top:'50%',right:'50%',position:'absolute'}}>
                        <ActivityIndicator size="large" color="#FFF" />
                    </View>
                </View>
        )
     }
    
   
    return  (
        <View style={{flex:1,justifyContent:'center',paddingHorizontal:10,alignItems:'center'}}>
            <Text variant="headlineSmall" style={{color:'#222'}}>{props.user.email?'Welcome '+props.user.email:null}</Text>
              {
                isLoading?
                <View style={{position:'absolute',backgroundColor:"rgba(0,0,0,0.5)",flex:1,height:'100%',width:'100%',alignSelf: "stretch",borderRadius:10}}>
                    <View style={{top:'50%',right:'50%',position:'absolute'}}>
                        <ActivityIndicator size="large" color="#FFF" />
                    </View>
                </View>
                :
                null
            }
           
             
        </View>
    )
};
function mapStateToProps(state) {
    return {
      user: state.data.user,
      
     };
  }
export default connect(mapStateToProps,{getUserProfile})(Welcome);