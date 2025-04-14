import React from 'react'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { Menu, X, BriefcaseBusiness, Heart } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton,SignIn, useUser, ClerkProvider } from "@clerk/clerk-react";
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {PenBox,FileText,GraduationCap,ChevronDown,StarsIcon,} from "lucide-react";
gsap.registerPlugin(useGSAP);

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]
const  Header= () => {
    const { user, isLoaded } = useUser();
    const [showSignIn, setShowSignIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useSearchParams();

    useGSAP(()=>{
      gsap.from('.logo',{
        opacity:0,
        x:30,
        ease: "bounce.out",
        duration:2,
      })
    })
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth > 768 && isOpen) {
          setIsOpen(false)
        }
      }
  
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }, [isOpen])

    useEffect(() => {
      if (search.get("sign-in")) {
        setShowSignIn(true);
      }
    }, [search]);

    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        setShowSignIn(false);
        setSearch({});
      }
    };
    const handleClick = async()=>{
      await user
      .update({ publicMetadata: { profile: "update" } })
      .then(() => {
        console.log("profile updated to: update")
        console.log(user)
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      });
    }
  return (
    <>
    <div>
    <nav className="bg-transparent  shadow-lg ">
      <div className="w-[99%]">
        <div className="flex justify-between">
         
            <div className='logo'>
              <Link href="/" className="flex items-center py-2 m-2 border-y-2 border-gray-800">
                <span className="font-bold text-gray-800 text-lg">WORKLY</span>
              </Link>
            </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="py-4 px-2 text-black font-semibold hover:text-green-500 transition duration-300 get"
              >
                {item.name}
              </Link>
              // </motion.div>
            ))}
            {isLoaded && user?.unsafeMetadata?.role==="recruiter" ? (
              <Link
              to="/PostJob"
              className="py-4 px-2 text-black font-semibold hover:text-green-500 transition duration-300"
            >
              Post-Job
            </Link>
            ):
            (
              <Link
              to="/search"
              className="py-4 px-2 text-black font-semibold hover:text-green-500 transition duration-300"
            >
              Jobs
            </Link>
            )}
          </div>

          <div>
          <SignedOut>
            <Button onClick={() => setShowSignIn(true)}
              className="m-3 bg-gray-900 text-white hover:bg-gray-700 transition-all">
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            <div className="flex justify-center items-center">
              {user?.unsafeMetadata?.role!=="recruiter" &&
              (user?.unsafeMetadata?.role==="candidate" ? (
               <Link
              to="/getboard" 
              className='bg-slate-950 text-white p-2 rounded-md'>
              Sensie
              </Link> 
              ):(
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <StarsIcon className="h-4 w-4" />
                    <span className="hidden md:block">Growth Tools</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/resume" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Build Resume
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2"
                    >
                      <PenBox className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/interview" className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Interview Prep
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              ))}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 m-3",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                {user?.unsafeMetadata?.role === "candidate" || user?.unsafeMetadata?.role === "premium-candidate" && (
                  <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
                )}
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
            </div>
          </SignedIn>  
        </div>
        {showSignIn && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}

          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-green-500 hover:bg-gray-50 transition duration-300"
              >
                {item.name}
              </Link>
            ))}
            {isLoaded && user?.unsafeMetadata?.role==="recruiter" ? (
              <Link
              to="/PostJob"
              className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-green-500 hover:bg-gray-50 transition duration-300"
            >
              Post-Job
            </Link>
            ):
            (
              <Link
              to="/search"
              className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-green-500 hover:bg-gray-50 transition duration-300"
            >
              Jobs
            </Link>
            )}
          </div>
        </div>
      )}
    </nav>



    </div>
    </>
    
  )
}

export default Header