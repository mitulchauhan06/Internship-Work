import { createContext , useState ,  } from "react" // import the all necesaary hooks
import {useNavigate } from "react-router-dom"

/// here we crete the protected route
   const AuthContext = createContext(); //create and assign in variable

const AuthProvider = ({children}) => {

    const [user , setuser] = useState(null);
    const navigate = useNavigate();

    const login = (userdata)=> {
        setuser(userdata);  //set the data globally
         navigate("/dashboard");  // redirect to the dashboard
};

const logout = () => {
    setuser(null);  // remove the data 
    navigate("/login");  // redirect to the login
}


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

//export const useAuth = () => useContext(AuthContext);

export {  AuthContext ,AuthProvider };
