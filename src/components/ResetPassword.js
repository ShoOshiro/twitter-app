import React from 'react';
import {TextInput, PrimaryButton} from '../common/ui-kit/index';
import {resetPassword} from '../mobx/user/operations';
import { withRouter } from 'react-router';

class ResetPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
        }
    }

    inputEmail = (event) => {
        this.setState({email: event.target.value});
    }

    resetPassword = () => {
        resetPassword(this.state.email, this.props.history)
    }

    render(){
        return (
            <div>
                <h2>パスワードのリセット</h2>
                <TextInput
                    isFullWidth={true} label={'メールアドレス'} isMultiline={false} isRequired={true}
                    rows={1} value={this.state.email} type={'email'} onChange={this.inputEmail}
                />
                <PrimaryButton
                    label={'Reset Password'}
                    onClick={this.resetPassword}
                />
                <p onClick={() => {this.props.history.push('/signin')}}>
                    ログイン画面に戻る
                </p>
            </div>
        )
    }
}
export default withRouter(ResetPassword)