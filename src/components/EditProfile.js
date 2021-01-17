import React from 'react';
import {withRouter} from 'react-router';
import {ImageArea} from '../common/component-area'
import { PrimaryButton, TextInput } from '../common/ui-kit';
import {saveProfile} from '../mobx/user/operations';
import ReactModal from 'react-modal';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

class EditProfile extends React.Component {
    
    constructor(props){
        super(props)
        this.state={
            userImageFile: null,
            userName: props.userName,
            bio: props.bio,
        }
    }

    setSelectedFile = (selectedFile) => {
        this.setState({userImageFile: selectedFile})
    }

    inputProfileBio = (event) => {
        this.setState({ bio: event.target.value})
    }

    inputProfileUserName = (event) => {
        this.setState({userName: event.target.value})
    }

    saveProfile = () => {
        saveProfile(this.state.userImageFile, this.state.userName, this.state.bio, this.props.history);
        this.setState({userImageFile: null, userName: '', bio: '',})
    }

    render(){
        const userData = this.props.userData
        return(
            <div>
                <ReactModal
                    isOpen = {this.props.openModal}
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(204, 204, 204, 0.75)'
                        },
                        content: {
                            maxWidth: '600px',
                            margin: 'auto',
                        }
                    }}
                >
                    <Card className="row-margin" key={userData.uid}>
                        <CardHeader
                            avatar={
                                <div>
                                    <ImageArea setSelectedFile={this.setSelectedFile} path={userData.userImageUrl}/>
                                </div>
                            }
                        />
                            <CardContent>
                                <TextInput
                                    isFullWidth={true} label={'user name'} isMultiline={true} isRequired={false}
                                    rows={5} value={this.state.userName} type={'text'} onChange={this.inputProfileUserName}
                                    defaultValue={userData.userName}
                                />
                                <TextInput
                                    isFullWidth={true} label={'bio'} isMultiline={true} isRequired={false}
                                    rows={5} value={this.state.bio} type={'text'} onChange={this.inputProfileBio}
                                    defaultValue={userData.bio}
                                />
                            </CardContent>
                        <CardActions disableSpacing>
                            <PrimaryButton
                                style={{'margin-right': '6px'}}
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
                        </CardActions>
                    </Card>
                </ReactModal>
            </div>
        )
    }
}

export default withRouter(EditProfile);
