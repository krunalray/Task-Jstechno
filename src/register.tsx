
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {View,StyleSheet,TouchableOpacity,ActivityIndicator} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';
import { Form, Field } from 'react-final-form';
import { Avatar, Button, Card, Text,TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
//import { initializeApp } from '@react-native-firebase/app';
import DropdownAlert, {
    DropdownAlertData,
    DropdownAlertType,
  } from 'react-native-dropdownalert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = (props) =>{
    
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const dispatch = useDispatch();
    
    const handleFormSubmit = async(formProps) => {

        setIsLoading(true);
        await auth()
            .createUserWithEmailAndPassword(formProps.email, formProps.password)
            .then(async (e) => {
                setIsLoading(false);
                console.log(e);
                if(e.additionalUserInfo.user){
                   await AsyncStorage.setItem('user',JSON.stringify(e.additionalUserInfo.user));                     
                }
                await alert({
                    type: DropdownAlertType.Success,
                    title: 'Success',
                    message: 'User account created & signed in!',
                  });
                //console.log('User account created & signed in!');
            })
            .catch(async error => {
                setIsLoading(false);
                if (error.code === 'auth/email-already-in-use') {
                    await alert({
                        type: DropdownAlertType.Error,
                        title: 'Success',
                        message: 'That email address is already in use! please login',
                      });                
                }

                if (error.code === 'auth/invalid-email') {
                    await alert({
                        type: DropdownAlertType.Error,
                        title: 'Success',
                        message: 'That email address is already in use!',
                      }); 
                    console.log('That email address is invalid!');
                }
            });
        
    };
    let alert = (_data: DropdownAlertData) => new Promise<DropdownAlertData>(res => res);
    return  (
        <View style={{flex:1,justifyContent:'center',paddingHorizontal:10,backgroundColor:'#fff'}}>
            <Card>
              <Card.Content style={{paddingHorizontal:10}}>
              <Form
                      onSubmit={handleFormSubmit}
                      initialValues={props.address?props.address:{country_id:'223'}}
                      validate={formProps => {
                        const errors = {}
                        if (!formProps.email) {
                          errors.email = 'Required Email';
                        }
                        if(formProps.email){
                            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                            if (reg.test(formProps.email) === false) {
                                errors.email = 'Please enter valid email.';
                              }
                        }
                        if (!formProps.password) {
                          errors.password = 'Required password';
                        }
                        return errors
                      }}
                      render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <View>
                        
                        <Field name="email">
                            {({ input, meta }) => (
                            <View>
                                <TextInput
                                    error={errorEmail}
                                    label="Email"
                                    value={input.value}
                                    onChangeText={text => input.onChange(text)}
                                    />
                                    {(meta.error || meta.submitError) && meta.touched && (
                                        <Text variant="labelSmall" style={{color:'red'}}>{meta.error}</Text>
                                     )}                               
                            </View>
                            )}
                            </Field>
                            <View style={{marginTop:10}}>
                                <Field name="password" >
                                {({ input, meta }) => (
                                    <View>
                                        <TextInput
                                            error={errorEmail}
                                            label="Password"
                                            value={input.value}
                                            onChangeText={text => input.onChange(text)}
                                            />
                                            {(meta.error || meta.submitError) && meta.touched && (
                                                <Text variant="labelSmall" style={{color:'red'}}>{meta.error}</Text>
                                            )}                               
                                    </View>
                                    )}
                                </Field>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                <TouchableOpacity style={{marginLeft:5}} onPress={()=>props.navigation.navigate('Login')}>
                                    <Text style={{ color: '#222', fontSize: 15, marginTop: 20}} >Already have an account? Login</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginVertical:20}}>
                                <Button mode="contained" onPress={handleSubmit}>
                                    <Text variant="titleMedium" style={{color:"#FFF"}}>Submit</Text>
                                </Button>
                            </View>
                            <View style={{marginVertical:20,alignItems:'center'}}>
                                <View style={{marginBottom:10}}>
                                    <GoogleSigninButton
                                    size={GoogleSigninButton.Size.Wide}
                                    color={GoogleSigninButton.Color.Dark}                                
                                    />
                                </View>
                                <Text style={{marginBottom:10}}>OR</Text>
                                <LoginButton/>
                            </View>
                        </View>
              )}
            />
              </Card.Content>
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
            </Card>
            <DropdownAlert alert={func => (alert = func)} />
             
        </View>
    )
};

export default Register;