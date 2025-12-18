import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Users, 
  Shield, 
  TrendingUp,
  Award,
  CheckCircle,
  Star,
  MapPin,
  Briefcase,
  ArrowRight
} from "lucide-react";

const candidates = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    certifications: 5,
    topSkills: ["React", "TypeScript", "Next.js"],
    matchScore: 96,
    verified: true,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Full Stack Engineer",
    location: "Austin, TX",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    certifications: 4,
    topSkills: ["Node.js", "Python", "AWS"],
    matchScore: 92,
    verified: true,
  },
  {
    id: 3,
    name: "Emily Watson",
    title: "Data Scientist",
    location: "New York, NY",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    certifications: 6,
    topSkills: ["Python", "TensorFlow", "SQL"],
    matchScore: 89,
    verified: true,
  },
  {
    id: 4,
    name: "David Kim",
    title: "DevOps Engineer",
    location: "Seattle, WA",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    certifications: 3,
    topSkills: ["Docker", "Kubernetes", "CI/CD"],
    matchScore: 87,
    verified: true,
  },
];

const stats = [
  { label: "Verified Candidates", value: "50K+", icon: Users },
  { label: "Skill Certifications", value: "200+", icon: Award },
  { label: "Hiring Partners", value: "500+", icon: Briefcase },
  { label: "Avg. Match Accuracy", value: "94%", icon: TrendingUp },
];

const Recruiters = () => {
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
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-secondary/20 mb-6">
              <Users className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">For Recruiters</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find <span className="gradient-text-secondary">Verified Talent</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Search candidates by their verified skills and certifications. 
              No more guessing—every skill is AI-assessed and verified.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card rounded-xl p-6 text-center">
                <stat.icon className="h-6 w-6 text-secondary mx-auto mb-3" />
                <div className="text-2xl font-bold gradient-text-secondary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by skills, certifications, or job title..."
                  className="pl-10 h-12 bg-muted/50 border-border/50"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Location"
                  className="pl-10 h-12 bg-muted/50 border-border/50 md:w-48"
                />
              </div>
              <Button variant="gradient" className="h-12 px-8">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {["React", "Python", "AWS", "Machine Learning", "DevOps"].map((skill) => (
                <Badge key={skill} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Candidates Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {candidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="glass-card rounded-2xl p-6 hover:border-secondary/30 transition-all duration-300 group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      {candidate.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-success flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-success-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold group-hover:text-secondary transition-colors">
                          {candidate.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{candidate.title}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4" />
                        {candidate.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold gradient-text-secondary">
                        {candidate.matchScore}%
                      </div>
                      <div className="text-xs text-muted-foreground">Match</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-secondary" />
                      <span>{candidate.certifications} Certifications</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {candidate.topSkills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="gradient" className="flex-1 group/btn">
                      View Profile
                      <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-3">Ready to Find Top Talent?</h3>
              <p className="text-muted-foreground mb-6">
                Get access to our full candidate database with advanced filtering and AI-powered matching.
              </p>
              <Button variant="hero" size="lg">
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Recruiters;
