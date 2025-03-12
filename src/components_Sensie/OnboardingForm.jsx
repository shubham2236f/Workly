import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {test } from '@/api/apiSetSensie';
import useFetch from '@/hooks/useFetch';
import { useEffect } from 'react';
import { Label } from "@/components/ui/label";
import Load from '@/component/loader/Load';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/clerk-react";

const OnboardingForm = ({industries}) => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [subIndustries,setSelectedSubInd] = useState(null);
  const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    yearsOfExperience: "",
    skills: "",
    professionalBio: "",
  })
  const {
    loading: loadingtest,
    error: errortest,
    data: datatest,
    fn: fntest,
  } = useFetch(test);

const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    await user
    .update({ unsafeMetadata: { role: "premium-candidate" } })
    .then(() => {
      console.log("role updated to: premium-candidate")
    })
    .catch((err) => {
      console.error("Error updating role:", err);
    });

    // Add your form submission logic here
    try {
      const formattedIndustry = `${selectedIndustry.id}-${subIndustries
        .toLowerCase()
        .replace(/ /g, "-")}`;
      const skillsArray = formData.skills.split(',').map(skill => skill.trim());
     
      await fntest({
        bio:formData.professionalBio,
        industry:formattedIndustry,
        experience:formData.yearsOfExperience,
        skills:skillsArray
      });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

  useEffect(() => {
    if (!loadingtest && datatest) {
      console.log("Fetched Data:", datatest);
      setLoading(false)
      navigate("/dashboard");
    }
  }, [loadingtest, datatest]);

  if(loadingtest){
    return <Load/>
  }
  return (
    <div className='text-center'>
    <h1 
    className='font-sans font-bold text-7xl bg-gradient-to-r from-slate-950 to-slate-300 text-transparent bg-clip-text'>
      Welcome to sensie
      </h1>
    <div className="max-w-xl mx-auto p-6 bg-[#121212] text-white font-sans my-8 rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <div className="relative">
          <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                onValueChange={(value) => {
                  setSelectedIndustry(
                    industries.find((ind) => ind.id === value)
                  ); 
                }}
              >
                <SelectTrigger id="industry" className="bg-black">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Industries</SelectLabel>
                    {industries.map((ind) => (
                      <SelectItem key={ind.id} value={ind.id}>
                        {ind.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="relative">
                    {selectedIndustry && selectedIndustry.subIndustries.length > 0 && (
            <div>
              <Label htmlFor="subIndustry">Sub-Industry</Label>
              <Select onValueChange={(value)=>{
                setSelectedSubInd(value)
                console.log(selectedIndustry); 
              }}
              >
                <SelectTrigger id="subIndustry" className="bg-black">
                  <SelectValue placeholder="Select a sub-industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sub-Industries</SelectLabel>
                    {selectedIndustry.subIndustries.map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="yearsOfExperience" className="block mb-2 font-medium">
            Years of Experience
          </label>
          <input
            type="text"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            className="w-full p-3 bg-[#1e1e1e] border border-[#333] rounded text-white"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="skills" className="block mb-2 font-medium">
            Skills
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-3 bg-[#1e1e1e] border border-[#333] rounded text-white"
          />
          <span className="block mt-1 text-sm text-gray-500">Separate multiple skills with commas</span>
        </div>

        <div className="mb-5">
          <label htmlFor="professionalBio" className="block mb-2 font-medium">
            Professional Bio
          </label>
          <textarea
            id="professionalBio"
            name="professionalBio"
            placeholder="Tell us about your professional background..."
            value={formData.professionalBio}
            onChange={handleChange}
            className="w-full p-3 bg-[#1e1e1e] border border-[#333] rounded text-white min-h-[150px] resize-y"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-gray-300 text-gray-800 font-medium rounded hover:bg-gray-200 transition-colors"
        >
          Complete Profile
        </button>
      </form>
    </div>
    
    </div>
    
    )
}

export default OnboardingForm