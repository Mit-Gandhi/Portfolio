import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Brain, X } from "lucide-react";
import dp from "../../public/dp.jpg";

const skills = [
  {
    category: "Programming",
    icon: Code,
    items: [{ name: "Python" }, { name: "Java" }, { name: "C++" }],
  },
  {
    category: "ML Frameworks",
    icon: Brain,
    items: [
      { name: "TensorFlow" },
      { name: "PyTorch" },
      { name: "Scikit-learn" },
    ],
  },
];

const shortBio = `Hi, I'm Mit Gandhi, a data enthusiast specializing in analytics, AI, and machine learning. I turn data into insights and build intelligent solutions. Welcome to my portfolio!`;

const fullBio = `Hi, I'm Mit Gandhi, a data enthusiast passionate about transforming raw data into actionable insights. With expertise in data analytics, machine learning and AI, I specialize in building intelligent solutions that drive innovation and efficiency.

I thrive on solving complex problems, uncovering hidden patterns in data, and leveraging AI to make smarter decisions. Whether it's predictive modeling, deep learning, or data visualization, my work is driven by curiosity and a commitment to excellence.
Welcome to my portfolio—where data meets intelligence and possibilities become reality.`;

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section id="about" className="min-h-screen py-20 px-4 relative" ref={ref}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-[500px] mx-auto">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 mix-blend-overlay" />
                <img
                  src={dp}
                  alt="Mit Gandhi"
                  className="w-full h-full object-cover"
                />

                {/* Hologram Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Scan Line */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent"
                  style={{ height: "2px" }}
                  animate={{
                    y: [0, 400, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl -z-10 blur-xl" />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <h2 className="text-4xl font-bold text-white mb-4">Mit Gandhi</h2>
              <h3 className="text-xl text-blue-400 mb-6">
                Machine Learning Enthusiast
              </h3>

              <p className="text-gray-300 mb-6 leading-relaxed">{shortBio}</p>

              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Read More
              </motion.button>
            </div>

            {/* Skills Matrix */}
            <div className="mt-12 space-y-8">
              {skills.map((category) => (
                <div key={category.category} className="space-y-4">
                  <div className="flex items-center gap-3 text-white mb-4">
                    <category.icon className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold">
                      {category.category}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {category.items.map((skill) => (
                      <motion.div
                        key={skill.name}
                        className="relative group"
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 transition-all duration-300 group-hover:bg-white/10 group-hover:border-blue-500/30">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300 group-hover:text-white transition-colors">
                              {skill.name}
                            </span>
                          </div>
                        </div>

                        {/* Floating Particles Effect */}
                        {hoveredSkill === skill.name && (
                          <div className="absolute inset-0 pointer-events-none">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                                initial={{
                                  x: "50%",
                                  y: "50%",
                                  opacity: 0,
                                }}
                                animate={{
                                  x: `${50 + (Math.random() * 100 - 50)}%`,
                                  y: `${50 + (Math.random() * 100 - 50)}%`,
                                  opacity: [0, 1, 0],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full Bio Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 max-w-2xl w-full border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">About Me</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="prose prose-invert">
                {fullBio.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-gray-300 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
