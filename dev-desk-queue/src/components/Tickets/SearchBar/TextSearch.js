import React from 'react';

const TextSearch = props => {
    return (
        <div className='text-search'>
            <input 
                type='text' 
                placeholder={props.placeholder}
                name={props.type}
                onChange={(evt) => {
                    props.onUserTextRequest({[evt.target.name]: evt.target.value})
                    console.log(evt.target.value)
                }} 
            />
        </div>
    )
}

export default TextSearch;