import React from 'react';

const TextSearch = props => {
    return (
        <div className='text-search'>
            <input 
                type='text' 
                placeholder={props.placeholder} 
                onChange={(evt) => props.onUserTextRequest({[props.type]: evt.target.value})} />
        </div>
    )
}

export default TextSearch;