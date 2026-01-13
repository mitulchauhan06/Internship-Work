

import { ErrorMessage, useFormik } from "formik";
import {Link , useNavigate} from "react-router-dom";

import { Schema } from "../Schema";
import { useState } from "react";

function Sign_Up(){

  const navigate = useNavigate();
  

  const [submitted , setSubmitted] = useState(false);

    const {values , errors, touched, handleSubmit , handleBlur , handleChange} = useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            confirm_password:'',
        },

        validationSchema:Schema,

        onSubmit: (values , ) => {
          //store the data in local storage 
          localStorage.setItem('user', JSON.stringify(values));
            setSubmitted(true);
        navigate("/Login");
          
           
            console.log(values);
          
           setTimeout (() => setSubmitted(false), 3000)

        },});
       
            
        
       

        return (
            <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="bg-white shadow-lg rounded-2xl px-6 py-8 w-full sm:max-w-sm md:max-w-md lg:max-w-lg mt-10">
                    <h2 className="lg:text-3xl sm:text-xl md:text-2xl font-bold text-center text-blue-600 mb-4">Create an Account</h2>
                    {submitted && ( <div className= "text-green-500 text-center mb-4 font-semibold"> Account created successfully !</div>)}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4"> 
                            <label htmlFor="name" className="block text-gray-600"> Full Name </label>
                        <input className={`w-full mt-1 mb-4 p-2 border rounded-lg ${errors.name && touched.name ? "border-red-500" : "border-gray-300"}`}
                        id="name"
                        autoComplete="name"
                        type="text" 
                        name="name" 
                        placeholder="enter your name"
                        value={values.name}
                        onChange={handleChange}
                             onBlur={handleBlur}
                           />
                           {errors.name && touched.name && (
                      <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                       )}
                          
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600">E-mail</label>
                             <input 
                             className={`w-full mt-1 mb-4 p-2 border rounded-lg ${errors.email && touched.email ? "border-red-500" : "border-gray-300"}`}
                             id="email"
                             autoComplete="email"
                             type="email" 
                             name="email"
                               placeholder="enter your email"
                               value={values.email}
                               onChange={handleChange}
                             onBlur={handleBlur}
                            /> 
                            {errors.email && touched.email && (
                         <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                         )}

                           
                            
                        </div>
                          <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600">Password</label>
                             <input 
                             className={`w-full mt-1 mb-4 p-2 border rounded-lg ${errors.password && touched.password ? "border-red-500" : "border-gray-300"}`} 
                             id="password"
                             autoComplete="current-password"
                             type="password" 
                             name="password"  
                               placeholder="enter your  password"
                               value={values.password}
                               onChange={handleChange}
                             onBlur={handleBlur}
                             /> 
                            {errors.password && touched.password && (
                          <p className="text-sm  text-red-600 mt-1">{errors.password}</p>
                           )}

                             
                        </div>
                         
                          <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600">Confirm_Password</label>
                             <input 
                             id="confirm_password"
                             autoComplete="current-password"
                             className={`w-full mt-1  mb-4 p-2 border rounded-lg ${errors.confirm_password && touched.confirm_password ? "border-red-500" : "border-gray-300"}`}
                             type="password" 
                             name="confirm_password" 
                             placeholder="enter your confirm password"
                             value={values.confirm_password}
                             onChange={handleChange}
                             onBlur={handleBlur}
                      /> 
                      {errors.confirm_password && touched.confirm_password && (
                  <p className="text-sm md:text-base text-red-600 mt-1">{errors.confirm_password}</p>
                    )}

                     
                            
                        </div>
   

                        <button
                        type="submit" className= " w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Sign Up</button>
                    
                    <span className="mt-4 flex" >Already have an account ?    <Link className="text-blue-800 underline" to="/Login">  Login here</Link>  </span>
                    </form>
                </div>

            </div>
            </>
        )

    }

    


export default Sign_Up