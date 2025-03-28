import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "AI/ML Research Intern",
    company: "CDAC",
    date: "Feb 2025 - March 2025",
    location: "CBD Belapur",
    achievements: ["Face Recognition and Object Detection from Crowd. "],
    icon: Briefcase,
    color: "blue",
  },
  {
    type: "education",
    title: "Bharati Vidyapeeth College of Engineering",
    company: "B.E. in Department of Computer Engineering",
    date: "2022 - Present",
    location: "Navi Mumbai, Maharashtra",
    achievements: ["GPA: 7.5 / 10"],
    icon: GraduationCap,
    color: "purple",
  },
  {
    type: "education",
    title: "H.M.B Sardar High School",
    company: "HSC - Science",
    date: "2021 - 2022",
    location: "Surat, Gujarat",
    achievements: ["Total: 67%"],
    icon: GraduationCap,
    color: "purple",
  },
];

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section className="py-20 px-4 relative overflow-hidden" ref={ref}>
      {/* Flowing Data Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500/10 rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 1000],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: -Math.random() * 10,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl font-bold text-white text-center mb-16"
        >
          Experience & Education
        </motion.h2>

        <div className="relative">
          {/* Glass Tube */}
          <motion.div
            className="absolute left-1/2 top-0 w-px h-full"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.2), transparent)",
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
            }}
            initial={{ height: 0 }}
            animate={inView ? { height: "100%" } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Glowing Effect */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.4), transparent)",
                  "linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.1), transparent)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex ${
                index % 2 === 0 ? "justify-end" : ""
              } mb-16`}
            >
              {/* Timeline Node */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-slate-900/90 border border-blue-500/30 backdrop-blur-sm flex items-center justify-center z-10"
                whileHover={{ scale: 1.1 }}
              >
                {/* Year Orb */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0.4)",
                      "0 0 0 10px rgba(59, 130, 246, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <exp.icon
                  className={`w-6 h-6 ${
                    exp.color === "blue" ? "text-blue-400" : "text-purple-400"
                  }`}
                />
              </motion.div>

              {/* Content Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? "mr-8" : "ml-8"}`}>
                <motion.div
                  className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.3)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      {exp.title}
                    </h3>
                  </div>

                  <div className="text-blue-400 mb-2">{exp.company}</div>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {exp.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2 text-gray-400"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
