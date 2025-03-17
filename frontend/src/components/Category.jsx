


import React, { useState } from "react"
import { useNavigate } from "react-router-dom"


const categories = [
  {
    title: "Trending",
    bgColor: "bg-[#e13c16]",
    imageSrc: "/placeholder.svg?height=150&width=150",
    href: "/trending",
  },
  {
    title: "Malayalam",
    bgColor: "bg-[#7b5cff]",
    imageSrc: "/placeholder.svg?height=150&width=150",
    href: "/malayalam",
  },
  {
    title: "English",
    bgColor: "bg-[#1e3163]",
    imageSrc: "/placeholder.svg?height=150&width=150",
    href: "/english",
  },
  {
    title: "Tamil",
    bgColor: "bg-[#f52c8c]",
    imageSrc: "/placeholder.svg?height=150&width=150",
    href: "/tamil",
  },
  {
    title: "Hindi",
    bgColor: "bg-[#f52525]",
    imageSrc: "/placeholder.svg?height=150&width=150",
    href: "/hindi",
  },
  {
    title: "K-Pop",
    bgColor: "bg-[#b33dbd]",
    imageSrc: "/placeholder.svg?height=150&width=150",
    href: "/kpop",
  },
]

export default function Categories() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const navigate = useNavigate()

  const handleClick = (href) => {
    navigate(href)
  }

  return (
    <div className="bg-black min-h-screen p-2">
      <h1 className="text-white text-2xl font-bold mb-8">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${category.bgColor} rounded-xl p-6 h-36 relative overflow-hidden cursor-pointer transition-all duration-300 ease-in-out`}
            style={{
              transform: hoveredIndex === index ? "scale(1.03)" : "scale(1)",
              boxShadow: hoveredIndex === index ? "0 10px 25px rgba(0, 0, 0, 0.3)" : "none",
            }}
            onClick={() => handleClick(category.href)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <h2 className="text-white text-xl font-bold z-10 relative">{category.title}</h2>
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out"
              style={{
                transform:
                  hoveredIndex === index
                    ? "rotate(12deg) translateY(-55%) translateX(-5px) scale(1.1)"
                    : "rotate(10deg) translateY(-50%)",
              }}
            >
              <div className="w-24 h-24 relative">
                <img
                  src={category.imageSrc || "/placeholder.svg"}
                  alt={category.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
