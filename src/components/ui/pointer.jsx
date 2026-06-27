"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"

/**
 * A custom pointer component that displays an animated cursor.
 * Wrap any component in this to enable a custom pointer when hovering.
 */
export function Pointer({
  children,
  className,
  pointer,
  style,
  ...props
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const ref = useRef(null)
  const [isInside, setIsInside] = useState(false)

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
  const mouseX = useSpring(x, springConfig)
  const mouseY = useSpring(y, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        x.set(e.clientX - rect.left)
        y.set(e.clientY - rect.top)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [x, y])

  const defaultPointer = (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="#ff2a5f"
      stroke="white"
      strokeWidth="1.5"
      style={{
        filter: "drop-shadow(0 2px 8px rgba(255, 42, 95, 0.5))",
      }}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )

  return (
    <div
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      ref={ref}
      style={{
        position: "relative",
        ...style,
      }}
      className={`${isInside ? "hide-cursor" : ""} ${className || ""}`}
    >
      {isInside && (
        <style>{`
          .hide-cursor, .hide-cursor * {
            cursor: none !important;
          }
        `}</style>
      )}
      {children}
      <AnimatePresence>
        {isInside && (
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              x: mouseX,
              y: mouseY,
              translateX: "-50%",
              translateY: "-50%",
              pointerEvents: "none",
              zIndex: 100,
              width: "fit-content",
              height: "fit-content",
            }}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            {...props}
          >
            {pointer || defaultPointer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
