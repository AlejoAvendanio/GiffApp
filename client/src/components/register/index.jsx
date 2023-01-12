import React,{useState} from 'react'
import register from '../fetch/register'
import { Formik, Form, Field, ErrorMessage} from 'formik';
import { useNavigate } from 'react-router';

  const validate = values=>{
    const errors = {}
      if(!values.email){
        errors.email="Required username"
      }
      if(!values.password){
        errors.password = "Required password"
      }else if(values.password.length < 5){
        errors.password= "Length must be greater than 5"
      }
      return errors
  }

  const initialValues = {
    email:"",
    name:"",
    password:"",
    error:""
  }


export function Register(){
  const navigate = useNavigate()
  const [registered,setRegistered] = useState(false)
  if(registered){
    return (
      <div>
        <h4>
          Congratulation ✔! You've been successfully registered
        </h4>
        {
          setTimeout(()=>{
            navigate("/login")
          },3000)
        }
      </div>
    
    )
  }
  return (<>
    <Formik
    
    initialValues={initialValues}
    onSubmit={(values,{setFieldError})=>{
      return register(values)
        .then(res=>{
          return res ? setRegistered(true)
            : <></>
        })
        .catch((res)=>{
          // console.log(res)
          if(res.response.status===402){
            setFieldError("email", "Required email")
          }
          else if(res.response.status===401){
            setFieldError("name","reviw name")
          }else if(res.response.status===400){
            setFieldError("email","This email is in use")
          }else if(res.response.status===403){
            setFieldError("password","reviw password")
          }else{
            setFieldError("error","an ocurred error")
          }
          // setFieldError("password","the password does not meet the requirements")
        })
    }}
    validate={validate}
    >
      {
        ({isSubmitting})=>
          <Form className='form'>
            <Field className='int' type="text" placeholder='email' name='email'/>
            <ErrorMessage name='email' component="small"></ErrorMessage>
            <Field className='int' type="text" placeholder='name' name='name'/>
            <ErrorMessage name='name' component="small"></ErrorMessage>
            <Field className='int' placeholder='password' name='password'/>
            <ErrorMessage name="password" component="small"></ErrorMessage>
            <button className='btnSubmit' disabled={isSubmitting}>Register</button>
            <ErrorMessage name='error' component="small"></ErrorMessage>
          </Form>
        }
      
    </Formik>  

    </>
  )
}
