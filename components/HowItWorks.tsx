"use client";
import { Search, PlusCircle, Settings } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Search Cars",
      description: "Find detailed information about your favorite car models.",
    },
    {
      icon: PlusCircle,
      title: "Add Cars",
      description: "Contribute car details and share your knowledge.",
    },
    {
      icon: Settings,
      title: "Manage Your Cars",
      description:
        "View, update, or delete your added cars from your dashboard.",
    },
  ];

  return (
    <section className="py-12 px-4 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-md">
              <step.icon className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
