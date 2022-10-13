import React, { useState } from 'react';
import { AudioRecord } from '../pages/AudioRecord';

export const InputTime = () => {
    const [time, setTime] = useState();

    const onChange =(e)=>{
        setTime(e.target.value)
        // setTime('');
    }

    const onReset = () =>{
        setTime('');
    }
    return( 
        <div>
            <input type='number' onChange={onChange}  />
            <button onClick={onReset}>Reset</button>
            <div>
                <b>값: {time} </b>
            </div>
            <AudioRecord time={time} />
        </div>
    
    )
};
