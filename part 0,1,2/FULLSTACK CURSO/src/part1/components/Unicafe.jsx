import { useState } from "react"

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const calculateAverage = () => all === 0 ? 0 : (good - bad) / all;
  const calculatePositive = () => all === 0 ? 0 : (good / all) * 100 + '%';

  return (
    <>
      <h3>Statistics</h3>

      {all === 0 ? (

        <p>No feedback given</p>

      ) : (

        <>

          <b>Statistics LINE</b>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={calculateAverage()} />
          <StatisticLine text='positive' value={calculatePositive() }/>
          <br/>

          <b>Statistics TABLE</b>
          <table>
            <tbody>
            <StatisticCell text='good' value={good} />
            <StatisticCell text='neutral' value={neutral} />
            <StatisticCell text='bad' value={bad} />
            <StatisticCell text='all' value={all} />
            <StatisticCell text='average' value={calculateAverage()} />
            <StatisticCell text='positive' value={calculatePositive()} />
            </tbody>
          </table>
        </>
      )}


    </>
  )
}

const StatisticLine = ({ text, value }) => <div>{text} {value}</div>
const StatisticCell = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>
const Button = ({ onClick, text }) => <button onClick={onClick}> {text} </button>

const Unicafe = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>

      <h3>GIVE FEEDBACK</h3>

      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />



    </div>
  )
}





export default Unicafe