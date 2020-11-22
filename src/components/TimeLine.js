import React from 'react';
import { observer, inject } from "mobx-react"

@inject('UserStore')
@observer
class TimeLine extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        
        return(
            <div>
                <h2>TimeLine</h2>
                <h4>{this.props.UserStore.userName}</h4>
                <h4>{this.props.UserStore.email}</h4>
                <h4>{this.props.UserStore.uid}</h4>
            </div>
        )
    }
    
}
export default TimeLine;