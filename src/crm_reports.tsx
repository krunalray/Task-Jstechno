
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {View,StyleSheet,ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import {getUserProfile} from './action';
import { Button, Card, Text,TextInput } from 'react-native-paper';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import DropdownAlert, {
    DropdownAlertData,
    DropdownAlertType,
  } from 'react-native-dropdownalert';

  const client = new ApolloClient({
    uri: 'http://localhost:4000/', // There's no remote URI for a local mock
    cache: new InMemoryCache(),
    
  });
  const LEAD_QUERY = gql`
  query {
    leads {
      id
      name
      status
      // Add more relevant fields as needed
    }
  }
`;
const CRM = (props) =>{    
    
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
            }));
            client.query({ query: LEAD_QUERY })
            .then(result => {
                console.log(result.data.leads);
            
            })
            .catch(error => {
              // Handle GraphQL API request errors
              console.error('Error fetching lead data:', error);
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

    
   let alert = (_data: DropdownAlertData) => new Promise<DropdownAlertData>(res => res);
    return  (
        <View style={[{elevation:2,zIndex:20,flex:1}]}>
          
           
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
export default connect(mapStateToProps,{getUserProfile})(CRM);

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