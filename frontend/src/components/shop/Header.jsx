"use client";
import '@/styles/header.css'
import React, { useContext, useEffect, useState } from 'react';
import { FaBars, FaUser, FaSearch, FaHeart, FaShoppingBag } from 'react-icons/fa';
import { FaXmark } from "react-icons/fa6";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '../ui/use-toast';
import UserContext from '@/app/context/UseContext';
import axios from 'axios';
import { GET_USER } from '@/utils/apiroutes';


const Header = () => {
    const { toast } = useToast();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const search = (type) => {
        toast({
            title: 'up! something went wrong',
            description: 'feature comming soon ...'
        })
    };
    const openMenu = () => {
        toast({
            title: 'up! something went wrong',
            description: 'feature comming soon ...'
        })
    };
    const closeMenu = () => {
        toast({
            title: 'up! something went wrong',
            description: 'feature comming soon ...'
        })
    };

    const fetchUser = () => {
        axios.get(GET_USER, { withCredentials: true }).then(res => {
            setUser({ ...res.data });
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            console.error('error at updating userdata in Header component', err)
            toast({
                title: "umm! its seems you haven't logedin yet"
            })
        })
    }
    useEffect(() => {
        fetchUser();
    }, [])

    if(loading){
        return(<>Loading ... </>)
    }
    return (
        <div id="header">
            <FaBars className="rounded-sm size-6 inline" onClick={openMenu} />
            <img src='omilogo.png' alt="Logo" />
            <ul id="res-ul" className='z-40'>
                <FaXmark className="fa-sharp fa-solid" onClick={closeMenu} />
                <li><a href="#">Men</a></li>
                <li><a href="#">Women</a></li>
                <li><a href="#">Home & Living</a></li>
                <li><a href="#">Kids</a></li>
                <li><a href="#">Beauty</a></li>
                <li><a href="#">Studio</a></li>
            </ul>
            <ul className="ul-2">
                <div className="Search-icon">
                    <FaSearch className="fa-solid inline size-5 mr-4" />
                </div>
                <input type="text" placeholder="Search for..." />

                {/* <div className="ul-2-icon"> */}
                <DropdownMenu>
                    <Link href={user.name ? '/user/dashboard' : '#'}><DropdownMenuTrigger className='ul-2-icon'>
                        <FaUser className="fa-solid inline" />
                       <p> {user.name ? user.name : 'Profile'} </p>
                        </DropdownMenuTrigger>
                    </Link>
                    {!user.name &&
                        <DropdownMenuContent className='text-[24px]'>
                            <DropdownMenuLabel>{user.name ? 'My Account' : (<>Are you new <Link className=' text-blue-500 underline' href='/auth/signup'>Sign Up</Link></>)}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>{user.name ? 'Profile' : (<Link className=' text-blue-500 underline' href='/auth/login'>Login</Link>)}</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>}
                </DropdownMenu>


                {/* </div> */}
                <div className="ul-2-icon wish">
                    <FaHeart className="fa-solid inline" />
                    <p>WishList</p>
                </div>
                <div className="shopping-bag">
                    <FaShoppingBag className="fa-solid inline" />
                    <p>Bag</p>
                </div>
            </ul>
        </div>
    );
};

export default Header;
