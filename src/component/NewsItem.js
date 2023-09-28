import React, { Component } from "react";

export class NewsItem extends Component {
  constructor() {
    super();
  }
  render() {
    let { title, description, imageUrl, newUrl } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={!imageUrl?"https://i.insider.com/64aeba0294be880019f394c4?width=1200&format=jpeg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newUrl} className="btn btn-sm btn-primary">Read More </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
