import AsyncStorage from "@react-native-async-storage/async-storage";

export const SET_USER_PROFILE = 'SET_USER_PROFILE';

export function setUserProfile(user,callback){
    return function(dispatch){
         dispatch({type:SET_USER_PROFILE,payload:JSON.parse(data)})
         callback(null,user)
    }
}

export function getUserProfile(callback){
    return async function(dispatch){
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
            dispatch({type:SET_USER_PROFILE,payload:JSON.parse(value)})
            callback(false,value)
        }else{
            callback(true,value)
        }
         
    }
}
