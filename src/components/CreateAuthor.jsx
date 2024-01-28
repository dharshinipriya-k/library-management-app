import React from 'react'
import TopBar from './TopBar'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ApiService from '../utils/ApiService';

function CreateAuthor() {

    let formik = useFormik({
        initialValues:{
            name:'',
            dob:'',
            bio:'',
            image:''
        },
        validationSchema: Yup.object({
            name: Yup.string().
                    max(20,'Name cannot exceed 20 characters').
                    min(3,'Name should be atleast 3 chars').
                    required('Name is required!'),
            dob: Yup.string().required('DOB is required'),
            bio: Yup.string().
            max(150,'bio should not exceed 50 characters ').
            min(10, 'Min 10 characters required').
            required('Bio field required!')
                 
        }),
        onSubmit: async (values)=>{
            try {
                let res= await ApiService.post('/author',values)
                if(res.status === 201){
                    navigate('/dashboard')
                }
            } catch (error) {
                
            }
        }
    })

    let navigate = useNavigate()


  return <div className='container-fluid'>
    <div className="topbar">
    <TopBar/>
    </div>
    <div className="create-author-container">
        <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" >
            <Form.Label as="h6">Author Name</Form.Label>
            <Form.Control type="text" placeholder="Name" id='name' name='name' onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}/>
            {formik.touched.name && formik.errors.name ? (<div style={{color:"red"}}>{formik.errors.name}</div>):null}
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label as="h6">Date Of Birth</Form.Label>
            <Form.Control type="text" placeholder="dd-mm-yyyy" id='dob' name='dob' onChange={formik.handleChange} value={formik.values.dob} onBlur={formik.handleBlur}/>
            {formik.touched.dob && formik.errors.dob ? (<div style={{color:"red"}}>{formik.errors.dob}</div>):null}
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label as="h6">Short Bio</Form.Label>
            <Form.Control  as='textarea' type="text" placeholder="Bio about author" id='bio' name='bio' onChange={formik.handleChange} value={formik.values.bio} onBlur={formik.handleBlur}/>
            {formik.touched.bio && formik.errors.bio ? (<div style={{color:"red"}}>{formik.errors.bio}</div>):null}
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label as="h6">Image Url</Form.Label>
            <Form.Control   type="text" placeholder="url" id='image' name='image' onChange={formik.handleChange} value={formik.values.image} onBlur={formik.handleBlur} />
            {formik.touched.image && formik.errors.image ? (<div style={{color:"red"}}>{formik.errors.image}</div>):null}
        </Form.Group>
        
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    </div>   
  </div>
}

export default CreateAuthor