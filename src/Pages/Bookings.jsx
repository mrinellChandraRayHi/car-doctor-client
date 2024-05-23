import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import BookingRow from "./BookingRow";

const Bookings = () => {
    const {user}=useContext(AuthContext);
    const [bookings, setBookings]=useState([])
    const url=`http://localhost:5000/bookings?email=${user?.email}`;
    useEffect(()=>{
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            setBookings(data);
        })
    },[url])

    const handleDelete=(_id)=>{
        const proceed=confirm('Are you sure you want to delete');
        if(proceed){
            fetch(`http://localhost:5000/bookings/${_id}`,{
                method:"DELETE"
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.deletedCount>0){
                    alert('deleted successful')
                    const remaining=bookings.filter(booking=>booking._id !==_id);
                    setBookings(remaining);
                }
            })
        }
    }


    const handleBookingConfirm=(_id)=>{
        fetch(`http://localhost:5000/bookings/${_id}`,{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({status:'confirm'}),
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.modifiedCount>0){
                //update state
                const remaining=bookings.filter(booking=>booking._id !==_id);
                const updated=bookings.find(booking=>booking._id === _id);
                updated.status='confirm'
                const newBookings=[updated, ...remaining];
                setBookings(newBookings);
            }
        })
    }

    return (
        <div>
            <h1 className="text-7 xl text-center font-bold">{bookings.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    <tbody>
                    {
                        bookings.map(booking=> <BookingRow key={booking._id} booking={booking} handleDelete={handleDelete} handleBookingConfirm={handleBookingConfirm}/>)
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;