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
    <div>
      <h1 
      className="border-b-2 border-stone-950 font-extrabold text-5xl sm:text-7xl text-center pb-8 m-2
      bg-gradient-to-r from-black to-teal-400 text-transparent bg-clip-text">
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