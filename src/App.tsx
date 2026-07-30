"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

const navItems = [
  ["首页", "home"],
  ["关于我", "about"],
  ["作品项目", "projects"],
  ["专业能力", "skills"],
  ["联系我", "contact"],
];

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
      "Photoshop / Illustrator",
      "Figma / Premiere",
      "Blender",
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

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-shell">
      <div className="nav-inner">
        <a className="brand-mark" href="#home" aria-label="返回首页">
          CKG<span>°</span>
        </a>
        <nav className={open ? "nav-links open" : "nav-links"} aria-label="主导航">
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
            aria-label="打开导航菜单"
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
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "13%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);

  return (
    <section ref={section} className="hero" id="home">
      <motion.div
        className="hero-backdrop"
        style={{ y: prefersReducedMotion ? 0 : backgroundY }}
        aria-hidden="true"
      >
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="hero-grid" />
        <div className="hero-beam" />
      </motion.div>
      <div className="container hero-content">
        <div className="hero-kicker">
          <span>PORTFOLIO 2023—2026</span>
          <span>VISUAL DIRECTION / 001</span>
        </div>
        <motion.div
          className="hero-title-block"
          style={{ y: prefersReducedMotion ? 0 : titleY }}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
      </div>
      <a className="floating-contact" href="#contact">
        获取作品集 <span>↗</span>
      </a>
    </section>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <SectionHeading eyebrow="ABOUT ME" title="关于我" index="02" />
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
              <div className={`project-cover ${project.className}`}>
                <img
                  className="project-image"
                  src={`${import.meta.env.BASE_URL}projects/${project.image}`}
                  alt={`${project.title}项目封面`}
                  loading="lazy"
                />
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

function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <SectionHeading eyebrow="CAPABILITIES" title="专业能力" index="04" />
        <div className="ability-grid">
          {abilities.map((ability, index) => (
            <motion.article
              key={ability.no}
              className="ability-card"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -6 }}
            >
              <div className="ability-top">
                <span>{ability.no}</span>
                <em>{ability.en}</em>
              </div>
              <div className="ability-symbol">{["◒", "✦", "⌘", "◎"][index]}</div>
              <h3>{ability.title}</h3>
              <ul>
                {ability.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
        <div className="tool-marquee" aria-label="常用设计工具">
          <div>
            <span>PHOTOSHOP</span>
            <i>·</i>
            <span>ILLUSTRATOR</span>
            <i>·</i>
            <span>FIGMA</span>
            <i>·</i>
            <span>PREMIERE</span>
            <i>·</i>
            <span>BLENDER</span>
            <i>·</i>
            <span>MIDJOURNEY</span>
            <i>·</i>
            <span>STABLE DIFFUSION</span>
            <i>·</i>
            <span>LIBLIBAI</span>
          </div>
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
            <div>QR</div>
            <span>微信二维码占位</span>
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

export default function Home() {
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
