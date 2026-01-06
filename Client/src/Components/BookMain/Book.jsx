import '../BookMain/Book.css'
import { Calendar } from "../ui/calendar";
import { use, useEffect, useState } from 'react';
import { useId } from "react";
import { FaClock } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { useAuth } from '../../firebaseauth/AuthContext';
export default function Book() {
  const [date, setDate] = useState(new Date());
  const [id1, setIdOne] = useState(null);
  const [id2, setIdTwo] = useState(null);

  const [clickOne, clickStateOne] = useState(false);
  const [clickTwo, clickStateTwo] = useState(false);
  const [nextOne, nextStepOne] = useState(false);
  const [time, setTime] = useState('');
  const { user } = useAuth();
  const idToken = user.getIdToken();
  const [booked, setBooked] = useState(false);
  const [load, setLoad] = useState(null);

  const handleSubmitForm = async (e) => {
      e.preventDefault();
      if (load) setLoad(true);
      const forminput = new FormData(e.currentTarget);
      const Name = forminput.get("Name");
      const Email = forminput.get("Email");
      const formdata = {Name, Email, date, time};
      const api = "http://localhost:5000/retreive";
      
      const response = await fetch(api, {
          method: 'POST',
          headers:  {'Content-Type' : 'application/json'},
          body: JSON.stringify(formdata),
          Authorization: `Bearer ${idToken}`,
      });

      try {
        if(response.ok) {
           setBooked(true);
           setTime(''); // not sure if i should add this
           setload(false);
        }
      } catch (err) {
         const error = await response.json();
         console.error(error);
      } finally {
          setLoad(false);
      }
      
  }

  const timeStamps = [
     {time: "9:00 AM", id: useId()},
     {time: "10:00 AM", id: useId()},
     {time: "11:00 AM", id: useId()}, 
     {time: "12:00 PM", id: useId()},
  ]

  const showConfirmOne = (selectedID) => {
       setIdOne(selectedID);
  }
  
  const showConfirmTwo = (selectedID) => {
        setIdTwo(selectedID);
  }


  const reverse = () => {
     clickStateOne(!clickOne);
  }

  const reverseTwo = () => {
     clickStateTwo(!clickTwo);
  }

  const clickNextOne = () => {
     nextStepOne(!nextOne);
  }


  const getTimeValue = (timestamp) => {
      setTime(timestamp);
  }


  const goBack = () => {
       nextStepOne(!nextOne);
  }

  // const changeBookedStatus = () => {
  //   setBooked(!booked);
  // }

  const buttonSectionOne = timeStamps.slice(0,2);
  const buttonSectionTwo = timeStamps.slice(2,4);


    return (
        <>
       
          <section className='section-book'>
       
  

             <div className='book-container'>

             {/* mostly dots for deocration */}
              <div className='dot-1'></div>
             <div className='dot-2'></div>
             <div className='dot-3'></div>
             <div className='dot-4'></div>

           {nextOne ? (
                <>
                  <div className="side-confirm">
                    <p className='name-descript'>King Dice</p>
                    <h1 className="fun-title">15 Minute Match</h1>
                    <div className='icon-descript'>
                      <FaClock className='icon-color icon-size-book' />
                      <p>30 Mins</p>
                    </div>

                     <div className='icon-descript'>
                      <FaCalendar className='icon-color icon-size-book' />
                      <p>{time} {date.toLocaleDateString()}</p>
                    </div>

                     <div className='icon-descript'>
                      <FaGlobeAmericas className='icon-color icon-size-book' />
                      <p>{Intl.DateTimeFormat().resolvedOptions().timeZone} </p>
                    </div>

                   <div className='text-descript'>
                        <p>
                            Book to see if you have what it takes to become a champion. <br />
                            Choose your match time, lock it in, and get ready to prove yourself.                        
                        </p>
                   </div>
                
                  </div>
                </>
              ) : (
                <div className="hold-calendar">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="calendar rounded-lg border"
                        classNames={{
                              button_next: "p-4 cursor-pointer  bg-white flex justify-center items-center text-black text-xl rounded-full shadow-[4px_3px_0px_1px_#000000] outline outline-2 outline-black",
                              button_previous: "p-4 cursor-pointer bg-white flex justify-center items-center text-black text-xl rounded-full shadow-[-4px_3px_0px_1px_#000000] outline outline-2 outline-black",
                        }}     />

                </div>
              )}


             {/* cool hr line i made cuz theres no vr tag */}
            <div className='calendar-title'>
                <h3>Book Appointment</h3>
            </div>


             <div className='vertical-line'></div>
         
            {/* confirm-container */}
              <div className={nextOne ? "confirm-next" : "confirm-container"}>
                   <div className='title-and-date'>
                     
                     {nextOne ? (
                        <>
                        <div className='show-back cursor-pointer' onClick={goBack}>
                           <i className='circle-back'><IoMdArrowBack /></i> <p>back</p>
                        </div>
                        </>
                     ) : null }



                        <h3 className='fun-title'>Pick a Time, Pal!</h3>
                        <p className='date-selection' style={{ marginBottom: "10px", marginTop: "10px" }}>{date.toLocaleDateString()}</p>
                   </div>
                     {nextOne !== true && (
                     <div className='contain-buttons'>                      
                                        <>
                                          <div className="button-section-1 flex flex-row gap-4 w-full">
                                            {buttonSectionOne.map((slot) => (
                                              <div key={slot.id} className="button-bar gap-4">
                                                <div>
                                                  <button
                                                    id={slot.id}
                                                    onClick={() => {
                                                      showConfirmOne(slot.id);
                                                      reverse();
                                                      getTimeValue(slot.time);
                                                    }}
                                                    className="cursor-pointer time-button button bg-special"
                                                  >
                                                    {slot.time}
                                                  </button>

                                                  {slot.id === id1 && !clickOne ? (
                                                    <button
                                                      className="cursor-pointer button-confirm bg-light-special border-cartoony"
                                                      style={{ marginTop: "15px" }}
                                                      onClick={clickNextOne}
                                                    >
                                                      Confirm
                                                    </button>
                                                  ) : null}
                                                </div>
                                              </div>
                                            ))}
                                          </div>

                                          <div className="button-section-2 flex flex-row gap-4 w-full">
                                            {buttonSectionTwo.map((slot) => (
                                              <div key={slot.id} className="button-bar gap-4">
                                                <div className="d-flex">
                                                  <button
                                                    id={slot.id}
                                                    onClick={() => {
                                                      showConfirmTwo(slot.id);
                                                      reverseTwo();
                                                      getTimeValue(slot.time);
                                                    }}
                                                    className="cursor-pointer time-button button bg-special"
                                                  >
                                                    {slot.time}
                                                  </button>

                                                  {slot.id === id2 && !clickTwo && clickOne !== false ? (
                                                    <button style={{marginTop: "15px"}}
                                                      onClick={clickNextOne}
                                                      className="cursor-pointer button-confirm bg-light-special mt-1 border-cartoony"
                                                    >
                                                      Confirm
                                                    </button>
                                                  ) : null}
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </>
                       
                     </div>             
                     
                      )}

                       {nextOne && !booked &&  !load? (<>
                             
                             <div className='tab-2'>
                                  <p>Confirm Details</p>
                                  <form className='book-form' onSubmit={handleSubmitForm}>
                                      <div className='form_group'>
                                        <label>Name:</label>
                                        <input name='Name' type='text' placeholder='Enter Name' />
                                      </div>

                                      <div className='form_group'>
                                        <label>Email:</label>
                                        <input name='Email' type='text' placeholder='Enter Email' />
                                      </div>

                                      <div className='form_group'>
                                         <button type='submit' className='bg-special'>Confirm Appointment</button>
                                      </div>
                                  </form>
                             </div>

                           
                           
                          </>) : null}


                          {nextOne && booked && !load ? (<>
                               <div className='form_group_final'>
                                   <p>Thank you for booking with us!</p>
                                  <button onClick={() => {setBooked(!booked);  goBack();}} className='bg-special'>New Appointment</button>
                               </div>
                          </>) : null} 


                 </div>

             </div>

             
    
          </section>
   
        </>
    )
}