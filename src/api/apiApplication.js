import supabaseClient, { supabaseUrl } from "@/utils/supabase";


export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  console.log("Job Data Received:", jobData);
  console.log("Resume Object Type:", typeof jobData.resume, jobData.resume);

  // Ensure the resume is a valid File object
  if (!(jobData.resume instanceof File)) {
    throw new Error("Invalid resume format. Please upload a valid file.");
  }

  // Generate a unique file name
  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}-${jobData.resume.name}`;

  // Upload the file with correct content type
  const { data: uploadData, error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume, {
      cacheControl: "3600",
      upsert: false,
      contentType: jobData.resume.type, // Ensure correct file type is set
    });

  if (storageError) {
    console.error("Storage Upload Error:", storageError.message);
    throw new Error("Error uploading resume: " + storageError.message);
  }

  // Get public URL
  const { data: publicUrlData } = supabase.storage.from("resumes").getPublicUrl(fileName);
  if (!publicUrlData) {
    throw new Error("Error generating resume URL");
  }

  const resumeUrl = publicUrlData.publicUrl;

  // Save the application details in the database
  const { data, error } = await supabase
    .from("application")
    .insert([{ ...jobData, resume: resumeUrl }])
    .select();

  if (error) {
    console.error("Database Error:", error.message);
    throw new Error("Error submitting application: " + error.message);
  }

  return data;
}


// - Edit Application Status ( recruiter )
export async function updateApplicationStatus(token, { job_id }, status) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("application")
    .update({ status })
    .eq("job_id", job_id)
    .select();

  if (error || data.length === 0) {
    console.error("Error Updating Application Status:", error);
    return null;
  }

  return data;
}

export async function getApplications(token, { user_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("application")
    .select("*, job:job(title, company:companies(name))")
    .eq("candidate_id", user_id);

  if (error) {
    console.error("Error fetching Applications:", error);
    return null;
  }

  return data;
}