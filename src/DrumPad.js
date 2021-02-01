import React, { Component } from 'react';

class DrumPad extends Component {
    state = {
        drumPad: 'drum-pad'
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    };

    componentWillUnmount() {
        document.addEventListener('keydown', this.handleKeyPress);
    };

    handleKeyPress = (e) => {
        if (e.keyCode === this.props.letter.charCodeAt()) {
            this.playSound();
        }
    }

    handleClick = () => {
        this.playSound();
    };

    playSound = () => {
        let sound = document.getElementById(this.props.letter);
        sound.play();
        sound.currentTime = 0;
        this.setState({
            drumPad: 'drum-pad active'
        })
        setTimeout(() => this.setState({
            drumPad: 'drum-pad'
        }), 120);
        this.props.language(this.props.id);
    }

    // or ref={ref => this.audio = ref} in audio tag

    render(){
        const { letter, id, src } = this.props

        return(
            <div className={this.state.drumPad} id={id} onClick={this.handleClick}>
                {letter}
                <audio src={src} className='clip' id={letter} />
            </div>
        )
    } 
}

export default DrumPad;