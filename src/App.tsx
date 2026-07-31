"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const navItems = [
  ["首页", "home"],
  ["关于我", "about"],
  ["作品项目", "projects"],
  ["专业能力", "skills"],
  ["联系我", "contact"],
];

type DesignTool = {
  name: string;
  mark: string;
  className: string;
  image?: string;
};

const designTools: DesignTool[] = [
  { name: "PHOTOSHOP", mark: "Ps", className: "tool-photoshop" },
  { name: "ILLUSTRATOR", mark: "Ai", className: "tool-illustrator" },
  { name: "FIGMA", mark: "", className: "tool-figma" },
  { name: "PREMIERE PRO", mark: "Pr", className: "tool-premiere" },
  {
    name: "BLENDER",
    mark: "",
    className: "tool-blender",
    image: "tool-blender.png",
  },
  {
    name: "CHATGPT",
    mark: "",
    className: "tool-chatgpt",
    image: "tool-chatgpt.png",
  },
  { name: "GEMINI", mark: "✦", className: "tool-gemini" },
  { name: "MIDJOURNEY", mark: "M", className: "tool-midjourney" },
  { name: "STABLE DIFFUSION", mark: "SD", className: "tool-stable" },
  { name: "LIBLIBAI", mark: "Li", className: "tool-liblib" },
];

const isProjectRoute = (hash: string) => hash.startsWith("#/project/");

const projects = [
  {
    no: "01",
    title: "小米汽车视觉物料",
    tags: ["品牌视觉", "商业宣传"],
    className: "project-xiaomi",
    image: "xiaomi-auto.jpg",
    caption: "XIAOMI AUTO / VISUAL CAMPAIGN",
  },
  {
    no: "02",
    title: "西瓜创客·科学创造训练营教育营销长图",
    tags: ["新媒体运营设计", "教育类活动视觉"],
    className: "project-xigua",
    image: "xigua-camp.jpg",
    caption: "STEM CAMP / SOCIAL CAMPAIGN",
  },
  {
    no: "03",
    title: "BARBIEPUFF 箱包品牌设计与产品包装",
    tags: ["品牌 VI", "包装设计"],
    className: "project-barbie",
    image: "barbiepuff.jpg",
    caption: "BARBIEPUFF / BRAND IDENTITY",
  },
  {
    no: "04",
    title: "小红书宠物治愈 VLOG 创作大赛",
    tags: ["活动视觉", "新媒体运营"],
    className: "project-pet",
    image: "pet-vlog.jpg",
    caption: "PET VLOG / EVENT DESIGN",
  },
  {
    no: "05",
    title: "天猫双 12 年终大促",
    tags: ["电商视觉", "运营设计"],
    className: "project-tmall",
    image: "tmall-1212.jpg",
    caption: "TMALL 12.12 / E-COMMERCE",
  },
  {
    no: "06",
    title: "多元风格 3D 场景建模",
    subtitle: "紫调轻筑云庭、粉绒兔居甜岛",
    tags: ["三维建模", "C4D 视觉"],
    className: "project-3d",
    image: "3d-scene.jpg",
    caption: "3D SPACE / VISUAL EXPLORATION",
  },
  {
    no: "07",
    title: "今日心象天气",
    tags: ["交互式网页", "UI 设计"],
    className: "project-weather",
    image: "mood-weather.jpg",
    caption: "MOOD WEATHER / INTERACTIVE UI",
  },
];

const abilities = [
  {
    no: "01",
    en: "DESIGN",
    title: "设计能力",
    items: [
      "品牌 VI 视觉搭建、Logo 与包装设计",
      "商业海报、新媒体长图、全平台宣传物料",
      "电商大促活动运营视觉",
      "教育类营销视觉策划",
      "3D 场景建模渲染",
      "网页 UI 界面设计",
    ],
  },
  {
    no: "02",
    en: "AIGC",
    title: "AIGC 创意能力",
    items: [
      "AI 视觉草图生成、商业素材迭代",
      "概念图创作与画面方向探索",
      "AI 辅助商业方案落地",
      "画面风格统一管控",
      "图文创意结合，提升设计产出效率",
    ],
  },
  {
    no: "03",
    en: "TOOLKIT",
    title: "软件工具栈",
    items: [
      "Photoshop",
      "Illustrator",
      "Figma",
      "Premiere Pro",
      "Blender",
      "ChatGPT",
      "Gemini",
      "Midjourney",
      "Stable Diffusion",
      "LiblibAI",
    ],
  },
  {
    no: "04",
    en: "PROFILE",
    title: "个人核心特质",
    items: [
      "美术专业功底 + 成熟商业设计思维",
      "平衡艺术美感与品牌商业转化",
      "驾驭汽车、消费品牌、少儿教育与文创风格",
      "大厂实习完整项目推进经验",
      "跨团队协作与全链路交付",
    ],
  },
];

const reveal = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function SectionHeading({
  eyebrow,
  title,
  index,
  light = false,
}: {
  eyebrow: string;
  title: string;
  index: string;
  light?: boolean;
}) {
  return (
    <motion.div
      className={`section-heading ${light ? "section-heading-light" : ""}`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <span className="section-index">/ {index}</span>
    </motion.div>
  );
}

function ProjectPixelReveal() {
  const layerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let resetTimer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        layer.classList.add("is-revealing");
        resetTimer = window.setTimeout(() => {
          layer.classList.remove("is-revealing");
          layer.classList.add("has-revealed");
        }, 1750);
        observer.unobserve(layer);
      },
      { threshold: 0.24 },
    );

    observer.observe(layer);
    return () => {
      observer.disconnect();
      window.clearTimeout(resetTimer);
    };
  }, []);

  return (
    <span ref={layerRef} className="project-pixel-reveal" aria-hidden="true">
      {Array.from({ length: 96 }, (_, cellIndex) => {
        const row = Math.floor(cellIndex / 12);
        const jitter = (cellIndex * 17) % 9;

        return (
          <i
            key={cellIndex}
            style={{
              animationDelay: `${(7 - row) * 34 + jitter * 13}ms`,
            }}
          />
        );
      })}
    </span>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-shell">
      <div className="nav-inner">
        <a className="brand-mark" href="#home" aria-label="返回首页">
          CKG<span>°</span>
        </a>
        <nav
          id="primary-navigation"
          className={open ? "nav-links open" : "nav-links"}
          aria-label="主导航"
        >
          {navItems.map(([label, href]) => (
            <a key={href} href={`#${href}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-side">
          <span>FUZHOU · CHINA</span>
          <button
            className="menu-button"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="primary-navigation"
            aria-label={open ? "关闭导航菜单" : "打开导航菜单"}
          >
            {open ? "关闭" : "菜单"}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const section = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 20, mass: 0.5 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 20, mass: 0.5 });
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.68, 1], [1, 0.82, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const objectX = useTransform(smoothX, [-1, 1], [-58, 58]);
  const objectY = useTransform(smoothY, [-1, 1], [-38, 38]);
  const objectRotateX = useTransform(smoothY, [-1, 1], [14, -14]);
  const objectRotateY = useTransform(smoothX, [-1, 1], [-17, 17]);
  const glowLeft = useTransform(smoothX, [-1, 1], ["12%", "88%"]);
  const glowTop = useTransform(smoothY, [-1, 1], ["16%", "84%"]);
  const counterGlowLeft = useTransform(smoothX, [-1, 1], ["78%", "24%"]);
  const counterGlowTop = useTransform(smoothY, [-1, 1], ["68%", "22%"]);

  return (
    <section
      ref={section}
      className="hero"
      id="home"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
        pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <div className="hero-loader" aria-hidden="true">
        <span>CKG° / PORTFOLIO</span>
        <i />
      </div>
      <motion.div
        className="hero-backdrop"
        style={{ y: prefersReducedMotion ? 0 : backgroundY }}
        aria-hidden="true"
      >
        <div className="hero-grid" />
        <div className="hero-light light-one" />
        <div className="hero-light light-two" />
        <motion.div
          className="cursor-light cursor-light-primary"
          style={{ left: glowLeft, top: glowTop }}
        />
        <motion.div
          className="cursor-light cursor-light-secondary"
          style={{ left: counterGlowLeft, top: counterGlowTop }}
        />
        <motion.div
          className="hero-reactive-object"
          style={
            prefersReducedMotion
              ? undefined
              : {
                  x: objectX,
                  y: objectY,
                  rotateX: objectRotateX,
                  rotateY: objectRotateY,
                }
          }
        >
          <div className="glass-loop loop-one" />
          <div className="glass-loop loop-two" />
          <div className="glass-core">
            <span>CKG</span>
          </div>
          <img
            className="cursor-glyph"
            src={`${import.meta.env.BASE_URL}hero-metal-cursor-cutout.png`}
            alt=""
            aria-hidden="true"
          />
        </motion.div>
      </motion.div>
      <motion.div
        className="container hero-content"
        style={
          prefersReducedMotion
            ? undefined
            : { y: titleY, opacity: heroOpacity, scale: heroScale }
        }
      >
        <div className="hero-kicker">
          <span>PORTFOLIO 2023—2026 / FUZHOU</span>
          <span>MOVE YOUR CURSOR / 001</span>
        </div>
        <motion.div
          className="hero-title-block"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero-name">陈琨戈</p>
          <h1>
            视觉 <i>·</i> 品牌 <i>·</i>
            <br />
            <span>AIGC</span> 创意设计师
          </h1>
          <div className="hero-subline">
            <p>以像素筑形，让美感发声。</p>
            <span>VISUAL DESIGNER / BRAND DESIGNER / AIGC CREATIVE</span>
          </div>
        </motion.div>
        <div className="hero-footer">
          <a href="#projects" className="round-link" aria-label="浏览作品">
            <span>浏览作品</span>
            <b>↘</b>
          </a>
          <div className="scroll-hint">
            <span />
            SCROLL TO DISCOVER
          </div>
        </div>
      </motion.div>
      <a className="floating-contact" href="#contact">
        获取作品集 <span>↗</span>
      </a>
    </section>
  );
}

function AboutTextSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sliderRef,
    offset: ["start end", "end start"],
  });
  const firstLineX = useTransform(scrollYProgress, [0, 1], ["-4%", "-34%"]);
  const secondLineX = useTransform(scrollYProgress, [0, 1], ["-34%", "-4%"]);

  return (
    <div className="about-text-slider" ref={sliderRef} aria-hidden="true">
      <motion.div style={reduceMotion ? undefined : { x: firstLineX }}>
        {[0, 1, 2].map((copy) => (
          <span key={copy}>
            视觉设计 <i>·</i> 品牌表达 <i>·</i> AIGC 创意 <i>·</i> 三维视觉
            <i>·</i>
          </span>
        ))}
      </motion.div>
      <motion.div
        className="about-text-slider-outline"
        style={reduceMotion ? undefined : { x: secondLineX }}
      >
        {[0, 1, 2].map((copy) => (
          <span key={copy}>
            VISUAL DESIGN <i>·</i> BRAND SYSTEM <i>·</i> AI CREATIVE <i>·</i>
            DIGITAL EXPERIENCE <i>·</i>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <SectionHeading eyebrow="ABOUT ME" title="关于我" index="02" />
        <AboutTextSlider />
        <div className="about-grid">
          <motion.div
            className="portrait-frame"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <img
              src={`${import.meta.env.BASE_URL}profile/chen-kunge.jpg`}
              alt="视觉设计师陈琨戈个人照片"
            />
            <span>CHEN KUNGE / VISUAL DESIGNER</span>
          </motion.div>
          <motion.div
            className="about-copy"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
          >
            <div className="about-intro">
              <span className="small-label">PROFILE / 个人介绍</span>
              <h3>
                以美学理论为底，
                <br />
                用商业思维让创意<span>落地。</span>
              </h3>
              <p>
                福州大学 211 本科｜美术学专业。拥有小米汽车创意设计部、西瓜创客两段视觉设计实习经历。擅长品牌视觉搭建、电商活动运营设计、新媒体营销长图、活动视觉策划，熟练运用 AIGC 工具赋能创意产出，具备 3D 建模、交互网页设计能力。
              </p>
              <p>
                兼顾美学理论与商业落地思维，能够独立完成从品牌视觉策划、物料设计到活动视觉全链路工作。持续探索传统美术与 AI 创意、三维视觉结合的视觉表达。
              </p>
            </div>
            <div className="about-details">
              <div className="detail-block basic-info">
                <div className="detail-title">
                  <span>基础信息</span>
                  <em>BASIC INFO</em>
                </div>
                <dl>
                  <div>
                    <dt>院校</dt>
                    <dd>福州大学（211）</dd>
                  </div>
                  <div>
                    <dt>专业</dt>
                    <dd>美术学 · 本科</dd>
                  </div>
                  <div>
                    <dt>方向</dt>
                    <dd>品牌 / 视觉 / AIGC</dd>
                  </div>
                </dl>
              </div>
              <div className="detail-block experience">
                <div className="detail-title">
                  <span>实习经历</span>
                  <em>WORK EXPERIENCE</em>
                </div>
                <div className="timeline-row">
                  <b>小米汽车</b>
                  <span>创意设计部 · 视觉设计实习生</span>
                  <time>2026.05</time>
                </div>
                <div className="timeline-row">
                  <b>西瓜创客</b>
                  <span>视觉设计实习生</span>
                  <time>2025.12</time>
                </div>
              </div>
              <div className="detail-block project-summary">
                <div className="detail-title">
                  <span>项目概述</span>
                  <em>PROJECT OVERVIEW</em>
                </div>
                <p>
                  覆盖汽车、教育、电商、品牌、活动与交互网页等多元项目类型，积累从策略梳理、视觉概念到终端延展的完整设计实践。
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <SectionHeading eyebrow="SELECTED WORKS" title="作品项目" index="03" light />
        <div className="project-grid">
          {projects.map((project, index) => (
            <motion.article
              className="project-card"
              key={project.no}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
              transition={{ delay: (index % 2) * 0.08 }}
              whileHover={{ y: -8 }}
            >
              {["01", "02", "03", "04", "05", "06", "07"].includes(project.no) && (
                <a
                  className="project-detail-link"
                  href={
                    project.no === "01"
                      ? "#/project/xiaomi-auto"
                      : project.no === "02"
                        ? "#/project/xigua-camp"
                        : project.no === "03"
                          ? "#/project/barbiepuff"
                          : project.no === "04"
                            ? "#/project/pet-vlog"
                            : project.no === "05"
                              ? "#/project/tmall-1212"
                              : project.no === "06"
                                ? "#/project/3d-scene"
                                : "https://chen-web-demo.pages.dev"
                  }
                  aria-label={
                    project.no === "07"
                      ? "打开今日心象天气互动网站"
                      : `查看${project.title}项目详情`
                  }
                />
              )}
              <div className={`project-cover ${project.className}`}>
                <img
                  className="project-image"
                  src={`${import.meta.env.BASE_URL}projects/${project.image}`}
                  alt={`${project.title}项目封面`}
                  loading="lazy"
                />
                <ProjectPixelReveal />
                <span className="project-cover-caption">{project.caption}</span>
              </div>
              <div className="project-meta">
                <span className="project-no">/ {project.no}</span>
                <div>
                  <h3>{project.title}</h3>
                  {project.subtitle && <p>{project.subtitle}</p>}
                  <ul>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <span className="project-arrow">↗</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AbilityCanvas({ index }: { index: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let frame = 0;
    let width = 0;
    let height = 0;
    let ratio = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const roundedRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      radius: number,
    ) => {
      context.beginPath();
      context.roundRect(x, y, w, h, radius);
    };

    const draw = (now = 0) => {
      const time = reduceMotion ? 0 : now / 1000;
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(width / 2, height / 2);
      context.shadowColor = "rgba(71, 94, 160, 0.16)";
      context.shadowBlur = 22;

      if (index === 0) {
        const ringText =
          "DESIGN · BRAND · VISUAL · MOTION · DESIGN · BRAND · VISUAL · ";
        const tiltX = 0.82 + Math.sin(time * 0.32) * 0.13;
        const tiltZ = -0.2 + Math.cos(time * 0.27) * 0.08;
        const spin = time * 0.48;
        const radiusX = Math.min(width * 0.35, 180);
        const radiusY = Math.min(height * 0.44, 78);

        const rotatePoint = (angle: number) => {
          let x = Math.cos(angle + spin);
          let y = 0;
          let z = Math.sin(angle + spin);

          const y1 = y * Math.cos(tiltX) - z * Math.sin(tiltX);
          const z1 = y * Math.sin(tiltX) + z * Math.cos(tiltX);
          y = y1;
          z = z1;

          const x2 = x * Math.cos(tiltZ) - y * Math.sin(tiltZ);
          const y2 = x * Math.sin(tiltZ) + y * Math.cos(tiltZ);
          x = x2;
          y = y2;

          const perspective = 1 / (1.24 - z * 0.22);
          return {
            x: x * radiusX * perspective,
            y: y * radiusY * perspective,
            z,
            perspective,
          };
        };

        const glass = context.createRadialGradient(
          -width * 0.05,
          -height * 0.08,
          0,
          0,
          0,
          Math.min(width, height) * 0.46,
        );
        glass.addColorStop(0, "rgba(255, 255, 255, 0.72)");
        glass.addColorStop(0.52, "rgba(174, 196, 242, 0.3)");
        glass.addColorStop(1, "rgba(109, 139, 222, 0.08)");
        context.fillStyle = glass;
        context.beginPath();
        context.ellipse(0, 0, width * 0.19, height * 0.34, tiltZ, 0, Math.PI * 2);
        context.fill();
        context.strokeStyle = "rgba(94, 122, 202, 0.24)";
        context.lineWidth = 1;
        context.stroke();

        const characters = ringText.split("").map((char, characterIndex) => {
          const angle = (characterIndex / ringText.length) * Math.PI * 2;
          const point = rotatePoint(angle);
          const next = rotatePoint(angle + 0.012);
          return { char, point, next };
        });

        characters
          .sort((a, b) => a.point.z - b.point.z)
          .forEach(({ char, point, next }) => {
            context.save();
            context.translate(point.x, point.y);
            context.rotate(Math.atan2(next.y - point.y, next.x - point.x));
            const depth = (point.z + 1) / 2;
            context.globalAlpha = 0.28 + depth * 0.72;
            context.fillStyle =
              depth > 0.5 ? "rgba(43, 61, 119, 0.96)" : "rgba(91, 117, 188, 0.72)";
            context.font = `${600 + Math.round(depth * 100)} ${Math.max(
              9,
              11 * point.perspective,
            )}px "Helvetica Neue", Arial, sans-serif`;
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.shadowColor = "rgba(255, 255, 255, 0.55)";
            context.shadowBlur = depth > 0.5 ? 4 : 0;
            context.fillText(char, 0, 0);
            context.restore();
          });
      } else if (index === 1) {
        for (let layer = 0; layer < 6; layer += 1) {
          const phase = time * 1.75 - layer * 0.5;
          const pulse = 1 + Math.sin(phase) * 0.13;
          const sway = Math.cos(phase * 0.82) * width * 0.045;
          const bob = Math.sin(phase * 1.08) * height * 0.025;
          const boxWidth = width * (0.82 - layer * 0.105) * pulse;
          const y = -height * 0.43 + layer * height * 0.145 + bob;
          const gradient = context.createLinearGradient(-boxWidth / 2, y, boxWidth / 2, y);
          gradient.addColorStop(0, "rgba(199, 211, 247, 0.72)");
          gradient.addColorStop(1, "rgba(121, 149, 226, 0.78)");
          context.fillStyle = gradient;
          roundedRect(-boxWidth / 2 + sway, y, boxWidth, height * 0.22, 10);
          context.fill();
        }
      } else if (index === 2) {
        const radius = Math.min(width * 0.155, height * 0.43);
        for (let layer = 0; layer < 7; layer += 1) {
          const phase = (time * 0.055 + layer / 7) % 1;
          const x = -width * 0.64 + phase * width * 1.28;
          const y = Math.sin(time * 0.7 + layer * 0.8) * height * 0.035;
          const gradient = context.createRadialGradient(
            x - radius * 0.25,
            y - radius * 0.25,
            radius * 0.1,
            x,
            y,
            radius,
          );
          gradient.addColorStop(0, "rgba(226, 232, 252, 0.96)");
          gradient.addColorStop(1, "rgba(117, 146, 226, 0.78)");
          context.fillStyle = gradient;
          context.beginPath();
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.fill();
        }
      } else {
        for (let layer = 0; layer < 7; layer += 1) {
          const phase = time * 1.12 - layer * 0.32;
          const breathe = 1 + Math.cos(phase * 0.86) * 0.11;
          const size =
            Math.min(width, height) * (0.88 - layer * 0.105) * breathe;
          const turn = Math.sin(phase) * 0.2;
          const swayX = Math.sin(phase * 0.72) * width * 0.055;
          const swayY = Math.cos(phase * 0.9) * height * 0.045;
          context.save();
          context.translate(swayX, swayY);
          context.rotate(Math.PI / 4 + turn);
          context.fillStyle =
            layer % 2 === 0
              ? `rgba(132, 158, 231, ${0.3 + layer * 0.055})`
              : `rgba(222, 229, 250, ${0.66 + layer * 0.035})`;
          roundedRect(-size / 2, -size / 2, size, size, 8);
          context.fill();
          context.restore();
        }
      }

      context.restore();
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw();
    });
    observer.observe(canvas);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [index, reduceMotion]);

  return <canvas ref={canvasRef} className="ability-canvas" />;
}

function AbilityCard({
  ability,
  index,
}: {
  ability: (typeof abilities)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.96", "start 0.22"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.68, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [180, 0]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -3.5 : 3.5, 0],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.18, 1], [0.2, 0.72, 1]);

  return (
    <div className="ability-card-step">
      <motion.article
        ref={cardRef}
        className="ability-card"
        style={
          reduceMotion
            ? undefined
            : { scale, y, rotate, opacity, zIndex: index + 1 }
        }
        whileHover={reduceMotion ? undefined : { y: -8 }}
      >
        <div className="ability-visual" aria-hidden="true">
          <span className="ability-visual-index">0{index + 1}</span>
          <AbilityCanvas index={index} />
        </div>
        <div className="ability-top">
          <span>{ability.no}</span>
          <em>{ability.en}</em>
        </div>
        <h3>{ability.title}</h3>
        {ability.no === "03" ? (
          <div className="ability-tool-grid">
            {designTools.map((tool) => (
              <span className="ability-tool-item" key={tool.name}>
                <i
                  className={`tool-icon ${tool.className}`}
                  aria-hidden="true"
                >
                  {tool.image ? (
                    <img
                      src={`${import.meta.env.BASE_URL}${tool.image}`}
                      alt=""
                    />
                  ) : (
                    tool.mark
                  )}
                </i>
                <b>{tool.name}</b>
              </span>
            ))}
          </div>
        ) : (
          <ul>
            {ability.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </motion.article>
    </div>
  );
}

function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <div className="skills-intro">
          <SectionHeading eyebrow="CAPABILITIES" title="专业能力" index="04" />
          <p>从概念到落地，持续把设计判断转化为清晰、完整且可执行的视觉结果。</p>
          <div className="tool-marquee" aria-label="常用设计工具">
            <div className="tool-marquee-track">
              {[0, 1].map((groupIndex) => (
                <div
                  className="tool-marquee-group"
                  key={groupIndex}
                  aria-hidden={groupIndex === 1}
                >
                  {designTools.map((tool) => (
                    <span className="tool-item" key={tool.name}>
                      <i
                        className={`tool-icon ${tool.className}`}
                        aria-hidden="true"
                      >
                        {tool.image ? (
                          <img
                            src={`${import.meta.env.BASE_URL}${tool.image}`}
                            alt=""
                          />
                        ) : (
                          tool.mark
                        )}
                      </i>
                      <b>{tool.name}</b>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ability-stack">
          {abilities.map((ability, index) => (
            <AbilityCard key={ability.no} ability={ability} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="container contact-inner">
        <SectionHeading eyebrow="LET'S CREATE" title="联系我" index="05" light />
        <motion.div
          className="contact-main"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p>有项目、合作或只是想聊聊设计？</p>
          <h2>与我取得联系<span>。</span></h2>
          <a className="mail-link" href="mailto:3262283707@qq.com">
            3262283707@qq.com <span>↗</span>
          </a>
        </motion.div>
        <div className="contact-lower">
          <div className="contact-info">
            <div>
              <span>WECHAT / 微信</span>
              <strong>13253672956</strong>
            </div>
            <div>
              <span>BASED IN / 所在地</span>
              <strong>Fuzhou, China</strong>
            </div>
          </div>
          <div className="qr-placeholder">
            <img
              src={`${import.meta.env.BASE_URL}contact/wechat-qr.jpg`}
              alt="陈琨戈微信二维码"
              loading="lazy"
            />
            <span>WECHAT QR / 扫码联系</span>
          </div>
        </div>
        <footer>
          <span>© 2026 陈琨戈 · ALL RIGHTS RESERVED</span>
          <a href="#home">BACK TO TOP ↑</a>
        </footer>
      </div>
    </section>
  );
}

function XiaomiProjectDetail() {
  const detailImages = ["detail-01.jpg", "detail-03.jpg", "detail-02.jpg"];

  return (
    <main className="project-detail-page">
      <header className="detail-nav">
        <a className="brand-mark" href={`${import.meta.env.BASE_URL}#home`}>
          CKG<span>°</span>
        </a>
        <span>PROJECT / 01</span>
        <a className="detail-back" href={`${import.meta.env.BASE_URL}#projects`}>
          返回作品列表 <b>↙</b>
        </a>
      </header>

      <section className="detail-hero">
        <div className="detail-hero-index">01</div>
        <div>
          <p>BRAND VISUAL / COMMERCIAL CAMPAIGN</p>
          <h1>小米汽车视觉物料</h1>
          <ul>
            <li>品牌视觉</li>
            <li>商业宣传</li>
            <li>社媒营销海报</li>
          </ul>
        </div>
        <span className="detail-scroll">SCROLL TO VIEW ↓</span>
      </section>

      <section className="detail-gallery" aria-label="小米汽车项目作品">
        {detailImages.map((image, index) => (
          <motion.img
            key={image}
            src={`${import.meta.env.BASE_URL}projects/xiaomi-auto/${image}`}
            alt={`小米汽车视觉物料项目展示 ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.03 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </section>

      <footer className="detail-footer">
        <div>
          <span>END OF PROJECT</span>
          <h2>感谢观看。</h2>
        </div>
        <a href={`${import.meta.env.BASE_URL}#projects`}>
          返回全部作品 <span>↗</span>
        </a>
      </footer>
    </main>
  );
}

function XiguaProjectDetail() {
  const detailImages = [
    "detail-01.jpg",
    "detail-02.jpg",
    "detail-03.jpg",
    "detail-04.jpg",
    "detail-05.jpg",
    "detail-06.jpg",
  ];

  return (
    <main className="project-detail-page xigua-detail-page">
      <header className="detail-nav">
        <a className="brand-mark" href={`${import.meta.env.BASE_URL}#home`}>
          CKG<span>°</span>
        </a>
        <span>PROJECT / 02</span>
        <a className="detail-back" href={`${import.meta.env.BASE_URL}#projects`}>
          返回作品列表 <b>↙</b>
        </a>
      </header>

      <section className="detail-hero">
        <div className="detail-hero-index">02</div>
        <div>
          <p>EDUCATION CAMPAIGN / SOCIAL MEDIA DESIGN</p>
          <h1>西瓜创客·科学创造训练营</h1>
          <ul>
            <li>新媒体运营设计</li>
            <li>教育类活动视觉</li>
            <li>营销长图</li>
          </ul>
        </div>
        <span className="detail-scroll">SCROLL TO VIEW ↓</span>
      </section>

      <section className="detail-gallery" aria-label="西瓜创客项目作品">
        {detailImages.map((image, index) => (
          <motion.img
            key={image}
            src={`${import.meta.env.BASE_URL}projects/xigua-camp/${image}`}
            alt={`西瓜创客科学创造训练营项目展示 ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.03 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </section>

      <footer className="detail-footer">
        <div>
          <span>END OF PROJECT</span>
          <h2>感谢观看。</h2>
        </div>
        <a href={`${import.meta.env.BASE_URL}#projects`}>
          返回全部作品 <span>↗</span>
        </a>
      </footer>
    </main>
  );
}

function BarbiePuffProjectDetail() {
  const detailImages = Array.from(
    { length: 14 },
    (_, index) => `detail-${String(index + 1).padStart(2, "0")}.jpg`,
  );

  return (
    <main className="project-detail-page barbie-detail-page">
      <header className="detail-nav">
        <a className="brand-mark" href={`${import.meta.env.BASE_URL}#home`}>
          CKG<span>°</span>
        </a>
        <span>PROJECT / 03</span>
        <a className="detail-back" href={`${import.meta.env.BASE_URL}#projects`}>
          返回作品列表 <b>↙</b>
        </a>
      </header>

      <section className="detail-hero">
        <div className="detail-hero-index">03</div>
        <div>
          <p>BRAND IDENTITY / PRODUCT PACKAGING</p>
          <h1>BARBIEPUFF 品牌设计</h1>
          <ul>
            <li>品牌 VI</li>
            <li>包装设计</li>
            <li>产品视觉</li>
          </ul>
        </div>
        <span className="detail-scroll">SCROLL TO VIEW ↓</span>
      </section>

      <section className="detail-gallery" aria-label="BARBIEPUFF 品牌设计项目作品">
        {detailImages.map((image, index) => (
          <motion.img
            key={image}
            src={`${import.meta.env.BASE_URL}projects/barbiepuff/${image}`}
            alt={`BARBIEPUFF 品牌设计项目展示 ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.03 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </section>

      <footer className="detail-footer">
        <div>
          <span>END OF PROJECT</span>
          <h2>感谢观看。</h2>
        </div>
        <a href={`${import.meta.env.BASE_URL}#projects`}>
          返回全部作品 <span>↗</span>
        </a>
      </footer>
    </main>
  );
}

function PetVlogProjectDetail() {
  const detailImages = Array.from(
    { length: 8 },
    (_, index) => `detail-${String(index + 1).padStart(2, "0")}.jpg`,
  );

  return (
    <main className="project-detail-page pet-detail-page">
      <header className="detail-nav">
        <a className="brand-mark" href={`${import.meta.env.BASE_URL}#home`}>
          CKG<span>°</span>
        </a>
        <span>PROJECT / 04</span>
        <a className="detail-back" href={`${import.meta.env.BASE_URL}#projects`}>
          返回作品列表 <b>↙</b>
        </a>
      </header>

      <section className="detail-hero">
        <div className="detail-hero-index">04</div>
        <div>
          <p>EVENT VISUAL / SOCIAL MEDIA CAMPAIGN</p>
          <h1>小红书宠物治愈 VLOG 创作大赛</h1>
          <ul>
            <li>活动视觉</li>
            <li>新媒体运营</li>
            <li>社媒设计</li>
          </ul>
        </div>
        <span className="detail-scroll">SCROLL TO VIEW ↓</span>
      </section>

      <section className="detail-gallery" aria-label="小红书宠物治愈 VLOG 项目作品">
        {detailImages.map((image, index) => (
          <motion.img
            key={image}
            src={`${import.meta.env.BASE_URL}projects/pet-vlog/${image}`}
            alt={`小红书宠物治愈 VLOG 项目展示 ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.03 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </section>

      <footer className="detail-footer">
        <div>
          <span>END OF PROJECT</span>
          <h2>感谢观看。</h2>
        </div>
        <a href={`${import.meta.env.BASE_URL}#projects`}>
          返回全部作品 <span>↗</span>
        </a>
      </footer>
    </main>
  );
}

function TmallProjectDetail() {
  const detailImages = Array.from(
    { length: 7 },
    (_, index) =>
      `projects/tmall-1212-detail-${String(index + 1).padStart(2, "0")}.jpg`,
  );

  return (
    <main className="project-detail-page tmall-detail-page">
      <header className="detail-nav">
        <a className="brand-mark" href={`${import.meta.env.BASE_URL}#home`}>
          CKG<span>°</span>
        </a>
        <span>PROJECT / 05</span>
        <a className="detail-back" href={`${import.meta.env.BASE_URL}#projects`}>
          返回作品列表 <b>↙</b>
        </a>
      </header>

      <section className="detail-hero">
        <div className="detail-hero-index">05</div>
        <div>
          <p>E-COMMERCE VISUAL / CAMPAIGN DESIGN</p>
          <h1>天猫双 12 年终大促</h1>
          <ul>
            <li>电商视觉</li>
            <li>运营设计</li>
            <li>AIGC 辅助设计</li>
          </ul>
        </div>
        <span className="detail-scroll">SCROLL TO VIEW ↓</span>
      </section>

      <section className="detail-gallery" aria-label="天猫双 12 年终大促项目作品">
        {detailImages.map((image, index) => (
          <motion.img
            key={image}
            src={`${import.meta.env.BASE_URL}${image}`}
            alt={`天猫双 12 年终大促项目展示 ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.03 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </section>

      <footer className="detail-footer">
        <div>
          <span>END OF PROJECT</span>
          <h2>感谢观看。</h2>
        </div>
        <a href={`${import.meta.env.BASE_URL}#projects`}>
          返回全部作品 <span>↗</span>
        </a>
      </footer>
    </main>
  );
}

function ThreeDimensionalProjectDetail() {
  return (
    <main className="project-detail-page three-d-detail-page">
      <header className="detail-nav">
        <a className="brand-mark" href={`${import.meta.env.BASE_URL}#home`}>
          CKG<span>°</span>
        </a>
        <span>PROJECT / 06</span>
        <a className="detail-back" href={`${import.meta.env.BASE_URL}#projects`}>
          返回作品列表 <b>↙</b>
        </a>
      </header>

      <section className="detail-hero">
        <div className="detail-hero-index">06</div>
        <div>
          <p>3D MODELING / VISUAL EXPLORATION</p>
          <h1>多元风格 3D 场景建模</h1>
          <ul>
            <li>三维建模</li>
            <li>C4D 视觉</li>
            <li>场景渲染</li>
          </ul>
        </div>
        <span className="detail-scroll">SCROLL TO VIEW ↓</span>
      </section>

      <section className="detail-gallery" aria-label="多元风格 3D 场景建模项目作品">
        <motion.img
          src={`${import.meta.env.BASE_URL}projects/3d-scene-detail-01.jpg`}
          alt="多元风格 3D 场景建模项目展示"
          loading="eager"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.03 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />
      </section>

      <footer className="detail-footer">
        <div>
          <span>END OF PROJECT</span>
          <h2>感谢观看。</h2>
        </div>
        <a href={`${import.meta.env.BASE_URL}#projects`}>
          返回全部作品 <span>↗</span>
        </a>
      </footer>
    </main>
  );
}

function PortfolioHome() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}

export default function Home() {
  const [route, setRoute] = useState(() => window.location.hash);
  const previousRoute = useRef(route);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const cameFromProject = isProjectRoute(previousRoute.current);

    if (isProjectRoute(route)) {
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (cameFromProject) {
      const targetId = route.startsWith("#") ? route.slice(1) : "home";

      requestAnimationFrame(() => {
        document
          .getElementById(targetId || "home")
          ?.scrollIntoView({ behavior: "instant" });
      });
    }

    previousRoute.current = route;
  }, [route]);

  if (route === "#/project/xiaomi-auto") return <XiaomiProjectDetail />;
  if (route === "#/project/xigua-camp") return <XiguaProjectDetail />;
  if (route === "#/project/barbiepuff") return <BarbiePuffProjectDetail />;
  if (route === "#/project/pet-vlog") return <PetVlogProjectDetail />;
  if (route === "#/project/tmall-1212") return <TmallProjectDetail />;
  if (route === "#/project/3d-scene") return <ThreeDimensionalProjectDetail />;
  return <PortfolioHome />;
}
