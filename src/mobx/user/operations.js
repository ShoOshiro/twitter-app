import {auth, FirebaseTimestamp, db} from '../../firebase/index'
import UserStore from './userStore'


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
                        console.log("New account is set to db.")
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
                const uid = user.uid

                db.collection('users').doc(uid).get()
                    .then((snapshot) => {
                        const data = snapshot.data()

                        UserStore.setSignInUser({
                            uid: data.uid,
                            userName: data.userName,
                            email: data.email,
                            isSignIn: true
                        })
                        console.log("Signin completed.")
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
                    UserStore.setSignInUser({
                        uid: data.uid,
                        userName: data.userName,
                        email: data.email,
                        isSignIn: true
                    })
                    console.log("Listen Auth: user signed in.")
                    // NOTE: this code can be incorrect when pathname is changed to /profile by push method.
                    history.push('/')
                })
        } else {
            console.log('Please sign in')
            history.push('/signin');
        }
    })
}

export const signOut = (history) => {
    auth.signOut()
        .then(() => {
            UserStore.signOutUser()
            history.push('/signin')
        })
}