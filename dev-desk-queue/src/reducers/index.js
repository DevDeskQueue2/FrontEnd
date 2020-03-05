import {
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    REMOVE_USER_START,
    REMOVE_USER_SUCCESS,
    REMOVE_USER_ERROR,
    UPDATE_USER_START,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
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
    FETCH_TICKETS_ID_START,
    FETCH_TICKETS_ID_SUCCESS,
    FETCH_TICKETS_ID_ERROR,
} from "../actions/index";


const User = JSON.parse(localStorage.getItem("userInfo"))

const initialState = {
    userInfo: User,
    username: User? User.username : "",
    userType : User? User.userType : "",
    userId: User? User.id : "",
    // currentType: "",
    error: "",
    isRegistered : false,
    isFetching : false,
    categories: [],
    tickets : [],
    userTickets: [],
    token : localStorage.getItem("token")
}



const devDeskReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGNUP_START: 
            return {
                ...state,
                isFetching: true
            }
        case SIGNUP_SUCCESS: 
            return {
                ...state,
                isFetching : false,
                isRegistered: true,
            }
        case SIGNUP_ERROR: 
            return {
                ...state,
                isFetching: false,
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
                isRegistered: false,
                isFetching :false,
                token : action.payload.token,
                username: action.payload.username,
                userId: action.payload.id,
                userType: action.payload.userType,
            }
        case LOGIN_ERROR: 
            return {
                ...state,
                isFetching :false,
                error: action.payload
            }
        case REMOVE_USER_START:
            return {
                ...state,
                isFetching: true,
            }
        case REMOVE_USER_SUCCESS: 
            return {
                ...initialState,
                message: action.payload,
            }
        case REMOVE_USER_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.payload.message,
            }
        case UPDATE_USER_START: 
            return {
                ...state,
                isFetching: true,

            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                username: action.payload.username,
                userType: action.payload.userType,
                userId: action.payload.id,
            }
        case UPDATE_USER_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.payload.errorMessage,
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
                categories: action.payload
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
        case FETCH_TICKETS_ID_START : 
            return {
                ...state,
                isFetching: true,
            }
        case FETCH_TICKETS_ID_SUCCESS:
            return {
                ...state,
                isFetching : false,
                userTickets: action.payload,
            }
        case FETCH_TICKETS_ID_ERROR :
            return {
                ...state,
                isFetching: false,
                error : action.payload
            }
        default :
            return state
    };
};


export default devDeskReducer;