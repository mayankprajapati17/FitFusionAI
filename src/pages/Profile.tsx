
import React, { useState, useEffect } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Edit2, Save } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Navbar from '@/components/Navbar';

// Define the form schema with Zod
const profileSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num > 0 && num < 120;
  }, { message: "Age must be a number between 1-120" }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  fitnessGoal: z.enum(["weight-loss", "muscle-gain", "endurance", "general"], {
    required_error: "Please select a fitness goal",
  }),
  contactNumber: z.string().min(10, { message: "Please enter a valid contact number" }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileFormValues | null>(null);

  // Initialize the form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      age: "",
      gender: "male",
      fitnessGoal: "general",
      contactNumber: "",
    },
  });

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfileData(parsedProfile);
        form.reset(parsedProfile);
      } catch (error) {
        console.error("Error parsing profile data:", error);
      }
    } else {
      setIsEditing(true); // If no profile exists, go straight to edit mode
    }
  }, [form]);

  const onSubmit = (data: ProfileFormValues) => {
    // Save to localStorage
    localStorage.setItem("userProfile", JSON.stringify(data));
    setProfileData(data);
    setIsEditing(false);
    
    toast({
      title: "Profile saved",
      description: "Your profile information has been updated.",
    });
  };

  // Map fitness goal value to display text
  const getFitnessGoalText = (goal: string) => {
    switch (goal) {
      case "weight-loss": return "Weight Loss";
      case "muscle-gain": return "Muscle Gain";
      case "endurance": return "Endurance";
      case "general": return "General Fitness";
      default: return goal;
    }
  };

  // Map gender value to display text
  const getGenderText = (gender: string) => {
    switch (gender) {
      case "male": return "Male";
      case "female": return "Female";
      case "other": return "Other";
      default: return gender;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onAddWorkoutClick={() => {}} />
      
      <div className="fitness-container py-8">
        <h1 className="text-3xl font-bold mb-6 fade-up">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {isEditing ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-fitness-600" />
                    Edit Profile
                  </CardTitle>
                  <CardDescription>
                    Customize your fitness profile details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Gender</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex space-x-4"
                                >
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="male" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Male
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="female" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Female
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="other" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Other
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="fitnessGoal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fitness Goal</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a fitness goal" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="weight-loss">Weight Loss</SelectItem>
                                <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                                <SelectItem value="endurance">Endurance</SelectItem>
                                <SelectItem value="general">General Fitness</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contactNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+1 234 567 8900" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full">
                        <Save className="mr-2 h-4 w-4" />
                        Save Profile
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-2xl font-bold">Profile Information</CardTitle>
                    <CardDescription>Your saved fitness profile</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </CardHeader>
                <CardContent className="pt-6">
                  {profileData && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                        <p className="text-lg font-medium">{profileData.fullName}</p>
                      </div>
                      <Separator />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Age</h3>
                          <p className="text-lg font-medium">{profileData.age}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Gender</h3>
                          <p className="text-lg font-medium">{getGenderText(profileData.gender)}</p>
                        </div>
                      </div>
                      <Separator />
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Fitness Goal</h3>
                        <p className="text-lg font-medium">{getFitnessGoalText(profileData.fitnessGoal)}</p>
                      </div>
                      <Separator />
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Contact Number</h3>
                        <p className="text-lg font-medium">{profileData.contactNumber}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="md:col-span-1">
            <Card className="bg-accent">
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
                <CardDescription>Your fitness profile at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                {profileData ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-fitness-600" />
                      <span className="text-sm font-medium">{profileData.fullName}</span>
                    </div>
                    <div className="text-sm">
                      <p>Goal: {getFitnessGoalText(profileData.fitnessGoal)}</p>
                      <p className="mt-1 text-muted-foreground">Profile complete</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>No profile information yet.</p>
                    <p>Complete your profile to see a summary.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
