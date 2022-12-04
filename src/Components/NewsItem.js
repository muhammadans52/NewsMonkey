// import { getByTitle } from '@testing-library/react'
import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description,imageUrl, newsUrl, author, publishedAt, source} = this.props;
    return (
      <div>
        <div className="card my-4">
        <span className="position-absolute badge rounded-pill bg-dark" style={{zIndex:1,right:"0%",top:"-3%" }}>{source}</span>
  <img src={imageUrl} height="250px" className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">{author} on {publishedAt}</small></p>
    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More!</a>
  </div>
</div>
      </div>
    )
  }
}


export default NewsItem