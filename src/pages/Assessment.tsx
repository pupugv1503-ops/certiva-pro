import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  ChevronRight, 
  Camera,
  Eye,
  Shield,
  Brain,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

const mockQuestions = [
  {
    id: 1,
    type: "multiple-choice",
    question: "What hook should you use to run side effects in a React functional component?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correctAnswer: 1,
    difficulty: "Easy",
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "Which of the following is NOT a valid way to optimize React performance?",
    options: [
      "Using React.memo() for pure components",
      "Using useCallback() for event handlers",
      "Always using inline arrow functions in JSX",
      "Using useMemo() for expensive calculations"
    ],
    correctAnswer: 2,
    difficulty: "Medium",
  },
  {
    id: 3,
    type: "multiple-choice",
    question: "In TypeScript with React, how do you properly type a component's props?",
    options: [
      "Using JavaScript objects only",
      "Using interface or type definitions",
      "Props don't need typing",
      "Using PropTypes library"
    ],
    correctAnswer: 1,
    difficulty: "Medium",
  },
];

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(180 * 60); // 3 hours in seconds
  const [isProctoring, setIsProctoring] = useState(true);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] ?? null);
    } else {
      setShowResult(true);
    }
  };

  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;
  const question = mockQuestions[currentQuestion];

  if (showResult) {
    const correctAnswers = answers.filter(
      (answer, index) => answer === mockQuestions[index].correctAnswer
    ).length;
    const score = Math.round((correctAnswers / mockQuestions.length) * 100);
    const passed = score >= 70;

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-8 max-w-lg w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
              passed ? "bg-success/20" : "bg-destructive/20"
            }`}
          >
            {passed ? (
              <CheckCircle className="h-12 w-12 text-success" />
            ) : (
              <AlertCircle className="h-12 w-12 text-destructive" />
            )}
          </motion.div>

          <h2 className="text-2xl font-bold mb-2">
            {passed ? "Congratulations!" : "Assessment Complete"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {passed
              ? "You have successfully passed the assessment!"
              : "You didn't pass this time. Keep learning and try again!"}
          </p>

          <div className="text-5xl font-bold gradient-text mb-6">{score}%</div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-muted/30">
              <div className="text-2xl font-bold text-success">{correctAnswers}</div>
              <div className="text-xs text-muted-foreground">Correct</div>
            </div>
            <div className="p-4 rounded-xl bg-muted/30">
              <div className="text-2xl font-bold text-destructive">
                {mockQuestions.length - correctAnswers}
              </div>
              <div className="text-xs text-muted-foreground">Incorrect</div>
            </div>
            <div className="p-4 rounded-xl bg-muted/30">
              <div className="text-2xl font-bold">{mockQuestions.length}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {passed && (
              <Link to="/dashboard">
                <Button variant="gradient" className="w-full">
                  View Certificate
                </Button>
              </Link>
            )}
            <Link to="/certifications">
              <Button variant="outline" className="w-full">
                Back to Certifications
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/certifications">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="font-semibold">Advanced React Development</h1>
                <p className="text-xs text-muted-foreground">AI-Proctored Assessment</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* AI Proctoring indicators */}
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Camera className="h-4 w-4 text-success" />
                  <span className="text-muted-foreground">Camera Active</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Eye className="h-4 w-4 text-success" />
                  <span className="text-muted-foreground">Monitoring</span>
                </div>
              </div>

              {/* Timer */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="pb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">
                Question {currentQuestion + 1} of {mockQuestions.length}
              </span>
              <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Question Card */}
              <div className="glass-card rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant="secondary">{question.difficulty}</Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Brain className="h-4 w-4" />
                    AI Adaptive
                  </div>
                </div>

                <h2 className="text-xl md:text-2xl font-semibold mb-8">
                  {question.question}
                </h2>

                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedAnswer(index)}
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-200 ${
                        selectedAnswer === index
                          ? "border-primary bg-primary/10"
                          : "border-border/50 bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                            selectedAnswer === index
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-muted-foreground/30"
                          }`}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1">{option}</span>
                        {selectedAnswer === index && (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  disabled={currentQuestion === 0}
                  onClick={() => {
                    setCurrentQuestion(currentQuestion - 1);
                    setSelectedAnswer(answers[currentQuestion - 1] ?? null);
                  }}
                >
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {mockQuestions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentQuestion
                          ? "bg-primary"
                          : answers[index] !== undefined
                          ? "bg-success"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="gradient"
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                >
                  {currentQuestion === mockQuestions.length - 1 ? "Submit" : "Next"}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Proctoring notice */}
      <div className="fixed bottom-4 right-4">
        <div className="glass-card rounded-lg px-4 py-2 flex items-center gap-2 text-sm">
          <Shield className="h-4 w-4 text-success" />
          <span className="text-muted-foreground">AI Proctoring Active</span>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
