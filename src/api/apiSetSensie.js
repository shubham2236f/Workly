import supabaseClient from "@/utils/supabase";
import { generateAIInsights } from "./apiGemini";
import { User } from "lucide-react";

//become sensie user
export async function addNewUser(token,_,userData) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
      .from("user")
      .insert([userData])
      .select();
  
    if (error) {
      console.error(error);
      throw new Error("Error Creating user");
    }
  
    return data;
  }
//testing getid


//testing
export async function test(token,_,updateData) {
  
    try {
      const supabase = await supabaseClient(token);
      
      // Decode token safely
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
  
      // Fetch user data
      const { data: userData, error: fetchError } = await supabase
        .from("user") // Ensure correct table name
        .select("*")
        .eq("user_id", payload?.sub)
        .single();
        console.log(userData);

      if (fetchError || !userData) {
        console.error("Error fetching user:", fetchError);
        return null;
      }

      // Check if industry exists before starting transaction
      const { data: industryInsight, error: industryGetError } = await supabase
      .from("IndustryInsight")
      .select("*")
      .eq("industry", updateData.industry)
      .single();

    if(!industryInsight){
        const insights = await generateAIInsights(updateData.industry);
        // Create industry insights if not found
        const { data: newIndustry, error: industryError } = await supabase
          .from("IndustryInsight")
          .insert([
            {
              industry: updateData.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          ])
          .select()
          .single();
  
        if (industryError) throw new Error("Failed to create industry insights");

    }

      // Update user data
      const { data: updatedUser, error: updateError } = await supabase
        .from("user") // Ensure updating the correct table
        .update([updateData]) // Spread updateData for proper update
        .eq("id",userData.id)
        .select()
        .single();
  
      if (updateError) {
        console.error("Error updating user:", updateError);
        return null;
      }
  
      console.log("User updated successfully:", updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Unexpected error in test function:", error);
      return null;
    }
  
}

