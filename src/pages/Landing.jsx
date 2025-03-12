import React from 'react';
import { Link } from 'react-router-dom';
import hiiip from '../media/hiiip.webp';
import setting from '../media/setting.gif';
import JobCategorySelector from '@/component/JobCategorySelector';
import PopularSection from '@/component/PopularSection';
import { motion } from 'framer-motion'
import { useUser } from '@clerk/clerk-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const  Landing= () => { 
  const {user,isloading} = useUser()

  useGSAP(()=>{
    gsap.from('.myjobs',{
      opacity:0,
      x:30,
      ease: "bounce.out",
      duration:2,
    })
    gsap.from('.getjobs',{
      opacity:0,
      x:-30,
      ease: "bounce.out",
      duration:2,
    })
  })

  return (
    <>
    <div className="relative overflow-hidden ">
      <div className="mx-auto">
        <div className=" z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <motion.div className="sm:text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Unl<img src={setting} className='w-10 inline'/>ck your <span className='text-white px-4 bg-gray-800'>dream</span> career 
                 w<span>i</span>th</span>{" "}
                <span className="block text-gray-800 xl:inline">Workly</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Discover opportunites, connect with employers, and take a next step towards fullfiling your work life.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow getjobs">
                  {user?.unsafeMetadata?.role === "candidate" || user?.unsafeMetadata?.role === "premium-candidate" ? (
                   <Link
                    to="/search"
                    className="w-full flex items-center justify-center px-8 py-3 border 
                    border-transparent text-base font-medium rounded-md text-white bg-gray-800
                     hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </Link> 
                  ):
                  (<Link
                    to="/PostJob"
                    className="w-full flex items-center justify-center px-8 py-3 border 
                    border-transparent text-base font-medium rounded-md text-white bg-gray-800
                     hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </Link>)}
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3 myjobs">
                {user?.unsafeMetadata?.role === "candidate" || user?.unsafeMetadata?.role === "premium-candidate" ?(
                 <Link
                    to="/my-jobs"
                    className="w-full flex items-center justify-center px-8 py-3 border 
                    border-transparent text-base font-medium rounded-md text-white 
                     bg-gray-700 hover:bg-gray-800 md:py-4 md:text-lg md:px-10"
                  >
                    My Jobs
                  </Link> 
                ):(
                  <Link
                    to="/my-jobs"
                    className="w-full flex items-center justify-center px-8 py-3 border 
                    border-transparent text-base font-medium rounded-md text-white 
                     bg-gray-700 hover:bg-gray-800 md:py-4 md:text-lg md:px-10"
                  >
                    My Jobs
                  </Link>
                )} 
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
      <motion.div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
      whileHover={{ scale: 1.05,filter:"blur(5px)" }}>
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src={hiiip}
          alt="Team collaborating on a project"
        />
      </motion.div>
      
    </div>
    {(user?.unsafeMetadata?.role === "candidate" || user?.unsafeMetadata?.role === "premium-candidate") &&
    (<JobCategorySelector/>)} 
    <PopularSection/>
    </>
  )
}


export default Landing