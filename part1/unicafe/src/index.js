import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <button onClick = {onClick}>
    {text}
  </button>
)

const StatisticLine = (props) => (
  <div>
    {props.text} {props.value}
  </div>
)

const Statistics = (props) => {
  if (props.all.length === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <StatisticLine text = "good" value = {props.good} />
      <StatisticLine text = "neutral" value = {props.neutral} />
      <StatisticLine text = "bad" value = {props.bad} />
      <StatisticLine text = "average" value = {props.all.reduce((a, b) => a + b, 0) / props.all.length} />
      <StatisticLine text = "positive" value = {props.good/props.all.length} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(allClicks.concat(1))
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allClicks.concat(0))
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(allClicks.concat(-1))
  }

  return (
    <div>
      <h1>give feedback</h1>
        <Button onClick = {handleGoodClick} text = 'good' />
        <Button onClick = {handleNeutralClick} text = 'neutral' />
        <Button onClick = {handleBadClick} text = 'bad' />
      <h1>statistics</h1>
        <Statistics good = {good} neutral = {neutral} bad = {bad} all = {allClicks}/>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))