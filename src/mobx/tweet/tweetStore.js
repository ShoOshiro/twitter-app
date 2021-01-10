import {makeObservable, observable, action, computed} from 'mobx';


class TweetStore{

    @observable tweets = []
    @observable selectedTweet = [];
    @observable replyList = [];
    
    constructor() {
        makeObservable(this)
    }

    @action setTweetList = (tweetList) => {
        this.tweets = tweetList;
    }

    @action setReplyList = (replyList) => {
        this.replyList = replyList;
    }

    @action setSelectedTweet = (selectedTweet) => {
        this.selectedTweet = selectedTweet;
    }
}

export default new TweetStore;