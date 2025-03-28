import { motion } from "framer-motion";
import { Brain, ChevronDown } from "lucide-react";
import Typewriter from "typewriter-effect";
import { SplineScene } from "./ui/splite";
import { Spotlight } from "./ui/spotlight";

export default function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      <div className="w-full h-[600px] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        <div className="flex flex-col lg:flex-row h-full max-w-7xl mx-auto px-4">
          {/* Left content */}
          <div className="flex-1 p-4 md:p-8 relative z-10 flex flex-col justify-center text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-4 md:space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block p-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg mb-8 shadow-lg shadow-blue-500/10 mx-auto lg:mx-0"
              >
                <Brain className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Mit Gandhi
              </h1>

              <div className="text-lg md:text-xl lg:text-3xl text-gray-300 h-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2">
                <Typewriter
                  options={{
                    strings: [
                      "Machine Learning Engineer",
                      "Data Scientist",
                      "AI Innovator",
                      "Deep Learning Specialist",
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                    delay: 80,
                  }}
                />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed mx-auto lg:mx-0"
              >
                Welcome to my portfolio, where data-driven decision-making meets
                innovation. With a passion for data analytics, machine learning,
                and AI, I transform complex datasets into meaningful insights
                that power intelligent solutions. Explore my work and see how
                data shapes the future.
              </motion.p>

              <div className="mt-16 pt-2">
                <motion.a
                  href="https://drive.google.com/file/d/1eBj0nrz0o_ZZ3J68aNwAK81y3RbmrODo/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 md:px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold shadow-lg hover:shadow-blue-500/20 transition-all duration-300 mx-auto lg:mx-0"
                >
                  Resume
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Right content - 3D Scene */}
          <div className="flex-1 relative mt-8 lg:mt-0 min-h-[300px] md:min-h-[400px]">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      <motion.div
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="bg-gradient-to-b from-transparent via-white/10 to-white/20 p-3 rounded-full backdrop-blur-sm"
        >
          <ChevronDown className="w-6 h-6 text-blue-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
