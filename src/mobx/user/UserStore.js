import {makeObservable, observable, action} from 'mobx';

class UserStore{

    @observable uid = '';
    @observable userName = '';
    @observable email = '';
    @observable isSignIn = false;
    @observable userImageUrl = '';
    @observable bio = '';

    constructor() {
        makeObservable(this)
    }

    @action setSignInUser = (signInUser) => {
        this.userName = signInUser.userName;
        this.userImageUrl = signInUser.userImageUrl;
        this.bio = signInUser.bio;
        this.email = signInUser.email;
        this.uid = signInUser.uid;
        this.isSignIn = signInUser.isSignIn;
    }

    @action signOutUser = () => {
        this.uid = ""
        this.userName = ""
        this.userImageUrl = null
        this.email = ""
        this.isSignIn = false
    }

    @action setUserImage = (userImageUrl) => {
        this.userImageUrl = userImageUrl;
    }

    @action updateProfile = (profileData) => {
        this.userName = profileData.userName;
        this.userImageUrl = profileData.userImageUrl;
        this.bio = profileData.bio;
    }

}

export default new UserStore;