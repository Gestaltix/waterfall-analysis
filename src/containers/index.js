import React, { Component } from 'react';
import TopHalf from '../components/top-half';
import CompanyRow from '../components/company-row';
import funct from '../assets/function.js'
import './index.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wrong: false,
      wrongEven: false,
      investors: [{}, {}],
      exitValue: null,
      results: [],
    }
  }
  updateInvestors = (index, investor) => {
    let newInvestors = this.state.investors
    newInvestors[index] = investor
    this.setState({
      investors: newInvestors
    })
  }
  makeNewRow = () => {
    let newInvestors = this.state.investors
    newInvestors.push({})
    this.setState({
      investors: newInvestors
    })
  }
  calculate = () => {
    let formsFilled = true
    for (let x = 0; x > this.state.investors.length; x++) {
      if (!this.state.investors[x].shares || !this.state.investors[x].invested) {
        formsFilled = false
      }
    }
    if (formsFilled && this.state.exitValue) {
      this.setState({
        wrong: false,
        results: funct(this.state.exitValue, this.state.investors.reverse()).reverse()
      })
    } else {
      this.setState({
        wrong: true,
        wrongEven: !this.state.wrongEven,
      })
    }
  }
  parse = (item) => {
    let newItem = item
    return newItem.split('').filter((n) => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(n)).join('')
  }
  setExitValue = (e) => {
    this.setState({
      exitValue: parseInt(this.parse(e.currentTarget.value))
    })
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <TopHalf />
        <CompanyRow index={0} key={0} founders result={this.state.results ? this.state.results[0] : null} updateInvestors={this.updateInvestors} />
        {this.state.investors.map((investor, index) => {
          return index === 0 ? null : <CompanyRow
            key={index}
            index={index}
            updateInvestors={this.updateInvestors}
            result={this.state.results ? this.state.results[index] : null} />
        })}
        <button className='AddInvestor' onClick={this.makeNewRow}>Add an investor</button>
        {this.state.wrong ? <div className='ErrorText'>
          <p className={this.state.wrongEven ? 'Red' : 'Orange'}>You need to fill ALL values before calculating.</p>
        </div> : null}
        <div className='Calculate'>
          <input type='text' placeholder='Exit Price' onChange={this.setExitValue} />
          <button onClick={this.calculate}>Calculate</button>
        </div>
      </div>
    );
  }
}

export default App;
