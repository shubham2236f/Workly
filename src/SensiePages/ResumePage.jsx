import React,{useEffect} from 'react';
import { getResume } from '@/api/apiResume'
import ResumeBuilder from "@/components_Sensie/Resume/ResumeBuilder";
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';

export default function ResumePage() {

  const {user} = useUser();
  const {
    loading: loadingresume,
    data: resume,
    fn: fnresume,
  } = useFetch(getResume,{
    user_id: user?.id
  });
  useEffect(()=>{
    fnresume()
  },[user])
  useEffect(()=>{
    if(!loadingresume && resume){
      console.log(resume)
    }
  },[resume])

  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
}