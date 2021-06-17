import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from'./firebaseConfig.js'
import React, {useState} from 'react';

firebase.initializeApp(firebaseConfig);



function App() {

  const [user,setUser]= useState({
    isSigned:false,
    name:'',
     email:'',
     photo:'',
     
 
    
    
  
  })


  const provider = new firebase.auth.GoogleAuthProvider();
  

  const handelSignIn=()=>{
    firebase.auth()
    .signInWithPopup(provider)
    .then(result=> {
      const {displayName,email,photoURL}=result.user;
      const signInUser={
        isSigned:true ,
        name:displayName,
         email:email,
         photo:photoURL

      }
      setUser(signInUser);
      
    
    })
    .catch(err=>{
      console.log(err);
      console.log(err.message);
    })
  }

  const handelSignOut=()=>{
    firebase.auth().signOut().then(result => {
      const singOut={
        isSigned:false,
        name:'',
         email:'',
         photo:'',
         password:'',
         isValid:false,
         error:'',
         existingUser:false

         
       
         

      }
      setUser(singOut);

       
    }).catch((error) => {
      
      
    });

  }
  const is_valid_email = email => /^.+@.+\..+$/.test(email); 
 const   hasNumber =input => /\d/.test(input);
  

  const handelChange=(e)=>{
    

    const userInfo={
      ...user
    };
        let isValid =true;
    if(e.target.name ==='email') {
      isValid=(is_valid_email (e.target.value));
    }

    if (e.target.name ==="password"){
      isValid =e.target.value.length >8 && hasNumber(e.target.value);
    }

    userInfo[e.target.name]=e.target.value;
    userInfo.isValid=isValid;
    setUser(userInfo);
     
  }

  // console.log(e.target.value);

  const createAccount=(event)=>{
    
  
      if (user.isValid){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  .then(( res) => {
  console.log(res);
  const createUser= {...user};
  createUser.isSigned =true;
  createUser.error='';
  setUser(createUser);
  })
  .catch((err) => {
    
    console.log(err.message);
    const createUser= {...user};
    createUser.isSigned =false;
    createUser.error=err.message;
    setUser(createUser);
    // ..
  });
      }
     
      event.preventDefault();
      event.target.reset();

  }

  const singInUser=event=>{
    
    if (user.isValid){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
.then(( res) => {
console.log(res);
const createUser= {...user};
createUser.isSigned =true;
createUser.error='';
setUser(createUser);
})
.catch((err) => {
  
  console.log(err.message);
  const createUser= {...user};
  createUser.isSigned =false;
  createUser.error=err.message;
  setUser(createUser);
  // ..
});
    }
    event.preventDefault();
      event.target.reset();
  }
  const switchForm=event=>{
    const createUser= {...user};
    createUser.existingUser =event.target.checked;
    createUser.error='';
    setUser(createUser);
  }

  
  return (
    <div className="App">
    { user.isSigned ?  <button onClick={handelSignOut}>SignOut</button> :
    <button onClick={handelSignIn}>SignIn</button>  }
      {
        user.isSigned && <div>

             <h1> Welcome {user.name}</h1>
             <h4> Your Email {user.email}</h4>
             <img src={user.photo} alt="" />
             <h5>i am sojib </h5>

        </div>
        //git hub
     
      }
      <h1 >git hub</h1>
      <h1>Our Account Information</h1>
      <lebel htmlFor="switchForm">Returning User
      <input type="checkbox" name="switchForm" onChange={switchForm} id="switchForm"/>
      </lebel>
     
      <form style={{display:user.existingUser ?'block':'none'}} onSubmit={singInUser}>
      
      <input onBlur={handelChange} type="text" name="email" placeholder ="Your email"  required/> <br />
      <input onBlur={handelChange} type="password" name ="password" placeholder="Your Password" required /> <br />
      {/* <button onClick={createAccount}>Button </button> */}
    <input type="submit" value="SignIn" />
      </form>


      <form style={{display:user.existingUser ?'none':'block'}}  onSubmit={createAccount}>
      <input onBlur={handelChange} type="text" name="name" placeholder ="Your Name"  required/> <br />
      <input onBlur={handelChange} type="text" name="email" placeholder ="Your email"  required/> <br />
      <input onBlur={handelChange} type="password" name ="password" placeholder="Your Password" required /> <br />
      {/* <button onClick={createAccount}>Button </button> */}
    <input type="submit" value="create" />
      </form>
      {
        user.error && <p style={{color:'red'}} >{user.error} </p>
      }
    </div>
  );
    }
  

export default App;
