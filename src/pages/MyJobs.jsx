import CreatedApplications from "@/component/CreatedApplications";
import CreatedJobs from "@/component/CreatedJobs";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

const MyJobs = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="mx-2">
      <h1 
      className="text-4xl md:text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-black to-teal-400 
      text-transparent bg-clip-text border-b-2 p-2 border-black">
        {user?.unsafeMetadata?.role === "recruiter"
          ? "My Jobs"
          : "My Applications"}
      </h1>
      {user?.unsafeMetadata?.role === "recruiter" ? (
        <CreatedJobs />
      ) : (
        <CreatedApplications />
      )}
    </div>
  );
};

export default MyJobs;