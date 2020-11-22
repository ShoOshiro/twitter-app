import {auth, FirebaseTimestamp, db} from '../../firebase/index'
import UserStore from './UserStore'


export const signUp = (userName, email, password, confirmPassword, history) => {

    //Validation
    if (userName === '' || email === '' || password === '' || confirmPassword === ''){
        alert('必須項目が未入力です')
        return false
    }

    if (password !== confirmPassword){
        alert('パスワードが一致しません')
        return
    }
    
    return auth.createUserWithEmailAndPassword(email, password)
        .then(result =>{
            const user = result.user

            if(user) {
                console.log("result has user.")
                const uid = user.uid
                const timestamp = FirebaseTimestamp.now()
                const userInitialData = {
                    creted_at: timestamp,
                    email: email,
                    uid: uid,
                    updated_at: timestamp,
                    userName: userName
                }
                db.collection('users').doc(uid).set(userInitialData)
                    .then(() => {
                        console.log("db set completed.")
                        history.push('/')
                    })
            }
        })
}

export const signIn = (email, password, history) => {

    //Validation
    if (email === '' || password === ''){
        alert('必須項目が未入力です')
        return false
    }

    return auth.signInWithEmailAndPassword(email, password)
        .then(result =>{
            const user = result.user

            if(user) {
                console.log("result has user.")
                const uid = user.uid

                db.collection('users').doc(uid).get()
                    .then((snapshot) => {
                        const data = snapshot.data()
                        //TODO set data of signin user to store.

                        UserStore.setSignInUser({
                            uid: data.uid,
                            userName: data.userName,
                            email: data.email,
                            isSignIn: true
                        })
                        console.log("signin completed.")
                        history.push('/')
                    })
            }
        })
}

export const listenAuthState = (history) => {
    return auth.onAuthStateChanged(user => {
        if(user) {
            
            const uid = user.uid

            db.collection('users').doc(uid).get()
                .then((snapshot) => {
                    const data = snapshot.data()
                    //TODO set data of signin user to store.
                    console.log("signin completed.")
                    history.push('/')
                })
        } else {
            history.push('/signin');
        }
    })
}

export const signOut = (history) => {
    auth.signOut()
        .then(() => {
            // TODO: set signout data to Mobx
            
            history.push('/signin')
        })
}