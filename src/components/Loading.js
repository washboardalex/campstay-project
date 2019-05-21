import React, { Component } from 'react';

class Loading extends Component {
  state = {
    text: this.props.text
  }
  componentDidMount () {
    const stopper = this.props.text + '...'
    this.interval = setInterval(() => {
      this.state.text === stopper
        ? this.setState(() => ({ text: this.props.text }))
        : this.setState(({ text }) => ({ text: text + '.' }))
    }, 300)
  }
  componentWillUnmount () {
    window.clearInterval(this.interval)
  }
  render () {
    return (
      <div className='container'>
        <p className='text-center'>
          {this.state.text}
        </p>
      </div>
    )
  }
}

export default Loading