import {auth, FirebaseTimestamp, db, storage} from '../../firebase/index'
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
                            userImageUrl: data.userImageUrl,
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
                        userImageUrl: data.userImageUrl,
                        email: data.email,
                        isSignIn: true
                    })
                    console.log("Listen Auth: user signed in.")
                    // FIX Me.
                    history.push('/');
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

export const resetPassword = (email, history) => {
    if(email === ''){
        alert('必須項目が未入力です')
        return false
    } else {
        alert('パスワードリセットは現在開発中です')
        history.push('/signin')
        // TODO: research sendPasswordResetEmail method

        // auth.sendPasswordResetEmail(email)
        //     .then(() => {
        //         alert('入力されたアドレスにパスワードリセット用のメールを送りました')
        //         history.push('/signin')
        //     }).catch(() => {
        //         alert('パスワードリセットに失敗しました')
        //     })
    }
}

export const saveProfile = (userImage, userName, bio, history) => {

    const currentUser= auth.currentUser;
    let blob = new Blob([userImage], {type: "image/jpeg"});
    const uploadRef = storage.ref('userImage').child(currentUser.uid);
    const uploadTask = uploadRef.put(blob);
    uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
            UserStore.setUserImage(downloadURL)
            console.log('save user image successful')

            const timestamp = FirebaseTimestamp.now()
            const profileData = {
                userName: userName,
                userImageUrl: downloadURL,
                bio: bio,
                updated_at: timestamp
            }

            db.collection('users').doc(currentUser.uid).set({...profileData},{merge: true})
                .then(() => {
                    console.log('save user profile successful')
                    UserStore.updateProfile(profileData)
                    history.push('/profile')
                })
        })
    }).catch(() => {
        console.log("image upload error")
    })
}