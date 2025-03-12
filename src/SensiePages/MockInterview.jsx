import MockUi from '@/components_Sensie/MockUi'
import React from 'react'
import {Link}from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const MockInterview = () => {

  return (

    <div>
      <div className="flex flex-col space-y-2 mx-2">
        <Link to="/interview">
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Interview Preparation
          </Button>
        </Link>

        <div>
          <h1 className="text-6xl font-bold gradient-title">Mock Interview</h1>
          <p className="text-muted-foreground">
            Test your knowledge with industry-specific questions
          </p>
        </div>
      </div>
      <MockUi/>
    </div>
  )
}

export default MockInterview