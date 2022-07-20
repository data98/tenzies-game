import { useEffect, useState } from 'react';
import './App.css';
import Die from './components/Die.js';
import { v4 } from 'uuid';
import Confetti from 'react-confetti'

const App = () => {
  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random()*6),
      isHeld: false,
      id: v4()
    }
  }
  
  const allNewDice = () => {
    let newArr = []
    for(let i = 0; i < 10; i++){
      newArr.push(generateNewDie())
    } 
    return newArr;
  }

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTesnzies] = useState(false)

  const rollDice = () => {
    tenzies ? setDice(prevDice => prevDice.map(die => {
      setTesnzies(false)
      return generateNewDie()
    }))
    : setDice(prevDice => prevDice.map(die => {
      return die.isHeld
      ? die
      : generateNewDie()
    }))
  }

  const holdDice = (id) => {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id 
      ? {...die, isHeld: !die.isHeld}
      : die
    }))
  }

  const diceElem = dice.map(die => 
  <Die 
    value={die.value} 
    isHeld={die.isHeld} 
    holdDice={() => holdDice(die.id)} 
    key={die.id} />)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const allSame = dice.every(die => die.value === dice[0].value)
    if(allHeld && allSame) setTesnzies(true) 
  }, [dice])

  return (
    <main>
      <div className="tenzies-container center">
        {tenzies && <Confetti className='fix-height' />}
        <div className="card ">
          <div className="desc">
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
          </div>
          <div className="card-dice">
            {diceElem}
          </div>
          <div className="center">
            <button onClick={rollDice} className="btn">{tenzies ? "New Game" : "Roll"}</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
