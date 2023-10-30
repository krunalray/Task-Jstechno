
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {View,StyleSheet,ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import {getUserProfile} from './action';
import { Button, Card, Text,TextInput } from 'react-native-paper';
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import DropdownAlert, {
    DropdownAlertData,
    DropdownAlertType,
  } from 'react-native-dropdownalert';
import database from '@react-native-firebase/database';
const Gmap = (props) =>{    
    
    const [isLoading, setIsLoading] = useState(false);
    const [initialRegion, setInitialRegion] = useState({
        latitude: 22.309425,
        longitude: 72.136230,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
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
            }));
           
            Geolocation.getCurrentPosition((info) => {
                var currentLocation = {
                    latitude :info.coords.latitude,
                    longitude: info.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                };
                 setInitialRegion(currentLocation);
                });
                
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

    
   const saveCurrentLoation = async() =>{
    setIsLoading(true);
    try{
        await database()
        .ref('/users/'+props.user.uid)
        .set({
            location: initialRegion,
            user_id: props.user.uid,
        })
        .then(async(e) =>{ 
            await alert({
            type: DropdownAlertType.Success,
            title: 'Success',
                message: 'Location added successfully',
            }); 
          setIsLoading(false)});
    }catch{
        console.log("error");
        alert({
            type: DropdownAlertType.Error,
            title: 'Error',
                message: 'Something wrong please contact administrator',
            }); 
        setIsLoading(false);
        
    }
   
   }
   let alert = (_data: DropdownAlertData) => new Promise<DropdownAlertData>(res => res);
    return  (
        <View style={[{elevation:2,zIndex:20,flex:1}]}>
            <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={initialRegion}
            >
            <Marker
                coordinate={{latitude: initialRegion.latitude, longitude: initialRegion.longitude}}
                title={"Current Location"}
                />
            </MapView>
            <Card style={{borderRadius:0,flex:1}}>
                <Card.Title title="Current Location" />
                    <Card.Content style={{paddingHorizontal:10}}>
                        <Text variant="bodyMedium">Latitude: {initialRegion.latitude}</Text>
                        <Text variant="bodyMedium">Longitude: {initialRegion.longitude}</Text>
                        <View style={{marginVertical:20,marginBottom:10}}>
                            <Button mode="contained" onPress={()=>saveCurrentLoation()}>
                                <Text variant="titleMedium" style={{color:"#FFF"}}>Save</Text>
                            </Button>
                        </View>
                    </Card.Content>
                    
                
            </Card>
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
            <DropdownAlert alert={func => (alert = func)} />
      </View>
    )
};
function mapStateToProps(state) {
    return {
      user: state.data.user,
      
     };
  }
export default connect(mapStateToProps,{getUserProfile})(Gmap);

const styles = StyleSheet.create({
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        top:50,
      },
      map: {
        width:'100%',
        height:'60%'
      },
   });