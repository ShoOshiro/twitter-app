import React from 'react';
import {TextInput, PrimaryButton} from '../common/ui-kit/index';
import {signIn} from '../mobx/user/operations';
import { withRouter } from 'react-router';

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    inputEmail = (event) => {
        this.setState({email: event.target.value});
    }
    inputPassword = (event) => {
        this.setState({password: event.target.value});
    }

    signIn = () => {
        signIn(this.state.email, this.state.password, this.props.history)
    }

    render(){
        return (
            <div>
                <h2>ログイン</h2>
                <TextInput
                    isFullWidth={true} label={'メールアドレス'} isMultiline={false} isRequired={true}
                    rows={1} value={this.state.email} type={'email'} onChange={this.inputEmail}
                />
                <TextInput
                    isFullWidth={true} label={'パスワード'} isMultiline={false} isRequired={true}
                    rows={1} value={this.state.password} type={'password'} onChange={this.inputPassword}
                />
                <PrimaryButton
                    label={'ログイン'}
                    onClick={this.signIn}
                />
                <p onClick={() => {this.props.history.push('/signup')}}>
                    アカウントをお持ちでない方はこちら
                </p>
                <p onClick={() => {this.props.history.push('/signin/reset')}}>
                    パスワードを忘れた方はこちら
                </p>
            </div>
        )
    }
}
export default withRouter(SignIn)