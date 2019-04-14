import React, { Component } from 'react';
import Header from '../Header/Header';
import AnimuInfo from '../AnimuInfo/AnimuInfo';



class Animu extends Component {
    state = {
        id: this.props.match.params.animuId
    }


    componentDidMount() {
        this.fetchItems()
    }

    fetchItems = () => {
        var query = `
            query ($id: Int, $page: Int, $perPage: Int) {
                Page (page: $page, perPage: $perPage) {
                pageInfo {
                    total
                    currentPage
                    lastPage
                    hasNextPage
                    perPage
                }
                media (id: $id) {
                    id
                    title {
                        romaji
                        english
                        native
                    }
                    coverImage {
                        medium
                        large
                    }
                    bannerImage
                    description
                    averageScore
                }
                }
            }
            `;

        var variables = {
            id: this.state.id
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
                    animu: data.data.Page.media[0]
                })
            })
            .catch(handleError)
    };


    render() {
        return (
                <React.Fragment>
                    <div><Header /></div>
                    <div><AnimuInfo animu={this.state.animu}/></div>
                </React.Fragment>
        )
    }
}

export default Animu;