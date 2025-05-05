import React from "react";
import Link from "next/link";
import Image from "next/image";

const SolutionPage = () => {
  const solutions = [
    {
      id: "students",
      title: "For Students & Researchers",
      description:
        "Organize lecture notes, research papers, and study materials all in one place.",
      benefits: [
        "Annotate research papers directly with searchable notes",
        "Create study guides by extracting key points from textbooks",
        "Collaborate with study groups on shared documents",
        "Access your materials across all devices, perfect for library sessions",
      ],
      icon: "🎓",
      color: "bg-blue-100",
    },
    {
      id: "professionals",
      title: "For Professionals",
      description:
        "Streamline your document workflow and boost productivity in any industry.",
      benefits: [
        "Keep client documents organized and easily accessible",
        "Annotate contracts and agreements with important observations",
        "Share documents securely with colleagues and clients",
        "Track document changes and maintain version history",
      ],
      icon: "💼",
      color: "bg-green-100",
    },
    {
      id: "legal",
      title: "For Legal Teams",
      description:
        "Manage case files and legal documents with enhanced security and organization.",
      benefits: [
        "Create case-specific document collections with controlled access",
        "Highlight and annotate legal precedents and statutes",
        "Search across extensive legal libraries with precision",
        "Maintain client confidentiality with enterprise-grade security",
      ],
      icon: "⚖️",
      color: "bg-purple-100",
    },
    {
      id: "healthcare",
      title: "For Healthcare Professionals",
      description:
        "Securely manage patient information and medical literature with HIPAA-compliant tools.",
      benefits: [
        "Organize medical journals and research papers by specialty",
        "Take secure notes on patient cases while maintaining privacy",
        "Access critical documents instantly on any device",
        "Collaborate with specialists while maintaining information security",
      ],
      icon: "🏥",
      color: "bg-red-100",
    },
  ];

  const testimonials = [
    {
      quote:
        "ScanX has completely transformed how our research team manages scientific papers. The smart note-taking and search features have saved us countless hours.",
      author: "Dr. Sarah Chen",
      position: "Research Director, BioTech Institute",
      avatar: "SC",
    },
    {
      quote:
        "As a law student, I juggle hundreds of case documents. ScanX helps me organize everything with searchable annotations that make exam prep so much easier.",
      author: "Marcus Johnson",
      position: "Law Student, Georgetown University",
      avatar: "MJ",
    },
    {
      quote:
        "Our accounting firm handles thousands of financial documents. ScanX's security features and collaboration tools have streamlined our workflow tremendously.",
      author: "Priya Patel",
      position: "Senior Accountant, FinEdge Partners",
      avatar: "PP",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">ScanX Solutions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Tailored document management and note-taking solutions for every
          profession and workflow.
        </p>
      </div>
      {/* Navbar */}
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
      {/* Solutions for Different Users */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {solutions.map((solution) => (
          <div key={solution.id} className={`rounded-lg p-8 ${solution.color}`}>
            <div className="text-4xl mb-4">{solution.icon}</div>
            <h2 className="text-2xl font-bold mb-3">{solution.title}</h2>
            <p className="text-gray-700 mb-6">{solution.description}</p>
            <ul className="space-y-3">
              {solution.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <button className="mt-6 bg-white text-black border border-black px-6 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors">
              Learn More
            </button>
          </div>
        ))}
      </div>

      {/* How It Works Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          How ScanX Works
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center text-center md:w-1/4 mb-8 md:mb-0">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-black text-2xl font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload</h3>
            <p className="text-gray-600">
              Upload your PDFs through our intuitive drag-and-drop interface.
            </p>
          </div>
          <div className="hidden md:block w-16 h-1 bg-blue-200"></div>
          <div className="flex flex-col items-center text-center md:w-1/4 mb-8 md:mb-0">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-black text-2xl font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Organize</h3>
            <p className="text-gray-600">
              Sort documents with folders, tags, and smart collections.
            </p>
          </div>
          <div className="hidden md:block w-16 h-1 bg-blue-200"></div>
          <div className="flex flex-col items-center text-center md:w-1/4 mb-8 md:mb-0">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-black text-2xl font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Annotate</h3>
            <p className="text-gray-600">
              Add notes, highlights, and comments directly on your documents.
            </p>
          </div>
          <div className="hidden md:block w-16 h-1 bg-blue-200"></div>
          <div className="flex flex-col items-center text-center md:w-1/4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-black text-2xl font-bold mb-4">
              4
            </div>
            <h3 className="text-xl font-semibold mb-2">Collaborate</h3>
            <p className="text-gray-600">
              Share and work together with team members in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.position}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Section */}
      <div className="bg-gray-50 rounded-xl p-8 mb-16">
        <div className="md:flex items-center">
          <div className="md:w-2/3 md:pr-8">
            <span className="inline-block bg-blue-100 text-black px-3 py-1 rounded-full text-sm font-medium mb-4">
              Case Study
            </span>
            <h2 className="text-2xl font-bold mb-4">
              How Thompson Law Firm Reduced Document Processing Time by 68%
            </h2>
            <p className="text-gray-700 mb-6">
              Thompson Law Firm was struggling with managing their extensive
              case documents across multiple platforms. After implementing
              ScanX, they consolidated all their documents into one searchable
              system, allowing attorneys to access critical information
              instantly and collaborate seamlessly.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-2xl font-bold text-black">68%</p>
                <p className="text-sm text-gray-600">
                  Faster document retrieval
                </p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-2xl font-bold text-black">45%</p>
                <p className="text-sm text-gray-600">
                  Increase in team collaboration
                </p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-2xl font-bold text-black">$32K</p>
                <p className="text-sm text-gray-600">Annual savings</p>
              </div>
            </div>
            <button className="text-black font-medium hover:underline">
              Read the full case study →
            </button>
          </div>
          <div className="md:w-1/3 mt-6 md:mt-0 h-64 rounded-lg flex items-center justify-center">
            <Image
              src="/ScanX_logo.png"
              alt="Thompson Law Firm Case Study"
              width={400}
              height={250}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              question: "Is ScanX compliant with industry regulations?",
              answer:
                "Yes, ScanX is designed with compliance in mind. We offer HIPAA compliance for healthcare, legal confidentiality protections, and meet educational privacy standards for academic institutions.",
            },
            {
              question: "Can I access my documents offline?",
              answer:
                "Absolutely! ScanX offers offline access to previously viewed documents. Simply mark documents for offline use, and they'll be available even without an internet connection.",
            },
            {
              question: "How secure is my data on ScanX?",
              answer:
                "ScanX employs enterprise-grade security measures including end-to-end encryption, two-factor authentication, and regular security audits. Your documents are stored with military-grade encryption and never shared with third parties.",
            },
            {
              question: "Can I import my existing notes and annotations?",
              answer:
                "Yes, ScanX supports importing annotations from several popular PDF readers and note-taking applications. Our migration assistant makes the transition seamless.",
            },
          ].map((faq, idx) => (
            <div key={idx} className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white rounded-xl p-8 text-center mb-28">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Your Document Workflow?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who use ScanX to manage documents and
          take smarter notes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors">
            Start Your Free Trial
          </button>
          <button className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolutionPage;
