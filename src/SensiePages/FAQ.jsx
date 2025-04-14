"use client"

import { useState } from "react"
import { ChevronDown, Search } from "lucide-react"

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex w-full items-center justify-between py-5 text-left font-medium text-gray-900 transition-all hover:text-blue-600"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-lg mx-1">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-blue-600 transition-transform duration-200 ${isOpen ? "rotate-180 transform" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] pb-5" : "max-h-0"}`}>
        <div className="text-gray-600 mx-1">{answer}</div>
      </div>
    </div>
  )
}

const FAQCategory = ({ title, faqs, openIndex, setOpenIndex, startIndex }) => {
  return (
    <div className="mb-8">
      <h3 className="mb-4 text-xl font-bold text-gray-900">{title}</h3>
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        {faqs.map((faq, idx) => {
          const globalIndex = startIndex + idx
          return (
            <FAQItem
              key={globalIndex}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === globalIndex}
              onClick={() => setOpenIndex(openIndex === globalIndex ? -1 : globalIndex)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  const faqCategories = [
    {
      title: "AI Resume Builder",
      faqs: [
        {
          question: "How does the AI Resume Builder work?",
          answer: (
            <>
              <p>Our AI Resume Builder works in three simple steps:</p>
              <ol className="ml-5 mt-2 list-decimal space-y-2">
                <li>Upload your existing resume or fill out our comprehensive form</li>
                <li>Our AI analyzes your experience and skills to optimize your resume</li>
                <li>Choose from professionally designed templates and download your polished resume</li>
              </ol>
              <p className="mt-3">
                The AI engine is trained on thousands of successful resumes across various industries to ensure your
                resume stands out to both human recruiters and ATS systems.
              </p>
            </>
          ),
        },
        {
          question: "Will my resume pass Applicant Tracking Systems (ATS)?",
          answer: (
            <>
              <p>Yes! Our AI Resume Builder is specifically designed to create ATS-friendly resumes. The system:</p>
              <ul className="ml-5 mt-2 list-disc space-y-2">
                <li>Uses proper formatting that ATS systems can easily parse</li>
                <li>Incorporates relevant keywords from the job description you're targeting</li>
                <li>Ensures proper section headings and structure</li>
                <li>Avoids graphics, tables, and other elements that confuse ATS systems</li>
              </ul>
              <p className="mt-3">
                Our users report a 60% higher rate of getting past ATS screening compared to traditional resumes.
              </p>
            </>
          ),
        },
        {
          question: "Can I customize the AI-generated resume?",
          answer: (
            <p>
              While our AI provides optimized content and formatting, you have full control to edit any part of your
              resume. You can modify the wording, rearrange sections, change fonts and colors, and adjust spacing to
              match your preferences. We provide the AI-powered advantage while ensuring you maintain your unique voice
              and style.
            </p>
          ),
        },
      ],
    },
    {
      title: "Mock Interviews",
      faqs: [
        {
          question: "How realistic are the mock interviews?",
          answer: (
            <>
              <p>Our mock interviews are designed to closely simulate real interview experiences. They feature:</p>
              <ul className="ml-5 mt-2 list-disc space-y-2">
                <li>Industry-specific questions based on actual interviews reported by job seekers</li>
                <li>AI interviewer that adapts follow-up questions based on your responses</li>
                <li>Video recording so you can review your body language and delivery</li>
                <li>Timed responses to help you practice concise and effective answers</li>
                <li>Different interview formats including behavioral, technical, and case interviews</li>
              </ul>
              <p className="mt-3">
                Many users report that our mock interviews were nearly identical to their actual interviews, helping
                them feel prepared and confident.
              </p>
            </>
          ),
        },
        {
          question: "Do you offer feedback on my interview performance?",
          answer: (
            <p>
              Yes, our AI provides comprehensive feedback after each mock interview. You'll receive analysis on your
              response content, delivery pace, filler words usage, eye contact (if using video), and overall confidence.
              Additionally, we provide suggestions for improvement and alternative ways to answer challenging questions.
              For premium users, we also offer the option to schedule a review session with a professional career coach
              who can provide personalized feedback.
            </p>
          ),
        },
        {
          question: "Can I practice for specific companies or roles?",
          answer: (
            <p>
              Our platform offers specialized mock interviews for major companies like Google, Amazon, Microsoft, and
              many others. We also have role-specific interviews for positions such as software engineer, product
              manager, marketing specialist, financial analyst, and more. Simply select your target company or role when
              setting up your mock interview, and our AI will generate relevant questions based on real interview
              reports from those specific companies and positions.
            </p>
          ),
        },
      ],
    },
    {
      title: "Technical Support",
      faqs: [
        {
          question: "How can I contact customer support?",
          answer: (
            <>
              <p>You can reach our support team through multiple channels:</p>
              <ul className="ml-5 mt-2 list-disc space-y-2">
                <li>Live chat support available 24/7 directly on our website</li>
                <li>Email support at support@jobportal.com</li>
                <li>Phone support at (123) 456-7890 (Monday-Friday, 9 AM - 6 PM EST)</li>
                <li>Check our comprehensive help center for immediate answers to common questions</li>
              </ul>
              <p className="mt-3">
                Premium and Professional subscribers receive priority support with guaranteed response times of under 2
                hours during business hours.
              </p>
            </>
          ),
        },
        {
          question: "My resume isn't downloading correctly. What should I do?",
          answer: (
            <>
              <p>If you're experiencing issues downloading your resume, try these troubleshooting steps:</p>
              <ol className="ml-5 mt-2 list-decimal space-y-2">
                <li>Clear your browser cache and cookies</li>
                <li>Try a different browser (Chrome, Firefox, Safari)</li>
                <li>Ensure you have a stable internet connection</li>
                <li>Check if you have sufficient storage space on your device</li>
                <li>Try downloading in a different format (PDF, DOCX, TXT)</li>
              </ol>
              <p className="mt-3">
                If the issue persists, please contact our support team with your account email and a screenshot of the
                error message you're receiving.
              </p>
            </>
          ),
        },
      ],
    },
  ]

  // Calculate total FAQs and create a flat array for searching
  let totalFaqs = 0
  const allFaqs = faqCategories.flatMap((category) => {
    const faqs = category.faqs
    totalFaqs += faqs.length
    return faqs
  })

  // Filter FAQs based on search query
  const filteredFaqCategories = searchQuery
    ? [
        {
          title: "Search Results",
          faqs: allFaqs.filter(
            (faq) =>
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (typeof faq.answer === "string" && faq.answer.toLowerCase().includes(searchQuery.toLowerCase())),
          ),
        },
      ]
    : faqCategories

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>

      {/* Search bar */}
      <div className="mb-8 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* FAQ Categories */}
      {filteredFaqCategories.map((category, categoryIndex) => {
        // Calculate the starting index for this category
        let startIndex = 0
        for (let i = 0; i < categoryIndex; i++) {
          if (searchQuery) {
            startIndex = 0
          } else {
            startIndex += faqCategories[i].faqs.length
          }
        }

        return (
          <FAQCategory
            key={category.title}
            title={category.title}
            faqs={category.faqs}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
            startIndex={startIndex}
          />
        )
      })}
    </div>
  )
}

