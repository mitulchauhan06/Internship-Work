import * as yup from 'yup';

export const Schema = yup.object({
    name: yup.string().min(2).max(25).required("please enter your name"),
     email: yup.string().email().required("please enter your email"),
      password: yup.string().min(6).required("please enter your password"),
       confirm_password: yup.string().required().
       oneOf([yup.ref('password'),null] ,"password must match"),
})

export const LoginSchema = yup.object({
    email: yup.string().email("invalid email").required("email is reruired"),
    password:yup.string().required("password is required"),
    
})