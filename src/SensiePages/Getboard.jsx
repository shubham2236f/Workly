import React, { useEffect} from 'react'
import { useUser } from '@clerk/clerk-react'
import { addNewUser, test } from '@/api/apiSetSensie';
import useFetch from '@/hooks/useFetch';
import OnboardingForm from '@/components_Sensie/OnboardingForm'
import { industries } from '@/data/industries';
import Load from '@/component/loader/Load';
import { useNavigate } from 'react-router-dom';

const Getboard = () => {
  
    const {user, isloading} = useUser();
    console.log(user)
    const navigate = useNavigate();
    const {
        loading:load,
        fn: fnUser,
      } = useFetch(addNewUser);

      useEffect(()=>{
        if (user?.unsafeMetadata?.role === "premium-candidate") {
          navigate("/");
        }
      },[user])

      useEffect(() => {
        if(user?.unsafeMetadata?.role === "candidate"){
            fnUser({
                user_id: user?.id,
                name: `${user?.firstName} ${user?.lastName}`,
                email: user?.emailAddresses[0]?.emailAddress,
            });
            console.log(user?.id,user?.firstName+user?.lastName,
                user?.emailAddresses[0]?.emailAddress
            )
        }
      },[isloading,user])


  if(load || isloading){
    <Load/>
  }
  return (
    <div>
    <OnboardingForm industries={industries} />
    </div>
  )
}

export default Getboard