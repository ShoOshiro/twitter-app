import React from 'react'
import {UserImage} from './'

class ImageArea extends React.Component{
    constructor(props){
        super(props);
        this.state={selectedFile: null};
    }
    
    onChange = e => {
        let reader = new FileReader();
        const that = this;
        reader.onload = function(event) {
            that.setState({selectedFile: event.target.result});
        };
        const selectedFile = e.target.files[0]
        reader.readAsDataURL(selectedFile);
        this.props.setSelectedFile(selectedFile);
    };

    render(){
        const path = this.state.selectedFile ? this.state.selectedFile : this.props.path
        return(
            <div>
                <label>
                    <UserImage path={path} style={{width: '100px', height: '100px'}}/>
                    <input type='file' className='select-image' onChange={this.onChange} />
                </label>
            </div>
        )
    }
}

export default ImageArea
