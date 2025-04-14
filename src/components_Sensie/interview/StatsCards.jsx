import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState,useEffect } from "react";

export default function StatsCards({ assessments }) {
  const [color, setColor] = useState("text-black"); // Default color
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    console.log(assessments)
    if (!assessments?.length) {
      setAverageScore(0);
      setColor("text-green-500"); // Default color for 0
      return;
    }
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    const avgScore = (total / assessments.length).toFixed(1);
    // Set color based on score
    const scoreColor =
      avgScore >= 80 ? "text-green-500" :
      avgScore >= 50 ? "text-yellow-500" :
      "text-red-500";

    setAverageScore(avgScore);
    setColor(scoreColor);
  }, [assessments]); // Runs when assessments change

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  return (
    <div className="grid gap-2 md:grid-cols-3">
      <Card >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${color}`}>{averageScore}%</div>
          <p className="text-xs text-muted-foreground">
            Across all assessments
          </p>
        </CardContent>
      </Card>

      <Card >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Questions Practiced
          </CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getTotalQuestions()}</div>
          <p className="text-xs text-muted-foreground">Total questions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
          </div>
          <p className="text-xs text-muted-foreground">Most recent quiz</p>
        </CardContent>
      </Card>
    </div>
  );
}