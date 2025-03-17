import { useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Loader2, User, Building2 } from "lucide-react"
import { motion } from "framer-motion"

// Simple utility function for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(" ")

export default function Onboarding() {
  const { user, isLoaded } = useUser()
  const navigate = useNavigate()
  const [isUpdating, setIsUpdating] = useState(null)
  const [error, setError] = useState(null)

  const navigateUser = (currRole) => {
    navigate(currRole === "recruiter" ||  currRole === "candidate" || currRole === "premium-candidate" ? 
      "/" : "/onboarding")
  }

  const handleRoleSelection = async (role) => {
    setIsUpdating(role)
    setError(null)

    try {
      await user?.update({ unsafeMetadata: { role } })
      console.log(`Role updated to: ${role}`)
      navigateUser(role)
    } catch (err) {
      console.error("Error updating role:", err)
      setError("Failed to update your role. Please try again.")
      setIsUpdating(null)
    }
  }

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      console.log(user?.unsafeMetadata?.role);
      navigateUser(user.unsafeMetadata.role)
    }
  }, [user])

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading your profile...</p>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="relative min-h-[90vh] w-full flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 -z-10" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Welcome to Your Journey
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">
          Tell us who you are so we can personalize your experience
        </p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-3 bg-destructive/10 text-destructive rounded-md"
        >
          {error}
        </motion.div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full max-w-3xl"
      >
        <motion.div variants={item}>
          <RoleCard
            title="Job Seeker"
            description="Find your dream job and connect with top employers"
            icon={<User className="h-8 w-8" />}
             onClick={() => handleRoleSelection("candidate")}
            isLoading={isUpdating === "candidate"}
            variant="candidate"
          />
        </motion.div>

        <motion.div variants={item}>
          <RoleCard
            title="Recruiter"
            description="Source top talent and manage your hiring pipeline"
            icon={<Building2 className="h-8 w-8" />}
            onClick={() => handleRoleSelection("recruiter")}
            isLoading={isUpdating === "recruiter"}
            variant="recruiter"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

function RoleCard({ title, description, icon, onClick, isLoading, variant }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "w-full h-full p-6 md:p-8 rounded-xl border-2 flex flex-col items-center text-center transition-all duration-200",
        variant === "candidate"
          ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
          : "bg-card text-card-foreground border-border hover:border-primary/50 hover:shadow-md",
      )}
      onClick={onClick}
      disabled={isLoading}
    >
      <div
        className={cn("p-3 rounded-full mb-4", variant === "candidate" ? "bg-primary-foreground/10" : "bg-primary/10")}
      >
        {icon}
      </div>

      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p
        className={cn("text-sm mb-4", variant === "candidate" ? "text-primary-foreground/80" : "text-muted-foreground")}
      >
        {description}
      </p>

      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <div
          className={cn(
            "mt-auto text-sm font-medium",
            variant === "candidate" ? "text-primary-foreground/90" : "text-primary",
          )}
        >
          Select this role →
        </div>
      )}
    </motion.button>
  )
}








