import React from "react"

export default function({calculateTolerance, shaftLetter, shaftNumber, shaftUpperLimit, shaftLowerLimit}){
    const toleranceLetterShaft = [
        "a", "b", "c", "cd", "d", "e", "ef", "f", "fg", "g", "h", "js", "j", "k", 
        "m", "n", "p", "r", "s", "t", "u", "v", "x", "y", "z", "za", "zb", "zc"
    ]

    const toleranceNumberShaft = ["01", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"]
    return(
        <div className="arbore">
            <label>
                Arbore
                <select onChange={e=>calculateTolerance(e, 0)} className="shaft-tolerance-letter" value={shaftLetter}>
                    {toleranceLetterShaft.map((tolerance, index) => (<option key={index} value={tolerance}>{tolerance}</option>))}
                </select>
                <select onChange={e=>calculateTolerance(e, 1)} className="shaft-tolerance-number" value={shaftNumber}>
                    {toleranceNumberShaft.map((tolerance, index) => (<option key={index}>{tolerance}</option>))}
                </select>
            </label>

            <br/>

            <label>
                Es
                <input readOnly value={shaftLowerLimit!== undefined ? Number((shaftUpperLimit/1000).toFixed(5)) : "----"}/>
            </label>
            <label>
                Ei
                <input readOnly value={shaftLowerLimit!== undefined ? Number((shaftLowerLimit/1000).toFixed(5)) : "----"}/>
            </label>
        </div>
    )
}