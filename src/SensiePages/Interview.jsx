import React,{useEffect} from 'react'
import { getAssessments } from '@/api/interview'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import PerformanceChart from '@/components_Sensie/interview/PerformanceChat'
import QuizList from '@/components_Sensie/interview/QuizList'
import StatsCards from '@/components_Sensie/interview/StatsCards'
import Load from '@/component/loader/Load'

const Interview = () => {
    const {user} = useUser()
    const {
        loading: loadingAssessment,
        error: errorAssessment,
        data: assessments,
        fn: fnAssessment,
      } = useFetch(getAssessments);
    useEffect(()=>{
        console.log("running..."); 
        fnAssessment()
    },[user])
    useEffect(()=>{
        if (!loadingAssessment && assessments) {
          console.log(assessments);      
        }
    },[loadingAssessment,assessments])

    if(loadingAssessment){
      return <Load/>
    }

    if(assessments){
        return (
            <div className='bg-gray-100'>
              <div className="flex items-center justify-between mb-5">
                <h1 className="text-6xl font-bold gradient-title">
                  Interview Preparation
                </h1>
              </div>
              <div className="space-y-6">
                <StatsCards assessments={assessments} />
                <PerformanceChart assessments={assessments} />
                <QuizList assessments={assessments} />
              </div>
            </div>
          )
    }
}

export default Interview