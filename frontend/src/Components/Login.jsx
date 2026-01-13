import React from 'react'
import { Link ,  useNavigate} from 'react-router-dom' 
import { useFormik } from 'formik'
import { LoginSchema } from "../Schema";
import  {useAuth} from "../hooks/useAuth"
import {useState} from 'react'
const Login = () => {
  const navigate = useNavigate();
  const {login}  = useAuth();
  const [errorMsg , setErrorMsg] = useState("");

  

  const {values , errors , handleSubmit , handleChange  , handleBlur , touched ,} = useFormik({

    initialValues : {
      email:"",
      password:"",
     

    },

    validationSchema: LoginSchema,

    onSubmit: (values , ) => {
     const storedUserJSON = localStorage.getItem('user');

  if (!storedUserJSON) {
    setErrorMsg("Username and password is incorrect");
    return;
  }

  const user = JSON.parse(storedUserJSON);

      
    
   if(user.email === values.email && user.password === values.password){
      localStorage.setItem('isloggedIn ', true);
      login(values); //auth context 
      navigate("/dashboard");
    }else {
      setErrorMsg("Username or password is incorrect");
    }
    
    

    }})
  


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="bg-white shadow-lg rounded-2xl px-6 py-8 w-full sm:max-w-sm md:max-w-md lg:max-w-lg mt-10">
        <h1 className=' lg:text-3xl md:text-md sm:text-xl text-blue-600  font-bold text-2xl text-center mb-4 '>  Login   </h1>
       
        <form onSubmit={handleSubmit} >
            <div className='mb-4'>
                <label htmlFor='email' className="block text-gray-600 ">  E-mail </label>
                    <input 
                    type='email' 
                    name="email" 
                    placeholder='enter your email' 
                    className={` w-full  mt-1  mb-4 p-2 border rounded-lg ${errors.email && touched.email ? "border-red-600": "border-gray-300"}`} 
                     value={values.email}
                               onChange={handleChange}
                             onBlur={handleBlur}/>

                               {errors.email && touched.email ? (
                    <p className=' form_error text-red-500'>{errors.email}</p>): null}
            </div>

            <div className='mb-4'>
                <label htmlFor='password' className="block text-gray-600 ">  Password </label>
                    <input type='password' 
                    id='passwor'
                    name="password" 
                    placeholder='enter your password' 
                    className={` w-full  mt-1 mb-4 p-2 border rounded-lg ${errors.email && touched.email ? "border-red-600": "border-gray-300"}`} 
                     value={values.password}
                               onChange={handleChange}
                             onBlur={handleBlur}/>

                               {errors.password && touched.password ? (
                    <p className=' form_error text-red-500'>{errors.password }</p>): null}
            </div>
            {errorMsg && (
  <div className="text-red-500 text-sm  md:text-base mb-4 text-center font-medium">
    {errorMsg}
  </div>
)}

            <button type='submit' className='bg-blue-600 w-full rounded-2xl py-2 md:py-3 lg:py-4 text-white hover:bg-blue-700 transition '>
            Login
            </button>
            <span className='flex mt-4'>Don't have any account? <Link className='text-blue-800  underline' to={"/Sign_up"}>Sign-up here</Link> </span>
        </form>
      </div>
    </div>
  )
}

export default Login
