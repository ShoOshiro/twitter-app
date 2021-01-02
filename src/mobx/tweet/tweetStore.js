import {makeObservable, observable, action, computed} from 'mobx';


class TweetStore{

    @observable tweets = []
    @observable selectedTweet = {};
    
    constructor() {
        makeObservable(this)
    }

    @action setTweetList = (tweetList) => {
        this.tweets = tweetList;
        console.log("setTweetList in tweetStore.js.");
    }

    @action setSelectedTweet = (selectedTweet) => {
        this.selectedTweet = selectedTweet;
    }
}

export default new TweetStore;