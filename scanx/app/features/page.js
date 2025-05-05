import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FeaturesPage = () => {
  const features = [
    {
      icon: "📄",
      title: "PDF Management",
      description: "Upload, organize, and access all your PDFs in one central location. Search through your documents with powerful indexing.",
      highlight: "Access your documents anywhere, anytime."
    },
    {
      icon: "✏️",
      title: "Smart Notes",
      description: "Take detailed notes directly on your PDFs. Highlight text, add comments, and organize your thoughts efficiently.",
      highlight: "Notes are automatically synced across all your devices."
    },
    {
      icon: "🔍",
      title: "Advanced Search",
      description: "Find any document or note instantly with our powerful search functionality. Filter by date, content, tags, and more.",
      highlight: "Save hours finding exactly what you need."
    },
    {
      icon: "🤖",
      title: "AI-Powered Summaries",
      description: "Get intelligent summaries of your documents with our advanced AI technology. Extract key points and insights automatically.",
      highlight: "Understand lengthy documents in seconds."
    },
    {
      icon: "🔄",
      title: "Real-time Collaboration",
      description: "Share documents with team members and collaborate in real-time. Track changes and maintain version history.",
      highlight: "Perfect for team projects and research groups."
    },
    {
      icon: "🔒",
      title: "Security & Privacy",
      description: "Your documents are encrypted end-to-end. Control access permissions and protect sensitive information.",
      highlight: "Enterprise-grade security for all your data."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">ScanX Features</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transform how you work with PDFs. ScanX combines powerful document management with intelligent note-taking to boost your productivity.
        </p>
      </div>
      <nav className="fixed bottom-6 left-0 right-0 flex justify-center z-50">
        <div className="bg-black bg-opacity-75 rounded-3xl px-8 py-3 shadow-2xl">
          <div className="flex items-center space-x-20">
            <Link href="/features" className="text-white hover:text-gray-300">
              Features
            </Link>
            <Link href="/solution" className="text-white hover:text-gray-300">
              Solution
            </Link>
            <Link href="/">
              <Image
                src={"/scanx-logo.png"}
                alt="ScanX Logo"
                width={60}
                height={60}
              />
            </Link>
            <Link href="/pricing" className="text-white hover:text-gray-300">
              Pricing
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300">
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <p className="text-blue-600 font-medium">{feature.highlight}</p>
          </div>
        ))}
      </div>

      {/* Showcase Section */}
      <div className="mt-20 bg-gray-50 rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-3xl font-bold mb-4">Seamless PDF Experience</h2>
            <p className="text-gray-600 mb-6">
              ScanX reimagines how you interact with PDFs. Our intuitive interface makes document management and note-taking feel natural and effortless.
            </p>
            <ul className="space-y-3">
              {[
                "Upload multiple PDFs with drag and drop",
                "Organize documents with smart folders and tags",
                "Access your library across all devices",
                "Share documents with customizable permissions"
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            {/* You would replace this with an actual image: */}
            <Image src="/DashBoard.png" alt="ScanX PDF Interface" width={550} height={300} className="rounded-lg border shadow-lg" />
          </div>
        </div>
      </div>

      {/* Notes Feature Highlight */}
      <div className="mt-16 bg-gray-50 rounded-xl p-8">
        <div className="flex flex-col md:flex-row-reverse items-center">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pl-8">
            <h2 className="text-3xl font-bold mb-4">Smart Note-Taking</h2>
            <p className="text-gray-600 mb-6">
              Take your note-taking to the next level with our intelligent annotation tools. Connect ideas, organize thoughts, and never lose track of important information.
            </p>
            <ul className="space-y-3">
              {[
                "Highlight text with customizable colors",
                "Add sticky notes directly on documents",
                "Link related concepts across different PDFs",
                "Export notes separately or with the document"
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <Image src="/PDF-Page.png" alt="ScanX Notes Feature" width={550} height={300} className="rounded-lg border shadow-lg" />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center mb-44">
        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Document Workflow?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 ">
          Join thousands of professionals who use ScanX to manage documents and take smarter notes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center ">
          <Link href="/sign-up">
          <button className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
            Get Started for Free
          </button>
          </Link>
          <Link href="/pricing">
          <button className="border border-black-600 text-black-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors">
            See Pricing Plans
          </button>
          </Link>
        </div>
        
      </div>
    </div>
    
  );
};

export default FeaturesPage;