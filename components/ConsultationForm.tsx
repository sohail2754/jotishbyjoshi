"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, User, Mail, Phone, MapPin, MessageSquare, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const serviceTypes = [
  "Personal Birth Chart Reading",
  "Marriage Compatibility Analysis",
  "Career Guidance Consultation",
  "Health & Wellness Reading",
  "Financial Astrology Consultation",
  "Spiritual Guidance Session",
  "Remedial Astrology Consultation",
]

const timeSlots = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
]

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service_type: "",
    birth_date: "",
    birth_time: "",
    birth_place: "",
    preferred_date: "",
    preferred_time: "",
    message: "",
  })

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage("Consultation booked successfully! We will contact you soon.")
        setFormData({
          name: "",
          email: "",
          phone: "",
          service_type: "",
          birth_date: "",
          birth_time: "",
          birth_place: "",
          preferred_date: "",
          preferred_time: "",
          message: "",
        })
      } else {
        setStatus("error")
        setMessage(data.error || "Failed to book consultation")
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
    <Card className="royal-card max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold royal-font royal-gold-text">Book Your Consultation</CardTitle>
        <p className="text-gray-600 elegant-font">Schedule a personalized astrology session with Joshi</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-amber-600" />
                Full Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                required
                className="border-amber-200 focus:border-amber-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-600" />
                Email Address *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                required
                className="border-amber-200 focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-600" />
                Phone Number
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
                className="border-amber-200 focus:border-amber-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Service Type *</label>
              <Select value={formData.service_type} onValueChange={(value) => handleInputChange("service_type", value)}>
                <SelectTrigger className="border-amber-200 focus:border-amber-400">
                  <SelectValue placeholder="Select consultation type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Birth Information */}
          <div className="bg-amber-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 royal-font">
              Birth Information (For Accurate Reading)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  Birth Date
                </label>
                <Input
                  type="date"
                  value={formData.birth_date}
                  onChange={(e) => handleInputChange("birth_date", e.target.value)}
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  Birth Time
                </label>
                <Input
                  type="time"
                  value={formData.birth_time}
                  onChange={(e) => handleInputChange("birth_time", e.target.value)}
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  Birth Place
                </label>
                <Input
                  value={formData.birth_place}
                  onChange={(e) => handleInputChange("birth_place", e.target.value)}
                  placeholder="City, Country"
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Consultation Scheduling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                Preferred Date *
              </label>
              <Input
                type="date"
                value={formData.preferred_date}
                onChange={(e) => handleInputChange("preferred_date", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
                className="border-amber-200 focus:border-amber-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                Preferred Time *
              </label>
              <Select
                value={formData.preferred_time}
                onValueChange={(value) => handleInputChange("preferred_time", value)}
              >
                <SelectTrigger className="border-amber-200 focus:border-amber-400">
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-600" />
              Additional Message
            </label>
            <Textarea
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Any specific questions or areas you'd like to focus on..."
              rows={4}
              className="border-amber-200 focus:border-amber-400"
            />
          </div>

          {/* Status Messages */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-2 p-4 rounded-lg ${
                status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {status === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span className="elegant-font font-medium">{message}</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full royal-button text-white font-semibold py-4 text-lg disabled:opacity-50"
          >
            {status === "loading" ? "Booking Consultation..." : "Book Consultation"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
