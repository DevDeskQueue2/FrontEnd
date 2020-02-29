import {
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    CATEGORY_START,
    CATEGORY_SUCCESS,
    CATEGORY_ERROR,
    ADD_TICKET_START,
    ADD_TICKET_SUCCESS,
    ADD_TICKET_ERROR,
    FETCH_TICKETS_START,
    FETCH_TICKETS_SUCCESS,
    FETCH_TICKETS_ERROR,
    EDIT_TICKET_START,
    EDIT_TICKET_SUCCESS,
    EDIT_TICKET_ERROR,
} from "../actions/index";


const initialState = {
    userName: "",
    userType : "",
    error: "",
    signedUp: false,
    isSigningUp : false,
    isFetching : false,
    category: [],
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
                userName : action.payload.userName,
                token : action.payload.token

            }
        case LOGIN_ERROR: 
            return {
                ...state,
                isFetching :false,
                error: action.payload
            }
        case CATEGORY_START:
            return {
                ...state,
                isFetching: true,

            }
        case CATEGORY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                category: action.payload
            }
        case CATEGORY_ERROR:
            return {
                ...state,
                isFetching: false,
                error : action.payload
            }
        case ADD_TICKET_START:
            return {
                ...state,
                isFetching: true,
                
            }
        case ADD_TICKET_SUCCESS:
            return {
                ...state,
                isFetching: false,
                tickets : action.payload
            }
        case ADD_TICKET_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        case FETCH_TICKETS_START:
            return {
                ...state,
                isFetching: true,
            }
        case FETCH_TICKETS_SUCCESS:
            return {
                ...state,
                isFetching : false,
                tickets: action.payload
            }
        case FETCH_TICKETS_ERROR:
            return{
                ...state,
                isFetching: false,
                error: action.payload
            }

        case EDIT_TICKET_START: 
            return{
                ...state,
                isFetching: true,
            }
        case EDIT_TICKET_SUCCESS:
            return{
                ...state,
                isFetching: false,
                tickets: action.payload
            }
        case EDIT_TICKET_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        default :
            return state
    };
};


export default devDeskReducer;