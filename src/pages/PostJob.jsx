import React from 'react'
import { getCompanies } from "@/api/apiCompanies";
import { addNewJob } from "@/api/apijobs";
import AddCompanyDrawer from '@/component/AddCompanyDrawer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { State } from "country-state-city";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import Load from '@/component/loader/Load';
import { z } from "zod";

const schema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    location: z.string().min(1, { message: "Select a location" }),
    company_id: z.string().min(1, { message: "Select or Add a new Company" }),
    requirements: z.string().min(1, { message: "Requirements are required" }),
  });

  const PostJob = () => {
    const { user, isLoaded } = useUser();
    const navigate = useNavigate();
  
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm({
      defaultValues: { location: "", company_id: "", requirements: "" },
      resolver: zodResolver(schema),
    });
  
    const {
      loading: loadingCreateJob,
      error: errorCreateJob,
      data: dataCreateJob,
      fn: fnCreateJob,
    } = useFetch(addNewJob);
  
    const onSubmit = (data) => {
      fnCreateJob({
        ...data,
        recruiter_id: user.id,
        isOpen: true,
      });
    };
  
    useEffect(() => {
      if (dataCreateJob?.length > 0) navigate("/Search");
    }, [loadingCreateJob]);
  
    const {
      loading: loadingCompanies,
      data: companies = [],
      fn: fnCompanies,
    } = useFetch(getCompanies);
  
    useEffect(() => {
      if (isLoaded) {
        fnCompanies();
        if(loadingCompanies) console.log(companies);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded]);
    useEffect(()=>{
      console.log(companies)
      console.log("Companies Data:", companies, Array.isArray(companies));

    },[companies])
  
    if (!isLoaded || loadingCompanies) {
      return <Load/>;
    }
  
    if (user?.unsafeMetadata?.role !== "recruiter") {
      return <Navigate to="/search" />;
    }
  
    return (
      <div >
        <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
          Post a Job
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 pb-0"
        >
          <Input placeholder="Job Title" {...register("title")} />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
  
          <Textarea placeholder="Job Description" {...register("description")} />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
  
          <div className="flex gap-4 items-center">
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Job Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {State.getStatesOfCountry("IN").map(({ name }) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {loadingCompanies? <Load/> : (<Controller
              name="company_id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Company">
                      {field.value
                        ? companies?.find((com) => com.id === Number(field.value))
                            ?.name
                        : "Company"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Array.isArray(companies) ? (companies?.map(({ name, id }) => (
                        <SelectItem key={name} value={id}>
                          {name}
                        </SelectItem>
                      ))):(<p>invalid data</p>)}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />)}
            <AddCompanyDrawer fetchCompanies={fnCompanies} />
          </div>
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
          {errors.company_id && (
            <p className="text-red-500">{errors.company_id.message}</p>
          )}
  
          <Controller
            name="requirements"
            control={control}
            render={({ field }) => (
              <MDEditor value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.requirements && (
            <p className="text-red-500">{errors.requirements.message}</p>
          )}
          {errors.errorCreateJob && (
            <p className="text-red-500">{errors?.errorCreateJob?.message}</p>
          )}
          {errorCreateJob?.message && (
            <p className="text-red-500">{errorCreateJob?.message}</p>
          )}
          {loadingCreateJob && <Load/>}
          <div className='w-full flex items-center justify-center'>
          <Button type="submit" size="lg" className="mt-2 w-fit font-semibold bg-gray-950 rounded-lg text-white">
            Submit
          </Button>
          </div>
        </form>
      </div>
    );
  };
  
  export default PostJob;