import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { motion } from "framer-motion"

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const navigateUser = (currRole) => {
    navigate(currRole === "recruiter" ? "/" : "/");
  };

  const handleRoleSelection = async (role) => {
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        console.log(`Role updated to: ${role}`);
        navigateUser(role);
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter animate-bounce">
        I am a...
      </h2>
      <div className="mt-16 flex items-center justify-evenly w-full md:px-40">
        <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}>
         <Button
          className="py-16 px-24 text-2xl bg-slate-900 text-white border-2 border-slate-900 
          hover:bg-white hover:text-slate-900"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>   
        </motion.div>
        <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay:0.7 }}>
         <Button
          className="py-16 px-24 text-2xl bg-white text-gray-900 border-2 border-slate-900 hover:text-white hover:bg-slate-900"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>   
        </motion.div>     
      </div>
    </div>
  );
};

export default Onboarding;



