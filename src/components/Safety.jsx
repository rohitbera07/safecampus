import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import c1 from "../assets/c1.png"
import c2 from "../assets/c2.png"
import c3 from "../assets/c3.png"
import c4 from "../assets/c4.png"

const cards = [
  {
    id: 1,
    title: "Report",
    description:
      "The students report complaints, which are then fetched by the admin and are reviewed.",
    image: c1,
  },
  {
    id: 2,
    title: "Map-View",
    description:
      "The students can view the heatmap view of the campus displaying the risky and safer zones",
    image: c2,
  },
  {
    id: 3,
    title: "SOS Alert",
    description:
      "On emergency student can send sos alert to the admin via sms",
    image: c3,
  },
  {
    id: 4,
    title: "Ai-powered",
    description: "Integrated Ai detects the severity of the report",
    image: c4,
  },
]

export default function Safety() {
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false })
  )

  return (
    <div className="w-full flex justify-center items-center gap-16 flex-col py-4 bg-gray-50">
      {/* Centered heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
        Student Safety Features
      </h2>

      <Carousel
        orientation="vertical"
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-[90vw] md:w-[60vw]"
      >
        <CarouselContent className="h-[450px]">
          {cards.map((card) => (
            <CarouselItem key={card.id} className="flex justify-center">
              <Card className="w-full h-auto md:h-64 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
                {/* Left: Text Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-center bg-white p-6 relative">
                  <CardHeader className="p-0">
                    <CardTitle className="text-2xl font-bold">
                      {card.title}
                    </CardTitle>
                    <p className="text-base md:text-lg mt-2">
                      {card.description}
                    </p>
                  </CardHeader>
                </div>

                {/* Divider only on larger screens */}
                <div className="hidden md:block w-2 bg-gradient-to-r from-white to-transparent" />

                {/* Right: Image Section */}
                <div
                  className="w-full md:w-1/2 h-48 md:h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
