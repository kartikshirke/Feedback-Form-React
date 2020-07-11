import React, { Component } from 'react';
import './App.css';
import FeedbackForm from './components/FeedbackForm';
import PropTypes from 'prop-types';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FeedbackForm env={this.props.env} />
      </div>
    );
  }
}

App.propTypes = {
  env: PropTypes.object.isRequired
};
 

export default App;
