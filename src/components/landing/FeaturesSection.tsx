import { motion } from "framer-motion";
import { 
  Brain, 
  Shield, 
  Zap, 
  Target, 
  BarChart3, 
  Globe,
  CheckCircle,
  Cpu
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Assessment",
    description: "Our advanced AI evaluates your practical skills through coding challenges, case studies, and real-world scenarios.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Shield,
    title: "Verified Credentials",
    description: "Every certificate includes a unique ID and QR code for instant verification by employers.",
    gradient: "from-secondary to-accent",
  },
  {
    icon: Target,
    title: "Adaptive Testing",
    description: "Questions adapt to your skill level in real-time, providing accurate assessment across all proficiency levels.",
    gradient: "from-accent to-primary",
  },
  {
    icon: BarChart3,
    title: "Skill Analytics",
    description: "Detailed breakdown of your strengths and areas for improvement with personalized learning paths.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Globe,
    title: "Industry Recognized",
    description: "Certifications aligned with industry standards and recognized by 500+ partner companies worldwide.",
    gradient: "from-secondary to-primary",
  },
  {
    icon: Cpu,
    title: "AI Proctoring",
    description: "Secure exam environment with AI-powered monitoring to ensure credential integrity.",
    gradient: "from-accent to-secondary",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const FeaturesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Why Choose SkillCert
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Certification That{" "}
            <span className="gradient-text">Actually Matters</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Built for the modern workforce, our platform uses cutting-edge AI to evaluate 
            real-world skills and provide credentials that employers trust.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="glass-card rounded-2xl p-8 h-full hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6`}>
                  <div className="w-full h-full bg-card rounded-[10px] flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
