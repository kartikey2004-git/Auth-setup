import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoIosContact } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { toast } from "sonner";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Auth = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsloggedIn, getUserData } = useContext(AppContext);

  const [form, setForm] = useState({
    login: { email: "", password: "" },
    register: { name: "", email: "", password: "" },
  });

  const [loading, setLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const handleChange = (tab, field, value) => {
    setForm((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (tab) => {
    const { name, email, password } = form[tab];

    if (!email || !password || (tab === "register" && !name)) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        tab === "register" ? "/api/auth/register" : "/api/auth/login";

      const payload =
        tab === "register" ? { name, email, password } : { email, password };

      const response = await axios.post(`${backendUrl}${endpoint}`, payload, {
        withCredentials: true,
      });

      const data = response?.data;

      if (data?.success) {
        toast.success(data.message || "Success!");
        setIsloggedIn(true);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message || "Authentication failed");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(msg);
      console.error("Auth Error:", msg, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-background text-foreground">
      <div className="w-full max-w-sm">
        <Tabs defaultValue="signup" className="w-full mt-8">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="signup">Signup</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-light">
                  Login to Your Account
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-muted-foreground">
                  Enter your credentials to continue.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.login.email}
                    onChange={(e) =>
                      handleChange("login", "email", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label
                    htmlFor="login-password"
                    className="flex items-center gap-2"
                  >
                    <RiLockPasswordLine className="w-5 h-5" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={form.login.password}
                      onChange={(e) =>
                        handleChange("login", "password", e.target.value)
                      }
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((prev) => !prev)}
                      className="absolute right-3 inset-y-0 my-auto text-muted-foreground focus:outline-none"
                    >
                      {showLoginPassword ? (
                        <FiEyeOff className="w-5 h-5" />
                      ) : (
                        <FiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-right text-sm">
                  <p
                    onClick={() => navigate("/reset-password")}
                    className="text-primary hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </p>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleSubmit("login")}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-light">
                  Create Your Account
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-muted-foreground">
                  Sign up to unlock all features.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="register-name">
                    <IoIosContact className="w-5 h-5" />
                    Full Name
                  </Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="e.g. Kartikey Bhatnagar"
                    value={form.register.name}
                    onChange={(e) =>
                      handleChange("register", "name", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="register-email">
                    <MdEmail className="w-5 h-5" />
                    Email Address
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="e.g. you@example.com"
                    value={form.register.email}
                    onChange={(e) =>
                      handleChange("register", "email", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label
                    htmlFor="register-password"
                    className="flex items-center gap-2"
                  >
                    <RiLockPasswordLine className="w-5 h-5" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={form.register.password}
                      onChange={(e) =>
                        handleChange("register", "password", e.target.value)
                      }
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword((prev) => !prev)}
                      className="absolute right-3 inset-y-0 my-auto text-muted-foreground focus:outline-none"
                    >
                      {showSignupPassword ? (
                        <FiEyeOff className="w-5 h-5" />
                      ) : (
                        <FiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-right text-sm">
                  <p
                    onClick={() => navigate("/reset-password")}
                    className="text-primary hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </p>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleSubmit("register")}
                  disabled={
                    loading ||
                    !form.register.name.trim() ||
                    !form.register.email.trim() ||
                    !form.register.password.trim()
                  }
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
