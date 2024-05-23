import { Link, useNavigate } from 'react-router-dom';
import img from '../../src/assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
const SignUp = () => {
    const {createUser}=useContext(AuthContext);
    const navigate=useNavigate();
    const handleSignUp=(e)=>{
        e.preventDefault();
        const form=e.target;
        const name=form.name.value;
        const email=form.email.value;
        const password=form.password.value;
        console.log(name, email, password);
        createUser(email, password)
        .then((result)=>{
            console.log(result.user);
            navigate('/')
        }).catch((error)=>{
            console.log(error.message);
        })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2 mr-12">
                    <img src={img} alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSignUp} className="card-body">
                    <h1 className="text-3xl text-center font-bold">Sign Up</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input name='name' type="text" placeholder="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name='email' type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Sign Up</button>
                    </div>
                </form>
                <p className='my-4 text-center'>Already have an account? <Link to='/login' className='text-orange-600 font-bold'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;