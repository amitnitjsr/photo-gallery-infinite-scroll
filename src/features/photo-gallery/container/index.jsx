import React, { Component } from 'react';
import GalleryComponent from '../component/gallery-component';
import InfiniteScroll from "react-infinite-scroll-component";
import Axios from 'axios';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPhotoList: [],
            page: 1,
            per_page: 10,
            hasMore: true,
        }
    }

    componentDidMount() {
        this.getPhotoList();
    }

    getPhotoList = () => {
        Axios.get('https://api.unsplash.com/photos?page=' + this.state.page + '&per_page=' + this.state.per_page + '&client_id=P0aLUupBEEYeB6HiA7FCk33t3uhkIm9fbHxhFHzd7Tw'
        )
            .then((res) => {
                this.setState({ allPhotoList: res && res.data });
            })
            .catch((error) => {
                console.log(error)
            })
    }

    fetchMoreData = () => {

        if (this.state.allPhotoList.length < 50) {
            this.setState({ per_page: this.state.per_page + 10 }, () => {
                this.getPhotoList();
            })
        }
        else {
            this.setState({ hasMore: false });
        }
    }

    render() {
        return (
            <div>
                <InfiniteScroll
                    dataLength={this.state.per_page}
                    next={() => this.fetchMoreData('pending')}
                    hasMore={this.state.hasMore}
                    height={630}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <GalleryComponent
                        list={this.state.allPhotoList}
                        key={this.state.allPhotoList}
                    />
                </InfiniteScroll>
            </div>
        )
    }
}
