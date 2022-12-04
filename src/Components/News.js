// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import './img1.png'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: `gb`,
    pageSize: 6,
    category: `general`

  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsBandar`
  }
  async updateNews() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    this.props.setProgress(20);
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults, loading: false
    })
    this.props.setProgress(100);
  }
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=a0df695455a64b1c8f489b55db4f34d2&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,loading:false
    // })
    this.updateNews()
  }
  // handleNextClick = async () => {
  //   // if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))

  //   // let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=a0df695455a64b1c8f489b55db4f34d2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({loading:true})
  //   // let data = await fetch(url);
  //   //   let parsedData = await data.json();
  //   //   this.setState({
  //   //     page: this.state.page + 1 ,
  //   //     articles: parsedData.articles,
  //   //   loading:false})
  //   await this.setState({ page: this.state.page + 1 })
  //   this.updateNews()
  // }

  // handlePrevClick = async () => {

  //   // let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=a0df695455a64b1c8f489b55db4f34d2&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
  //   // this.setState({loading:true})
  //   // let data = await fetch(url);
  //   //   let parsedData = await data.json();
  //   //   this.setState({
  //   //     page: this.state.page - 1 ,
  //   //     articles: parsedData.articles,
  //   //   loading:false})
  //   await this.setState({ page: this.state.page - 1 })
  //   this.updateNews()
  // }


  fetchMoreData = async () => {
    this.setState({ page: ++this.state.page })
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(20);
    let parsedData = await data.json();
    this.props.setProgress(60);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults, loading: false
    })
    this.props.setProgress(100);
  };

  render() {
    return (
      <div className='container' style={{ marginTop: "100px" }}>
        <h1 className='text-center'>NewsBandar - Top Headlines - {this.capitalizeFirstLetter(this.props.category)}</h1>
        {this.state.loading && <Loading />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading />}
        >
          <div className="row my-4 m-auto">

            {this.state.articles.map((element, index) => {
              return <div className="col-md-4" key={index}>
                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 85) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://miro.medium.com/max/780/1*T9VUDALam3DIS0wHDWrxBg.png"} newsUrl={element.url} author={element.author ? "By " + element.author : ""} publishedAt={new Date(element.publishedAt).toGMTString()} source={element.source.name} />
              </div>
            })}
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-around">
          <button type="button" disabled={this.state.page <= 1} onClick={this.handlePrevClick} className="btn btn-dark">&laquo; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &raquo;</button>
        </div> */}
      </div>
    )
  }
}

export default News