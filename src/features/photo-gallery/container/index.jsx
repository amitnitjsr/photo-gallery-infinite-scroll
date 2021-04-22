import React, { Component } from 'react';
import GalleryComponent from '../component/gallery-component';
import InfiniteScroll from "react-infinite-scroll-component";
import NextPrevComponent from '../component/next-prev';
import Axios from 'axios';
import ErrorComponent from '../component/errorComponent';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPhotoList: [],
            page: 1,
            per_page: 10,
            hasMore: true,
            open: false,
            imageData: '',
            imageIndex: 0,
            prevDisable: false,
            nextDisable: false,
            apiError: false,
        }
    }

    componentDidMount() {
        this.getPhotoList();
    }

    getPhotoList = () => {
        Axios.get('https://api.unsplash.com/photos?page=' + this.state.page + '&per_page=' + this.state.per_page + '&client_id=P0aLUupBEEYeB6HiA7FCk33t3uhkIm9fbHxhFHzd7Tw'
        )
            .then((res) => {
                this.setState({ allPhotoList: res && res.data, apiError: false });
            })
            .catch((error) => {
                console.log('error', error)
                this.setState({ apiError: true })
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

    openCloseModalhandler = () => {
        this.setState({ open: !this.state.open });
    }

    clickOnPhotoHandler = (image, index) => {
        this.setState({ imageData: image, imageIndex: index }, () => {
            this.openCloseModalhandler();
        });
    }

    nextHandler = () => {
        let len = this.state.allPhotoList.length - 1;
        if (len !== this.state.imageIndex) {
            this.setState({ imageIndex: this.state.imageIndex + 1 }, () => {
                if (this.state.imageIndex < len) {
                    let image = this.state.allPhotoList.filter((val, index) => index === this.state.imageIndex);
                    if (image && image.length > 0) {
                        this.setState({ imageData: image[0].urls.small, nextDisable: false, prevDisable: false });
                    }
                }
            });
        }
        else {
            this.setState({ nextDisable: true, prevDisable: false });
        }
    }

    prevHandler = () => {
        let len = this.state.allPhotoList.length - 1;
        if (this.state.imageIndex !== 0) {
            this.setState({ imageIndex: this.state.imageIndex - 1 }, () => {
                if (this.state.imageIndex < len) {
                    let image = this.state.allPhotoList.filter((val, index) => index === this.state.imageIndex);
                    if (image && image.length > 0) {
                        this.setState({ imageData: image[0].urls.small, prevDisable: false, nextDisable: false });
                    }
                }
            });
        }
        else {
            this.setState({ prevDisable: true, nextDisable: false });
        }

    }

    render() {
        return (
            <div>
                {this.state.apiError ? (
                    <ErrorComponent />
                )
                    : ''}
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
                        clickOnPhoto={this.clickOnPhotoHandler}
                    />
                </InfiniteScroll>
                <NextPrevComponent
                    open={this.state.open}
                    close={this.openCloseModalhandler}
                    nextHandler={this.nextHandler}
                    prevHandler={this.prevHandler}
                    imageData={this.state.imageData}
                    prevDisable={this.state.prevDisable}
                    nextDisable={this.state.nextDisable}
                />
            </div>
        )
    }
}
