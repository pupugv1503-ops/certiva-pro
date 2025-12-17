import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Star, 
  ArrowRight,
  Code,
  Database,
  Cloud,
  Brain,
  Shield,
  Palette
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { id: "all", name: "All", icon: null },
  { id: "programming", name: "Programming", icon: Code },
  { id: "data", name: "Data Science", icon: Database },
  { id: "cloud", name: "Cloud", icon: Cloud },
  { id: "ai", name: "AI/ML", icon: Brain },
  { id: "security", name: "Security", icon: Shield },
  { id: "design", name: "Design", icon: Palette },
];

const certifications = [
  {
    id: 1,
    title: "Advanced React Development",
    category: "programming",
    level: "Advanced",
    duration: "3 hours",
    enrolled: 12500,
    rating: 4.9,
    skills: ["React", "TypeScript", "Redux", "Testing"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Python for Data Science",
    category: "data",
    level: "Intermediate",
    duration: "4 hours",
    enrolled: 18200,
    rating: 4.8,
    skills: ["Python", "Pandas", "NumPy", "Visualization"],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    title: "AWS Cloud Practitioner",
    category: "cloud",
    level: "Beginner",
    duration: "2.5 hours",
    enrolled: 25000,
    rating: 4.7,
    skills: ["AWS", "EC2", "S3", "IAM"],
    gradient: "from-orange-500 to-amber-500",
  },
  {
    id: 4,
    title: "Machine Learning Engineer",
    category: "ai",
    level: "Advanced",
    duration: "5 hours",
    enrolled: 8900,
    rating: 4.9,
    skills: ["TensorFlow", "PyTorch", "NLP", "Computer Vision"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 5,
    title: "Cybersecurity Fundamentals",
    category: "security",
    level: "Beginner",
    duration: "3 hours",
    enrolled: 15600,
    rating: 4.6,
    skills: ["Network Security", "Encryption", "Penetration Testing"],
    gradient: "from-red-500 to-rose-500",
  },
  {
    id: 6,
    title: "UI/UX Design Professional",
    category: "design",
    level: "Intermediate",
    duration: "3.5 hours",
    enrolled: 11200,
    rating: 4.8,
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    gradient: "from-violet-500 to-purple-500",
  },
];

const Certifications = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCertifications = certifications.filter((cert) => {
    const matchesCategory = selectedCategory === "all" || cert.category === selectedCategory;
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore <span className="gradient-text">Certifications</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose from 200+ industry-aligned certifications and prove your skills with AI-powered assessments.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search certifications or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-muted/50 border-border/50"
              />
            </div>
            <Button variant="outline" className="h-12 gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </Button>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "gradient" : "glass"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="gap-2"
              >
                {category.icon && <category.icon className="h-4 w-4" />}
                {category.name}
              </Button>
            ))}
          </motion.div>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/assessment/${cert.id}`}>
                  <div className="glass-card rounded-2xl overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    {/* Gradient header */}
                    <div className={`h-2 bg-gradient-to-r ${cert.gradient}`} />
                    
                    <div className="p-6">
                      {/* Level badge */}
                      <Badge variant="secondary" className="mb-4">
                        {cert.level}
                      </Badge>

                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {cert.title}
                      </h3>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cert.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {cert.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{cert.skills.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {cert.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {cert.enrolled.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-warning text-warning" />
                          {cert.rating}
                        </div>
                      </div>

                      {/* CTA */}
                      <Button variant="gradient" className="w-full group/btn">
                        Start Assessment
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Certifications;
