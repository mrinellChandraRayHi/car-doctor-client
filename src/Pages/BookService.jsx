import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const BookService = () => {
    const loadedService=useLoaderData();
    const {title, price, _id, img}=loadedService;
    const {user}=useContext(AuthContext);
    const handleBookServices=(e)=>{
        e.preventDefault();
        const form=e.target;
        const name=form.name.value;
        const date=form.date.value;
        const email=user?.email;
        const booking={
            customerName: name,
            email,
            img,
            date,
            service:title,
            service_id:_id,
            price:price
        }
        console.log(booking);
        fetch('http://localhost:5000/bookings',{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(booking)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Booking has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }
    return (
        <div>
            <h1 className="text-center text-3xl">Book service: {title}</h1>
            <form onSubmit={handleBookServices} className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" defaultValue={user?.displayName} placeholder="Service name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" defaultValue={user?.email} placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due amount</span>
                        </label>
                        <input type="text" defaultValue={'$'+price} className="input input-bordered" required />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-block bg-orange-500 text-white">Order Confirm</button>
                </div>
            </form>
        </div>
    );
};

export default BookService;