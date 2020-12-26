import React from 'react'
import IconButton from '@material-ui/core/ListItemIcon'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

class ImageArea extends React.Component{
    constructor(props){
        super(props);
        this.state={selectedFile: null};
    }
    
    onChange = e => {
        this.setState({selectedFile: e.target.files[0]});

        const selectedFile = e.target.files[0];
        let reader = new FileReader();
        let imgtag = document.getElementById("selected-image");
        imgtag.title = selectedFile.name;
        reader.onload = function(event) {
            imgtag.src = event.target.result;
        };
        reader.readAsDataURL(selectedFile);

        this.props.setSelectedFile(selectedFile);
    };

    render(){
        return(
            <div>
                <img style={{float:'left', width: "15%" }} id="selected-image" alt="" />
                <IconButton>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input type='file' id='image' onChange={this.onChange} />
                    </label>
                </IconButton>
            </div>
        )
    }
}

export default ImageArea
