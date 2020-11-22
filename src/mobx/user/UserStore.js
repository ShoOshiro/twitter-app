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

}

export default new UserStore;