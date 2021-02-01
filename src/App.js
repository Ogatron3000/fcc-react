import React, { Component } from 'react';
import data from './data';

class App extends Component {
  state = {
    input: '0',
    display: '0'
  }

  handleClick = (e) => {
    let { input, display } = this.state;
    let symbol = e.target.innerHTML;

    if (input.length >= 24) {
      let oldValue = input;
      this.setState({
        input: 'Maximum length exceeded'
      })
      setTimeout(() => {
        this.setState({
          input: oldValue
        })
      }, 1000);
    }

    if ('0123456789'.includes(symbol) && input.length < 24 && input != 'Maximum length exceeded') {
      if (display === '0') {
        let replaceZero = display.replace('0', symbol);
        this.setState({
          input: symbol,
          display: replaceZero
        });
      } else if (Number.isInteger(parseInt(input))) {
        this.setState({
          input: input + symbol,
          display: display + symbol
        });
      } else {
        this.setState({
          input: symbol,
          display: display + symbol
        });
      }
    } else if ('+-*/'.includes(symbol)) {
      if (symbol == '-' && display.search(/-$/) < 0) {
        this.setState({
          input: symbol,
          display: display + symbol
        });
      } else if (display.search(/[+/*-]$/g) > 0) {
        let newDisplay = display.replace(/[+/*-]+$/, symbol);
        this.setState({
          input: symbol,
          display: newDisplay
        });
      } else {
        this.setState({
          input: symbol,
          display: display + symbol
        });
      }
    } else if (symbol == '.' && input.length < 24 && input != 'Maximum length exceeded') {
      if (input % 1 === 0 && input[input.length - 1] != '.' && input != '') {
        this.setState({
          input: input + symbol,
          display: display + symbol
        });
      } else if (input.search(/\./) < 0) {
        this.setState({
          input: '0.',
          display: display + '0.'
        });
      }
    } else if (symbol == '=') {
      let err;
      try {
        eval(display)
      } catch (e) {
        err = 'error';
      }
      if (err == 'error') {
        this.setState({
          display: '0',
          input: '0'
        });
      } else {
        let result = eval(display);
        this.setState({
          display: result.toString(),
          input: result.toString()
        });
      }
    } else if (symbol == 'AC') {
      this.setState({
        input: '0',
        display: '0'
      });
    }
  }

  render(){
    return (
      <div className='wrapper'>
        <div className='result'>
          {this.state.display}
        </div>
        <div id='display'>
          {this.state.input}
        </div>
        <div className='buttons'>
          {data.map(data => <div id={data.id} onClick={this.handleClick}>{data.symbol}</div>)}
        </div>
      </div>
    );
  }
}

export default App;
