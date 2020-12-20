import {makeObservable, observable, action, computed} from 'mobx';


class TweetStore{

    @observable tweets = []
    @observable selectedTweet = null;
    
    constructor() {
        makeObservable(this)
    }

    @action setTweetList = (tweetList) => {
        this.tweets = tweetList;
        console.log("setTweetList. tweets are follow.");
        console.log(this.tweets);
    }

    @action setSelectedTweet = (selectedTweet) => {
        this.selectedTweet = selectedTweet;
    }
}

export default new TweetStore;