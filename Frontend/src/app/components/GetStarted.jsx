import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Leaf, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast"; // Assuming you have a custom toast hook

const GetStarted = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      farmSize: "",
      message: "",
    },
  });

  // Basic validation check without using external libraries
  const validateForm = (values) => {
    let errors = {};
    if (!values.name || values.name.length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }
    if (!values.email || !/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    return errors;
  };

  const onSubmit = (values) => {
    const errors = validateForm(values);
    if (Object.keys(errors).length > 0) {
      return; // Stop form submission if there are errors
    }

    console.log(values);
    toast({
      title: "Form submitted",
      description: "Thank you! We'll be in touch soon.",
    });

    reset(); // Reset form values after successful submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-plant-50 to-white">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="h-6 w-6 text-plant-500" />
            <span className="text-xl font-semibold text-plant-800">PlantGuard AI</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-plant-900 mb-6">
            Get Started with PlantGuard AI
          </h1>

          <p className="text-lg text-plant-800/80 mb-12 max-w-2xl">
            Fill out the form below to get started with PlantGuard AI. Our team will contact you shortly to help set up your plant disease detection system.
          </p>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-plant-800">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      {errors.name && <FormMessage>{errors.name}</FormMessage>}
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-plant-800">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      {errors.email && <FormMessage>{errors.email}</FormMessage>}
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="farmSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-plant-800">Farm or Garden Size (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 5 acres, home garden, etc." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-plant-800">Additional Information (optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us more about your needs..." className="min-h-[120px]" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button type="submit" className="bg-plant-500 hover:bg-plant-600 text-white p-6 text-lg rounded-lg w-full md:w-auto">
                  Submit Request <ChevronRight className="ml-2" />
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-plant-600">
              Already have an account? <a href="#" className="text-plant-700 font-medium">Login here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
