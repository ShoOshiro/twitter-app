import {makeObservable, observable, action} from 'mobx';


class UserStore{

    @observable uid = '';
    @observable userName = '';
    @observable email = '';
    @observable isSignIn = false;

    constructor() {
        makeObservable(this)
    }

    @action setSignInUser = (signInUser) => {
        this.userName = signInUser.userName;
        this.email = signInUser.email;
        this.uid = signInUser.uid;
        this.isSignIn = signInUser.isSignIn;
    }

    @action signOutUser = () => {
        this.uid = ""
        this.userName = ""
        this.email = ""
        this.isSignIn = false
    }

}

export default new UserStore;