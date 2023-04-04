import React from 'react';


const Input = (props) => {
    
    const { type, id, name, func } = props;
    return (
        <>
            <input className="form-control"
                type={type} 
                id={id}
                onChange={func}
                name={name}
                multiple
            />
        </>
    )
}

export default Input;



