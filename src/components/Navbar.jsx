"use client"

import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const iconRef = useRef(null);
  const router = useRouter();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current && !menuRef.current.contains(event.target) &&
      iconRef.current && !iconRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const logout = async() => {
      try {

        const response = await axios.get('/api/users/logout') ;
        console.log("User Logout Successful", response.data) ;
        router.push('signup')
        
      } catch (error) {
          console.log(error.message);
      }
  }

  return (
    <>
     
    <nav className="bg-gray-900 sticky top-0 z-10 h-16 flex flex-row items-center justify-center"> 
    <div
          ref={iconRef}
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden cursor-pointer justify-start items-start ml-[12%]"
        >
          <GiHamburgerMenu style={{ fontSize: "25px" , color:"orange"}} />
        </div>
        
      <div className="container mx-auto flex items-center   justify-between ml-[50%]  mr-[50%]">
        
        {/* <div className="w-1/5">
          <Image src={logo} alt="logo" className="w-full h-auto" />
        </div> */}
  
   
        <ul className="hidden md:flex space-x-14 text-white">
          <li>           
            <Link href="/home" className="relative text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out hover:text-orange-500 after:absolute after:bg-orange-700 after:h-[2px] after:w-full after:left-0 after:bottom-[-6px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              Home
            </Link>
          </li>
          <li>           
            <Link href="/view_blog" className="relative text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out hover:text-orange-600 after:absolute after:bg-orange-500 after:h-[2px] after:w-full after:left-0 after:bottom-[-6px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              Explore
            </Link>
          </li>
          <li>           
            <Link href="/create_blog" className="relative text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out hover:text-orange-600 after:absolute after:bg-orange-500 after:h-[2px] after:w-full after:left-0 after:bottom-[-6px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
            Create
            </Link>
          </li>
          <li>           
            <Link href="/profile" className="relative text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out hover:text-orange-600 after:absolute after:bg-orange-500 after:h-[2px] after:w-full after:left-0 after:bottom-[-6px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
            Profile
            </Link>
          </li>
          <li>           
            <Link href="/contact" className="relative text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out hover:text-orange-600 after:absolute after:bg-orange-500 after:h-[2px] after:w-full after:left-0 after:bottom-[-6px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
            Contact
            </Link>
          </li>
            <button onClick={logout}className='bg-black font-bold text-md px-4 py-2 rounded-xl  hover:bg-orange-600 hover:text-black border-2 border-orange-600 '> 
              Logout
            </button>
        </ul>
      
 
        {isOpen && (
          <ul
            ref={menuRef}
            className="md:hidden absolute top-20 right-0 w-full bg-gray-900 text-white flex flex-col space-y-4 p-6 shadow-lg rounded-b-lg"
          >
             <li>           
            <Link href="/home" onClick={handleLinkClick} className="relative text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out hover:text-orange-600 after:absolute after:bg-orange-500 after:h-[2px] after:w-full after:left-0 after:bottom-[-6px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              Home
            </Link>
          </li>
          <li>           
            <Link href="/view_blog" onClick={handleLinkClick}  className="relative text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out hover:text-orange-600 after:absolute after:bg-orange-500 after:h-[2px] after:w-full after:left-0 after:bottom-[-6px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              Explore
            </Link>
          </li>
          <li>           
            <Link href="/create_blog" className="relative text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out hover:text-orange-600 after:absolute after:bg-orange-500 after:h-[2px] after:w-full after:left-0 after:bottom-[-6px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
            Create
            </Link>
          </li>
          <li>           
            <Link href="/profile" onClick={handleLinkClick}   className="relative text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out hover:text-orange-600 after:absolute after:bg-orange-500 after:h-[2px] after:w-full after:left-0 after:bottom-[-6px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
            Profile
            </Link>
          </li>
          <li>           
            <Link href="/contact" onClick={handleLinkClick}  className="relative text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out hover:text-orange-600 after:absolute after:bg-orange-500 after:h-[2px] after:w-full after:left-0 after:bottom-[-6px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
            Contact
            </Link>
          </li>
          <button onClick={logout} className='bg-black font-bold text-md px-4 py-2 rounded-xl  hover:bg-orange-600 hover:text-black border-2 border-orange-600 '> 
           Logout
        </button>
          </ul>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;
