import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { applyToJob } from '@/api/apiApplication';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import useFetch from '@/hooks/useFetch';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from '@/components/ui/input';
import Load from './loader/Load';

const schema = z.object({
    experience: z
      .number()
      .min(0, { message: "Experience must be at least 0" })
      .int(),
    skills: z.string().min(1, { message: "Skills are required" }),
    education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
      message: "Education is required",
    }),
    resume: z
  .any()
  .refine(
    (file) =>
      file[0] &&
      (file[0].type === "application/pdf" ||
        file[0].type === "application/msword"),
    { message: "Only PDF or Word documents are allowed" }
      ),
  });

const ApplyJob = ({ user, job, fetchJob, applied = false }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
      } = useForm({
        resolver: zodResolver(schema),
      });

    const {
        loading: loadingApply,
        error: errorApply,
        fn: fnApply,
      } = useFetch(applyToJob);
    
      const onSubmit = (data) => {
        fnApply({
          ...data,
          job_id: job.id,
          candidate_id: user.id,
          name: user.fullName,
          status: "applied",
          resume: data.resume[0],
        }).then(() => {
          fetchJob();
          reset();
        });
      };

  return (
    <div>

<Drawer open={applied ? false : undefined}>
    <div className='w-full flex  justify-center'>
    <DrawerTrigger asChild className='w-full bg-black'>
        <Button
          size="custom"
          className="bg-gray-950 text-white w-[30vmin]"
          variant={job?.isOpen && !applied ? "blue" : "destructive"}
          disabled={!job?.isOpen || applied}
        >
          {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
    </div>
      <DrawerContent> 
        <DrawerHeader>
          <DrawerTitle>
            Apply for {job?.title} at {job?.company?.name}
          </DrawerTitle>
          <DrawerDescription>Please Fill the form below</DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 pb-0"
        >
          <Input
            type="number"
            placeholder="Years of Experience"
            className="flex-1"
            {...register("experience", {
              valueAsNumber: true,
            })}
          />
          {errors.experience && (
            <p className="text-red-500">{errors.experience.message}</p>
          )}
          <Input
            type="text"
            placeholder="Skills (Comma Separated)"
            className="flex-1"
            {...register("skills")}
          />
          {errors.skills && (
            <p className="text-red-500">{errors.skills.message}</p>
          )}
          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} {...field}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Graduate" id="graduate" />
                  <Label htmlFor="graduate">Graduate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Post Graduate" id="post-graduate" />
                  <Label htmlFor="post-graduate">Post Graduate</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.education && (
            <p className="text-red-500">{errors.education.message}</p>
          )}
          <Input
            type="file"
            accept=".pdf, .doc, .docx"
            className="flex-1 file:text-gray-500"
            {...register("resume")}
          />
          {errors.resume && (
            <p className="text-red-500">{errors.resume.message}</p>
          )}
          {errorApply?.message && (
            <p className="text-red-500">{errorApply?.message}</p>
          )}
          {loadingApply && <Load/>}
          <div className='flex justify-center items-center'>
          <Button type="submit" variant="blue" size="lg" className="bg-gray-950 text-white w-1/6">
            Apply
          </Button>  
          </div>
        </form>

        <DrawerFooter className='flex justify-center items-center '>
          <DrawerClose asChild>
            <Button variant="outline" className="w-1/6 border-gray-900 border-2">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>

    </div>
  )
}

export default ApplyJob