import { Link, NavLink } from 'react-router-dom';
import logo from '../../src/assets/logo.svg'
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Navbar = () => {
    const {user, signOUT}=useContext(AuthContext);
    const handleLogOut=()=>{
        signOUT()
        .then(()=>{
            console.log('Log Out Success');
        }).catch((error)=>{
            console.log(error.message);
        })
    }
    const navItems=<>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/about'>About</NavLink></li>
    {
        user?.email? <>
        <li><Link to='/bookings'>My Bookings</Link></li>
        <li><a href="" onClick={handleLogOut}>Log Out</a></li>
        </>
        :<li><NavLink to='/signUp'>Sign Up</NavLink></li>
    }
    </>
    return (
        <div className="navbar bg-base-100 h-28 mb-4">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    {navItems}
                </ul>
                </div>
                <Link to='/'>
                <img src={logo} alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
            <button className="btn btn-outline btn-secondary">Appointment</button>
            </div>
        </div>
    );
};

export default Navbar;