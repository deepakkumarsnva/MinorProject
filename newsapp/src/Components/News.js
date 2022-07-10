import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
// import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";




export default class News extends Component {
   

  // static this.PropTypes={
  //     country : PropTypes.string,
  //     pageSize : PropTypes.number,
  //     catagories : PropTypes.string,
  // }

  constructor(){
    super()
    this.state={
      articles :[],
      loading :true,
      page : 1,
      totalResults :0
     }
     this.handleNextclick = this.handleNextclick.bind(this);
     this.handlepreclick = this.handlepreclick.bind(this);
  }

  async updateNews(){
    let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.catagories}&apiKey=3aa9ba47c73e446988df073f6d82a4a3&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading :true})
    let data=await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData)
    this.setState({
       articles : parsedData.articles,
       totalResults : parsedData.totalResults,
       loading :false,
    }) 
  }

  async componentDidMount(){
    this.updateNews();
  }

   handleNextclick=  async()=>{
    this.setState({ page :this.state.page + 1 })
    this.updateNews();
  }
   handlepreclick= async ()=>{ 
    this.setState({ page :this.state.page - 1 })
    this.updateNews();
  }
  fetchMoreData = async () => {
    this.setState({ page :this.state.page + 1 })
    let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.catagories}&apiKey=3aa9ba47c73e446988df073f6d82a4a3&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    let data=await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData)
    this.setState({
       articles : this.state.articles.concat(parsedData.articles),
       totalResults : parsedData.totalResults,
       loading :false,
    }) 
  };

  render() {
    return (
      <>
      <h2 className='text-center my-2'>Latest News- Top Headlines </h2>
      {this.state.loading && <Spinner />}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
        
      <div className='container my-3'>

       <div className="row">
        
      {this.state.articles.map((elements)=>{
        console.log(elements);
         return(
           <div className="col-md-4" key={elements.url}> 
              <Newsitem author={elements.author} publishedAt={elements.publishedAt} newUrl={elements.url} title= {elements.title} description={elements.description === null ? elements.description : elements.description} imageUrl={elements.urlToImage} source={elements.source.name}/>
          </div>
         )
      })}

    </div>
    </div>
    </InfiniteScroll>

      {/* Button code 
       <div className="container d-flex justify-content-between">
         <button disabled={this.state.page < 2} type="button" className="btn btn-dark" onClick={this.handlepreclick}>&larr; Previous</button>
         <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Nex &rarr;</button>
      </div>  */}
      </>
    )
  }


// News.defaultProps = {
//     country: 'in',
//     pageSize: 8,
//     category: 'general',
// }

// News.propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
// }

}
