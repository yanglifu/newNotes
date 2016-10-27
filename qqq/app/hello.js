import React from 'react';
import ReactDOM from 'react-dom';
require('./main.css');
require('./index.scss');
class HelloReact extends React.Component {
  render() {
    return (
      <h1>hell word{this.props.name}!</h1>
      
    );

  }
}
ReactDOM.render(<HelloReact name='' />, document.getElementById('content'));
