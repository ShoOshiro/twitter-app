import React from 'react';
import {ImageArea} from '../common/component-area'
import { PrimaryButton, TextInput } from '../common/ui-kit';
import {saveProfile} from '../mobx/user/operations';
import ReactModal from 'react-modal';

class EditProfile extends React.Component {
    
    constructor(props){
        super(props)
        this.state={
            userImage: null,
            userName: '',
            bio: '',
        }
    }

    setSelectedFile = (selectedFile) => {
        this.setState({userImage: selectedFile})
    }

    inputProfileBio = (event) => {
        this.setState({ bio: event.target.value})
    }

    inputProfileUserName = (event) => {
        this.setState({userName: event.target.value})
    }

    saveProfile = () => {
        saveProfile(this.state.userImage, this.state.userName, this.state.bio, this.props.history);
    }

    render(){
        return(
            <div>
                <ReactModal
                    isOpen = {this.props.openModal}
                >
                    <h1>edit profile</h1>
                    <ImageArea setSelectedFile={this.setSelectedFile} />
                    <TextInput
                        isFullWidth={true} label={'user name'} isMultiline={true} isRequired={false}
                        rows={5} value={this.state.userName} type={'text'} onChange={this.inputProfileUserName}
                    />
                    <TextInput
                        isFullWidth={true} label={'bio'} isMultiline={true} isRequired={false}
                        rows={5} value={this.state.bio} type={'text'} onChange={this.inputProfileBio}
                    />
                    <PrimaryButton
                        label={'Save'}
                        onClick = { () => {
                            this.saveProfile();
                            this.props.onClose();
                        }}
                    />
                    <PrimaryButton
                        label={'Cancel'}
                        onClick={this.props.onClose}
                    />
                </ReactModal>
            </div>
        )
    }
}

export default EditProfile;
