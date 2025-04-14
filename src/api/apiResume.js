import supabaseClient from "@/utils/supabase";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function saveResume(token,_,content) {
    console.log(content)
    const supabase = await supabaseClient(token);
  let payload;
      try {
        payload = JSON.parse(atob(token.split(".")[1]));
        console.log("Decoded Token Payload:", payload);
      } catch (decodeError) {
        console.error("Error decoding token:", decodeError);
        return null;
      }
  
      if (!payload?.sub) {
        console.error("Token payload does not contain 'sub'.");
        return null;
      }
  
    try {
        const { data: resumeInsert, error: ResumeInsertError } = await supabase
        .from("Resume")
        .insert({
          user_id:payload?.sub,
          content:content,
        })
        .select()
        .single()
        if (ResumeInsertError) {
          console.error("Error in inserting resume:", ResumeInsertError);
          try {

            const { data: resumeUpdate, error: ResumeUpdateError } = await supabase
            .from("Resume")
            .update({
              content:content,
            })
            .eq("user_id",payload?.sub)
            .select()
            .single()
            if(ResumeUpdateError)console.error("Error in updating resume:", ResumeUpdateError);
        return resumeUpdate
          } catch (error) {
            console.error("Error saving resume:", error);
            throw new Error("Failed to update resume");
          }
          
        }
      return resumeInsert;
    } catch (error) {
      console.error("Error saving resume:", error);
      throw new Error("Failed to save resume");
    }
  }

//get rume data api
export async function getResume(token,user_id) {
  const supabase = await supabaseClient(token);
    console.log(user_id)
  try {
    const { data: resume, error: ResumeError } = await supabase
        .from("Resume")
        .select("*")
        .eq("user_id",user_id?.user_id)
        .single()
        if (ResumeError) {
          console.error("Error saving quiz data:", ResumeError);
          return null;
        }

    return resume;
  } catch (error) {
    console.error("Error fetching resume:", error);
    throw new Error("Failed to fetch resume");
  }

}

//improve resume with AI
export async function improveWithAI(token,{user_id},info) {
  console.log("java,javascript")
    console.log(user_id,info);
  
    const supabase = await supabaseClient(token);
    console.log("finding..")
    const { data: user, error: userError } = await supabase
        .from("user")
        .select("industry")
        .eq("user_id",user_id)
        .single()
        if (userError) {
          console.error("Error saving quiz data:", userError);
          return null;
        }
    if (!user) throw new Error("User not found");
    console.log(user)
    console.log("starting...")
    const prompt = `
    improve my summary using:
    old summary: ${info?.summary},
    Industry: ${user.industry}  ,
    Skills: ${info?.skills}  ,

     **Output Requirements:**  
  - Provide a **single improved paragraph** with a polished, professional tone.  
  - Do **not** include additional commentary or formatting, only the enhanced summary.  
  `;
  console.log("still...")
    try {
      console.log(prompt,model)
      const result = await model.generateContent(prompt);
      if (!result || !result.response || !result.response.candidates) {
        console.error("AI response is empty or invalid");
        return null;
      }
      const response = result.response;
      const improvedContent = response.text().trim();
      console.log("ending...",improvedContent)
      return improvedContent;
    } catch (error) {
      console.error("Error improving content:", error);
      throw new Error("Failed to improve content");
    }
  }