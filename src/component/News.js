import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
  }

  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=ebf94ec387d74440af9c9df7e18955bd&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
       articles: parsedData.articles ,
        totalResults:parsedData.totalResults,
        loading:false
       });
  }

  handlePrevousClick = async () => {
    let url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=ebf94ec387d74440af9c9df7e18955bd&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
      
      this.setState({loading:true});
      let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
    this.setState({
      page: this.state.page -1,
      articles: parsedData.articles,
      loading:false
    });
  };
  async fetchmore()
  {
    this.setState({page: this.state.page + 1})
    const url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=ebf94ec387d74440af9c9df7e18955bd&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      
      this.setState({loading:true});
      let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
     
      articles:parsedData.articles.concat(parsedData.articles) ,
      totalResults : parsedData.totalResults,
      loading:false
    });
  }
  async upateNews()
  {
    const url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=ebf94ec387d74440af9c9df7e18955bd&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      
      this.setState({loading:true});
      let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
    this.setState({
      page: this.state.page -1,
      articles: parsedData.articles,
      loading:false
    });
  }
  handleNextClick = async () => {

    if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
    {
    let url =
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=ebf94ec387d74440af9c9df7e18955bd&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading:false
    });
  }
  };

  fetchMoreData = () => {
   
      this.setState({
        pages: this.state.page + 1
      });
    this.fetchmore();
    
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '50px 0px'}} >Top Headline</h1>
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
           
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 45) : ""
                  }
                  imageUrl={element.urlToImage}
                  newUrl={element.url} />
              </div>
 
            )})}
      </div>
 </div>
            </InfiniteScroll>
        {/*<div className="d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrevousClick}
            >
              &larr; Previous
            </button>
            <button
            disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)}
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>*/}
          </div>
    );
  }
}
export default News;
