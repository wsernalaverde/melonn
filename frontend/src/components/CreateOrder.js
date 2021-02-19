import React, { Component } from 'react'
import Form from './Form'

class CreateOrder extends Component {
  render () {
    return (
      <div className="container">
        <div className="center-content">
          <Form goList = {this.props.goList}/>
        </div>
      </div>
    )
  }
}

export default CreateOrder
