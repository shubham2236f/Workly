import supabaseClient from "@/utils/supabase";

// Fetch Jobs
export  async function getJobs(token,{location,company_id,searchQuery}) {
  const supabase = await supabaseClient(token);
  let query = supabase.from("job").select("*,company:companies(name,logo_url),saved:saved_job(id)");

  if(location){
    query = query.eq("location",location)
  }
  if(company_id){
    query = query.eq("company_id",company_id)
  }
  if(searchQuery){
    query = query.ilike("title",`%${searchQuery}%`)
  }
  const {data,error} = await query;
  
  if (error) {
    console.log(error)
    return null;
  }
  return data;
  }

  //save the jobs
export  async function saveJobs(token,{alreadySaved},saveData) {
    const supabase = await supabaseClient(token);

    if (alreadySaved) {
      const { data, error: deleteError } = await supabase
      .from("saved_job")
      .delete()
      .eq("job_id", saveData.job_id);

      if (deleteError) {
        console.log(deleteError)
        return null;
      }
      return data;
    } 
    else {
      const { data, error: insertError } = await supabase
      .from("saved_job")
      .insert([saveData])
      .select();

      if (insertError) {
        console.log(insertError)
        return null;
      }
      return data;
    }

    }

    //get single jobs
 export async function getSingleJob(token, { job_id }) {
      const supabase = await supabaseClient(token);
      let query = supabase
        .from("job")
        .select(
          "*, company: companies(name,logo_url), applications: application(*)"
        )
        .eq("id", job_id)
        .single();
    
      const { data, error } = await query;
    
      if (error) {
        console.error("Error fetching Job:", error);
        return null;
      }
    
      return data;
    }

    //update hiring status
 export async function updateHiringStatus(token, { job_id }, isOpen) {
      const supabase = await supabaseClient(token);
      const { data, error } = await supabase
        .from("job")
        .update({ isOpen })
        .eq("id", job_id)
        .select();
    
      if (error) {
        console.error("Error Updating Hiring Status:", error);
        return null;
      }
    
      return data;
    }

    //get searched jobs
    export  async function getSearchedJobs(token,{searchQuery}) {
      const supabase = await supabaseClient(token);
      let query = supabase.from("job")
      .select("*,company:companies(name,logo_url),saved:saved_job(id)");
      if (searchQuery?.trim()) {
        query = query.textSearch("title", `%${searchQuery.trim()}%`);
      }
      const {data,error} = await query;
      
      if (error) {
        console.log(error)
        return null;
      }
      return data;
      }

      //add new jobs
      export async function addNewJob(token, _, jobData) {
        const supabase = await supabaseClient(token);
      
        const { data, error } = await supabase
          .from("job")
          .insert([jobData])
          .select();
      
        if (error) {
          console.error(error);
          throw new Error("Error Creating Job");
        }
      
        return data;
      }

      // get saved jobs
      export async function getSavedJobs(token) {
        const supabase = await supabaseClient(token);
        const { data, error } = await supabase
          .from("saved_job")
          .select("*, job: job(*, company: companies(name,logo_url))");
      
        if (error) {
          console.error("Error fetching Saved Jobs:", error);
          return null;
        }
      
        return data;
      }
      
      //get My jobs
      export async function getMyJobs(token, { recruiter_id }) {
        const supabase = await supabaseClient(token);
      
        const { data, error } = await supabase
          .from("job")
          .select("*, company: companies(name,logo_url)")
          .eq("recruiter_id", recruiter_id);
      
        if (error) {
          console.error("Error fetching Jobs:", error);
          return null;
        }
      
        return data;
      }
      
      // Delete job
      export async function deleteJob(token, { job_id }) {
        const supabase = await supabaseClient(token);
      
        const { data, error: deleteError } = await supabase
          .from("job")
          .delete()
          .eq("id", job_id)
          .select();
      
        if (deleteError) {
          console.error("Error deleting job:", deleteError);
          return data;
        }
      
        return data;
      }