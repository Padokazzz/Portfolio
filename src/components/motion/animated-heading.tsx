"use client"

import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

type AnimatedHeadingProps = {
  text: string
  className?: string
  delay?: number
}

export function AnimatedHeading({
  text,
  className,
  delay = 0.76,
}: AnimatedHeadingProps) {
  const words = text.split(" ")

  return (
    <motion.h1
      aria-label={text}
      className={cn("overflow-hidden", className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.022,
          },
        },
      }}
    >
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          aria-hidden="true"
          className="inline-block whitespace-nowrap"
        >
          {word.split("").map((letter, letterIndex) => {
            const previousLetters = words
              .slice(0, wordIndex)
              .reduce((total, currentWord) => total + currentWord.length, 0)
            const currentIndex = previousLetters + letterIndex

            return (
              <motion.span
                key={`${letter}-${currentIndex}`}
                className="inline-block"
                variants={{
                  hidden: {
                    opacity: 0,
                    y: "0.72em",
                    rotate: 2,
                    filter: "blur(8px)",
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                    filter: "blur(0px)",
                  },
                }}
                transition={{
                  duration: 0.64,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {letter}
              </motion.span>
            )
          })}
          {wordIndex < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </motion.h1>
  )
}
