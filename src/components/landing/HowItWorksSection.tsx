import { motion } from "framer-motion";
import { UserPlus, BookOpen, Brain, Award } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up in seconds and build your professional profile with your skills and experience.",
    number: "01",
  },
  {
    icon: BookOpen,
    title: "Choose Certification",
    description: "Browse our catalog of industry-aligned certifications and select ones that match your goals.",
    number: "02",
  },
  {
    icon: Brain,
    title: "AI Assessment",
    description: "Complete adaptive assessments including coding challenges, case studies, and practical tasks.",
    number: "03",
  },
  {
    icon: Award,
    title: "Earn Certificate",
    description: "Pass the assessment and receive your verifiable digital certificate instantly.",
    number: "04",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-muted/5">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-secondary/10 text-secondary mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            How It <span className="gradient-text-secondary">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Get certified in four simple steps. Our streamlined process makes it 
            easy to prove your skills and advance your career.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="glass-card rounded-2xl p-8 h-full text-center group hover:border-secondary/30 transition-all duration-300">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-bold">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-10 w-10 text-secondary" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 text-muted-foreground/30">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
