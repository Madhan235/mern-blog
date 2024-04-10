import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

import {useDispatch , useSelector} from 'react-redux';
import { signInStart,signInFailure,signInSuccess } from "../redux/user/userSlice";
import Oauth from "../components/Oauth";



const SignIn = () => {
  const [formData, setFormData] = useState({});
  

  const { loading, error : errorMessage } = useSelector(state => state.user)

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value.trim() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if ( !formData.password || !formData.email) {
      return dispatch(signInFailure("Please fill out all the feilds"));
    }

    try {
       
    dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
 if(data.success === false){
   
  return dispatch(signInFailure(data.message))
 }
 
 if(res.ok){
   dispatch(signInSuccess(data))
  navigate("/");
 }
    } catch (error) {
       dispatch(signInFailure(error.message));
       
    }
  };

  return (
    <div className="min-h-screen mt-20 ">
      <div className=" flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Madhan's
            </span>
            Blog
          </Link>

          <p className="text-sm mt-5 ">
            {" "}
            This is a demo project for experimental or learning purpose. You can
            sign in with your email and password or with Google, its safe !
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            

            <div>

              <Label value="your Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>

              <Label value="your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            
            <Button gradientDuoTone="purpleToPink" type="submit"
            disabled={loading}
            >
           {loading ? (
            <>
           <Spinner size='sm'/>
           <span className="pl-3">loading...</span>
           </>
           ) : 'Sign In'}
          
            </Button>
            <Oauth/>
          </form>

          <div className="flex gap-2 text-sm mt-4">
            <span>
             Dont Have an account?{" "}
              <Link to="/sign-up" className="text-blue-500">
                Sign Up
              </Link>
            </span>
          </div>

{errorMessage && <Alert className="mt-5"
color="failure"
>{errorMessage}</Alert>}


        </div>
      </div>
    </div>
  );
};

export default SignIn;
