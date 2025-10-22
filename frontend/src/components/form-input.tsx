"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React, { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle, Info } from "lucide-react";

const formSchema = z.object({
  Gender: z.enum(["male", "female"]),
  Age: z.coerce.number() as z.ZodNumber,
  Weight: z.coerce.number() as z.ZodNumber,
  Height: z.coerce.number() as z.ZodNumber,
  Glucose: z.coerce.number() as z.ZodNumber,
  BloodPressure: z.coerce.number() as z.ZodNumber,
  SkinThickness: z.coerce.number() as z.ZodNumber,
  Insulin: z.coerce.number() as z.ZodNumber,
  Pregnancies: (z.coerce.number() as z.ZodNumber).optional(),
  FamilyParents: z.enum(["0", "1", "2"]),
  FamilySiblings: z.enum(["0", "1", "2", "3", "4"]),
  FamilyGrandparents: z.enum(["0", "1", "2", "3", "4"]),
});

type PredictionResult = {
  status: string;
  prediction: number;
  message: string;
};

export default function FormInput() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Gender: undefined,
      Pregnancies: 0,
      Glucose: 0,
      Weight: 0,
      Height: 0,
      BloodPressure: 0,
      SkinThickness: 0,
      Insulin: 0,
      Age: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const payload = {
        Pregnancies: Number(values.Pregnancies),
        Gender: values.Gender,
        Weight: Number(values.Weight),
        Height: Number(values.Height),
        Glucose: Number(values.Glucose),
        BloodPressure: Number(values.BloodPressure),
        SkinThickness: Number(values.SkinThickness),
        Insulin: Number(values.Insulin),
        Age: Number(values.Age),
        FamilyParents: Number(values.FamilyParents ?? 0),
        FamilySiblings: Number(values.FamilySiblings ?? 0),
        FamilyGrandparents: Number(values.FamilyGrandparents ?? 0),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/diabetes_prediction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Prediction Error:", err);
      setError(
        "Unable to process your request. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const handleReset = () => {
    form.reset();
    setResult(null);
    setError(null);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="basic-info">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                1
              </div>
              <h2 className="font-bold text-lg md:text-2xl text-gray-900">
                Basic Information
              </h2>
            </div>
            <hr className="mb-6 border-gray-200" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="Age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Age (Years)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 45"
                        className="border-gray-300 focus:border-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Gender
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full border-gray-300 focus:border-blue-500">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("Gender") === "female" && (
                <FormField
                  control={form.control}
                  name="Pregnancies"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="font-semibold text-gray-700">
                        Number of Pregnancies
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 2"
                          className="border-gray-300 focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          <div className="physical-measurements">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                2
              </div>
              <h2 className="font-bold text-lg md:text-2xl text-gray-900">
                Physical Measurements
              </h2>
            </div>
            <hr className="mb-6 border-gray-200" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="Weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Weight (kg)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 70.5"
                        className="border-gray-300 focus:border-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Height (m)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="e.g., 1.75"
                        className="border-gray-300 focus:border-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="SkinThickness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Skin Thickness (mm)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 20"
                        className="border-gray-300 focus:border-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="risk-factors">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                3
              </div>
              <h2 className="font-bold text-lg md:text-2xl text-gray-900">
                Clinical Measurements
              </h2>
            </div>
            <hr className="mb-6 border-gray-200" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="Glucose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Glucose Level (mg/dL)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 120"
                        className="border-gray-300 focus:border-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="BloodPressure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Blood Pressure (mm Hg)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 80"
                        className="border-gray-300 focus:border-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Insulin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Insulin Level (μU/mL)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 85"
                        className="border-gray-300 focus:border-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="family-history">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                4
              </div>
              <h2 className="font-bold text-lg md:text-2xl text-gray-900">
                Family History
              </h2>
            </div>
            <hr className="mb-6 border-gray-200" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="FamilyParents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Parents with Diabetes
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full border-gray-300 focus:border-blue-500">
                          <SelectValue placeholder="Select number of parents" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="FamilySiblings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Siblings with Diabetes
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full border-gray-300 focus:border-blue-500">
                          <SelectValue placeholder="Select number of siblings" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="FamilyGrandparents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Grandparents with Diabetes
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full border-gray-300 focus:border-blue-500">
                          <SelectValue placeholder="Select number of grandparents" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-sm text-blue-900">
              All fields are required for accurate prediction. Please ensure all
              values are entered correctly.
            </AlertDescription>
          </Alert>

          {result && (
            <Alert
              className={`mb-8 ${
                result.message === "Diabetic"
                  ? "border-red-200 bg-red-50"
                  : "border-green-200 bg-green-50"
              }`}
            >
              {result.message === "Diabetic" ? (
                <AlertCircle className="h-5 w-5 text-red-600" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              )}
              <AlertTitle
                className={`text-lg font-semibold ${
                  result.message === "Diabetic"
                    ? "text-red-900"
                    : "text-green-900"
                }`}
              >
                Assessment Complete
              </AlertTitle>
              <AlertDescription
                className={`mt-2 ${
                  result.message === "Diabetic"
                    ? "text-red-800"
                    : "text-green-800"
                }`}
              >
                <p className="text-base mb-3">
                  Result: <strong>{result.message}</strong>
                </p>
                {result.message === "Diabetic" ? (
                  <p className="text-sm">
                    This assessment indicates a higher risk of diabetes. We
                    strongly recommend consulting with a healthcare professional
                    for proper evaluation and guidance.
                  </p>
                ) : (
                  <p className="text-sm">
                    This assessment indicates a lower risk of diabetes. Continue
                    maintaining a healthy lifestyle and regular check-ups with
                    your healthcare provider.
                  </p>
                )}
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mb-8 border-red-200 bg-red-50">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <AlertTitle className="text-red-900">Error</AlertTitle>
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold  text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Get Risk Assessment"
              )}
            </Button>
            {(result || error) && (
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="sm:w-auto border-gray-300 hover:bg-gray-50"
              >
                Start New Assessment
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
