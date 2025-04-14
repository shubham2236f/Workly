import React, { useState } from "react"
import { Laptop, Stethoscope, GraduationCap, DollarSign, Megaphone, PenTool, Briefcase, Building2 } from "lucide-react"
import { Link,useNavigate } from "react-router-dom"

const jobCategories = [
  { id: 1, name: "web dev", icon: Laptop },
  { id: 2, name: "Healthcare", icon: Stethoscope },
  { id: 3, name: "Education", icon: GraduationCap },
  { id: 4, name: "Finance", icon: DollarSign },
  { id: 5, name: "Marketing", icon: Megaphone },
  { id: 6, name: "Design", icon: PenTool },
  { id: 7, name: "Business", icon: Briefcase },
  { id: 8, name: "Real Estate", icon: Building2 },
]

export default function JobCategorySelector() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const navigate = useNavigate()

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  const handleViewJobs = () => {
    if (selectedCategory) {
      navigate(`/search?category=${encodeURIComponent(selectedCategory.name)}`);
    }
  };

  return (
    <div className="w-full  mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Select Your Desired Job Category</h2>
        <p className="mt-2 text-gray-600 text-center">Choose a category to view relevant job listings</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {jobCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <button
                key={category.id}
                className={`flex flex-col items-center justify-center h-24 rounded-lg border transition-all ${
                  selectedCategory === category
                    ? "bg-gray-900 text-white "
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                <IconComponent className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            )
          })}
        </div>
        {selectedCategory && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold text-gray-800">Selected Category: {selectedCategory.name}</p>
            <p className="mt-2 text-sm text-gray-600">
              You have selected the {selectedCategory.name} category. Click "View Jobs" to see available positions in
              this field.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-gray-950 text-white rounded-md hover:bg-gray-800 transition-colors"
              onClick={handleViewJobs}
            >
              View Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

