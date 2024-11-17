import './Switch.css';
import React from 'react';

export const Switch = ({state, stateUpdater}) => {
    console.log(state)
    const onChange = (event) => {
        console.log('run' ,event)
        stateUpdater(event.target.checked)
    }
    return (
        <label className="switch">
            <input type="checkbox" value={state} onChange={onChange}/>
            <span className="slider round"></span>
        </label>
    );

}
