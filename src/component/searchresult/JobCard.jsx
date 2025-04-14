
import { saveJobs, deleteJob } from "@/api/apijobs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useUser } from "@clerk/clerk-react"
import {  MapPin, Heart,Bookmark, Trash2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useFetch from "@/hooks/useFetch"
import { BarLoader } from "react-spinners"


export default function JobCard({job,savedInit = "false",onJobSaved = ()=>{},isMyJob = false,}) {

  const [saved,setSaved] = useState(savedInit);
  const {user} = useUser();

  const {
    loading: loadingSavedJob,
    data: savedJob,
    fn: fnSavedJob,
  } = useFetch(saveJobs,{
    alreadySaved:saved,
  });

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const handleSaveJob = async()=>{
    await fnSavedJob({
      user_id:user.id,
      job_id:job.id
    });
    onJobSaved();
  }

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobSaved();
  };

  useEffect(()=>{
    if(savedJob !== undefined)setSaved(savedJob?.length>0)
  },[savedJob])

  return (
    <Card className="w-full  bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      {loadingDeleteJob && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}
      <CardHeader className="flex flex-row items-center space-x-4 pb-4">
        <div className="relative h-16 w-16 ">
          {job.company && <img src={job.company.logo_url} layout="fill" className="object-cover" />}
        </div>
        <div>
          <h2 className="text-xl font-bold">{job.title}</h2>
          <p className="text-sm text-muted-foreground">{job.company.name}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center">
            <MapPin className="mr-1 h-4 w-4" aria-hidden="true" />
            <span>{job.location}</span>
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Job Description</h3>
          <p className="text-sm leading-relaxed">{job.description.substring(0,job.description.indexOf("."))}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-5">
      {isMyJob && (
            <Trash2Icon
              size={18}
              className="text-black cursor-pointer"
              onClick={handleDeleteJob}
            />
          )}
        <Link to={`/job/${job.id}`}>
        <Button className="w-full text-md sm:w-auto">Detail..</Button>
        </Link>
        <button 
        onClick={handleSaveJob}
        disabled={loadingSavedJob}>
          {saved?
          (<Bookmark size={20} stroke="red" fill="red"/>)
          :
          (
            <Bookmark/>
          )
          }

        </button>
      </CardFooter>
    </Card>
  )
}

