
import { useState } from "react"
import { useSearchParams } from "react-router-dom";
import JobCard from "@/component/searchresult/JobCard"
import { getJobs } from "@/api/apijobs";
import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Load from "@/component/loader/Load";

export default function JobSearchResults({outerquery}) {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get("category");
  const [searchQuery, setSearchQuery] = useState(categoryQuery || "")
  const [location, setLocation] = useState("")
  const [company_id, setcompany_id] = useState("")
  const [filters, setFilters] = useState({ jobTypes: [], locations: [] })
  const {isLoaded} = useUser()

  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getJobs,{
    location,
    company_id,
    searchQuery
  });

  useEffect(()=>{
    if(isLoaded){
    fnJobs();  
    }
    console.log(jobs)
  },[isLoaded,searchQuery,company_id,location])

  useEffect(() => {
    if (categoryQuery) {
      console.log("Category from URL:", categoryQuery);
      setSearchQuery(categoryQuery);
    }
  }, [categoryQuery]);

  useEffect(()=>{
    console.log(jobs)
  },[jobs])

  // const filteredJobs = jobs.filter((job) => {
  //   const matchesSearch =
  //     job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     job.location.toLowerCase().includes(searchQuery.toLowerCase())

  //   const matchesJobType = filters.jobTypes.length === 0 || filters.jobTypes.includes(job.type)
  //   const matchesLocation = filters.locations.length === 0 || filters.locations.includes(job.location)

  //   return matchesSearch && matchesJobType && matchesLocation
  // })

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log("searching....")
    let formData = new FormData(e.target)
    const query = formData.get("search-query")
    if(query) setSearchQuery(query)
  }

  // const handleFilterChange = (newFilters) => {
  //   setFilters(newFilters)
  // }

  if(!isLoaded){
    return <Load/>
  }

  return (
    
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-black">Job Search Results</h1>
        {/* <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          
          <JobFilters onFilterChange={handleFilterChange} />
        </div> */}

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input type="text"
          name="search-query"
          placeholder="Search by title..." 
          className="py-3 p-2 w-full  rounded-lg border-gray-300 border-2"/>

          <button type="submit" className="bg-slate-950 w-fit px-4 rounded-lg text-white">
          Search
          </button>
        </form>
          {loadingJobs && <Load/>}
        <div className=" mt-2 gap-10 grid md:grid-cols-2 lg:grid-cols-3">
          {jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job.id} job={job} saveInit={job?.saved?.length>0}/>)
          ) : (
            <p className="text-center text-gray-600 bg-white p-6 rounded-lg shadow-md">
              No jobs found. Try adjusting your search or filters.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
