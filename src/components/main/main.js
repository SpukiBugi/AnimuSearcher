import React, { Component } from 'react';
import './main.css';
import Header from '../elements/Header/Header';
import SearchBar from '../elements/SearchBar/SearchBar';
import TitleGrid from '../elements/TitleGrid/TitleGrid';
import AnimuThumb from '../elements/AnimuThumb/AnimuThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';


class main extends Component {
  state = {
    animu: [],
    searchTerm: undefined, 
    status: 'RELEASING',
    sort: 'POPULARITY_DESC',
    page: 1,
    currentPage: undefined,
    hasNextPage: 1,
  }

  componentDidMount() {
    this.fetchItems()
  }

  fetchItems = (searchTerm, page) => {
    var query = `
    query ($id: Int, $page: Int, $perPage: Int, $search: String, $status: MediaStatus, $sort: [MediaSort]) {
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (id: $id, search: $search, status: $status, sort: $sort, type: ANIME) {
          id
          coverImage {
            large
          }
          title {
            romaji
            english
            native
          }
        }
      }
    }
    `;

    searchTerm ? 
      this.setState ({
        searchTerm,
        status: undefined,
        sort: 'SEARCH_MATCH',
      }) : 
      this.setState ({
        searchTerm: undefined, 
        status: 'RELEASING',
        sort: 'POPULARITY_DESC',
      })

    var variables = {
      search: this.state.searchTerm,
      page: page || 1,
      perPage: 12,
      status: this.state.status,
      sort: this.state.sort,
    };

    var url = 'https://graphql.anilist.co',
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        })
      };
    function handleResponse(response) {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    }

    function handleError(error) {
      alert('Error, check console');
      console.error(error);
    }
    
    fetch(url, options)
    .then(handleResponse)
    .then(data => {
      this.setState({
        hasNextPage: data.data.Page.pageInfo.hasNextPage,
        currentPage: data.data.Page.pageInfo.currentPage,
        animu: [...this.state.animu, ...data.data.Page.media],
      })

    })
    .catch(handleError)
  };
  
  searchItems = (value) => {
    this.setState ({
      animu: []
    })
    this.fetchItems(value)
  }

  loadMoreItems = () => {
    this.fetchItems(this.state.searchTerm, this.state.currentPage + 1)
  };

  render() {    
    return (
      <div className="main">
        <Header />
        <SearchBar callback = {this.searchItems} />
        <h3>{this.state.searchTerm ? 'Search Result': 'Current Season'}</h3>
        <TitleGrid>
        {this.state.animu.map ( (element, i) => {
            return <AnimuThumb
                key = {i}
                clickable = {true}
                image = {element.coverImage.large}
                animuId = {element.id}
                animuName = {element.title.romaji}
                />
        })}
        </TitleGrid>
        {this.state.hasNextPage ? <LoadMoreBtn text = "Load More" onClick = {this.loadMoreItems}/> : null}
      </div>
    );
  }
}
export default main;
