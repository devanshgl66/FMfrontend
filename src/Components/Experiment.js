import React, { useState } from 'react'
const Temp=()=>{
    const [var1, setvar1] = useState(0)
    return{
        value:var1,
        code:<><button onClick={()=>setvar1(var1+1)}>Click me!</button></>
    }
}
const Experiment = () => {
    console.log(Temp())
    return (
        <div>
            <h1>Hello</h1>
            <h1>{Temp().value}</h1>
            {Temp().code}
        </div>
    )
}

export default Experiment
