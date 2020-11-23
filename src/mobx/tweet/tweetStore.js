import {makeObservable, observable, action, computed} from 'mobx';


class TweetStore{

    @observable tweets = []
    
    constructor() {
        makeObservable(this)
    }

    @action setTweetList = (tweetList) => {
        this.tweets = tweetList;
        console.log("setTweetList. tweets are follow.");
        console.log(this.tweets);
    }
}

export default new TweetStore;