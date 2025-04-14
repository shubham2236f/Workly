import { useState } from 'react'
import './App.css'
import Landing from './pages/Landing'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import About from './component/About/About'
import JobSearchResults from './pages/JobSearchResults'
import Job from './pages/Job'
import PostJob from './pages/PostJob'
import SavedJobs from './pages/SavedJobs'
import AppLayout from './hooks/layout/AppLayout'
import MyJobs from './pages/MyJobs'
import Onboarding from './pages/Onboarding'
import ProtectedRoute from './component/ProtectedRoute'
import Getboard from './SensiePages/Getboard'
import Dashboard from './SensiePages/Dashboard'
import MockInterview from './SensiePages/MockInterview'
import Interview from './SensiePages/Interview'
import ResumePage from './SensiePages/ResumePage'
import FAQ from './SensiePages/FAQ'

function App() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter([
    {
      path:"/",
      element:<AppLayout/>,
      children:[
        {
          path:"/",
          element:<Landing/>
        },
        {
          path:"/saved-jobs",
          element:(
            <ProtectedRoute>
            <SavedJobs/>
            </ProtectedRoute>),
        },
        {
          path:"/my-jobs",
          element:(
          <ProtectedRoute>
          <MyJobs/>
          </ProtectedRoute>),
        },
        {
          path:"/search",
          element:(
            <ProtectedRoute>
            <JobSearchResults/>
            </ProtectedRoute>),
        },
        {
          path:"/getboard",
          element:(
            <ProtectedRoute>
            <Getboard/>
            </ProtectedRoute>),
        },
        {
          path:"/interview",
          element:(
            <ProtectedRoute>
            <Interview/>
            </ProtectedRoute>),
        },
        {
          path:"/resume",
          element:(
            <ProtectedRoute>
            <ResumePage/>
            </ProtectedRoute>),
        },
        {
          path:"/dashboard",
          element:(
            <ProtectedRoute>
            <Dashboard/>
            </ProtectedRoute>),
        },
        {
          path:"/FAQ",
          element:(
            <ProtectedRoute>
            <FAQ/>
            </ProtectedRoute>),
        },
      ]
    },
  {
    path:"/about",
    element:<About/>
  },
  {
    path:"/job/:id",
    element:(
      <ProtectedRoute>
      <Job/>
      </ProtectedRoute>),
  },
  {
    path:"/PostJob",
    element:(
      <ProtectedRoute>
      <PostJob/>
      </ProtectedRoute>),
  },
  {
    path:"/onboarding",
    element:(
      <ProtectedRoute>
      <Onboarding/>
      </ProtectedRoute>),
  },
  {
    path:"/interview/mock",
    element:<MockInterview/>
  },
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
