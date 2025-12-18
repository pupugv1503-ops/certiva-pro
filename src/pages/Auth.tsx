import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    if (mode === "signup") {
      return name.trim().length > 0 && email.trim().length > 0 && password.length >= 6;
    }
    return email.trim().length > 0 && password.length >= 6;
  }, [mode, name, email, password]);

  const getAuthErrorMessage = (message?: string) => {
    const msg = (message || "").toLowerCase();
    if (!msg) return "Please try again.";
    if (msg.includes("failed to fetch") || msg.includes("networkerror")) {
      return "Backend is not reachable. Start the backend server on http://localhost:5000.";
    }
    if (msg.includes("invalid email or password")) return "Invalid email or password.";
    if (msg.includes("user already exists")) {
      return "An account with this email already exists. Try signing in.";
    }
    return message || "Please try again.";
  };

  const onSubmit = async () => {
    if (!canSubmit || loading) return;

    const apiBase = "http://localhost:5000/api";

    setLoading(true);
    try {
      if (mode === "signin") {
        const res = await fetch(`${apiBase}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), password }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.message || "Invalid email or password.");

        if (data?.token) localStorage.setItem("certiva_token", data.token);
        if (data?.name) localStorage.setItem("certiva_user_name", data.name);

        toast({
          title: "Signed in",
          description: "Welcome back!",
        });
        navigate("/dashboard");
        return;
      }

      // Signup
      const res = await fetch(`${apiBase}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Unable to create account.");

      if (data?.token) localStorage.setItem("certiva_token", data.token);
      if (data?.name) localStorage.setItem("certiva_user_name", data.name);

      toast({
        title: "Account created",
        description: "Your account is ready.",
      });
      navigate("/dashboard");
    } catch (e: any) {
      toast({
        title: "Authentication failed",
        description: getAuthErrorMessage(e?.message),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto glass-card rounded-2xl p-8">
            <h1 className="text-3xl font-bold mb-2">Welcome to Certiva</h1>
            <p className="text-muted-foreground mb-6">Sign in or create an account to continue.</p>

            <Tabs
              value={mode}
              onValueChange={(v) => setMode(v as "signin" | "signup")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="mt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      autoComplete="current-password"
                      onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                    />
                  </div>

                  <Button
                    variant="gradient"
                    className="w-full"
                    onClick={onSubmit}
                    disabled={!canSubmit || loading}
                  >
                    {loading ? "Please wait..." : "Sign In"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="mt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-signup">Full Name</Label>
                    <Input
                      id="name-signup"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      autoComplete="name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input
                      id="email-signup"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input
                      id="password-signup"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      autoComplete="new-password"
                      onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                    />
                  </div>

                  <Button
                    variant="gradient"
                    className="w-full"
                    onClick={onSubmit}
                    disabled={!canSubmit || loading}
                  >
                    {loading ? "Please wait..." : "Create Account"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;
