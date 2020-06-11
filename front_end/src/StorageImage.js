import React, {Component} from 'react';
import {Storage} from 'aws-amplify';

class StorageImage extends Component {
    state = {fileUrl:'',file: '', filename: ''}
    handleChange = e => {
        const file = e.target.files[0]
        this.setState({
            fileUrl: URL.createObjectURL(file),
            file,
            filename:file.name
        })
    }
    saveFile =() => {
        Storage.put(this.state.filename, this.state.file,{level:'private',
        contentType: 'image/png'
    })
        .then(()=>{
            console.log('successful save')
            this.setState({fileUrl:'',file:'',filename:''})
        })
        .catch(err => {
            console.log('upload fail',err)
        })
    }
    render() {
        return (
        <div className="storage">    
        <input type='file' onChange={this.handleChange} />
        <img src={this.state.fileUrl}/>
        <button onClick={this.saveFile}>Save file</button>
        </div>
    );
    }
}
export default StorageImage;