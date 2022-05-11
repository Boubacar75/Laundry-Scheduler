import React,  {  useState } from 'react';

function Reservations({reservations, deleteReservation}) {
    const [details, setDetails] = useState({date:"", time:""});
    
   


    const deleteReserve = (id)=>{
        deleteReservation(id);
    }
    return (
        <div>
            <ol>
        {reservations.map((row)=>(
            <li>{row.reservation_dt} <button onClick= {()=>deleteReservation(row.id)}>DELETE</button></li>
        ))}
</ol>
       
        </div>
    )
}

export default Reservations
