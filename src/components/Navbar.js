import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { items } from './Data';
import { BsCart } from "react-icons/bs";

const Navbar = ({ setData, cart }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const filterByCategory = (category) => {
        const element = items.filter((product) => product.category === category);
        setData(element);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${searchTerm}`);
        setSearchTerm("");
    };

    return (
        <>
            <header className='sticky-top'>
                <div className='nav-bar'>
                    <Link to= {'/'}className='brand'>Shopify</Link>
                        
                    <form 
                        onSubmit={handleSubmit}
                        className='search-bar'>
                        <input 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type='text' 
                            placeholder='Search Products' />
                    </form>
                    <Link to={'/cart'} className='cart'>
                        <button type="button" class="btn btn-primary position-relative">
                            <BsCart />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cart.length}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </button> 
                    </Link>
                </div>
                {
                    location.pathname === '/' && (
                        <div className='nav-bar-wrapper'>
                            <div onClick={() => filterByCategory('Strength Training')} className='items'>Strength Training</div> 
                            <div onClick={() => filterByCategory('Cardio')} className='items'>Cardio</div>
                            <div onClick={() => filterByCategory('Running & Jogging')} className='items'>Running and Jogging</div>
                            <div onClick={() => filterByCategory('Core & Balance')} className='items'>Core and Balancing</div>
                            

                  
                       
                        </div>
                    )
                }
            </header>
        </>
    );
};

export default Navbar;
