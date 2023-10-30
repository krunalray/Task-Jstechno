import {
    SET_USER_PROFILE
} from './action';
const initial_state = {
    
};

export default function(state = initial_state,action){
    switch(action.type){
        case SET_USER_PROFILE : 
            return {...state,user:action.payload}
        default:
            return state;
    }
}