import {FirebaseTimestamp, auth, db, fieldValue} from '../../firebase/index'
import TweetStore from './TweetStore'
import UserStore from '../user/UserStore'

const tweetsRef = db.collection('tweets')
const replyTweetsRef = db.collection('replyTweets')

export const postTweet = (tweetContent) => {

    const timestamp = FirebaseTimestamp.now()
    const currentUser= auth.currentUser;

    const data = {
        uid: currentUser.uid,
        userName: UserStore.userName,
        userImageUrl: UserStore.userImageUrl,
        content: tweetContent,
        replyIds: []
    }

    const ref = tweetsRef.doc();
    const id = ref.id
    data.id = id
    data.created_at = timestamp
    data.updated_at = timestamp

    return tweetsRef.doc(id).set(data)
        .then(() => {
            console.log('save tweet is successful')
            fetchTweets()
        }).catch((error) => {
            throw new Error(error)
        })
}

export const fetchTweets = () => {   
    let query = tweetsRef.orderBy('updated_at', 'desc');
    // NOTE: if nenessary, add following user to display condition

    query.get()
        .then(snapshots => {
            // after fetching tweets with reply tweets, set data to store.
            const tweetList = []
            snapshots.forEach(snapshot => tweetList.push(snapshot.data()));
            tweetList.map((tweet) => {
                if(tweet.replyIds.length){
                    // after fetching reply tweets, push reply tweet to tweet list.
                    _fetchReplyTweetsPromise(tweet.replyIds)
                }
            });
            TweetStore.setTweetList(tweetList)
        })
}

export const fetchSelectedTweetWithReplys = (tweetId) => {
    tweetsRef.doc(tweetId).get()
        .then((snapshot) => {
            const selectedTweet = snapshot.data()
            if(selectedTweet.replyIds.length){
                _fetchReplyTweetsPromise(selectedTweet.replyIds)
            }
            TweetStore.setSelectedTweet(selectedTweet)
        })
}

export const fetchOwnTweets = (uid) => {
    tweetsRef.where("uid", "==", uid).get()
        .then((snapshots) => {
            const ownTweetList = []
            snapshots.forEach(snapshot => {
                const tweet = snapshot.data()
                ownTweetList.push(tweet)
            })
            TweetStore.setTweetList(ownTweetList)
        })
}

const _fetchReplyTweetsPromise = (replyIds) => {
    const query = replyTweetsRef.where('id', 'in', replyIds);
    query.get().then((snapshots) => {
        const replyList = []
        snapshots.forEach((snapshot) => {
            replyList.push(snapshot.data())
        })
        TweetStore.setReplyList(replyList)
    })
}

export const deleteTweet = (tweetId) => {
    tweetsRef.doc(tweetId).delete().then(() => {
        console.log("Document successfully deleted!");
        fetchTweets()
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

export const postReply = (selectedTweet, replyContent) => {
    const timestamp = FirebaseTimestamp.now()
    const currentUser= auth.currentUser;
    const data = {
        uid: currentUser.uid,
        userName: UserStore.userName,
        userImageUrl: UserStore.userImageUrl,
        content: replyContent,
        replyIds: []
    }
    const ref = replyTweetsRef.doc();
    const id = ref.id
    data.id = id
    data.created_at = timestamp
    data.updated_at = timestamp

    replyTweetsRef.doc(id).set(data)
        .then(() => {
            console.log('save reply is successful')
            fetchTweets()
        }).catch((error) => {
            throw new Error(error)
        })
    
    return tweetsRef.doc(selectedTweet.id).update({
        replyIds: fieldValue.arrayUnion(id)
    }).then(() => {
        console.log('related to reply tweet')
    }).catch((error) => {
        throw new Error(error)
    })
}