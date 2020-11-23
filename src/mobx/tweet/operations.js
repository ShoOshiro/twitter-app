import {FirebaseTimestamp, auth, db} from '../../firebase/index'
import TweetStore from './TweetStore'

const tweetsRef = db.collection('tweets')

export const postTweet = (tweetContent) => {

    const timestamp = FirebaseTimestamp.now()
    const currentUser= auth.currentUser;

    const data = {
        uid: currentUser.uid,
        content: tweetContent
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
            const tweetList = []
            snapshots.forEach(snapshot => {
                const tweet = snapshot.data()
                tweetList.push(tweet)
            })
            console.log('fetch tweets is successful.')
            TweetStore.setTweetList(tweetList)
        })    
}