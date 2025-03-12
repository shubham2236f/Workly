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
export async function improveWithAI(token,{user_id},current,type) {
  console.log(user_id)
  console.log(current,type)
    const supabase = await supabaseClient(token);
  
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
    const prompt = `
  You are a professional resume writer with expertise in ${user?.industry}. 
  Your task is to enhance the following ${type} description to make it stand out.

  **Current Content:** "${current}"

  **Objectives:**
  - Rewrite it to be more engaging, results-driven, and industry-aligned.
  - Use action-oriented language and eliminate passive voice.
  - Incorporate quantifiable achievements, specific examples, and industry-relevant terminology.
  - Maintain clarity and conciseness while maximizing impact.
  - Ensure a natural, human-like flow without making it sound robotic.
  - Introduce variation in sentence structure and avoid clichés.

  **Additional Considerations:**
  - Where applicable, add numbers, percentages, or specific outcomes to showcase effectiveness.
  - Highlight problem-solving abilities, leadership, or innovation.
  - Use persuasive yet professional wording to capture attention.
  
  **Output Format:**
  - Deliver a single refined paragraph.
  - Do **not** include extra commentary or formatting.
  - Make each revision feel unique and tailored rather than generic.
`;

  
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const improvedContent = response.text().trim();
      return improvedContent;
    } catch (error) {
      console.error("Error improving content:", error);
      throw new Error("Failed to improve content");
    }
  }