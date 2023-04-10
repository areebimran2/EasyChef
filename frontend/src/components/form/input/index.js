import React from 'react';


const Input = (props) => {
    
    const { type, id, name, func, value } = props;
    return (
        <>
            <input className="form-control"
                type={type} 
                id={id}
                onChange={func}
                name={name}
                multiple
                defaultValue={value}
            />
        </>
    )
}

export default Input;



