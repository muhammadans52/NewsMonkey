import React, { Component } from 'react'
// import img1 from '../img1.png'

export default class Img1 extends Component {
  render() {
    let {image} = this.props
    return (
      <div>
        <img src={image} alt="" />
      </div>
    )
  }
}
