import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Brain, Database, BarChart2, PieChart } from "lucide-react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const skillCategories = [
  {
    name: "Programming",
    icon: Code,
    skills: [
      {
        name: "Python",
        level: 90,
        tools: ["Django", "FastAPI", "NumPy"],
      },
      {
        name: "C++",
        level: 65,
        tools: ["STL", "Boost", "OpenCV"],
      },
      {
        name: "Java",
        level: 45,
        tools: ["Swing", "JavaBeans"],
      },
      {
        name: "JavaScript",
        level: 25,
        tools: ["React", "Node.js", "TypeScript"],
      },
      {
        name: "CSS",
        level: 25,
        tools: ["Tailwind"],
      },
      {
        name: "HTML",
        level: 25,
        tools: ["Hyper Text Markup Language"],
      },
    ],
  },
  {
    name: "Machine Learning",
    icon: Brain,
    skills: [
      {
        name: "Computer Vision",
        level: 100,
        tools: ["OpenCV", "YOLO", "InsightFace", "FaceNet", "IR-SE50"],
      },
      {
        name: "TensorFlow",
        level: 90,
        tools: ["Keras"],
      },
      {
        name: "PyTorch",
        level: 88,
        tools: ["Lightning", "TorchServe"],
      },
      {
        name: "Scikit-learn",
        level: 85,
        tools: ["Pipeline", "GridSearch"],
      },
      {
        name: "Gen AI",
        level: 80,
        tools: ["Pix2Pix", "CycleGAN"],
      },
      {
        name: "NLP",
        level: 60,
        tools: ["Transformers", "BERT"],
      },
    ],
  },
  {
    name: "Extras",
    icon: Database,
    skills: [
      { name: "SQL", level: 80, tools: [] },
      { name: "PowerBI", level: 75, tools: [] },
      { name: "Firebase", level: 65, tools: [] },
      { name: "Docker", level: 40, tools: [] },
    ],
  },
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isRadarView, setIsRadarView] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const currentCategory = skillCategories.find(
    (cat) => cat.name === activeCategory
  );

  const radarData = {
    labels: currentCategory?.skills.map((skill) => skill.name) || [],
    datasets: [
      {
        label: activeCategory,
        data: currentCategory?.skills.map((skill) => skill.level) || [],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(147, 51, 234, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(147, 51, 234, 1)",
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          color: "rgba(255, 255, 255, 0.5)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        angleLines: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        pointLabels: {
          color: "rgba(255, 255, 255, 0.7)",
          font: {
            size: 12,
            family: "Inter var",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    animation: {
      duration: 2000,
    },
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden" ref={ref}>
      {/* Matrix-style Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-500 text-xs"
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

      {/* Ambient Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Skills & Expertise
          </h2>
        </motion.div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm rounded-full p-1 flex gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <motion.button
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                isRadarView ? "bg-blue-500 text-white" : "text-gray-400"
              }`}
              onClick={() => setIsRadarView(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PieChart className="w-4 h-4" />
              Radar
            </motion.button>
            <motion.button
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                !isRadarView ? "bg-blue-500 text-white" : "text-gray-400"
              }`}
              onClick={() => setIsRadarView(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart2 className="w-4 h-4" />
              Bars
            </motion.button>
          </motion.div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillCategories.map((category) => (
            <motion.button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-6 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.name
                  ? "bg-blue-500/20 border-blue-500/50 text-white shadow-lg shadow-blue-500/20"
                  : "bg-slate-800/50 border-white/5 text-gray-400 hover:border-blue-500/30"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="w-5 h-5" />
              {category.name}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Radar/Bar Chart */}
          <motion.div
            className="relative aspect-square max-w-xl mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full animate-pulse" />
            <div className="relative z-10">
              {isRadarView ? (
                <Radar data={radarData} options={radarOptions} />
              ) : (
                <div className="space-y-4">
                  {currentCategory?.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-white">{skill.name}</span>
                        <span className="text-blue-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Skill Details */}
          <div className="grid grid-cols-2 gap-4 relative">
            {currentCategory?.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="relative group"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                style={{ zIndex: hoveredSkill === skill.name ? 50 : 1 }}
              >
                <motion.div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {skill.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="w-1 h-1 bg-gray-500 rounded-full" />
                    <span>{skill.level}% proficiency</span>
                  </div>
                </motion.div>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredSkill === skill.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="fixed transform -translate-x-1/2 left-1/2 mt-2 w-72 p-4 bg-slate-800/90 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl shadow-black/20"
                      style={{
                        top: `calc(${index >= 3 ? "0%" : "100%"} + ${
                          index >= 3 ? "-120px" : "10px"
                        })`,
                        zIndex: 100,
                      }}
                    >
                      <div className="text-sm text-gray-300">
                        <strong className="text-blue-400">
                          Tools & Technologies:
                        </strong>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {skill.tools.map((tool) => (
                            <span
                              key={tool}
                              className="px-2 py-1 bg-blue-500/20 rounded-full text-xs text-blue-300"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
