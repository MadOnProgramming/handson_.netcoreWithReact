// import React from 'react'
import { Duck } from './Ducks'

interface props{
    duck:Duck,    
}

export default function DuckItem(prop:props) {
  return (
        <div>
            <span>{prop.duck.Name}</span>
            {/* we are specifying a callback function to defer the execution of the 
            function only on clicking the button  */}
            <button onClick={() => { console.log(prop.duck.Name + " quacks") }}>{prop.duck.Name}</button>
        </div>
  )
}
