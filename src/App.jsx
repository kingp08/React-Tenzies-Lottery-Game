import React from 'react'
import Die from './component/Die'
import Timer from './component/Timer'
import Confetti from "react-confetti"

export default function App(){

    const [dice, setDice] = React.useState(allNewDice())

    const [tenzies, setTenzies] = React.useState(false)

    const [isStarted, setIsStarted] = React.useState(false)

    const [isCongrat, setIsCongrat] = React.useState(false)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setIsCongrat(true)
            setTenzies(true)
            setIsStarted(false)
            console.log("You won!")
        }
    }, [dice])
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                id: i,
                value: Math.ceil(Math.random() * 6), 
                isHeld: false
            })
        }
        return newDice
    }

    function holdDice(id) {
        // console.log(id)
        setDice(oldDice => oldDice.map(die => {
            if (die.id === id){
                setIsStarted(true)
                return {...die, isHeld: !die.isHeld}
            }else{
                return die
            }
        }))
    }

    const diceElements = dice.map(die => 
        <Die 
            key={die.id} 
            value={die.value} 
            held={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    )

    function rollDice() {
        tenzies ? 
        setTenzies(false) & setDice(allNewDice()) & setIsCongrat(false)
        :
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld === true ?  die :
            {...die, value: Math.ceil(Math.random() * 6)}
        }))
    }

    return(
        <main className='the-game'>
        {tenzies && <Confetti />}
            <div className='dice-title'>
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <Timer timerStarted={isStarted} isFinish={isCongrat} />          
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}