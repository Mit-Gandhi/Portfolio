import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award } from "lucide-react";

const certifications = [
  {
    date: "HackOverflow 3.0",
    skills: ["Pillai HOC", "22nd March 2025"],
  },
  {
    date: " Tata Imagination Challenge",
    skills: ["Unstop", "29th Nov 2023"],
  },
  {
    date: "EMERGE",
    skills: ["ABLE", "6th Oct 2023"],
  },
  {
    date: "Flipkart GRID 5.0",
    skills: ["Unstop", "30th Aug 2023"],
  },
];

const Achievements = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section className="py-20 px-4 relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Award className="w-8 h-8 text-blue-400" />
            <h2 className="text-4xl font-bold text-white">
              Achievements & Certifications
            </h2>
          </div>
        </motion.div>

        <div className="relative group">
          {/* Certifications Slider */}
          <motion.div className="flex gap-6 overflow-hidden snap-x snap-mandatory pb-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="min-w-[260px] snap-center"
              >
                <motion.div
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="text-sm text-gray-400 mb-4">{cert.date}</div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm bg-blue-500/20 text-blue-300 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
