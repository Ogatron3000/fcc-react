import React, { Component } from 'react';
import bell from './sound/bell.mp3';

class App extends Component {
  // 1. What state is there?
  // 2. When does it change?
  state = {
    sessionLength: 25,
    breakLength: 5,
    display: '25:00',
    sessionInProgress: true,
    ticking: ''
  }

  timer = () => {
    this.whichTimer();
    let { display } = this.state;
    let time = parseInt(display.split(':')[0]) * 60 + parseInt(display.split(':')[1]);
    time--;
    let minutes = Math.floor(time / 60);
    minutes = this.isLessThan10(minutes);
    let seconds = time % 60;
    seconds = this.isLessThan10(seconds);
    let currentTime = minutes + ':' + seconds;
    this.setState({
      display: currentTime
    })
  }

  whichTimer = () => {
    let { sessionLength, breakLength, display, sessionInProgress } = this.state;
    let sound = document.getElementById('beep');
    if (display == '00:01') {
      sound.play();
    }
    if (display == '00:00' && sessionInProgress) {
      this.setState({
        display: this.isLessThan10(breakLength) + ':01',
        sessionInProgress: false
      })
    } else if (display === '00:00' && !sessionInProgress) {
      this.setState({
        display: this.isLessThan10(sessionLength) + ':01',
        sessionInProgress: true
      })
    }
  }

  isLessThan10 = (time) => {
    if (time < 10) return '0' + time;
    return time;
  }

  handleClick = () => {
    let { ticking } = this.state;

    if (!ticking) {
      this.setState({
        ticking: setInterval(this.timer, 1000)
      })
    } else {
      clearInterval(ticking);
      this.setState({
        ticking: ''
      })
    }
  }

  handleChange = (e) => {
    let { sessionInProgress, ticking } = this.state;

    if (!ticking) {
      let info = e.target.id.split('-');
      
      let id = info[0] + 'Length';

      if (info[1] === 'increment' && this.state[id] < 60) {
        this.setState(prevState => ({
          [id]: prevState[id] + 1
        }))
      } else if (info[1] === 'decrement' && this.state[id] > 1) {
        this.setState({
          [id]: this.state[id] - 1
        })
      }

      if (sessionInProgress && id === 'sessionLength') {
        this.setState(prevState => ({
          display: this.isLessThan10(prevState.sessionLength) + ':00'
        }))
      } else if (!sessionInProgress && id === 'breakLength') {
        this.setState(prevState => ({
          display: this.isLessThan10(prevState.breakLength) + ':00'
        }))
      }
    }
  }

  handleReset = () => {
    clearInterval(this.state.ticking)
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      display: '25:00',
      sessionInProgress: true,
      ticking: ''
    })
    let sound = document.getElementById('beep');
    sound.pause();
    sound.currentTime = 0;
  }

  /*
  handleClick = () => {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId)
      this.setState({
        intervalId: ''
      })
    } else {
      this.setState({
      intervalId: setInterval(this.tick, 1000)
    })
    }
    console.log(this.state.intervalId)
  }


  tick = () => {
    let { breakTime, sessionTime, timeForBreak, sessionLength, breakLength } = this.state;
    let time;
    if (timeForBreak) {
      time = parseInt(breakTime.split(':')[0]) * 60 + parseInt(breakTime.split(':')[1]);
    } else {
      time = parseInt(sessionTime.split(':')[0]) * 60 + parseInt(sessionTime.split(':')[1]);
    }  

    if (time === 0 && timeForBreak) {
      this.setState({
        timeForBreak: !timeForBreak,
        sessionTime: sessionLength
      });
      return;
    } else if (time === 0 && !timeForBreak) {
      this.setState({
        timeForBreak: !timeForBreak,
        breakTime: breakLength
      })
    }

    console.log(timeForBreak)
    time--;
    let minutes = Math.floor(time / 60);
    minutes = this.isLessThan10(minutes);
    let seconds = time % 60;
    seconds = this.isLessThan10(seconds);
    let currentTime = minutes + ':' + seconds;
    console.log(currentTime);

    if (timeForBreak) {
      this.setState({
        breakTime: currentTime
      })
    } else {
      this.setState({
        sessionTime: currentTime
      })
    }
  }

  handleIncrement = (e) => {
    let { breakTime, sessionTime } = this.state;
    let breakMinutes = parseInt(breakTime.split(':')[0]);
    let sessionMinutes = parseInt(sessionTime.split(':')[0]);


    if (e.target.id === 'break-increment' && breakMinutes < 60) {
      breakMinutes++;
      this.setState({
        breakTime: this.isLessThan10(breakMinutes) + ':00'
      })
    } else if (e.target.id === 'session-increment' && sessionMinutes < 60) {
      sessionMinutes++;
      this.setState({
        sessionTime: this.isLessThan10(sessionMinutes) + ':00'
      })
    }
  }

  */

  render() {
    let { sessionInProgress, ticking } = this.state;
    let circleSession = sessionInProgress && ticking ? 'circle-session' : ticking ? 'circle-break' : '';
    let focus = sessionInProgress && ticking ? 1 : 0;
    let rest = !sessionInProgress && ticking ? 1 : 0;

    return (
      <div className='pomodoro'>
        <div className='buttons'>
          <div className='break-controls'>
            <p id='break-label'>Break</p>
            <div>
              <button id='break-increment' onClick={this.handleChange}>+</button>
              <div id='break-length'>{this.state.breakLength}</div>
              <button id='break-decrement' onClick={this.handleChange}>-</button>
            </div>
          </div>
          <div className='session-controls'>
            <p id='session-label'>Session</p>
            <div>
              <button id='session-increment' onClick={this.handleChange}>+</button>
              <div id='session-length'>{this.state.sessionLength}</div>
              <button id='session-decrement' onClick={this.handleChange}>-</button>
            </div>
          </div>
        </div>
        <div className={'circle ' + circleSession} id='timer-label'>
          <p className='focus' style={{opacity: focus}}>Focus!</p>
          <div className='time' id='time-left'>
            {this.state.display}
          </div>
          <p className='rest' style={{opacity: rest}}>Time to rest!</p>
        </div>
        <button id='start_stop' onClick={this.handleClick}>Start/Pause</button>
        <button id='reset' onClick={this.handleReset}>Reset</button>
        <audio src={bell} id='beep' />
      </div>
    );
  }
}

export default App;
