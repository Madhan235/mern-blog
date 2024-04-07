import { Alert, Button, FloatingLabel, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";


const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value.trim() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      return setErrorMessage("Please fill out All feilds");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
 if(data.success === false){
  setLoading(false);
  return setErrorMessage(data.message)
 }
 
 if(res.ok){
  setLoading(false);
  navigate("/sign-in");
 }
    } catch (error) {
       setErrorMessage(error.message);
       setLoading(false);
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
            sign up with your email and password or with Google, its safe !
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <Label value="your Name" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
              <Label value="your Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
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
           ) : 'Sign Up'}
          
            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-4">
            <span>
              Have an account?{" "}
              <Link to="/sign-in" className="text-blue-500">
                Sign In
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

export default SignUp;
