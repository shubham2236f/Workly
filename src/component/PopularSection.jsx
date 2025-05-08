import { Award, Building2, CreditCard, Globe } from "lucide-react"
import popular from '@/media/popular.webp'
import direct from '@/media/direct.jpg'
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    content:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the Letraset sheets containing passages.",
    author: "Tufayel Khan",
    role: "UX Leader Management",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-26%20213159-s05rEar6A4GETf8Vhshzq47cW3R1iH.png",
  },
  {
    id: 2,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Sarah Johnson",
    role: "Product Designer",
    image: "/placeholder.svg?height=600&width=500",
  },
  // Add more testimonials as needed
]

export default function PopularSection() {

  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const features = [
    {
      icon: Award,
      title: "Quality Job",
      bgColor: "bg-peach-100",
    },
    {
      icon: Building2,
      title: "Top Companies",
      bgColor: "bg-peach-100",
    },
    {
      icon: CreditCard,
      title: "No Extra Charge",
      bgColor: "bg-peach-100",
    },
    {
      icon: Globe,
      title: "International Job",
      bgColor: "bg-peach-100",
    },
  ]

  return (
    <>
    <section className="container z-10 bg-white mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">Why We are Most Popular</h2>
            <p className="text-gray-600 leading-relaxed">
            ChatGPT said:
            Workly is the most popular AI-powered job portal because it offers an all-in-one solution for resume building, 
            mock tests, and real-time industry insights — all personalized for faster career success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`p-3 rounded-lg bg-[#FFF3E9]`}>
                  <feature.icon className="w-6 h-6 text-[#FF8A65]" />
                </div>
                <span className="font-medium text-gray-800">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="relative">
            <img
            src={popular}
              alt="Happy user with headphones"
              className="w-full rounded-2xl"
            />
            <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
              <div className="p-1 rounded-full bg-green-500">
                <Award className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">100% Trusted</span>
            </div>
          </div>
        </div>
      </div>
    </section>
     <section className="container  z-20 bg-white mx-auto px-4 py-16">
     <div className="grid lg:grid-cols-2 gap-12 items-center">
       {/* Left Image */}
       <div className="relative">
         <div className="relative z-10">
           <img
           src={direct}
             alt={`${testimonials[currentIndex].author}'s testimonial`}
             className="w-full rounded-lg"
           />
         </div>
         {/* Decorative dots pattern */}
         <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#FFF3E9] opacity-50 rounded-lg">
           <div className="w-full h-full grid grid-cols-4 gap-2 p-2">
             {[...Array(16)].map((_, i) => (
               <div key={i} className="w-1 h-1 bg-orange-200 rounded-full" />
             ))}
           </div>
         </div>
       </div>

       {/* Right Content */}
       <div className="space-y-6">
         <span className="text-blue-500 font-medium">Testimonial</span>

         <h2 className="text-4xl font-bold text-gray-900">What Our Clients Are Saying</h2>

         <p className="text-gray-600 leading-relaxed">{testimonials[currentIndex].content}</p>

         <div className="flex items-center justify-between">
           <div>
             <h3 className="text-xl font-semibold text-gray-900">{testimonials[currentIndex].author}</h3>
             <p className="text-gray-600">{testimonials[currentIndex].role}</p>
           </div>

           <div className="flex gap-2">
             <button
               onClick={handlePrevious}
               className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
               aria-label="Previous testimonial"
             >
               <ChevronLeft className="w-6 h-6" />
             </button>
             <button
               onClick={handleNext}
               className="p-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors"
               aria-label="Next testimonial"
             >
               <ChevronRight className="w-6 h-6" />
             </button>
           </div>
         </div>
       </div>
     </div>
   </section>
   </>
  )
}


