import { useUser } from "@clerk/clerk-react";
import Applications from "./Applications";
import { useEffect } from "react";
import { getApplications } from "@/api/apiApplication";
import useFetch from "@/hooks/useFetch";
import { BarLoader } from "react-spinners";

const CreatedApplications = () => {
  const { user } = useUser();

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    fnApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingApplications) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-2">
      {Array.isArray(applications) ? (applications?.map((application) => {
        return (
          <Applications
            key={application.id}
            application={application}
            isCandidate={true}
          />
        );
      })):(<p>invalid data</p>)}
    </div>
  );
};

export default CreatedApplications;