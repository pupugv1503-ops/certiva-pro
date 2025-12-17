import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Shield, 
  CheckCircle, 
  Award, 
  Calendar,
  User,
  QrCode,
  ExternalLink,
  Download
} from "lucide-react";

const mockCertificate = {
  id: "SC-2024-REACT-89472",
  holder: "Alex Johnson",
  title: "Advanced React Development",
  issueDate: "December 10, 2024",
  expiryDate: "December 10, 2027",
  score: 92,
  skills: ["React 18", "TypeScript", "Redux Toolkit", "React Testing Library", "Performance Optimization"],
  status: "valid",
};

const Verify = () => {
  const [certificateId, setCertificateId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<typeof mockCertificate | null>(null);
  const [searched, setSearched] = useState(false);

  const handleVerify = async () => {
    if (!certificateId.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock: Show result for any input
    setResult(mockCertificate);
    setSearched(true);
    setIsSearching(false);
  };

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 mb-6">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Verified & Trusted</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Verify <span className="gradient-text">Certificate</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Enter a certificate ID or scan a QR code to verify the authenticity of any SkillCert credential.
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="glass-card rounded-2xl p-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Enter Certificate ID (e.g., SC-2024-REACT-89472)"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                    className="pl-12 h-14 bg-muted/50 border-border/50 text-lg"
                  />
                </div>
                <Button 
                  variant="gradient" 
                  size="lg" 
                  className="h-14 px-8"
                  onClick={handleVerify}
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Search className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      Verify
                    </>
                  )}
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
                <span>or</span>
                <Button variant="ghost" size="sm" className="gap-2">
                  <QrCode className="h-4 w-4" />
                  Scan QR Code
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          {searched && result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <div className="glass-card rounded-2xl overflow-hidden">
                {/* Status Header */}
                <div className="bg-gradient-to-r from-success/20 to-success/10 px-8 py-6 border-b border-success/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-success">Certificate Verified</h2>
                      <p className="text-sm text-muted-foreground">This certificate is valid and authentic</p>
                    </div>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="p-8">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Award className="h-12 w-12 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <Badge variant="secondary" className="mb-2">Advanced Level</Badge>
                      <h3 className="text-2xl font-bold mb-2">{result.title}</h3>
                      <p className="text-muted-foreground">Certificate ID: {result.id}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="text-sm text-muted-foreground">Certificate Holder</div>
                          <div className="font-medium">{result.holder}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="text-sm text-muted-foreground">Issue Date</div>
                          <div className="font-medium">{result.issueDate}</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="text-sm text-muted-foreground">Assessment Score</div>
                          <div className="font-medium">{result.score}%</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="text-sm text-muted-foreground">Valid Until</div>
                          <div className="font-medium">{result.expiryDate}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-8">
                    <h4 className="text-sm text-muted-foreground mb-3">Verified Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="px-3 py-1">
                          <CheckCircle className="h-3 w-3 mr-1.5 text-success" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="gradient" className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Full Certificate
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Info Section */}
          {!searched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Shield,
                    title: "Blockchain Secured",
                    description: "Every certificate is cryptographically signed and tamper-proof.",
                  },
                  {
                    icon: QrCode,
                    title: "Instant Verification",
                    description: "Scan QR codes for immediate authentication of credentials.",
                  },
                  {
                    icon: Award,
                    title: "Skill Transparency",
                    description: "View detailed skill breakdowns and proficiency levels.",
                  },
                ].map((item, index) => (
                  <div key={item.title} className="glass-card rounded-xl p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Verify;
