import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm'
import Reservation from './components/Reservation'
import Reservations from './components/Reservations'
function App() {
  useEffect(()=>{

  },[]);
  //THIS SHOULD BE CHANGED TO VALUES INSIDE DATABASE NEED TO IMPLEMENT DATA
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123"
  }
  //DATABASE SHOULD HOLD ALL USER INFO
  const [user, setUser] = useState({userId:0, name: "", email: ""});
  const [error, setError] = useState("");
  const [showReserve, setShowReserve]=useState(false);
  const [reservations, setReservations]=useState([]);
  const Login = async details => {
    console.log(details);


    let options = {
      method: 'POST',
      headers: {
          'Content-Type': 
              'application/json;charset=utf-8'
      },
      body: JSON.stringify(details)
  }

  // Fake api for making post requests
  let fetchRes = fetch("http://localhost:3001/login", 
                                  options);
  fetchRes.then(res =>
      res.json()).then(resp => {
          console.log(resp)
          alert(JSON.stringify(resp));
          if(resp.status==1)
          {
           
            setUser({
              userId:resp.id,
              name: details.name,
              email: details.email
            });
            localStorage.setItem("loggedInUser", JSON.stringify(resp));
            const id = resp.id;
            getReservations();
          }else{
            console.log("Incorrect username or password")
            setError("Incorrect username or password!")
          }

      })

    //THIS SHOULD BE CHANGED TO VALUES INSIDE DATABASE
    /*
    if(details.email === adminUser.email && details.password === adminUser.password){
      console.log("Logged In")
      
      
    }else{
      console.log("Incorrect username or password")
      setError("Incorrect username or password!")
    }
    */
  }
  const getReservations=()=>{

    let options = {
      method: 'GET',
      headers: {
          'Content-Type': 
              'application/json;charset=utf-8'
      }
  }

  // Fake api for making post requests
  let fetchRes = fetch("http://localhost:3001/reservations", 
                                  options);
                                  fetchRes.then(res =>
                                    res.json()).then(resp => {
                                       
                                        console.log(resp)
                                        setReservations(resp);
                                       // alert(JSON.stringify(resp));
                                       
                              
                                    })                          
  }
  const Reserve = async details => {
    if (details=={})
    {
      setShowReserve();
      return;
    }
    console.log(details);
    const reg = {
      userId: user.userId,
      date:details.date,
      time:details.time
    }
    const body =  JSON.stringify(reg);
   // alert(body);
    let options = {
      method: 'POST',
      headers: {
          'Content-Type': 
              'application/json;charset=utf-8'
      },
      body: body
  }

  // Fake api for making post requests
  let fetchRes = fetch("http://localhost:3001/reserve", 
                                  options);
  fetchRes.then(res =>
      res.json()).then(resp => {
          console.log(resp)
          alert(resp.message);
         // alert(JSON.stringify(resp));
          setShowReserve();

      })

    //THIS SHOULD BE CHANGED TO VALUES INSIDE DATABASE
    /*
    if(details.email === adminUser.email && details.password === adminUser.password){
      console.log("Logged In")
      
      
    }else{
      console.log("Incorrect username or password")
      setError("Incorrect username or password!")
    }
    */
  }
  const showReserveForm=()=>{
      setShowReserve(!showReserve);
  }
  const deleteReservation=(id)=>{
    alert(id);
    if (!id)
    {
      return;
    }
    let options = {
      method: 'GET',
      headers: {
          'Content-Type': 
              'application/json;charset=utf-8'
      }
  }

  // Fake api for making post requests
  let fetchRes = fetch("http://localhost:3001/delete?id="+id, 
                                  options);
                                  fetchRes.then(res =>
                                    res.json()).then(resp => {
                                       
                                        alert(resp.message);
                                       // alert(JSON.stringify(resp));
                                       
                              
                                    })                          
  }
  const Logout = () => {
    console.log("Logout");

    setUser({
      name: "",
      email: ""
    });
  }

  return (
    <div className="Login">
      {(user.email !== "") ? (
        
        <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <div className="buttons">
            <button onClick={showReserveForm}>Add Reservation</button>
            {/* DATE AND TIME PICKER */}
            <div class="divider"/>
            <button onClick={deleteReservation}>Delete Reservation</button>
            <div class="divider"/>
            <button onClick={Logout}>Logout</button>
          </div>
          <div id="divReserve">
            <Reservation Reserve={Reserve} Erros={""} show={showReserve}/>
          </div>
          <div id='divReservations'>
            <Reservations reservations={reservations} deleteReservation={deleteReservation}/>
        </div>
        </div>
   
        
      ) : (
        <LoginForm Login={Login} error={error}/>
      )}
    </div>
  );
}

export default App;
