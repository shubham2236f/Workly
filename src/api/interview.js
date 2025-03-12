import supabaseClient from "@/utils/supabase";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export  async function generateQuiz(token,user_id) {
    const supabase = await supabaseClient(token);
    console.log(user_id)

    // fetch industryinsight data
    const { data: user, error: fetchError } = await supabase
      .from("user") // Ensure correct table name
      .select("*")
      .eq("user_id",user_id?.user_id)
      .single();
      console.log(user);

    if (fetchError || !user) {
      console.error("Error fetching userindustry:", fetchError);
      return null;
    }
    const prompt = `
    Generate 10 technical interview questions for a ${
      user.industry
    } professional${
    user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
  }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const quiz = JSON.parse(cleanedText);
    console.log(quiz);  

    return quiz.questions;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz questions");
  }

}

//save quiz result api
export async function saveQuizResult(token,_,questions, answers, score){
  const supabase = await supabaseClient(token);
  console.log("entered...,");
  console.log(questions);
  console.log(answers);
  console.log(score);
  
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

      // fetch industryinsight data
  const { data: user, error: fetchError } = await supabase
    .from("user") // Ensure correct table name
    .select("*")
    .eq("user_id",payload?.sub)
    .single();
    console.log(user);

  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));
    console.log(questionResults);
    
    // Get wrong answers
    const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

     // Only generate improvement tips if there are wrong answers
  let improvementTip = null;
  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n");

    const improvementPrompt = `
      The user got the following ${user.industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;
    try {
      const tipResult = await model.generateContent(improvementPrompt);

      improvementTip = tipResult.response.text().trim();
      console.log(improvementTip);
    } catch (error) {
      console.error("Error generating improvement tip:", error);
      // Continue without improvement tip if generation fails
    }
  }

  try {
    const { data: assessment, error: assessmentError } = await supabase
        .from("Assessment")
        .insert(
          {
            user_id: payload?.sub,
            quizScore: score,
            questions: questionResults,
            category: user?.industry,
            improvmentTips:improvementTip,
          },
        )
        .select()
        .single();
        if (assessmentError) {
          console.error("Error saving quiz data:", assessmentError);
          return null;
        }
    return assessment;
  } catch (error) {
    console.log("Error saving quiz result:", error);
    throw new Error("Failed to save quiz result");
  }
} 

//get quiz result
export async function getAssessments(token) {
  if (!token) {
    console.log("token error")
  }
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
    const { data: assessments, error: assessmentError } = await supabase
        .from("Assessment")
        .select("*")
        .eq("user_id",payload?.sub)
        .order("id", { ascending: true }); // Sorting in ascending order
        if (assessmentError) {
          console.error("Error saving quiz data:", assessmentError);
          return null;
        }

    return assessments;
  } catch (error) {
    console.error("Error fetching assessments:", error);
    throw new Error("Failed to fetch assessments");
  }
}