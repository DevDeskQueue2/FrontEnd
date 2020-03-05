import React from 'react';
import {connect} from "react-redux";

const GeneralTicket = props => {

    const renderHelperInformation = () => {
        if(props.userType === '1') {
            return (
                    <h4>Author: {props.ticket.student.username}</h4>
            )
        }
    }

    const renderStudentInformation = () => {
        if(props.userType === '0') {
            return (
                <h4>Helper: {props.ticket.helper.username}</h4>
            )
        }
    }

    return (
        <div className='general-ticket' onClick={() => props.onTicketClick(props.ticket.ticket.id)}>
            {/* This ticket will display all of the information and not be editable, when clicked will have a popup */}
            
            <div className='status-container'>
                {props.ticket.ticket.status}
            </div>
            
            <h4>Title: {props.ticket.ticket.title}</h4>
            <p>Description: {props.ticket.ticket.description}</p>
            <p>What I've tried: {props.ticket.ticket.tried}</p>
            <h4>Category: {props.ticket.ticket.category}</h4>
            {/* <h4>Date Added: {props.ticket.ticket.dateAdded}</h4> */}
        
            {/* { renderHelperInformation() }
            { renderStudentInformation() } */}
            {props.userType === "1"?  <div>Student Name : {props.ticket.student.username}</div>: null}

        </div>
    )
}

const mapStateToProps = state => {
    return {
        userType: state.userType,

    }
}

export default connect(mapStateToProps, {})(GeneralTicket);