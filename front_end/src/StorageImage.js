import React, {Component,useState} from 'react';
import {Storage,Auth,API} from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import history from './history';
import { Checkbox, Row, Col } from 'antd';




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
    postData = async () => { 
        const iu = new FormData();
        iu.append('image', this.state.file,this.state.filename);
        const apiName = 'cloudApp';
        const path = '/upload-image';
        const myInit = { 
          body:{ iu },
          headers: { 
            imageup: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
          },
        };
    
        return await API.post(apiName, path, myInit)
         .then(()=>{
            console.log('successful save')
            this.setState({fileUrl:'',file:'',filename:''})
        })
        .catch(err => {
            console.log('upload fail',err)
        });
    }

  

    render() {
        return (
         <AmplifyAuthenticator>     
        <AmplifySignOut/>    
        <div className="storage">    
        <input type='file' onChange={this.handleChange} />
        <img src={this.state.fileUrl}/>
        <button onClick={this.postData}>Save file</button>
        <button onClick={() => history.push('/')}>Home</button>
        </div>
        <br/>

        <div>
        <h3>search images by tags</h3>    
        <Checkbox.Group style={{ width: '100%' }} >
    <Row>
      <Col span={8}>
        <Checkbox value="A">person</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="B">dog</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="C">box</Checkbox>
      </Col>
    </Row>
  </Checkbox.Group>,
  <button >submit</button>  
      </div>
        </AmplifyAuthenticator>
    );
    }
}
export default StorageImage;