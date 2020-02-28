import {
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_ERROR,

} from "../actions/index";


const initialState = {
    userName: "",
    userType : "",
    error: "",
    signedUp: false,
    isSigningUp : false,
    isFetching : false,
    tickets : [],
    token : localStorage.getItem("token")
}



const devDeskReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGNUP_START: 
            return {
                ...state,
                isSigningUp: true
            }
        case SIGNUP_SUCCESS: 
            return {
                ...state,
                isSigningUp : false,
                signedUp: true,
            }
        case SIGNUP_ERROR: 
            return {
                ...state,
                isSigningUp: false,
                error: action.payload,
            }
        case LOGIN_START :
            return {
                ...state,
                isFetching: true,

            }
        case LOGIN_SUCCESS :
            return {
                ...state,
                isFetching :false,
                userName : "Set username",

            }
        
        
        
        default :
        return state
    };
};


export default devDeskReducer;