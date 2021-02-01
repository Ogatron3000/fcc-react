import React, { Component } from 'react';
import DrumPad from './DrumPad';
import data from './data'

class App extends Component {
  state = {
    language: '',
    volume: 0.5
  }

  handleLanguage = language => this.setState({ language });

  adjustVolume = (e) => {
    this.setState({
      volume: e.target.value
    })
  }

  render(){
    // associate clips with slider value
    const clips = [].slice.call(document.getElementsByClassName('clip'));
    // .call makes the slice call from 'clip' instead of empty array
    clips.forEach((clip => {
      clip.volume = this.state.volume
    }))
    return (
      <div id='drum-machine'>
        <div id='display'>
          <h4>Jake the Dog sings in:</h4>
          <h4>{this.state.language}</h4>
          <h4>Volume:</h4>
          <input type='range' min='0' max='1' step='0.01' value={this.state.volume} onChange={this.adjustVolume}/>
        </div>
        {/* min, max and step must be set because more than 1 is out of range*/}
        <div className='keyboard'>
          {data.map(data => 
            <DrumPad letter={data.letter} id={data.id} src={data.src} language={this.handleLanguage} />)}
        </div>
      </div>
    );
  }
}

export default App;
