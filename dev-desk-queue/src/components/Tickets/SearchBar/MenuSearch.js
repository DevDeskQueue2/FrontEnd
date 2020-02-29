import React from 'react';
import { Select, InputLabel, MenuItem, FormControl  } from '@material-ui/core';

const MenuSearch = props => {

    const [info, setInfo]= React.useState({value: ''})

    React.useEffect( () => {
        props.onUserMenuRequest({[props.type]: info.value})
    }, [info])

    return (
        <div className='menu-search'>
            <FormControl>
                <InputLabel id="demo-simple-select-label">{props.placeholder}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.value}
                    onChange={evt => setInfo({value: evt.target.value})}
                >
                    {
                        props.menu.map(item => {
                            return <MenuItem value={item}>{item}</MenuItem> 
                        })
                    }  
                </Select>
            </FormControl>
        </div>
    )
}

export default MenuSearch;