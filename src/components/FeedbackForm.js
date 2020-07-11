import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class FeedbackForm extends Component {
  state = {
    heading1: 'Please Share Your Experience!',
    feedback: '',
    formSubmitted: false
  };

  handleCancel=()=> {
    this.setState({
      feedback: ''
    });
  }

  handleChange=(event) =>{
    
    this.setState({
      feedback: event.target.value
    });
  }

  handleSubmit=(event)=> {
    event.preventDefault();

    const {
      REACT_APP_EMAILJS_RECEIVER: receiverEmail,
      REACT_APP_EMAILJS_TEMPLATEID: template,
      REACT_APP_EMAILJS_USERID: user,
    } = this.props.env;

    this.sendFeedback(
      template,
      this.sender,
      receiverEmail,
      this.state.feedback,
      user
    );

    this.setState({
      formSubmitted: true,
      feedback: '',
      heading1:'Thanks you for sharing your experience!',
    });
  }

 // Note: this is using default_service, which will map to whatever
 // default email provider you've set in your EmailJS account.
  sendFeedback=(templateId, senderEmail, receiverEmail, feedback, user)=> {
    window.emailjs
      .send('default_service', templateId, {
          senderEmail,
          receiverEmail,
          feedback
        },
        user
      )
      .then(res => {
        this.setState({
          formEmailSent: true
        });
      })
      // Handle errors here however you like
      .catch(err => console.error('Failed to send feedback. Error: ', err));
  }

  render() {
    return (
      <div className="container">
      <form className="feedback-form" onSubmit={this.handleSubmit}>
        <br/>
        <h1>{this.state.heading1}</h1>
        <br/>
        <textarea
        rows="15" cols="70"
          className="text-input"
          id="feedback-entry"
          name="feedback-entry"
          onChange={this.handleChange}
          placeholder="Enter your experience here......."
          required
          value={this.state.feedback}
        /><br/><br/>
        <div>
          <button className="btn btn-secondary" onClick={this.handleCancel}>
            Cancel
          </button>&emsp;
          <input type="submit" value="Submit" className="btn btn-primary" />
        </div>
      </form>
      </div>
    );
  }
}

FeedbackForm.propTypes = {
  env: PropTypes.object.isRequired
};