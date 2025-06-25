import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-background text-foreground">

      <div className="w-full max-w-sm flex flex-col gap-6 items-center">
        
        <form>
          <Tabs defaultValue="signup">
            <TabsList>
              <TabsTrigger value="signup">Signup</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <Card>
                <CardHeader className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl sm:text-2xl font-light">
                      Create Your Account
                    </CardTitle>
                    <IoIosContact className="w-7 h-7 text-primary" />
                  </div>
                  <CardDescription className="text-sm sm:text-base text-muted-foreground">
                    Sign up to unlock all features. It only takes a moment to
                    get started.
                  </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="signup-name">Full Name</Label>

                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="e.g. Kartikey Bhatnagar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="signup-email">Email Address</Label>

                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="e.g. you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="signup-password">Password</Label>

                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="text-right text-sm">
                    <p
                      onClick={() => navigate("/reset-password")}
                      className="text-primary hover:underline"
                    >
                      Forgot password?
                    </p>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full">Create Account</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login to Your Account</CardTitle>
                  <CardDescription>
                    Enter your credentials to continue.
                  </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="login-identifier">Email</Label>

                    <Input
                      id="login-identifier"
                      type="text"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="login-password">Password</Label>

                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <div className="text-right text-sm">
                    <a href="#" className="text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full">Login</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </div>
  );
};

export default Auth;
