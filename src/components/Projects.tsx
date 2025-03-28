import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, X } from "lucide-react";
import img1 from "../../public/1.jpg";
import img2 from "../../public/2.jpg";
import img3 from "../../public/3.jpg";

const projects = [
  {
    title: "CrimeVision AI",
    description:
      "The AI system analyzes CCTV and real-time video, and face recognition for accurate criminal detection.",
    longDescription: `This AI-driven system enhances criminal detection by analyzing both CCTV footage and real-time video feeds. It integrates advanced GAN-based sketch-to-image conversion, face detection, and face recognition to identify suspects with high accuracy. The system enables law enforcement and security agencies to recognize individuals using AI-enhanced facial analysis, reducing manual effort in video surveillance.`,
    image: img1,
    tech: ["Pix2Pix", "IR-SE50", "TypeScript"],
    github: "https://github.com/Mit-Gandhi/HackOverflow-AI_Mavericks",
  },
  {
    title: "Brain Tumor Detection",
    description:
      "The project uses the YOLOv11 model (Sept 2024) to analyze MRI scans and detect brain tumors.",
    longDescription: `Here, in this project we are using YOLOv11 model released in Sept 2024 to analyze the MRI scans of brain and then detect tumor from that MRI scans.`,
    image: img2,
    tech: ["Python", "FastAPI", "React.js"],
    github: "https://github.com/Mit-Gandhi/Brain-Tumor-Detection",
  },
  {
    title: "Live Monitoring System",
    description:
      "The system converts criminal sketches into images and automatically processes them for surveillance.",
    longDescription: `In this project, we have made a surveillance system that continuously monitors for criminals. We have to upload the sketch of the criminal and it will be converted into images using Pix2Pix GAN. After that using pipelining the image will be sent automatically for surveillance to find that criminal.`,
    image: img3,
    tech: ["Pytorch", "Insightface", "OpenCV"],
    github: "https://github.com/Mit-Gandhi/HECHack-Backend_",
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const projectContentRef = useRef<HTMLDivElement>(null);

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const handleScroll = () => {
    if (projectContentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        projectContentRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);
    }
  };

  return (
    <section className="py-20 px-4 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
              style={{
                perspective: "1000px",
              }}
            >
              <motion.div
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 border border-white/5"
                whileHover={{
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                onClick={() => setSelectedProject(index)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-blue-500/20 text-blue-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900/90 backdrop-blur-xl rounded-2xl w-full max-w-4xl max-h-[80vh] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 rounded-t-2xl overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>

              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h3 className="text-2xl font-bold text-white">
                  {projects[selectedProject].title}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div
                ref={projectContentRef}
                className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]"
                onScroll={handleScroll}
              >
                <img
                  src={projects[selectedProject].image}
                  alt={projects[selectedProject].title}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />

                <div className="prose prose-invert max-w-none">
                  {projects[selectedProject].longDescription
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-gray-300 mb-4 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[selectedProject].tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <motion.a
                    href={projects[selectedProject].github}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-5 h-5" />
                    View Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
