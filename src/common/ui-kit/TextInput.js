import React from 'react'
import TextField from '@material-ui/core/TextField';

const TextInput = (props) => {
    return (
        <TextField
            fullWidth={props.isFullWidth}
            label={props.label}
            margin="dense"
            multiline={props.isMultiline}
            required={props.isRequired}
            rows={props.rows}
            value={props.value}
            type={props.type}
            onChange={props.onChange}
        />
    )
}

export default TextInput