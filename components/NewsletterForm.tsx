"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Mail, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage("Successfully subscribed to newsletter!")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error || "Failed to subscribe")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Network error. Please try again.")
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus("idle")
      setMessage("")
    }, 5000)
  }

  return (
    <section className="royal-section bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="royal-container text-center"
      >
        <div className="royal-card p-8 md:p-16 max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full flex items-center justify-center">
              <Star className="w-10 h-10 text-amber-700" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 royal-font royal-gold-text">
            Stay Connected to Cosmic Wisdom
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 elegant-font">
            Subscribe to receive weekly astrological insights, cosmic updates, and exclusive content directly in your
            inbox
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
                className="pl-12 py-3 text-lg border-2 border-amber-300 focus:border-amber-500 rounded-xl"
              />
            </div>
            <Button
              type="submit"
              disabled={status === "loading"}
              className="royal-button text-white font-semibold px-8 py-3 text-lg disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe Now"}
            </Button>
          </form>

          {/* Status Messages */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg ${
                status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {status === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span className="elegant-font font-medium">{message}</span>
            </motion.div>
          )}

          <p className="text-sm text-gray-600 mt-4 elegant-font">
            Join 5,000+ astrology enthusiasts • No spam • Unsubscribe anytime
          </p>
        </div>
      </motion.div>
    </section>
  )
}
