import Navbar from '@/components/Navbar';
import {
  Form, FormControl, FormField, FormItem, FormMessage
} from "@/components/ui/form";
import {
  RadioGroup, RadioGroupItem
} from "@/components/ui/radio-group";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button as KendoButton
} from '@progress/kendo-react-buttons';
import {
  Input as KendoInput
} from '@progress/kendo-react-inputs';
import { FloatingLabel } from '@progress/kendo-react-labels';
import {
  Card as KendoCard
} from '@progress/kendo-react-layout';

import { Edit2, Save, User } from "lucide-react";
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";


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
      setIsEditing(true);
    }
  }, [form]);

  const onSubmit = (data: ProfileFormValues) => {
    localStorage.setItem("userProfile", JSON.stringify(data));
    setProfileData(data);
    setIsEditing(false);

    toast({
      title: "Profile saved",
      description: "Your profile information has been updated.",
    });
  };

  const getFitnessGoalText = (goal: string) => {
    switch (goal) {
      case "weight-loss": return "Weight Loss";
      case "muscle-gain": return "Muscle Gain";
      case "endurance": return "Endurance";
      case "general": return "General Fitness";
      default: return goal;
    }
  };

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
      <Navbar onAddWorkoutClick={() => { }} />

      <div className="fitness-container py-8 px-4 md:px-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 animate-fade-up">Your Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LEFT SECTION */}
          <div className="md:col-span-2 space-y-6">
            {isEditing ? (
              <KendoCard
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
                  backgroundColor: '#ffffff'
                }}
              >
                <div className="mb-6">
                  <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
                    <User className="h-5 w-5 text-blue-500" />
                    Edit Profile
                  </h2>
                  <p className="text-sm text-gray-500">Customize your fitness profile details</p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Full Name */}
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FloatingLabel
                              label="Full Name"
                              editorId="fullName"
                              editorValue={field.value}
                            >
                              <KendoInput
                                value={field.value}
                                onChange={(e) => field.onChange(e.value)}
                                placeholder="John Doe"
                              />
                            </FloatingLabel>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Age */}
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <FloatingLabel
                                label="Age"
                                editorId="age"
                                editorValue={field.value}
                              >
                                <KendoInput
                                  value={field.value}
                                  onChange={(e) => field.onChange(e.value)}
                                  type="number"
                                />
                              </FloatingLabel>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Gender */}
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-4"
                              >
                                {["male", "female", "other"].map((option) => (
                                  <FormItem key={option} className="flex items-center space-x-2">
                                    <FormControl>
                                      <RadioGroupItem value={option} />
                                    </FormControl>
                                    <label className="text-sm font-medium capitalize text-gray-700">{option}</label>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Fitness Goal */}
                    <FormField
                      control={form.control}
                      name="fitnessGoal"
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="hover:border-blue-400 transition">
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

                    {/* Contact Number */}
                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FloatingLabel
                              label="Contact Number"
                              editorId="contactNumber"
                              editorValue={field.value}
                            >
                              <KendoInput
                                value={field.value}
                                onChange={(e) => field.onChange(e.value)}
                                placeholder="+1 234 567 8900"
                                type="tel"
                              />
                            </FloatingLabel>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Save Button */}
                    <KendoButton
                      type="submit"
                      themeColor="primary"
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                        fontWeight: '600',
                        transition: 'all 0.3s',
                      }}
                      className="hover:scale-105"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Profile
                    </KendoButton>
                  </form>
                </Form>
              </KendoCard>
            ) : (
              <KendoCard
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
                  backgroundColor: '#ffffff'
                }}
              >
                <div className="flex flex-row items-center justify-between pb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">Profile Information</h2>
                    <p className="text-sm text-gray-500">Your saved fitness profile</p>
                  </div>
                  <KendoButton
                    onClick={() => setIsEditing(true)}
                    themeColor="primary"
                    className="hover:scale-105"
                  >
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit
                  </KendoButton>
                </div>

                <div className="pt-4 space-y-4 text-gray-700">
                  {profileData && (
                    <>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                        <p className="text-lg font-semibold">{profileData.fullName}</p>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Age</h3>
                          <p className="text-lg font-semibold">{profileData.age}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                          <p className="text-lg font-semibold">{getGenderText(profileData.gender)}</p>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Fitness Goal</h3>
                        <p className="text-lg font-semibold">{getFitnessGoalText(profileData.fitnessGoal)}</p>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Contact Number</h3>
                        <p className="text-lg font-semibold">{profileData.contactNumber}</p>
                      </div>
                    </>
                  )}
                </div>
              </KendoCard>
            )}
          </div>

          {/* RIGHT SECTION */}                                                                                             
          <div className="md:col-span-1">
            <KendoCard
              style={{
                padding: '24px',
                backgroundColor: '#f1f5f9',
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
              }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Profile Summary</h2>
                <p className="text-sm text-gray-500">Your fitness profile at a glance</p>
              </div>

              {profileData ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">{profileData.fullName}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Goal: <strong>{getFitnessGoalText(profileData.fitnessGoal)}</strong></p>
                    <p className="mt-1 text-green-600 font-medium">Profile complete</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No profile information yet.</p>
                  <p className="mt-1">Complete your profile to see a summary.</p>
                </div>
              )}
            </KendoCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
