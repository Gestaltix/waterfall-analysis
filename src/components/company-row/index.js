import React, { Component } from 'react';
import './index.css'

const f = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2
})

class CompanyRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            invested: '',
            shares: '',
        }
    }
    parse = (item) => {
        let newItem = item
        return newItem.split('').filter((n) => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(n)).join('')
    }
    investedHandler = (e) => {
        this.setState({
            invested: this.parse(e.currentTarget.value)
        })
    }
    sharesHandler = (e) => {
        this.setState({
            shares: this.parse(e.currentTarget.value)
        })
    }
    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.props.index)
    }
    render() {
        const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        return (
            <div className='CompanyRow'>
                <form className='CompanyRowForm' onSubmit={this.submitHandler}>
                    {this.props.founders ? <div className='CompanyRowFounders'>Founders</div>
                        : <div className='CompanyRowFounders'>Series {abc[this.props.index - 1]}</div>}
                    <input type='text' placeholder='Shares Owned' onChange={this.sharesHandler} value={this.state.shares} />
                    <input type='text' placeholder='Money Invested ($)' onChange={this.investedHandler} value={this.state.invested} />
                </form>
                <div className='CompanyRowResult'>
                    <p>Earned($):</p>
                    <div className='CompanyRowResultDiv'>{this.props.result ? f.format(this.props.result) : null}</div>
                </div>
            </div>
        );
    }
    componentDidUpdate = (_, prevState) => {
        if (this.state === prevState) { return null } else {
            this.props.updateInvestors(this.props.index,
                {
                    invested: parseInt(this.state.invested),
                    shares: parseInt(this.state.shares),
                    type: this.props.founders ? 'common' : 'preferred',
                })
        }
    }
}

export default CompanyRow;
