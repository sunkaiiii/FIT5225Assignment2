import React, {Component,useState} from 'react';
import {Auth,API} from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import history from './history';
import { Checkbox, Row, Col,Button } from 'antd';
import a1 from './a1.png';
import "antd/dist/antd.css";
import './App.css';




class StorageImage extends Component {


    
    state = {fileUrl:'',file: '', filename: '',response:'', resp:'',tags:[],links:[]}
    handleChange = e => {
        const file = e.target.files[0]
        this.setState({
            fileUrl: URL.createObjectURL(file),
            file,
            filename:file.name

        })
    }
    postData = async () => { 
        const apiName = 'cloudApp';
        const path = '/upload-image';
        let blob = await fetch(this.state.fileUrl).then(response=>response.blob());
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        const filenamee = this.state.filename;
        reader.onloadend = async ()=>{
          let base64data = reader.result.split(",")[1];
        const myInit = { 
          body:{ 
            content:base64data,
            filename:filenamee 
           },
          headers: { 
            'Content-Type': `application/json`,
            Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
          },
        };
    
        return await API.post(apiName, path, myInit)
         .then(()=>{
           this.setState({response:"successful save"})
            console.log('successful save')
            this.setState({fileUrl:'',file:'',filename:''})
        })
        .catch(err => {
            console.log('upload fail',err)
            this.setState({response: `Cannot uploading image: ${err}`})
        });
    }
    
  }


  onChangetag = checkedValues => {
    //console.log('checked = ', checkedValues);
    this.setState({tags:checkedValues},()=>console.log(this.state.tags))
    
  }
  getData = async () => {
    const apiName = 'cloudApp';
    const path = '/search/get-tags'; 
    const myInit = { 
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
        }, 
        response: true,
        /* queryStringParameters: {
            tag:  `${this.state.tags}`
            },                 */
    };

    return await API.get(apiName, path, myInit)
      .then(() => {
        console.log("work!")
        
      })
      .catch(error => {
        console.log(error.response);
    });
  }

    render() {
        return (
         <AmplifyAuthenticator>   
        <div className= "p1">     
        <img
        src={a1}
        alt="ll"
        className="img-p1"
        />   
        <div className="storage">    
        <input type='file' onChange={this.handleChange} />
        <img src={this.state.fileUrl}/>
        <Button type="primary"  onClick={this.postData}>Save file</Button>
        {!!this.state.response && <div>{this.state.response}</div>}
        </div>
        <br/>
       
        <div>
        <h3>search images by tags</h3>    
        <Checkbox.Group style={{ width: '100%' }}  onChange={this.onChangetag}>
      <Row>
      <Col span={8}>
        <Checkbox value="person" >person</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="elephant">elephant</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="umbrella">umbrella</Checkbox>
      </Col>
    </Row>
    </Checkbox.Group>,
    <Row>
    <Col span={12}>
     <Button  type="primary"  onClick={this.getData} >Submit</Button>  
     </Col>
     <Col span={12}>
     <Button type="primary" onClick={() => history.push('/')}>Home</Button>
     </Col>
     </Row>
      </div>
      </div>
        </AmplifyAuthenticator>
    );
    }
}
export default StorageImage;