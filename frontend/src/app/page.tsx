"use client";

import React from "react";
import {
  Activity,
  Shield,
  Zap,
  ArrowRight,
  Heart,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-semibold tracking-tight">
                GlucoSense
              </span>
            </div>
            <Link href="/predict">
              <Button className="px-6 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-full text-sm text-blue-600 mb-8">
            <Shield className="w-4 h-4" />
            <span>AI-Powered Health Assessment</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Know Your Diabetes Risk
            <span className="block text-blue-600 mt-2">In Seconds</span>
          </h1>

          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Advanced machine learning technology analyzes your health metrics to
            provide instant, accurate diabetes risk assessment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/predict" className="w-full md:w-auto">
              <Button className="group w-full px-12 py-6 bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 ">
                <span className="font-medium">Start Assessment</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Button
              className="px-10 py-6 hover:border-gray-400 transition-colors font-medium"
              onClick={() => scrollToSection("why-glucosense")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">80%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                &lt;30s
              </div>
              <div className="text-gray-600">Assessment Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10k+</div>
              <div className="text-gray-600">Assessments Done</div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="container mx-auto px-6 py-20 md:py-32"
        id="why-glucosense"
      >
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Why Choose GlucoSense?
          </h2>
          <p className=" text-gray-600 max-w-2xl mx-auto">
            State-of-the-art technology meets healthcare to provide you with
            reliable insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-8 border border-gray-200 rounded-2xl hover:shadow-sm transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Instant Results</h3>
            <p className="text-gray-600">
              Get your diabetes risk assessment in under 30 seconds with our
              advanced AI model.
            </p>
          </div>

          <div className="p-8 border border-gray-200 rounded-2xl hover:shadow-sm transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Clinically Validated</h3>
            <p className="text-gray-600">
              Our model is trained on extensive medical data and validated by
              healthcare professionals.
            </p>
          </div>

          <div className="p-8 border border-gray-200 rounded-2xl hover:shadow-sm transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
            <p className="text-gray-600">
              Your health data is secure and never stored. We prioritize your
              privacy above all.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple, fast, and accurate — your AI-powered health check in three
              easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 border border-gray-200 rounded-2xl hover:shadow-sm transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enter Your Data</h3>
              <p className="text-gray-600">
                Input your health metrics like glucose, weight, height, blood
                pressure, and insulin levels.
              </p>
            </div>

            <div className="p-8 border border-gray-200 rounded-2xl hover:shadow-sm transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Our intelligent model processes your data instantly and
                evaluates diabetes risk.
              </p>
            </div>

            <div className="p-8 border border-gray-200 rounded-2xl hover:shadow-sm transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Results</h3>
              <p className="text-gray-600">
                Receive an instant, clear assessment of your diabetes risk — all
                within seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto bg-blue-600 rounded-3xl p-10 md:p-14 text-center text-white">
          <TrendingUp className="w-14 h-14 mx-auto mb-5 text-white/90" />
          <h2 className="text-2xl md:text-4xl font-extrabold mb-3 tracking-tight">
            Know Your Risk. Stay Ahead.
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Check your diabetes risk in seconds. Simple, fast, and accurate.
          </p>
          <Link href="/predict">
            <Button className="px-6 py-3 bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-all duration-300">
              Get My Risk Score
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-200 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Activity className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-semibold tracking-tight">
                GlucoSense
              </span>
            </div>
            <div className="text-sm text-gray-600 text-center">
              © 2025 GlucoSense. For informational purposes and educational
              only. Consult a healthcare professional.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
