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
  if ((props.good+props.neutral+props.bad) === 0) {
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
      <StatisticLine text = "average" value = {(props.good - props.bad) / (props.good+props.neutral+props.bad)} />
      <StatisticLine text = "positive" value = {props.good / (props.good+props.neutral+props.bad)} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
        <Button onClick = {handleGoodClick} text = 'good' />
        <Button onClick = {handleNeutralClick} text = 'neutral' />
        <Button onClick = {handleBadClick} text = 'bad' />
      <h1>statistics</h1>
        <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))