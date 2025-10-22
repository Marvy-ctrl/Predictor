import React from "react";
import FormInput from "./form-input";
import { Activity, ArrowLeft, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function Predict() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <header className="bg-white border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <Activity className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-semibold tracking-tight">
                GlucoSense
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </nav>
      </header>

      <div className="container mx-auto py-12 px-4 md:py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-full text-sm text-blue-600 mb-6">
            <Shield className="w-4 h-4" />
            <span>Secure & Confidential</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Diabetes Risk Assessment
          </h1>
          <p className=" text-gray-600 max-w-2xl mx-auto">
            Please provide accurate information for the most reliable results.
            This assessment takes less than 2 minutes.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            <Zap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">
              Instant Results
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Get results in seconds
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">
              80% Accurate
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Clinically validated
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            <Activity className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">
              No Data Stored
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Your privacy matters
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
            <FormInput />
          </div>

          <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-sm text-gray-700 text-center">
              <strong className="text-blue-900">Medical Disclaimer:</strong>{" "}
              This tool is for informational purposes only and does not
              constitute medical advice. Please consult with a healthcare
              professional for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-200 py-8 mt-12">
        <div className="container mx-auto px-6">
          <div className="text-center text-sm text-gray-600">
            © 2025 GlucoSense. For informational purposes only.
          </div>
        </div>
      </footer>
    </main>
  );
}
