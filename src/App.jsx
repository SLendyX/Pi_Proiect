import React from "react"
import Arbore from "./Arbore"
import Alezaj from "./Alezaj"

function App() {
  const toleranceLetterShaft = [
    "a", "b", "c", "cd", "d", "e", "ef", "f", "fg", "g", "h", "js", "j", "k", 
    "m", "n", "p", "r", "s", "t", "u", "v", "x", "y", "z", "za", "zb", "zc"
  ]
  const toleranceNumberShaft = ["01", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"]

  const toleranceGap = [[18,30], [30,50]]
  const fundamentalTolerances =
  [
    {
      "01": 0.6,
      "0": 1,
      "1": 1.5,
      "2": 2.5,
      "3": 4,
      "4": 6,
      "5": 9,
      "6": 13,
      "7": 21,
      "8": 33,
      "9": 52,
      "10": 84,
      "11": 130,
      "12": 210,
      "13": 330,
      "14": 520,
      "15": 840,
      "16": 1300,
      "17": 2100,
      "18": 3300
    },
    {
      "01": 0.6,
      "0": 1,
      "1": 1.5,
      "2": 3.5,
      "3": 4,
      "4": 7,
      "5": 11,
      "6": 16,
      "7": 25,
      "8": 39,
      "9": 62,
      "10": 100,
      "11": 160,
      "12": 250,
      "13": 390,
      "14": 620,
      "15": 1000,
      "16": 1600,
      "17": 2500,
      "18": 3900
    }
  ]

  const shaftLimitsGap = [[18, 24], [24, 30], [30, 40], [40, 50]]
  const shaftJStepGap = [['5', '6'], ['7'], ['8']]

  const shaftUpperLimits = [
    { a: -300, b: -160, c: -110, cd: undefined, d: -65, e: -40, ef: undefined, f: -20, fg: undefined, g: -7, h: 0},
    { a: -300, b: -160, c: -110, cd: undefined, d: -65, e: -40, ef: undefined, f: -20, fg: undefined, g: -7, h: 0},
    { a: -310, b: -170, c: -120, cd: undefined, d: -80, e: -50, ef: undefined, f: -25, fg: undefined, g: -9, h: 0},
    { a: -320, b: -180, c: -130, cd: undefined, d: -80, e: -50, ef: undefined, f: -25, fg: undefined, g: -9, h: 0}
  ]

  const shaftLowerLimits = [
    {j:[-4, -8, undefined], k:[2, 0], m:8, n:15, p:22, r:28, s:35, t:undefined, u:41, v:47, x:54, y:63, z:73, za:98, zb:136, zc:188},
    {j:[-4, -8, undefined], k:[2, 0], m:8, n:15, p:22, r:28, s:35, t:41, u:48, v:55, x:64, y:75, z:88, za:118, zb:160, zc:218},
    {j:[-5, -10, undefined],k:[2, 0], m:9, n:17, p:26, r:34, s:43, t:48, u:60, v:68, x:80, y:94, z:112, za:148, zb:200, zc:274},
    {j:[-5, -10, undefined], k:[2, 0], m:9, n:17, p:26, r:34, s:43, t:54, u:70, v:81, x:97, y:114, z:136, za:180, zb:242, zc:325},
  ]

  const [nominalSize, setNominalSize] = React.useState(0)

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
      calculateShaft()
    }
  }

  function calculateShaft(){
    const toleranceGapIndex = toleranceGap.findIndex(([inferior, superior]) => (inferior < nominalSize && nominalSize <= superior))
    const limitGapIndex = shaftLimitsGap.findIndex(([inferior, superior]) => (inferior < nominalSize && nominalSize <= superior))
    if(toleranceGapIndex >=0 && limitGapIndex >=0){
      let tolerance = fundamentalTolerances[toleranceGapIndex][shaftNumber]
      
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
      
      console.log(`${tolerance} μm`)
      console.log(`es=${upperLimit!==undefined ? upperLimit : "----"} μm, ei=${lowerLimit!==undefined ? lowerLimit : "----"} μm`)
    }
  }

  React.useEffect(() =>{
    calculateShaft()
  }, [shaftLetter, shaftNumber])

  return (
    <>
      <div>
        <form onSubmit={e=>calculateTolerance(e)} className="arbore">
        <label>
          Dimensiune nominala
          <input type="number" name="dimensiune-nominala" value={nominalSize} onInput={({target}) => setNominalSize(target.value)}/>
          </label>
          <Arbore {...{calculateTolerance, shaftLetter, shaftNumber, shaftLowerLimit, shaftUpperLimit}}/>    
          <br/>
          <br/>
          <Alezaj {...{calculateTolerance, hubLetter, hubNumber, hubLowerLimit, hubUpperLimit}}/>
          <button>Calculate</button>
        </form>
      </div>
    </>
  )
}

export default App
