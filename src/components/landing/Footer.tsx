import { Link } from "react-router-dom";
import { Award, Github, Twitter, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  Platform: [
    { name: "Certifications", href: "/certifications" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Verify", href: "/verify" },
    { name: "For Recruiters", href: "/recruiters" },
  ],
  Company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#" },
  ],
  Resources: [
    { name: "Documentation", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "API", href: "#" },
    { name: "Status", href: "#" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { name: "GitHub", icon: Github, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Email", icon: Mail, href: "#" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-muted/5">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                <Award className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">SkillCert</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              The AI-powered certification platform that helps you prove real-world skills 
              and earn credentials employers trust.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SkillCert. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with AI-powered precision 🚀
          </p>
        </div>
      </div>
    </footer>
  );
};
