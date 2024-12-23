import React from "react";

export default function({calculateTolerance, hubLetter, hubNumber, hubLowerLimit, hubUpperLimit}){
    const toleranceLetterHub =['A', 'B', 'C', 'CD', 'D', 'E', 'EF', 'F', 'FG', 'G', 'H', 'JS', 'J', 'K', 'M', 'N', 'P', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z', 'ZA', 'ZB', 'ZC']
    const toleranceNumberHub = ["01", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"]
    return (
        <>
            <label htmlFor="hub-tolerance">Toleranta alezaj</label>
            <div id="hub-tolerance" className="tolerence">
              <select onChange={e=>calculateTolerance(e, 2)} className="hub-tolerance-letter" value={hubLetter}>
                {toleranceLetterHub.map((tolerance, index) => (<option key={index} value={tolerance}>{tolerance}</option>))}
              </select>
              <select onChange={e=>calculateTolerance(e, 3)} className="hub-tolerance-number" value={hubNumber}>
                {toleranceNumberHub.map((tolerance, index) => (<option key={index}>{tolerance}</option>))}
              </select>
            </div>
          <label htmlFor="hub-upper-limit" className="limit-labels">Es</label>
          <input id="hub-upper-limit" readOnly value={hubUpperLimit!== undefined ? `${Number((hubUpperLimit/1000).toFixed(5))} mm` : "----"}/>
          <label htmlFor="hub-lower-limit" className="limit-labels">Ei</label>
          <input id="hub-lower-limit" readOnly value={hubLowerLimit!== undefined ? `${Number((hubLowerLimit/1000).toFixed(5))} mm` : "----"}/>
        </>
    )
}