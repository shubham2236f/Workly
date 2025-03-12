import { GoogleGenerativeAI } from "@google/generative-ai";
import supabaseClient from "@/utils/supabase";

const apiKey = import.meta.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI("AIzaSyBA5C62QAen_p9l1YGUV1tPHpcQcfKbEqs");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateAIInsights = async (industry) => {
  const prompt = `
          Analyze the current state of the ${industry} industry for india and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  return JSON.parse(cleanedText);
};

// get  industryinsight data
export async function getInsights(token,user_id){

  if (!token) {
    console.error("Token not provided.");
    return null;
  }

  try {
    const supabase = await supabaseClient(token);
    
    //Decode token safely
    let payload;
    try {
      payload = JSON.parse(atob(token.split(".")[1]));
    } catch (decodeError) {
      console.error("Error decoding token:", decodeError);
      return null;
    }
    if (!payload?.sub) {
      console.error("Token payload does not contain 'sub'.");
      return null;
    }

    // fetch industryinsight data
    const { data: userData, error: fetchError } = await supabase
      .from("user") // Ensure correct table name
      .select("*,IndustryInsight(*)")
      .eq("user_id",user_id.user_id)
      .single();

    if (fetchError || !userData) {
      console.error("Error fetching userindustry:", fetchError);
      return null;
    }
    return userData;
  }catch(error){
    console.error(error)
    return null
  }

}
