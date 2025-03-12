import React, { useEffect } from 'react'
import DashboardView from '@/components_Sensie/DashboardView'
import { getInsights } from '@/api/apiGemini'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'

const Dashboard = () => {
  const {user,isloading} = useUser()
  const {
    loading: loadingInsight,
    error: errorInsight,
    data: dataInsight,
    fn: fnInsight,
  } = useFetch(getInsights,{
    user_id: user?.id
  });
  useEffect(()=>{
    fnInsight()
    if(!loadingInsight && dataInsight){
      console.log(dataInsight)
    }
  },[user])

  return (
    <div>
    <DashboardView insights={dataInsight}/>
    </div>
  )
}

export default Dashboard