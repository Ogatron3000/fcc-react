import React, { Component } from 'react';
import marked from 'marked';

class App extends Component{
  state = {
    editorMax: false,
    previewMax: false,
    input: `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  handleEditorMax = () => {
    this.setState({
      editorMax: !this.state.editorMax
    })
  }

  handlePreviewMax = () => {
    this.setState({
      previewMax: !this.state.previewMax
    })
  }

  render() {
    marked.setOptions({
      breaks: true,
    });
    const size = this.state.editorMax ? ["editor-container-max", "hide", "fa fa-compress"] : this.state.previewMax ? ["hide", "preview-container-max", "fa fa-compress"] : ["editor-container", "preview-container", "fa fa-expand"];
    return (
      <div className='App'>
        <form className={size[0]}>
          <label htmlFor='editor'><h2>Markdown Editor</h2></label>
          <div className="expand">
            <i className={size[2]} onClick={this.handleEditorMax}></i>
          </div>
          {/* adding a value makes the input controlled by state   */}
          <textarea id='editor' value={this.state.input} onChange={this.handleChange}/>
        </form>
        <div className={size[1]}>
          <div className="expand">
              <i className={size[2]} onClick={this.handlePreviewMax}></i>
          </div>
          <div id='preview' dangerouslySetInnerHTML={{__html: marked(this.state.input)}}/>
        </div>
      </div>
    );
  }
}

export default App;
