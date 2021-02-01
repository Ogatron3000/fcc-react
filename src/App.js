import React, { Component } from 'react';
import axios from "axios";
import MediaQuery from 'react-responsive';

class App extends Component {
  state = {
    quotes: [],
    quote: {},
    colors: ["#2ecc71", "#f1c40f", "#3498db", "#e74c3c", "#9b59b6", "#f39c12"],
    color: "#2ecc71",
    isHovered: [false, false, false],
    animation: "animated jackInTheBox"
  }

  // get quotes
  componentDidMount() {
    axios.get("https://gist.githubusercontent.com/shreyasminocha/7d5dedafc1fe158f82563c1223855177/raw/325d51aca7165b2498971afcff9bed286a52dc0e/quotes.json")
          .then(res => {
            this.setState({
              quotes: res.data,
              quote: res.data[0]
            })
          })
  }

  // new quote
  handleClick = () => {
    this.setState({
      quote: this.state.quotes[Math.floor(Math.random()*102)],
      color:  this.state.colors[Math.floor(Math.random()*6)],
      animation: "hidden"
    }, () => {setTimeout(() => this.setState({animation: "animated jackInTheBox"}), 100)
    })
  }

  handleHover = (index) => {
    this.setState(prevState => ({
      isHovered: [...prevState.isHovered.slice(0,index), !prevState.isHovered[index], ...prevState.isHovered.slice(index+1)]
    }));
  }

  render() {

    // assign random quote
    const quote = this.state.quotes.length ? this.state.quote.quote : "Wait o";

    // assign author
    const author = this.state.quotes.length ? this.state.quote.author : "";

    // tweet link
    const tweet = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" 
                      + '"' + quote + '" ' + author;

    // tumblr link
    const tumblr = "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption="
                      + author + "&content=" + quote + "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button";

    const tada0 = this.state.isHovered[0] ? " animated tada" : "";
    const tada1 = this.state.isHovered[1] ? " animated tada" : "";
    const tada2 = this.state.isHovered[2] ? " animated tada" : "";

    return (
      <div className={"App animted fadeIn"} style={{background:this.state.color}}>
        <div id="quote-box" className="card">
          <p id="text" className={this.state.animation} style={{color:this.state.color}}>
            {quote}
          </p>
          <p id="author" className={this.state.animation} style={{color:this.state.color}}>
            - {author}
          </p>
          <div id="buttons">
            <MediaQuery maxDeviceWidth={800}>
            <a id="tweet-quote" className="button-link" href={tweet} target="_blank">
              <button className="btn" style={{background:this.state.color}}>
                <span className="fa fa-twitter"></span>
              </button>
            </a>
            <a id="tumblr-quote" className="button-link" href={tumblr} target="_blank">
              <button className="btn" style={{background:this.state.color}}>
                <span className="fa fa-tumblr"></span>
              </button>
            </a>
            <button id="new-quote" className="btn" style={{background:this.state.color}} onClick={this.handleClick}>
              New Quote
            </button>
            </MediaQuery>
            <MediaQuery minDeviceWidth={800}>
            <a id="tweet-quote" className="button-link" href={tweet} target="_blank">
              <button className={"btn" + tada0} style={{background:this.state.color}} onMouseEnter={()=>this.handleHover(0)} onMouseLeave={()=>this.handleHover(0)} onTouchStart={()=>this.handleHover(0)} onTouchMove={()=>this.handleHover(0)}>
                <span className="fa fa-twitter"></span>
              </button>
            </a>
            <a id="tumblr-quote" className="button-link" href={tumblr} target="_blank">
              <button className={"btn " + tada1} style={{background:this.state.color}} onMouseEnter={()=>this.handleHover(1)} onMouseLeave={()=>this.handleHover(1)} onTouchStart={()=>this.handleHover(1)} onTouchMove={()=>this.handleHover(1)}>
                <span className="fa fa-tumblr"></span>
              </button>
            </a>
            <button id="new-quote" className={"btn " + tada2} style={{background:this.state.color}} onClick={this.handleClick} onMouseEnter={()=>this.handleHover(2)} onMouseLeave={()=>this.handleHover(2)} onTouchStart={()=>this.handleHover(2)} onTouchMove={()=>this.handleHover(2)}>
              New Quote
            </button>
            </MediaQuery>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
