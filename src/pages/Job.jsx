
import { getSingleJob } from '@/api/apijobs'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Load from '../component/loader/Load'
import useFetch from '@/hooks/useFetch'
import MDEditor from "@uiw/react-md-editor";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon, Calendar, ChartNoAxesCombined } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateHiringStatus } from '@/api/apijobs'
import ApplyJob from '../component/ApplyJob'
import { motion } from 'framer-motion'
import Applications from '../component/Applications'

function Job() {
    const {id} = useParams()
    const {isLoaded,user} = useUser()

    const {
        loading: loadingJob,
        data: job,
        fn: fnJob,
    } = useFetch(getSingleJob,{
        job_id:id,
    });

    useEffect(()=>{
        if(isLoaded) fnJob();
    },[isLoaded]);

    const {
        loading: loadingStatus,
        fn: fnHiringStatus,
    } = useFetch(updateHiringStatus,{
        job_id:id,
    });

    const handleStatusChange = (value) => {
        const isOpen = value === "open";
        fnHiringStatus(isOpen).then(() => fnJob());
    };

    if(!isLoaded || loadingJob){
        return <Load/>
    }

    return (
        <div className=" w-screen mx-auto px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-50 h-screen">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-xl rounded-2xl overflow-hidden border border-indigo-100"
            >
                <div className="p-8 space-y-8">
                    <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 bg-clip-text  bg-gradient-to-r ">
                            {job?.title}
                        </h1>
                        <img src={job?.company?.logo_url || "/placeholder.svg"} className="h-20 object-contain" alt={job?.title} />
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-full">
                            <MapPinIcon className="w-5 h-5 " /> {job?.location}
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-indigo-50 px-3 py-2 rounded-full">
                            <Briefcase className="w-5 h-5 " /> {job?.applications?.length} Applicants
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full">
                            <Calendar className="w-5 h-5 text-green-500" /> Posted on {new Date(job?.created_at).toLocaleDateString()}
                        </motion.div> 
                            {job?.applications?.length>0 && job?.recruiter_id !== user?.id &&(
                    <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full">
                        {job?.applications?.map((application)=>{
                            return( 
                                <>
                                {application.candidate_id === user.id &&
                                <div key={application.id} className='flex gap-1'>
                                    <ChartNoAxesCombined className="w-5 h-5 text-green-500" />
                                    <p>Your status: {application?.status}</p>
                                </div>
                                }
                                </>
                            )
                        })}
                    </motion.div>
                )}
                        <motion.div 
                            whileHover={{ scale: 1.05 }} 
                            className={`flex items-center gap-2 px-3 py-2 rounded-full ${job?.isOpen ? "bg-green-50" : "bg-red-50"}`}
                        >
                            {job?.isOpen ? (
                                <>
                                    <DoorOpen className="w-5 h-5 text-green-600" /> 
                                    <span className="text-green-600 font-medium">Open</span>
                                </>
                            ) : (
                                <>
                                    <DoorClosed className="w-5 h-5 text-red-500" /> 
                                    <span className="text-red-500 font-medium">Closed</span>
                                </>
                            )}
                        </motion.div>
                    </div>

                    {job?.recruiter_id === user?.id && (
                        <div className="py-2">
                            <Select onValueChange={handleStatusChange}>
                                <SelectTrigger
                                    className={`w-full sm:w-auto ${job?.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} border-none rounded-full`}
                                >
                                    <SelectValue
                                        placeholder={
                                            "Hiring Status: " + (job?.isOpen ? "Open" : "Closed")
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="open">Open</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                         >
                        <h2 className="text-2xl font-semibold text-black border-b border-indigo-100 pb-2">About the job</h2>
                    </motion.div>
                        <p className="text-gray-600 leading-relaxed">{job?.description}</p>
                    </div>

                    <div className="space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                         >
                        <h2 className="text-2xl font-semibold text-black border-b border-indigo-100 pb-2">What we are looking for</h2>
                    </motion.div>
                        <div className="prose max-w-none">
                            <MDEditor.Markdown
                                source={job?.requirements}
                                className="bg-transparent text-gray-600"
                            />
                        </div>
                    </div>
                </div>

                {job?.recruiter_id !== user?.id && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className='bg-slate-400 p-8'
                    >
                        <ApplyJob
                            job={job}
                            user={user}
                            fetchJob={fnJob}
                            applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
                        />
                    </motion.div>
                )}
                {job?.applications?.length>0 && job?.recruiter_id === user?.id &&(
                    <div className='px-8'>
                        <h2 
                        className="text-2xl font-semibold text-black border-b border-indigo-100 pb-2">
                            Applications
                        </h2>
                        {job?.applications?.map((application)=>{
                            return <Applications key={application.id} application={application}/>
                        })}
                    </div>
                )}
            </motion.div>

        </div>
    )
}

export default Job