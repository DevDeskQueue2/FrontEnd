import React from "react";
import axios from "axios";



export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";


const signUp = state => dispatch => {
    dispatch({ type : SIGNUP_START})
    return axios.post("whatever link to post", state)
        .then(res => {
            dispatch({type : SIGNUP_SUCCESS})

        })
        .catch(err => {
            dispatch ({type: SIGNUP_ERROR, payload: err})

        })
};


export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";


const login = state => dispatch => {

    dispatch({type :LOGIN_START})
    return axios.post("link", state)
    .then(res => {
        dispatch({type: SIGNUP_SUCCESS, payload: res.data})
        

    })
}