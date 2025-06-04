"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  ipBlock: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  ipBlock?: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    ipBlock: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<string | null>(null);

  // Validate form fields
  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.ipBlock.trim()) {
      errors.ipBlock = "IP block is required";
    } else if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/.test(formData.ipBlock)) {
      errors.ipBlock = "Please enter a valid IP block (e.g., 192.168.1.0/24)";
    }
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const errors = validateForm();
    setFormErrors((prev) => ({ ...prev, [name]: errors[name as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setFormErrors({});

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setStatus("Please fix the errors in the form");
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to send email");
      }

      setStatus("Request submitted successfully! We’ll get back to you soon.");
      setFormData({ name: "", email: "", ipBlock: "", message: "" });
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to submit request";
      setStatus(errorMessage);
    }
  };

  // Subtle background animation
  const buyIPBgVariants = {
    initial: { scale: 1, x: 0, y: 0 },
    animate: {
      scale: 1.1,
      x: [0, 10, -10, 0],
      y: [0, 5, -5, 0],
      transition: {
        scale: { duration: 12, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
        x: { duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
        y: { duration: 15, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
      },
    },
  };

  // Animation for text overlay
  const textVariants = {
    initial: { y: 0, opacity: 1 },
    animate: {
      y: [0, -5, 0],
      x: [0, 3, -3, 0],
      transition: {
        y: { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
        x: { duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
      },
    },
  };

  // Animation for content sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Animation for blog cards and process cards on hover
  const cardVariants = {
    initial: { scale: 1, y: 0, backgroundColor: "#f0f9ff" },
    hover: {
      scale: 1.05,
      y: -10,
      backgroundColor: "#e0f2fe",
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  // Animation for form fields on hover and focus
  const fieldVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
    focus: {
      scale: 1.05,
      boxShadow: "0 0 8px rgba(37, 99, 235, 0.3)",
      transition: { duration: 0.3 },
    },
  };

  // Animation for the "Submit" button
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 10px rgba(37, 99, 235, 0.5)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Buy IP Solution Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <motion.div
          variants={buyIPBgVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0"
        >
          <Image
            src="/images/haxagon.jpg"
            alt="Buy IP Solution Background"
            fill
            className="object-cover"
            priority
            quality={80}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10 flex flex-col items-center justify-center text-white">
          <motion.h2
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="text-3xl md:text-5xl font-bold text-center px-4 drop-shadow-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Buy IP Solution
          </motion.h2>
        </div>
      </section>

      {/* Secure & Reliable Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Secure & Reliable IP Address Solutions
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="md:w-1/2">
              <div className="bg-gray-300 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/buy.png"
                  alt="Buy IP Solution"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Buying IP Addresses
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
                We offer a 100% satisfaction guarantee, ensuring confidence in every purchase. Our IPv4 blocks are competitively priced.
              </p>
              <p className="text-gray-600 mb-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
                We maintain a sufficient IPv4 address range and assist in finding the best match from our database.
              </p>
              <p className="text-gray-600" style={{ fontFamily: "'Roboto', sans-serif" }}>
                As a trusted IPv4 broker, we ensure all transactions comply with due diligence and industry regulations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IPv4 Purchase Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            IPv4 Purchase Process
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Acquisition Request", text: "We locate a matching offer from our inventory or wait for a suitable one." },
              { title: "Contract", text: "After agreement and payment, we prepare the documentation for address transfer." },
              { title: "Ownership Transfer", text: "We draft agreements and handle all necessary documentation." },
              { title: "Concluding Transaction", text: "Upon ownership confirmation, funds are transferred to the seller." },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial="initial"
                whileHover="hover"
                variants={cardVariants}
                className="bg-blue-50 p-6 rounded-lg text-center"
              >
                <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>{step.title}</h3>
                <p className="text-gray-600" style={{ fontFamily: "'Roboto', sans-serif" }}>{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Buy IP Request Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Submit a Buy IP Request
          </motion.h2>
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className={`w-full p-3 text-base border ${formErrors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  required
                  whileHover="hover"
                  whileFocus="focus"
                  variants={fieldVariants}
                  aria-invalid={formErrors.name ? "true" : "false"}
                  aria-describedby={formErrors.name ? "name-error" : undefined}
                />
                {formErrors.name && (
                  <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                    {formErrors.name}
                  </p>
                )}
              </div>
              <div>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className={`w-full p-3 text-base border ${formErrors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  required
                  whileHover="hover"
                  whileFocus="focus"
                  variants={fieldVariants}
                  aria-invalid={formErrors.email ? "true" : "false"}
                  aria-describedby={formErrors.email ? "email-error" : undefined}
                />
                {formErrors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div>
                <motion.input
                  type="text"
                  name="ipBlock"
                  value={formData.ipBlock}
                  onChange={handleInputChange}
                  placeholder="Desired IP Block (e.g., 192.168.1.0/24)"
                  className={`w-full p-3 text-base border ${formErrors.ipBlock ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  required
                  whileHover="hover"
                  whileFocus="focus"
                  variants={fieldVariants}
                  aria-invalid={formErrors.ipBlock ? "true" : "false"}
                  aria-describedby={formErrors.ipBlock ? "ipBlock-error" : undefined}
                />
                {formErrors.ipBlock && (
                  <p id="ipBlock-error" className="text-red-500 text-sm mt-1" role="alert">
                    {formErrors.ipBlock}
                  </p>
                )}
              </div>
              <div>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Additional Details"
                  className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  rows={4}
                  whileHover="hover"
                  whileFocus="focus"
                  variants={fieldVariants}
                  aria-label="Additional Details"
                />
              </div>
              <motion.button
                type="submit"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 text-base rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                aria-label="Submit Buy IP Request"
              >
                Submit Request
              </motion.button>
              {status && (
                <p
                  className={`text-center mt-4 ${status.includes("successfully") ? "text-green-600" : "text-red-600"}`}
                  role="alert"
                >
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}