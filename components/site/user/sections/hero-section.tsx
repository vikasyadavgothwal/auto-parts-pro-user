"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { features } from "@/lib/data/user"
import { motion } from "framer-motion"

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <motion.section 
      className="relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="absolute inset-0">
        <Image
          src="/home.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/24" />
      </div>

      <div className="site-container relative py-24">
        <div className="mb-16 max-w-3xl text-left">
          <motion.div variants={itemVariants}>
            <Badge
              variant="outline"
              className="mb-6 rounded-full border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
            >
              PREMIUM AUTO PARTS MARKETPLACE
            </Badge>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="mb-6 text-[48px] font-bold leading-tight text-white"
          >
            Find the Right Part,
            <br />
            <span className="text-white">Instantly</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-[20px] leading-relaxed text-white"
          >
            Access thousands of verified OEM and aftermarket parts from trusted
            suppliers.
            <br />
            Search by VIN for guaranteed fitment.
          </motion.p>
        </div>

        <motion.div 
          variants={itemVariants}
          className="mt-6 flex flex-col justify-start gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-white" />
                <span className="text-sm text-white">{feature.title}</span>
              </div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}
