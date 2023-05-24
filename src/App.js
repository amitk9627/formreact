import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const initialvalue={username:"",email:"",password:""};
  const[formValues,setFormValues] = useState(initialvalue);
  const[formErrors,setFormErrors] = useState({});
  const[isSubmit,setIsSubmit] = useState(false);

  useEffect(()=>{
    console.log(formErrors);
    if(Object.keys(formErrors).length ===0 && isSubmit){
      console.log(formValues);
    }
  },[formErrors]);

  //
  const handleChange =(e)=>{
    const{name,value}=e.target;
    setFormValues({...formValues, [name]:value})
    //console.log(formValues)
  }

  // 
  const handleForm=(e)=>{
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  //
  const validate=(formValues)=>{
    const errors={}
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!formValues.username){
      errors.username="Username is required";
    }


    if(!formValues.email){
      errors.email="Email is required";
    }else if(!regex.test(formValues.email)){
      errors.email="This is not a Email ";
    }


    if(!formValues.password.length){
      errors.password="Password is required";
    }else if(formValues.password.length<6){
      errors.password="Password must be more than 6 characters";
    }else if(formValues.password.length>12){
      errors.password="Password must be less than 12 characters";
    }

    return errors;
  }

  return (
    <div className='App'>
     
      <form onSubmit={handleForm}>
       
        <div className='ui form'>
        {Object.keys(formErrors).length ===0 && isSubmit ? <div className='signin-success'>Sign In SuccessFully</div>:""}
         <h1>Login Form</h1>
         <hr />
          <div className='field'>
            <label>Name</label>
            <input type='text' value={formValues.username} 
              onChange={handleChange}
              name='username' placeholder='UserName' 
            />
            <p className='error'>{formErrors.username}</p>
          </div>

          <div className='field'>
            <label>Email</label>
            <input type='text' value={formValues.email} 
              onChange={handleChange}
              name='email' placeholder='Email'
            />
            <p className='error'>{formErrors.email}</p>
          </div>

          <div className='field'>
            <label>password</label>
            <input type='password'  value={formValues.password} 
              onChange={handleChange}
              name='password' placeholder='Password'
            />
            <p className='error'>{formErrors.password}</p>
          </div>
          <button>Submit</button>
        </div>
      </form>

    </div>
  );
}

export default App;
