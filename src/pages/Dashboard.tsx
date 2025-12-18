import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Award, 
  TrendingUp, 
  Clock, 
  Target,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Play,
  BarChart3,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const userStats = {
  totalCertifications: 8,
  inProgress: 3,
  skillScore: 847,
  streak: 12,
};

const recentCertifications = [
  {
    id: 1,
    title: "Advanced React Development",
    status: "completed",
    date: "Dec 10, 2024",
    score: 92,
    badge: "https://api.dicebear.com/7.x/shapes/svg?seed=react",
  },
  {
    id: 2,
    title: "Python for Data Science",
    status: "completed",
    date: "Nov 28, 2024",
    score: 88,
    badge: "https://api.dicebear.com/7.x/shapes/svg?seed=python",
  },
  {
    id: 3,
    title: "AWS Cloud Practitioner",
    status: "in-progress",
    progress: 65,
    badge: "https://api.dicebear.com/7.x/shapes/svg?seed=aws",
  },
];

const skillBreakdown = [
  { name: "Frontend Development", level: 92, color: "from-blue-500 to-cyan-500" },
  { name: "Backend Development", level: 78, color: "from-green-500 to-emerald-500" },
  { name: "Data Analysis", level: 85, color: "from-purple-500 to-pink-500" },
  { name: "Cloud Services", level: 65, color: "from-orange-500 to-amber-500" },
  { name: "DevOps", level: 58, color: "from-red-500 to-rose-500" },
];

const recommendedCerts = [
  { id: 1, title: "Node.js Backend Development", match: 94 },
  { id: 2, title: "Docker & Kubernetes", match: 89 },
  { id: 3, title: "GraphQL API Design", match: 85 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, <span className="gradient-text">Alex</span>
            </h1>
            <p className="text-muted-foreground">
              Track your progress and continue building your skills.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: "Certifications", value: userStats.totalCertifications, icon: Award, color: "text-primary" },
              { label: "In Progress", value: userStats.inProgress, icon: BookOpen, color: "text-secondary" },
              { label: "Skill Score", value: userStats.skillScore, icon: TrendingUp, color: "text-accent" },
              { label: "Day Streak", value: `${userStats.streak}🔥`, icon: Calendar, color: "text-warning" },
            ].map((stat, index) => (
              <div key={stat.label} className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors">
                <stat.icon className={`h-6 w-6 ${stat.color} mb-3`} />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentCertifications.map((cert) => (
                    <div key={cert.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <img src={cert.badge} alt="" className="w-12 h-12 rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{cert.title}</h3>
                        {cert.status === "completed" ? (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Completed on {cert.date} • Score: {cert.score}%
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <Progress value={cert.progress} className="h-2 flex-1" />
                            <span className="text-sm text-muted-foreground">{cert.progress}%</span>
                          </div>
                        )}
                      </div>
                      {cert.status === "in-progress" && (
                        <Button variant="gradient" size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Continue
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Skill Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Skill Breakdown</h2>
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="space-y-5">
                  {skillBreakdown.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* AI Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Target className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Recommended for You</h2>
                </div>

                <div className="space-y-4">
                  {recommendedCerts.map((cert, index) => (
                    <Link key={cert.id} to={`/assessment/${cert.id}`}>
                      <div className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                            {cert.title}
                          </h3>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                              style={{ width: `${cert.match}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{cert.match}% match</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link to="/certifications">
                  <Button variant="outline" className="w-full mt-4">
                    Browse All Certifications
                  </Button>
                </Link>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glass-card rounded-2xl p-6"
              >
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button variant="gradient" className="w-full justify-start">
                    <Play className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Button>
                  <Link to="/verify" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Award className="h-4 w-4 mr-2" />
                      Share Certificate
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    View Learning History
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
