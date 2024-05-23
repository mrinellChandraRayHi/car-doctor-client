import { Link } from "react-router-dom";

const ServicesCard = ({service}) => {
    const {title, img, price, _id}=service
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="image" className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="text-orange-500 font-bold">Price: ${price}</p>
                <div className="card-actions">
                <Link to={`/book/${_id}`}>
                    <button className="btn btn-primary">Book Now</button>
                </Link>
                </div>
            </div>
        </div>
    );
};

export default ServicesCard;