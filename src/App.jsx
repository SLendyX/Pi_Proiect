import React from "react"
import Arbore from "./Arbore"
import Alezaj from "./Alezaj"
import * as tableobj from "./tables"

function App() {
  //tables
  const {fundamentalTolerances, toleranceGap, gapLimits} = tableobj
  const {shaftJStepGap, shaftUpperLimits, shaftLowerLimits} = tableobj
  const {deltas, hubLowerLimits, hubUpperLimits} = tableobj

  //state
  const [nominalSize, setNominalSize] = React.useState(20)
  const [hasError, setHasError] = React.useState(false)

  const [shaftLetter, setShaftLetter] = React.useState("a")
  const [shaftNumber, setShaftNumber] = React.useState("01")
  const [shaftLowerLimit, setShaftLowerLimit] = React.useState(undefined)
  const [shaftUpperLimit, setShaftUpperLimit] = React.useState(undefined)
  
  const [hubLetter, setHubLetter] = React.useState("A")
  const [hubNumber, setHubNumber] = React.useState("01")
  const [hubLowerLimit, setHubLowerLimit] = React.useState(undefined)
  const [hubUpperLimit, setHubUpperLimit] = React.useState(undefined)

  function calculateTolerance(e, operation=-1){
    if(operation === 0)
      setShaftLetter(e.target.value)
    else if(operation === 1)
      setShaftNumber(e.target.value)
    else if(operation === 2)
      setHubLetter(e.target.value)
    else if(operation === 3)
      setHubNumber(e.target.value)
    else{
      e.preventDefault()

      const toleranceGapIndex = toleranceGap.findIndex(([inferior, superior]) => (inferior < nominalSize && nominalSize <= superior))
      const limitGapIndex = gapLimits.findIndex(([inferior, superior]) => (inferior < nominalSize && nominalSize <= superior))
      if(toleranceGapIndex !== -1 && limitGapIndex !==-1){
        let tolerance = fundamentalTolerances[toleranceGapIndex][shaftNumber]
        calculateShaft(tolerance, limitGapIndex)

        tolerance = fundamentalTolerances[toleranceGapIndex][hubNumber]
        calculateHub(tolerance, limitGapIndex)
      }else
        changeAllIndicators()
    }
  }

  function calculateShaft(tolerance, limitGapIndex){
    const upperLimitLetters = ["a", "b", "c", "cd", "d", "e", "ef", "f", "fg", "g", "h", "js"]
    let upperLimit, lowerLimit;
    if(upperLimitLetters.indexOf(shaftLetter)!==-1){
      if(shaftLetter === "js"){
        if(shaftNumber >= 7 && shaftNumber<=11){
          tolerance = tolerance%2? tolerance-1 : tolerance
        }
        upperLimit = tolerance/2
        lowerLimit = -upperLimit
      }else{
        upperLimit = shaftUpperLimits[limitGapIndex][shaftLetter]
        lowerLimit = upperLimit !== undefined ? upperLimit - tolerance : undefined
      }
      
    }else{
      const shaftLowerLimitLine = shaftLowerLimits[limitGapIndex]
      
      if(shaftLetter === "j"){
        const jStepGapIndex = shaftJStepGap.findIndex(array => array.indexOf(shaftNumber) !== -1)
        
        if(jStepGapIndex !== -1)
          lowerLimit = shaftLowerLimitLine.j[jStepGapIndex]
        
      }else if(shaftLetter === "k"){
        const kStepGapIndex = (shaftNumber >=4 && shaftNumber <=7) ? 0 : 1
        lowerLimit = shaftLowerLimitLine.k[kStepGapIndex]
      }else{
        lowerLimit = shaftLowerLimitLine[shaftLetter]
      }
      
      upperLimit = lowerLimit!== undefined ? lowerLimit+tolerance : undefined
    }

    setShaftLowerLimit(lowerLimit)
    setShaftUpperLimit(upperLimit)
    
    // console.log(`${tolerance} μm`)
    // console.log(`es=${upperLimit!==undefined ? upperLimit : "----"} μm, ei=${lowerLimit!==undefined ? lowerLimit : "----"} μm`)
  }

  function calculateHub(tolerance, limitGapIndex){
    const lowerLimitLetters = ['A', 'B', 'C', 'CD', 'D', 'E', 'EF', 'F', 'FG', 'G', 'H', 'JS']
    let upperLimit, lowerLimit;
    if(lowerLimitLetters.indexOf(hubLetter)!==-1){
      if(hubLetter === "JS"){
        if(hubNumber >= 7 && hubNumber<=11){
          tolerance = tolerance%2 ? tolerance-1 : tolerance
        }
        upperLimit = tolerance/2
        lowerLimit = -upperLimit
      }else{
        lowerLimit = hubLowerLimits[limitGapIndex][hubLetter]
        upperLimit = lowerLimit !== undefined ? lowerLimit + tolerance : undefined
      }
    }else{
      const hubUpperLimitLine = hubUpperLimits[limitGapIndex]
      
      if(hubLetter === "J")
        upperLimit = hubUpperLimitLine.J[["6","7","8"].indexOf(hubNumber)]
      else if(hubNumber < 3)
        upperLimit = undefined
      else{
        if("KMN".indexOf(hubLetter)!==-1){
          if(hubNumber<=8)
            upperLimit = hubUpperLimitLine[hubLetter][0] + deltas[Math.floor(limitGapIndex/2)][hubNumber]
          else
            upperLimit = hubUpperLimitLine[hubLetter][1]
        }else{
          if(hubNumber <=7)
            upperLimit = hubUpperLimitLine[hubLetter] + deltas[Math.floor(limitGapIndex/2)][hubNumber]
          else
            upperLimit = hubUpperLimitLine[hubLetter]
        }
      }

      lowerLimit = upperLimit!== undefined ? upperLimit - tolerance : undefined
    }

    setHubLowerLimit(lowerLimit)
    setHubUpperLimit(upperLimit)
    
    // console.log(`${tolerance} μm`)
    // console.log(`Es=${upperLimit!==undefined ? upperLimit : "----"} μm, Ei=${lowerLimit!==undefined ? lowerLimit : "----"} μm`)
  }

  function changeAllIndicators(value = undefined){
    setHubUpperLimit(value)
    setHubLowerLimit(value)
    setShaftLowerLimit(value)
    setShaftUpperLimit(value)
  }

  React.useEffect(() =>{
    const toleranceGapIndex = toleranceGap.findIndex(([inferior, superior]) => (inferior < nominalSize && nominalSize <= superior))
    const limitGapIndex = gapLimits.findIndex(([inferior, superior]) => (inferior < nominalSize && nominalSize <= superior))
    if(toleranceGapIndex !== -1 && limitGapIndex !==-1){
      let tolerance = fundamentalTolerances[toleranceGapIndex][shaftNumber]
        calculateShaft(tolerance, limitGapIndex)
        
        tolerance = fundamentalTolerances[toleranceGapIndex][hubNumber]
        calculateHub(tolerance, limitGapIndex)
    }else
      changeAllIndicators()

  }, [shaftLetter, shaftNumber, hubNumber, hubLetter, nominalSize])

  function getNominalSize(target){
    
    setNominalSize(oldNominalSize =>{
      const newValue = target.value === "" ? "" : Number(target.value)
      if(newValue === "" || newValue<=50){
        setHasError(false)
        if(newValue < 20)
          setHasError(true)

        return newValue
      }
      else{
        setHasError(true)
        return newValue < 1000 ? newValue : oldNominalSize
      }
    }); 
  }

  const backgroundStyle = {backgroundColor: (nominalSize >=20 && nominalSize<=50) ? "white" : "#FF0000"}

  return (
    <>
      <form onSubmit={e=>calculateTolerance(e)}>
        <div className="table">
          <label class="nominal-size-label" htmlFor="nominal-size">Dimensiune nominala</label>
          <div className="nominal-size-container">
            <div className="nominal-input-container">
              <input id="nominal-size" maxLength={2} className="nominal-size" style={backgroundStyle} type="number" name="dimensiune-nominala" value={nominalSize} onInput={({target}) => getNominalSize(target)}/>
              <span> mm</span>  
            </div>
            <p className={`warning ${hasError ? "" : "hidden"}`}>Trebuie in intervalul [20, 50]</p>
          </div>
          <Arbore {...{calculateTolerance, shaftLetter, shaftNumber, shaftLowerLimit, shaftUpperLimit}}/>    

          <Alezaj {...{calculateTolerance, hubLetter, hubNumber, hubLowerLimit, hubUpperLimit}}/>
        </div>
        <button>Calculate</button>
      </form>
    </>
  )
}

export default App
