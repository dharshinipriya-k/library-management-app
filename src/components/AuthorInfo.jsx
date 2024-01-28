import React, { useEffect, useState } from 'react'
import TopBar from './TopBar'
import Card from 'react-bootstrap/Card';
import ApiService from '../utils/ApiService';
import { useParams } from 'react-router-dom';


function AuthorInfo() {

    let [info,setInfo] = useState([])
    let params  =  useParams()
    
    const getData = async()=>{
        let {id} = params
        try {
            let res = await ApiService.get(`/author/${id}`)
            if(res.status === 200){
                setInfo(res.data)
                
                
            }
        } catch (error) {
            console.log("Error fetching")
        }
    }

    useEffect(()=>{
        getData()
    },[])
    
    return <div className='container-fluid'>     
        <div className='topbar'>
            <TopBar/>
        </div>   
        <div >
                <Card  className='authorinfo'>                   
                <Card.Img variant="top" src={info.image} />
                <Card.Body>
                    <Card.Title style={{textAlign:"center"}}>{info.name}</Card.Title>
                    <Card.Text>DOB: {info.dob}</Card.Text>
                <Card.Text> 
                    {info.bio}
                </Card.Text>
                </Card.Body>
        </Card>      
        </div>

    </div>
}

export default AuthorInfo