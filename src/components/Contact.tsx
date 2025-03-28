import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Linkedin,
  Github,
  Send,
  Terminal,
  CheckCircle2,
  XCircle,
  Phone,
} from "lucide-react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Initialize EmailJS with your public key
  emailjs.init("dVQYCgrfSC8YCt8gn");

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await emailjs.send("service_631864o", "template_zui04dh", {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      });
      setShowSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to send message:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden" ref={ref}>
      {/* Digital Rain Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-500 text-xs font-mono"
            initial={{ y: -20, x: Math.random() * 100 + "%" }}
            animate={{
              y: ["0%", "100%"],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: -Math.random() * 10,
            }}
          >
            {Math.random().toString(2).substr(2, 8)}
          </motion.div>
        ))}
      </div>

      {/* Ambient Glow Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 p-2 bg-blue-500/10 rounded-xl backdrop-blur-sm border border-blue-500/20">
            <Terminal className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">Socials</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl" />
            <form
              onSubmit={handleSubmit}
              className="relative bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-white/10"
            >
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-6 py-4 bg-slate-800/50 rounded-xl border ${
                      errors.name ? "border-red-500" : "border-blue-500/20"
                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-transparent peer`}
                    placeholder="Your Name"
                    id="name"
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-6 transition-all duration-200 transform 
                      ${
                        formData.name
                          ? "-translate-y-10 text-sm text-blue-400"
                          : "peer-focus:-translate-y-10 peer-focus:text-sm peer-focus:text-blue-400"
                      }
                      ${
                        !formData.name && !errors.name
                          ? "translate-y-4 text-gray-400"
                          : "-translate-y-10 text-sm"
                      }
                      ${errors.name ? "text-red-400" : ""}`}
                  >
                    Your Name
                  </label>
                  {errors.name && (
                    <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-6 py-4 bg-slate-800/50 rounded-xl border ${
                      errors.email ? "border-red-500" : "border-blue-500/20"
                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-transparent peer`}
                    placeholder="Your Email"
                    id="email"
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-6 transition-all duration-200 transform 
                      ${
                        formData.email
                          ? "-translate-y-10 text-sm text-blue-400"
                          : "peer-focus:-translate-y-10 peer-focus:text-sm peer-focus:text-blue-400"
                      }
                      ${
                        !formData.email && !errors.email
                          ? "translate-y-4 text-gray-400"
                          : "-translate-y-10 text-sm"
                      }
                      ${errors.email ? "text-red-400" : ""}`}
                  >
                    Your Email
                  </label>
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-6 py-4 bg-slate-800/50 rounded-xl border ${
                      errors.message ? "border-red-500" : "border-blue-500/20"
                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-transparent peer`}
                    placeholder="Your Message"
                    id="message"
                  />
                  <label
                    htmlFor="message"
                    className={`absolute left-6 transition-all duration-200 transform 
                      ${
                        formData.message
                          ? "-translate-y-10 text-sm text-blue-400"
                          : "peer-focus:-translate-y-10 peer-focus:text-sm peer-focus:text-blue-400"
                      }
                      ${
                        !formData.message && !errors.message
                          ? "translate-y-4 text-gray-400"
                          : "-translate-y-10 text-sm"
                      }
                      ${errors.message ? "text-red-400" : ""}`}
                  >
                    Your Message
                  </label>
                  {errors.message && (
                    <span className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      {errors.message}
                    </span>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 group relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">
                    {isSubmitting ? "Transmitting..." : "Send Message"}
                  </span>
                  <Send
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isSubmitting
                        ? "translate-x-2"
                        : "group-hover:translate-x-2"
                    }`}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                    initial={{ x: "-100%" }}
                    animate={isSubmitting ? { x: "0%" } : { x: "-100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>
              </div>
            </form>

            {/* Success Message Hologram */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl border border-blue-500/30 shadow-2xl shadow-blue-500/20 text-center"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360],
                    }}
                    transition={{ duration: 1 }}
                    className="mb-4 inline-block text-green-400"
                  >
                    <CheckCircle2 className="w-12 h-12" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-400">I'll get back to you soon.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">
                Connect With Me
              </h3>

              <div className="space-y-6">
                <motion.a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=gandhimit04@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="font-mono">gandhimit04@gmail.com</span>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/mit-gandhi-a3281628a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <span className="font-mono">linkedin.com/in/mit-gandhi</span>
                </motion.a>

                <motion.a
                  href="https://github.com/Mit-Gandhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <Github className="w-6 h-6" />
                  </div>
                  <span className="font-mono">github.com/Mit-Gandhi</span>
                </motion.a>

                <motion.a
                  className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-all duration-300 group cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <span className="font-mono">+91 87995 51850</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
