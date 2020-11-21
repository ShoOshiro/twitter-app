import React from 'react';
import {TextInput, PrimaryButton} from '../common/ui-kit/index';
import {signUp} from '../mobx/user/operations';
import { withRouter } from 'react-router';

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    inputUserName = (event) => {
        this.setState({userName: event.target.value});
    }
    inputEmail = (event) => {
        this.setState({email: event.target.value});
    }
    inputPassword = (event) => {
        this.setState({password: event.target.value});
    }
    inputConfirmPassword = (event) => {
        this.setState({confirmPassword: event.target.value});
    }

    registerAccount = () => {
        signUp(this.state.userName, this.state.email, this.state.password, this.state.confirmPassword, this.props.history)
    }

    render(){
        return (
            <div>
                <h2>アカウント登録</h2>
                <TextInput
                    isFullWidth={true} label={'ユーザー名'} isMultiline={false} isRequired={true}
                    rows={1} value={this.state.userName} type={'text'} onChange={this.inputUserName}
                />
                <TextInput
                    isFullWidth={true} label={'メールアドレス'} isMultiline={false} isRequired={true}
                    rows={1} value={this.state.email} type={'email'} onChange={this.inputEmail}
                />
                <TextInput
                    isFullWidth={true} label={'パスワード'} isMultiline={false} isRequired={true}
                    rows={1} value={this.state.password} type={'password'} onChange={this.inputPassword}
                />
                <TextInput
                    isFullWidth={true} label={'パスワード(確認)'} isMultiline={false} isRequired={true}
                    rows={1} value={this.state.confirmPassword} type={'password'} onChange={this.inputConfirmPassword}
                />
                <PrimaryButton
                    label={'アカウントを登録する'}
                    onClick={this.registerAccount}
                />
            </div>
        )
    }
}
export default withRouter(SignUp)