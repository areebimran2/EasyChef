
import {React, useContext }from 'react';
import Input from '../input';
import RecipeAPIContext from '../../../contexts/recipeAPIcontext';

const FormDiv = (props) => {

        const { type, id, label, name, func } = props
        return (
            <>
                <div className="d-flex mb-3">
                    <label className="form-label mb-auto mt-auto me-2">{label}:</label>
                    <Input
                        type={type}
                        id={id}
                        name={name}
                        onChange={func}
                    />
                </div>
                
            </>
        )
    
}

export default FormDiv;


