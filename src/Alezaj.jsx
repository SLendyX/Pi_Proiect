import React from "react";

export default function({calculateTolerance, hubLetter, hubNumber, hubLowerLimit, hubUpperLimit}){
    const toleranceLetterHub =['A', 'B', 'C', 'CD', 'D', 'E', 'EF', 'F', 'FG', 'G', 'H', 'JS', 'J', 'K', 'M', 'N', 'P', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z', 'ZA', 'ZB', 'ZC']
    const toleranceNumberHub = ["01", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"]
    return (
        <div className="Alezaj">
            <label>
            <select onChange={e=>calculateTolerance(e, 2)} className="hub-tolerance-letter" value={hubLetter}>
              {toleranceLetterHub.map((tolerance, index) => (<option key={index} value={tolerance}>{tolerance}</option>))}
            </select>
            <select onChange={e=>calculateTolerance(e, 3)} className="hub-tolerance-number" value={hubNumber}>
              {toleranceNumberHub.map((tolerance, index) => (<option key={index}>{tolerance}</option>))}
            </select>
          </label>
          <br/>
          <label>
            Es
            <input readOnly value={hubUpperLimit!== undefined ? Number((hubUpperLimit/1000).toFixed(5)) : "----"}/>
          </label>
          <label>
            Ei
            <input readOnly value={hubLowerLimit!== undefined ? Number((hubLowerLimit/1000).toFixed(5)) : "----"}/>
          </label>
        </div>
    )
}