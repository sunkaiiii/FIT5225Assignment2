import React, {Component,useState} from 'react';
import {Auth,API} from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import history from './history';
import { Checkbox, Row, Col,Button } from 'antd';
import a1 from './a1.png';
import "antd/dist/antd.css";
import './App.css';





class StorageImage extends Component {


    
    state = {fileUrl:'',file: '', filename: '',response:'',res1:'',tags:[],images:[]}
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
    const path = '/search/'; 
    let parameter={}
    let number = 1
    this.state.tags.forEach(tag=>{
      parameter["tag"+number]=tag;
      number++;
    });

    const myInit = { 
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
        }, 
         queryStringParameters: parameter,                
    };

    return await API.get(apiName, path, myInit)
      .then((data) => {
        
        console.log('checked = ', data);
        this.setState({images:data.links})
        if(this.state.images.length===0){
          this.setState({res1: "no this image"});
       }
        console.log('checkedw = ', this.state.images);
      })
      .catch(error => {
        this.setState({res1: "no this image"})
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
      <Col span={3}>
        <Checkbox value="person" >person</Checkbox>
      </Col>
      <Col span={3}>
        <Checkbox value="elephant">elephant</Checkbox>
      </Col>
      <Col span={3}>
        <Checkbox value="umbrella">umbrella</Checkbox>
      </Col>
      <Col span={3}>
        <Checkbox value="cat" >cat</Checkbox>
      </Col>
      <Col span={3}>
        <Checkbox value="dog" >dog</Checkbox>
      </Col>
      <Col span={3}>
        <Checkbox value="bus" >bus</Checkbox>
      </Col>
      <Col span={3}>
        <Checkbox value="skateboard" >skateboard</Checkbox>
      </Col>
      <Col span={3}>
        <Checkbox value="car" >car</Checkbox>
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
      <div>
      {!!this.state.res1 && <div>{this.state.res1}</div>}
      {
        this.state.images.map((links,i)=>(
         <div className="img-p3">
          <img
          src={links}
          alt="ii"
          className="img-p2"
          /> 
          </div>
        ))
      }
      </div>
     
     
        </AmplifyAuthenticator>
    );
    }
}
export default StorageImage;