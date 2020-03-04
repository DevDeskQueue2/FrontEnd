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


const initialState = {
    userName: "",
    userType : "student",
    currentType: "",
    error: "",
    isRegistered : false,
    isFetching : false,
    categories: [],
    tickets : [ {
        id: 0,
        title: 'Fix this please',
        description: 'Here is a description', 
        category: 'Other',
        status: 'In-progress', 
        tried: 'Turning on/off',
        author: 'Student #1',
        dateAdded: '2/28/20'
    },{
        id: 1,
        title: 'Fix this please',
        description: 'Here is a description', 
        category: 'Other',
        status: 'In-progress', 
        tried: 'Turning on/off',
        author: 'Student #1',
        dateAdded: '2/28/20'
    },{
        id: 2,
        title: 'Fix this please',
        description: 'Here is a description', 
        category: 'Other',
        status: 'In-progress', 
        tried: 'Turning on/off',
        author: 'Student #1',
        dateAdded: '2/28/20'
    },{
        id: 3,
        title: 'Fix this please',
        description: 'Here is a description', 
        category: 'Other',
        status: 'In-progress', 
        tried: 'Turning on/off',
        author: 'Student #1',
        dateAdded: '2/28/20'
    },{
        id: 4,
        title: 'Fix this please',
        description: 'Here is a description', 
        category: 'Other',
        status: 'In-progress', 
        tried: 'Turning on/off',
        author: 'Student #1',
        dateAdded: '2/28/20'
    }],
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
                token : action.payload

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
            }
        case REMOVE_USER_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.payload.message,
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