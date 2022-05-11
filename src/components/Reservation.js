import React,  {  useState } from 'react';

function Reservation({Reserve, error, show}) {
    const [details, setDetails] = useState({date:"", time:""});
    
   

    const submitHandler = e => {
        e.preventDefault();

        Reserve(details);
    }
    const cancel = ()=>{
        Reserve({});
    }
    return (
        <div>
        {show?

        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Reservation:</h2>
               
                <div className="form-group">
                    <label htmlFor="name">Date:</label>
                    <input type="date" name="date" id="date"
                     onChange={e => setDetails({...details, date: e.target.value})}  value={details.date}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Time:</label>
                    <input type="text" name="time" id="time" onChange={e => setDetails({...details, time: e.target.value})} value={details.time}/>
                </div>
                
                <div className="form-group">
                    <input type="submit" value="Reserve"/>
                    <input type="button" value="Cancel" onClick={cancel}/>
                </div>
            </div>
        </form>
        :<span></span>}
        </div>
    )
}

export default Reservation
