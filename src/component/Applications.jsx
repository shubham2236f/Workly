import  React from "react"
import { Download, Briefcase, Calendar, ChartNoAxesCombined } from "lucide-react"
import useFetch from "@/hooks/useFetch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import Load from "./loader/Load";
import { updateApplicationStatus } from "@/api/apiApplication";

  const Applications= ({ application, isCandidate = false}) => {
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = application?.resume
    link.target = "_blank"
    link.click()
  }
  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationStatus,
    {
      job_id: application.job_id,
    }
  );
  const handleStatusChange = (status) => {
    fnHiringStatus(status).then(() => fnHiringStatus());
  };

  return (
    <>
    {loadingHiringStatus && <Load/>}
    <div className="w-full my-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center max-[600px]:flex-col">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-semibold">
            {application?.name?.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
            {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
              </h2>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Briefcase size={16} className="mr-2" />
              <span>{application.experience} years of Experience</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Calendar size={14} className="mr-2" />
              <span>Applied: {new Date(application?.created_at).toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col max-[600px]:mt-3">
          <button
            onClick={handleDownload}
            className="flex items-center w-48 justify-center px-2 py-2 bg-primary text-white rounded-md hover:bg-gray-700 transition-colors duration-300"
          >
            <Download size={16} />
            <span>Resume</span>
          </button>
          {isCandidate ? (
            <div className="border border-gray-900 rounded-sm mt-3">
               <p className="p-1">Status: {application.status} </p>
            </div>
          ) : (
            <Select
              onValueChange={handleStatusChange}
              defaultValue={application.status}
            >
              <SelectTrigger className="w-48 mt-3">
                <SelectValue placeholder="Application Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default Applications

