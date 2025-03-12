
import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function JobFilters({ onFilterChange }) {
  const [jobTypes, setJobTypes] = useState([])
  const [locations, setLocations] = useState([])

  const handleJobTypeChange = (value) => {
    setJobTypes((prev) => {
      const newJobTypes = prev.includes(value) ? prev.filter((type) => type !== value) : [...prev, value]
      onFilterChange({ jobTypes: newJobTypes, locations })
      return newJobTypes
    })
  }

  const handleLocationChange = (value) => {
    setLocations((prev) => {
      const newLocations = prev.includes(value) ? prev.filter((location) => location !== value) : [...prev, value]
      onFilterChange({ jobTypes, locations: newLocations })
      return newLocations
    })
  }

  return (
    <div className="flex space-x-4 mt-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" >
            Job Type <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Job Types</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={jobTypes.includes("Full-time")}
            onCheckedChange={() => handleJobTypeChange("Full-time")}
          >
            Full-time
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={jobTypes.includes("Part-time")}
            onCheckedChange={() => handleJobTypeChange("Part-time")}
          >
            Part-time
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={jobTypes.includes("Contract")}
            onCheckedChange={() => handleJobTypeChange("Contract")}
          >
            Contract
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" >
            Location <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Locations</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={locations.includes("San Francisco, CA")}
            onCheckedChange={() => handleLocationChange("San Francisco, CA")}
          >
            San Francisco, CA
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={locations.includes("New York, NY")}
            onCheckedChange={() => handleLocationChange("New York, NY")}
          >
            New York, NY
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={locations.includes("Chicago, IL")}
            onCheckedChange={() => handleLocationChange("Chicago, IL")}
          >
            Chicago, IL
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={locations.includes("Remote")}
            onCheckedChange={() => handleLocationChange("Remote")}
          >
            Remote
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

