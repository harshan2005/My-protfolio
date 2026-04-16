import { useState, useEffect, useRef } from "react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const N = {
  cyan:   "#00f5ff",
  pink:   "#ff00c8",
  lime:   "#aaff00",
  violet: "#7b2fff",
  orange: "#ff6b00",
  bg:     "#060612",
  card:   "#0d0d22",
  border: "#1a1a3a",
};

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { background:${N.bg}; color:#c8c8e8; font-family:'DM Sans',sans-serif; font-size:16px; line-height:1.7; overflow-x:hidden; }
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-thumb { background:${N.violet}; border-radius:2px; }
  .fd  { font-family:'Orbitron',monospace; }
  .nc  { color:${N.cyan};   text-shadow:0 0 8px ${N.cyan}99,  0 0 20px ${N.cyan}44;   }
  .np  { color:${N.pink};   text-shadow:0 0 8px ${N.pink}99,  0 0 20px ${N.pink}44;   }
  .nl  { color:${N.lime};   text-shadow:0 0 8px ${N.lime}99,  0 0 20px ${N.lime}44;   }
  .nv  { color:#b47fff;     text-shadow:0 0 8px ${N.violet}cc,0 0 20px ${N.violet}55; }
  .no  { color:${N.orange}; text-shadow:0 0 8px ${N.orange}99,0 0 20px ${N.orange}44; }
  @keyframes float      { 0%,100%{transform:translateY(0)}     50%{transform:translateY(-8px)} }
  @keyframes glow       { 0%,100%{opacity:.5}                  50%{opacity:1} }
  @keyframes flicker    { 0%,94%,100%{opacity:1} 95%{opacity:.7} 97%{opacity:1} 98%{opacity:.5} 99%{opacity:1} }
  @keyframes slideUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes gridScroll { 0%{background-position:0 0} 100%{background-position:0 60px} }
  @keyframes pulseCyan  { 0%,100%{box-shadow:0 0 8px ${N.cyan}66,0 0 20px ${N.cyan}22} 50%{box-shadow:0 0 18px ${N.cyan}99,0 0 40px ${N.cyan}44} }
  .anim-fi { opacity:0; transform:translateY(22px); transition:opacity .65s ease,transform .65s ease; }
  .anim-fi.on { opacity:1; transform:translateY(0); }
  @media(max-width:640px) {
    .two-col { grid-template-columns:1fr !important; }
    .tl-row  { grid-template-columns:14px 1fr !important; }
    .tl-mid, .tl-empty { display:none !important; }
    .tl-card { grid-column:2 !important; }
  }
  @media(max-width:700px){ .dnav{display:none!important} .mbtn{display:block!important} }
`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function useVisible(threshold = 0.1) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, on];
}

function FadeIn({ children, delay = 0 }) {
  const [ref, on] = useVisible();
  return (
    <div ref={ref} className={`anim-fi${on ? " on" : ""}`} style={{ transitionDelay:`${delay}ms` }}>
      {children}
    </div>
  );
}

function Label({ children, color }) {
  return (
    <div className="fd" style={{ fontSize:"10px", letterSpacing:"0.22em", color, textTransform:"uppercase", marginBottom:"6px", opacity:.85 }}>
      ◈ {children}
    </div>
  );
}

function STitle({ children, cls = "" }) {
  return (
    <h2 className={`fd ${cls}`} style={{ fontSize:"clamp(1.5rem,3.5vw,2.2rem)", fontWeight:900, marginBottom:"44px", lineHeight:1.1 }}>
      {children}
    </h2>
  );
}

function TimelineSpine() {
  return (
    <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:"2px", transform:"translateX(-50%)", background:`linear-gradient(to bottom,transparent,${N.violet}88 10%,${N.cyan}66 50%,${N.pink}88 90%,transparent)`, zIndex:0 }}>
      <div style={{ position:"absolute", inset:0, background:`linear-gradient(to bottom,transparent,${N.violet}44 10%,${N.cyan}44 50%,${N.pink}44 90%,transparent)`, filter:"blur(4px)" }} />
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV = ["About","Skills","Experience","Projects","Certifications","Education","Contact"];

const BARS = [
  { name:"Python / SQL",               level:85, color:N.lime   },
  { name:"HTML / CSS / JavaScript",    level:88, color:N.cyan   },
  { name:"Machine Learning",           level:82, color:N.violet },
  { name:"TensorFlow / NumPy / Pandas",level:78, color:N.pink   },
  { name:"Power BI / Tableau",         level:90, color:N.orange },
  { name:"Java / C++",                 level:72, color:N.cyan   },
];

const SKILL_GROUPS = [
  { cat:"Languages",            color:N.cyan,   items:["Python","C++","SQL","HTML","CSS","JavaScript"] },
  { cat:"Libraries & Frameworks",color:N.violet, items:["NumPy","Pandas","TensorFlow","React.js"]     },
  { cat:"Data & Analytics",     color:N.lime,   items:["Power BI","Tableau","Apache Spark","OCR"]     },
  { cat:"Tools & Platforms",    color:N.orange, items:["Git","GitHub","AWS Cloud","VS Code"]           },
];

const EXPERIENCE = [
  {
    role:"Data Science Intern", company:"Nxtlogic Software Solutions",
    period:"May 2025 – Jun 2025", location:"Coimbatore", color:N.cyan,
    bullets:[
      "Developed data-driven solutions for workflow automation using machine learning and AI techniques.",
      "Built and optimized data pipelines using Python, SQL, and Apache Spark for large-scale data processing.",
      "Applied LLMs and OCR methods to extract insights from unstructured text and document images.",
      "Designed, trained, and evaluated ML models using Accuracy, F1-score, AUC, and RMSE metrics.",
    ],
  },
  {
    role:"Data Analyst Intern", company:"Net Tel Solutions India Pvt Ltd",
    period:"Apr 2024 – Jun 2024", location:"Coimbatore", color:N.orange,
    bullets:[
      "Developed predictive models on 100+ restaurant datasets to forecast customer retention trends.",
      "Performed data cleaning and preprocessing, handling ~95% of raw, unstructured data.",
      "Utilized Power BI and Tableau to design interactive dashboards for strategic decision-making.",
      "Applied ML techniques and feature engineering, increasing model accuracy by 15%.",
    ],
  },
];

const PROJECTS = [
  {
    title:"Handwritten Digit Recognition",
    desc:"Digit recognition using the MNIST dataset (60K training, 10K testing images). Trained models to classify digits 0–9 on 28×28 grayscale images.",
    tags:["Python","TensorFlow","Machine Learning","MNIST"],
    color:N.violet, emoji:"🔢", link:"#",
  },
  {
    title:"Object Detection Web App",
    desc:"Real-time object detection using JavaScript and TensorFlow.js. Improved detection speed by 88.06%, integrated webcam input with COCO-SSD pre-trained models.",
    tags:["JavaScript","TensorFlow.js","COCO-SSD","WebCam API"],
    color:N.cyan, emoji:"👁️", link:"#",
  },
  {
    title:"Hotel Feedback Dashboard",
    desc:"Dynamic Power BI solution for hotel administrators. Monitors operations, performance metrics, and guest feedback with interactive dashboards.",
    tags:["Power BI","Data Visualization","Analytics","Dashboard"],
    color:N.orange, emoji:"📊",
    img:"https://harshan2005.github.io/My-protfolio/dashboard.png", link:"#",
  },
  {
    title:"FoodMunch — Restaurant Website",
    desc:"Modern, fully responsive restaurant website with engaging UX across desktops, tablets, and mobile phones.",
    tags:["HTML","CSS","Responsive Design","Bootstrap"],
    color:N.pink, emoji:"🍔",
    img:"https://harshan2005.github.io/My-protfolio/Foodmunch.png",
    link:"https://webfoodmunchar.ccbp.tech/",
  },
];

const CERTS = [
  {
    issuer:"Infosys Springboard", name:"Python Foundation",
    icon:"🐍", color:N.cyan,
    img:"/certs/python.png", imgPlaceholder:"PYTHON FOUNDATION",
    date:"2024", credLink:"https://infyspringboard.onwingspan.com",
  },
  {
    issuer:"Infosys Springboard", name:"Artificial Intelligence Foundation",
    icon:"🤖", color:N.cyan,
    img:"/certs/ai.png", imgPlaceholder:"AI FOUNDATION",
    date:"2024", credLink:"https://infyspringboard.onwingspan.com",
  },
  {
    issuer:"Infosys Springboard", name:"Generative AI",
    icon:"✨", color:N.cyan,
    img:"/certs/genai.png", imgPlaceholder:"GENERATIVE AI",
    date:"2024", credLink:"https://infyspringboard.onwingspan.com",
  },
  {
    issuer:"NxtWave", name:"Full Stack Development",
    icon:"💻", color:N.violet,
    img:"/certs/fullstack.png", imgPlaceholder:"FULL STACK DEVELOPMENT",
    date:"2024", credLink:"https://www.ccbp.in",
  },
  {
    issuer:"Amazon Web Services", name:"AWS Cloud Foundation",
    icon:"☁️", color:N.orange,
    img:"/certs/aws.png", imgPlaceholder:"AWS CLOUD FOUNDATION",
    date:"2024", credLink:"https://aws.amazon.com/training",
  },
];

const EDUCATION = [
  {
    degree:"B.Tech — Artificial Intelligence & Data Science",
    institution:"Karpagam Academy of Higher Education",
    period:"2023 – Present", grade:"GPA: 8.45", color:N.violet,
    desc:"Expanding knowledge in programming, data science, AI, and web development. Strong foundation in ML, data analysis, and full-stack development.",
  },
  {
    degree:"Full Stack Development",
    institution:"NxtWave",
    period:"2024 – 2028", grade:"88%", color:N.cyan,
    desc:"Building real-time projects to improve frontend and backend skills. Solving real-world problems through practical web applications and coding challenges.",
  },
  {
    degree:"HSC — Biology Stream (12th Grade)",
    institution:"Sowdambikaa Boys Hr. Sec. School, Thuraiyur",
    period:"2022 – 2023", grade:"75%", color:N.lime,
    desc:"Built a strong foundation in life sciences alongside Python programming — inspiring me to explore AI for medical research.",
  },
  {
    degree:"SSLC — 10th Grade",
    institution:"Sowdambikaa Boys Secondary School, Thuraiyur",
    period:"2020 – 2021", grade:"Pass", color:N.pink,
    desc:"Built a strong academic foundation and learned Microsoft Office tools, igniting my interest in technology.",
  },
];

const SOCIALS = [
  { label:"Email",    value:"harshankarthikeyan0@gmail.com", href:"mailto:harshankarthikeyan0@gmail.com",                              color:N.cyan   },
  { label:"LinkedIn", value:"harshan-karthikeyan",      href:"https://www.linkedin.com/in/harshan-karthikeyan-64b554293/", color:N.violet },
  { label:"GitHub",   value:"@harshan2005",             href:"https://github.com/harshan2005",                            color:N.lime   },
  { label:"Phone",    value:"+91 7639427744",           href:"tel:+917639427744",                                         color:N.pink   },
];

const PHOTO = "/profile.jpg";

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

// NAV
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const aBase = { fontFamily:"'Orbitron',monospace", fontSize:"9px", letterSpacing:"0.12em", textTransform:"uppercase", color:"#a0a0c8", textDecoration:"none", transition:"color .2s" };
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, height:"60px", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 clamp(1rem,5vw,3rem)", background: scrolled ? `${N.bg}ee` : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? `1px solid ${N.violet}33` : "none", transition:"all .3s" }}>
      <div className="fd nc" style={{ fontSize:"13px", fontWeight:900, letterSpacing:"0.1em", animation:"flicker 8s infinite" }}>HARSHAN.DEV</div>
      <div className="dnav" style={{ display:"flex", gap:"20px", alignItems:"center" }}>
        {NAV.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={aBase}
            onMouseEnter={e => { e.target.style.color=N.cyan; e.target.style.textShadow=`0 0 8px ${N.cyan}99`; }}
            onMouseLeave={e => { e.target.style.color="#a0a0c8"; e.target.style.textShadow="none"; }}>
            {l}
          </a>
        ))}
        <a href="/Harshan.Resume.pdf" target="_blank" rel="noreferrer"
          style={{ ...aBase, color:N.lime, border:`1px solid ${N.lime}44`, padding:"4px 12px", borderRadius:"2px" }}>CV ↗</a>
      </div>
      <button className="mbtn" onClick={() => setOpen(!open)}
        style={{ display:"none", background:"none", border:"none", color:N.cyan, cursor:"pointer", fontSize:"18px", padding:"8px" }}>
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <div style={{ position:"absolute", top:"60px", left:0, right:0, background:`${N.bg}f5`, backdropFilter:"blur(12px)", borderBottom:`1px solid ${N.violet}44`, padding:"16px 24px", display:"flex", flexDirection:"column", gap:"14px" }}>
          {NAV.map(l => <a key={l} href={`#${l.toLowerCase()}`} style={{ ...aBase, color:N.cyan }} onClick={() => setOpen(false)}>{l}</a>)}
        </div>
      )}
    </nav>
  );
}

// HERO
function Hero() {
  return (
    <section id="hero" style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"120px clamp(1rem,8vw,6rem) 80px", overflow:"hidden", position:"relative", textAlign:"center", backgroundImage:`linear-gradient(${N.cyan}0a 1px,transparent 1px),linear-gradient(90deg,${N.cyan}0a 1px,transparent 1px)`, backgroundSize:"60px 60px", animation:"gridScroll 8s linear infinite" }}>
      <div style={{ position:"absolute", top:"12%", left:"8%", width:"280px", height:"280px", borderRadius:"50%", background:`${N.violet}18`, filter:"blur(80px)", animation:"glow 4s ease-in-out infinite" }} />
      <div style={{ position:"absolute", bottom:"18%", right:"6%", width:"240px", height:"240px", borderRadius:"50%", background:`${N.pink}12`, filter:"blur(60px)", animation:"glow 5s ease-in-out infinite 1s" }} />
      <div style={{ position:"relative", zIndex:1, maxWidth:"820px", animation:"slideUp .9s ease both" }}>
        <div style={{ width:"128px", height:"128px", borderRadius:"50%", margin:"0 auto 26px", overflow:"hidden", border:`2px solid ${N.cyan}88`, boxShadow:`0 0 24px ${N.cyan}44,0 0 60px ${N.cyan}22`, animation:"pulseCyan 3s ease-in-out infinite" }}>
          <img src={PHOTO} alt="Harshan" style={{ width:"100%", height:"100%", objectFit:"cover" }}
            onError={e => { e.target.style.display="none"; e.target.parentElement.innerHTML=`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#1a1a3a;font-family:Orbitron,monospace;font-size:28px;color:${N.cyan}">HK</div>`; }} />
        </div>
        <div className="fd" style={{ fontSize:"10px", letterSpacing:"0.28em", color:N.lime, marginBottom:"18px", textTransform:"uppercase" }}>◈ Aspiring Data Scientist · Open to Opportunities ◈</div>
        <h1 className="fd" style={{ fontSize:"clamp(2.6rem,9vw,5.5rem)", fontWeight:900, lineHeight:1, marginBottom:"6px" }}>
          <span className="nc">HARSHAN</span> <span className="np">K</span>
        </h1>
        <div style={{ width:"72px", height:"3px", background:`linear-gradient(90deg,${N.cyan},${N.pink})`, margin:"14px auto 22px", borderRadius:"2px", boxShadow:`0 0 12px ${N.cyan}88` }} />
        <p style={{ fontSize:"clamp(.95rem,2.2vw,1.15rem)", color:"#9898c0", marginBottom:"10px", fontWeight:300, fontStyle:"italic" }}>
          AI & Data Science · Machine Learning · Full-Stack Developer
        </p>
        <p className="fd nv" style={{ fontSize:"11px", letterSpacing:"0.18em", marginBottom:"44px" }}>
          B.TECH AI & DATA SCIENCE · KARPAGAM ACADEMY · GPA 8.45
        </p>
        <div style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap" }}>
          <a href="#projects" style={{ fontFamily:"'Orbitron',monospace", fontSize:"11px", letterSpacing:"0.15em", textTransform:"uppercase", padding:"13px 32px", borderRadius:"2px", background:`linear-gradient(135deg,${N.cyan}22,${N.violet}22)`, border:`1px solid ${N.cyan}88`, color:N.cyan, textDecoration:"none", boxShadow:`0 0 18px ${N.cyan}44` }}>View My Work</a>
          <a href="/Harshan.Resume.pdf" target="_blank" rel="noreferrer" style={{ fontFamily:"'Orbitron',monospace", fontSize:"11px", letterSpacing:"0.15em", textTransform:"uppercase", padding:"13px 32px", borderRadius:"2px", background:"transparent", border:`1px solid ${N.pink}55`, color:"#9898c0", textDecoration:"none" }}>Download CV</a>
        </div>
        <div style={{ marginTop:"52px", opacity:.4, animation:"float 2.5s ease-in-out infinite" }}>
          <div className="fd" style={{ fontSize:"9px", letterSpacing:"0.2em", color:"#666", marginBottom:"6px" }}>SCROLL</div>
          <div style={{ width:"1px", height:"38px", background:`linear-gradient(to bottom,${N.cyan}88,transparent)`, margin:"0 auto" }} />
        </div>
      </div>
    </section>
  );
}

// ABOUT
function About() {
  return (
    <section id="about" style={{ padding:"90px clamp(1rem,8vw,6rem)" }}>
      <div style={{ maxWidth:"860px", margin:"0 auto" }}>
        <FadeIn><Label color={N.pink}>About Me</Label><STitle cls="np">Who I Am</STitle></FadeIn>
        <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:"44px", alignItems:"start" }}>
          <FadeIn delay={100}>
            <div style={{ aspectRatio:"4/5", borderRadius:"4px", overflow:"hidden", position:"relative", background:`linear-gradient(135deg,${N.card},${N.pink}18)`, border:`1px solid ${N.pink}66`, boxShadow:`0 0 14px ${N.pink}22` }}>
              <img src={PHOTO} alt="Harshan K" style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e => { e.target.style.display="none"; }} />
              {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
                <div key={v+h} style={{ position:"absolute", [v]:"10px", [h]:"10px", width:"20px", height:"20px", borderTop:v==="top"?`2px solid ${N.pink}88`:"none", borderBottom:v==="bottom"?`2px solid ${N.pink}88`:"none", borderLeft:h==="left"?`2px solid ${N.pink}88`:"none", borderRight:h==="right"?`2px solid ${N.pink}88`:"none" }} />
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <p style={{ fontSize:"1rem", color:"#c8c8e8", lineHeight:1.85, marginBottom:"16px", fontWeight:300 }}>
              Aspiring Data Scientist with a strong foundation in machine learning and data analytics. Skilled in building predictive models, working with Python and SQL, and handling structured and unstructured data.
            </p>
            <p style={{ fontSize:"1rem", color:"#c8c8e8", lineHeight:1.85, marginBottom:"16px", fontWeight:300 }}>
              Experienced in data visualization using Power BI and Tableau. Also a frontend developer passionate about visually engaging, user-friendly websites — proficient in Java, combining creativity with technical skills.
            </p>
            <p style={{ fontSize:"1rem", color:"#9898c0", lineHeight:1.85, fontStyle:"italic", fontWeight:300 }}>
              Known for teamwork, creativity, and adaptability — I thrive in collaborative environments where ideas flow freely.
            </p>
            <div style={{ marginTop:"22px", display:"flex", gap:"8px", flexWrap:"wrap" }}>
              {["Machine Learning","Data Science","Frontend Dev","Open to Hire"].map(t => (
                <span key={t} className="fd" style={{ fontSize:"9px", letterSpacing:"0.1em", padding:"5px 12px", borderRadius:"2px", background:`${N.pink}15`, border:`1px solid ${N.pink}44`, color:`${N.pink}dd`, textTransform:"uppercase" }}>{t}</span>
              ))}
            </div>
            <div style={{ marginTop:"16px", display:"flex", flexDirection:"column", gap:"5px" }}>
              {["harshankarthikeyan0@gmail.com", "Trichy, Tamil Nadu, India"].map(v => (
                <div key={v} style={{ display:"flex", alignItems:"center", gap:"8px", fontSize:"12px", color:"#8888a8" }}>
                  <span style={{ color:N.cyan, fontSize:"10px" }}>◈</span>{v}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// SKILLS
function Skills() {
  const [animated, setAnimated] = useState(false);
  const [ref, on] = useVisible(0.2);
  useEffect(() => { if (on) setTimeout(() => setAnimated(true), 200); }, [on]);
  return (
    <section id="skills" ref={ref} style={{ padding:"90px clamp(1rem,8vw,6rem)", background:`${N.card}88`, borderTop:`1px solid ${N.border}`, borderBottom:`1px solid ${N.border}` }}>
      <div style={{ maxWidth:"860px", margin:"0 auto" }}>
        <FadeIn><Label color={N.lime}>Skills & Tools</Label><STitle cls="nl">What I Work With</STitle></FadeIn>
        <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"48px" }}>
          <div>
            <div className="fd" style={{ fontSize:"9px", letterSpacing:"0.15em", color:"#555568", textTransform:"uppercase", marginBottom:"18px" }}>Proficiency</div>
            <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
              {BARS.map((s, i) => (
                <FadeIn key={s.name} delay={i*60}>
                  <div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                      <span style={{ fontSize:"13px", color:"#c8c8e8", fontWeight:500 }}>{s.name}</span>
                      <span className="fd" style={{ fontSize:"10px", color:s.color }}>{s.level}%</span>
                    </div>
                    <div style={{ height:"4px", background:"#1a1a3a", borderRadius:"2px", overflow:"hidden" }}>
                      <div style={{ height:"100%", width: animated ? `${s.level}%` : "0%", background:`linear-gradient(90deg,${s.color}88,${s.color})`, boxShadow:`0 0 8px ${s.color}88`, borderRadius:"2px", transition:`width 1s cubic-bezier(.4,0,.2,1) ${i*80}ms` }} />
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          <div>
            {SKILL_GROUPS.map((g, i) => (
              <FadeIn key={g.cat} delay={i*80}>
                <div style={{ marginBottom:"22px" }}>
                  <div className="fd" style={{ fontSize:"9px", letterSpacing:"0.15em", color:g.color, textTransform:"uppercase", marginBottom:"8px", opacity:.85 }}>{g.cat}</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
                    {g.items.map(item => (
                      <span key={item} style={{ fontSize:"12px", padding:"6px 13px", borderRadius:"2px", background:`${g.color}10`, border:`1px solid ${g.color}33`, color:`${g.color}cc`, transition:"all .2s", cursor:"default" }}
                        onMouseEnter={e => { e.target.style.background=`${g.color}22`; e.target.style.boxShadow=`0 0 10px ${g.color}44`; }}
                        onMouseLeave={e => { e.target.style.background=`${g.color}10`; e.target.style.boxShadow="none"; }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// EXPERIENCE
function Experience() {
  return (
    <section id="experience" style={{ padding:"90px clamp(1rem,8vw,6rem)", position:"relative" }}>
      <TimelineSpine />
      <div style={{ maxWidth:"860px", margin:"0 auto", position:"relative", zIndex:1 }}>
        <FadeIn><Label color={N.orange}>Experience</Label><STitle cls="no">Professional Journey</STitle></FadeIn>
        {EXPERIENCE.map((exp, i) => {
          const isLeft = i % 2 === 0;
          const card = (
            <div className="tl-card" style={{ background:N.card, border:`1px solid ${exp.color}33`, borderRadius:"4px", padding:"20px 22px", transition:"border-color .3s" }}
              onMouseEnter={ev => ev.currentTarget.style.borderColor=`${exp.color}77`}
              onMouseLeave={ev => ev.currentTarget.style.borderColor=`${exp.color}33`}>
              <div className="fd" style={{ fontSize:"9px", letterSpacing:"0.12em", color:exp.color, marginBottom:"4px", textTransform:"uppercase" }}>{exp.period} · {exp.location}</div>
              <div className="fd" style={{ fontSize:"12px", color:exp.color, fontWeight:700, marginBottom:"2px", textShadow:`0 0 8px ${exp.color}66` }}>{exp.role}</div>
              <div style={{ fontSize:"12px", color:"#6868a0", marginBottom:"10px" }}>{exp.company}</div>
              <ul style={{ listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:"5px" }}>
                {exp.bullets.map((b,bi) => (
                  <li key={bi} style={{ fontSize:"12px", color:"#8888a8", lineHeight:1.65, fontWeight:300, paddingLeft:"14px", position:"relative" }}>
                    <span style={{ position:"absolute", left:0, color:exp.color, opacity:.5 }}>▸</span>{b}
                  </li>
                ))}
              </ul>
            </div>
          );
          const dot = <div style={{ position:"absolute", top:"20px", left:"50%", transform:"translateX(-50%)", width:"12px", height:"12px", borderRadius:"50%", background:exp.color, boxShadow:`0 0 10px ${exp.color},0 0 20px ${exp.color}88`, zIndex:2 }} />;
          return (
            <FadeIn key={exp.role} delay={i*120}>
              <div className="tl-row" style={{ display:"grid", gridTemplateColumns:"1fr 56px 1fr", gap:"0 10px", marginBottom:"32px", position:"relative" }}>
                {isLeft ? <>{card}<div className="tl-mid" style={{ position:"relative" }}>{dot}</div><div className="tl-empty" /></> : <><div className="tl-empty" /><div className="tl-mid" style={{ position:"relative" }}>{dot}</div>{card}</>}
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

// PROJECTS
function ProjectCard({ p, delay }) {
  const [hov, setHov] = useState(false);
  const [err, setErr] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ background:N.card, border:`1px solid ${hov ? p.color+"66" : N.border}`, borderRadius:"4px", overflow:"hidden", transition:"all .3s", boxShadow: hov ? `0 0 24px ${p.color}22` : "none", transform: hov ? "translateY(-4px)" : "none" }}>
        <div style={{ height:"160px", overflow:"hidden", position:"relative", background:`linear-gradient(135deg,${p.color}18,${N.card})` }}>
          {p.img && !err
            ? <img src={p.img} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .4s", transform: hov ? "scale(1.05)" : "scale(1)" }} onError={() => setErr(true)} />
            : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"52px" }}>{p.emoji}</div>
          }
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"2px", background:`linear-gradient(90deg,transparent,${p.color},transparent)`, opacity: hov ? 1 : 0.3, transition:"opacity .3s" }} />
        </div>
        <div style={{ padding:"18px 20px 20px" }}>
          <h3 className="fd" style={{ fontSize:"12px", fontWeight:700, color:p.color, marginBottom:"8px", lineHeight:1.4, textShadow:`0 0 10px ${p.color}66` }}>{p.title}</h3>
          <p style={{ fontSize:"12px", color:"#8888a8", lineHeight:1.7, marginBottom:"12px", fontWeight:300 }}>{p.desc}</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"5px", marginBottom:"12px" }}>
            {p.tags.map(t => <span key={t} className="fd" style={{ fontSize:"9px", padding:"2px 7px", borderRadius:"2px", background:`${p.color}12`, border:`1px solid ${p.color}33`, color:`${p.color}cc`, letterSpacing:"0.04em" }}>{t}</span>)}
          </div>
          <a href={p.link} target="_blank" rel="noreferrer" className="fd" style={{ fontSize:"9px", letterSpacing:"0.15em", color:p.color, textDecoration:"none", textTransform:"uppercase", opacity: hov ? 1 : 0.6, transition:"opacity .2s" }}>View Project →</a>
        </div>
      </div>
    </FadeIn>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding:"90px clamp(1rem,8vw,6rem)", background:`${N.card}66`, borderTop:`1px solid ${N.border}`, borderBottom:`1px solid ${N.border}` }}>
      <div style={{ maxWidth:"860px", margin:"0 auto" }}>
        <FadeIn><Label color={N.cyan}>Projects</Label><STitle cls="nc">Things I've Built</STitle></FadeIn>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"22px" }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} delay={i*90} />)}
        </div>
      </div>
    </section>
  );
}

// CERTIFICATIONS
function CertCard({ c, i }) {
  const [flipped, setFlipped] = useState(false);
  const [imgErr,  setImgErr]  = useState(false);
  return (
    <FadeIn delay={i * 80}>
      <div
        onClick={() => setFlipped(f => !f)}
        style={{ perspective:"800px", cursor:"pointer", height:"220px" }}
        title="Click to flip"
      >
        <div style={{
          position:"relative", width:"100%", height:"100%",
          transformStyle:"preserve-3d",
          transition:"transform .55s cubic-bezier(.4,0,.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}>

          {/* ── FRONT ── */}
          <div style={{
            position:"absolute", inset:0, backfaceVisibility:"hidden",
            background:N.card, border:`1px solid ${c.color}44`, borderRadius:"6px",
            overflow:"hidden", display:"flex", flexDirection:"column",
          }}>
            {/* Top accent */}
            <div style={{ height:"3px", background:`linear-gradient(90deg,${c.color},${c.color}44,transparent)` }} />

            {/* Certificate image or styled placeholder */}
            <div style={{ flex:1, position:"relative", overflow:"hidden", background:`linear-gradient(135deg,${c.color}14,${N.card})` }}>
              {c.img && !imgErr ? (
                <img
                  src={c.img} alt={c.name}
                  style={{ width:"100%", height:"100%", objectFit:"cover" }}
                  onError={() => setImgErr(true)}
                />
              ) : (
                /* Styled certificate placeholder */
                <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"8px", padding:"12px", position:"relative" }}>
                  {/* Decorative border */}
                  <div style={{ position:"absolute", inset:"8px", border:`1px solid ${c.color}33`, borderRadius:"4px", pointerEvents:"none" }} />
                  <div style={{ position:"absolute", inset:"12px", border:`1px solid ${c.color}18`, borderRadius:"3px", pointerEvents:"none" }} />
                  {/* Corner marks */}
                  {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
                    <div key={v+h} style={{ position:"absolute", [v]:"14px", [h]:"14px", width:"14px", height:"14px", borderTop:v==="top"?`2px solid ${c.color}88`:"none", borderBottom:v==="bottom"?`2px solid ${c.color}88`:"none", borderLeft:h==="left"?`2px solid ${c.color}88`:"none", borderRight:h==="right"?`2px solid ${c.color}88`:"none" }} />
                  ))}
                  <div style={{ fontSize:"26px" }}>{c.icon}</div>
                  <div className="fd" style={{ fontSize:"7px", letterSpacing:"0.2em", color:c.color, textTransform:"uppercase", textAlign:"center", lineHeight:1.6, opacity:.9 }}>
                    {c.issuer}
                  </div>
                  <div style={{ fontSize:"11px", color:"#d0d0e8", fontWeight:600, textAlign:"center", lineHeight:1.3 }}>{c.name}</div>
                  <div className="fd" style={{ fontSize:"7px", color:`${c.color}88`, letterSpacing:"0.15em", textTransform:"uppercase" }}>Certificate of Completion</div>
                  <div style={{ position:"absolute", bottom:"16px", width:"40%", height:"1px", background:`linear-gradient(90deg,transparent,${c.color}66,transparent)` }} />
                </div>
              )}
            </div>

            {/* Flip hint */}
            <div style={{ padding:"6px 10px", display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:`1px solid ${c.color}22` }}>
              <span style={{ fontSize:"9px", color:`${c.color}88` }}>{c.date}</span>
              <span className="fd" style={{ fontSize:"8px", color:`${c.color}88`, letterSpacing:"0.1em" }}>TAP TO FLIP ↺</span>
            </div>
          </div>

          {/* ── BACK ── */}
          <div style={{
            position:"absolute", inset:0, backfaceVisibility:"hidden", transform:"rotateY(180deg)",
            background:`linear-gradient(135deg,${N.card},${c.color}18)`,
            border:`1px solid ${c.color}66`, borderRadius:"6px",
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
            padding:"20px", gap:"10px", textAlign:"center",
            boxShadow:`0 0 20px ${c.color}22`,
          }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:`linear-gradient(90deg,${c.color},${c.color}44,transparent)` }} />
            <div style={{ fontSize:"32px" }}>{c.icon}</div>
            <div className="fd" style={{ fontSize:"8px", letterSpacing:"0.18em", color:c.color, textTransform:"uppercase", opacity:.9 }}>{c.issuer}</div>
            <div style={{ fontSize:"13px", color:"#e8e8f8", fontWeight:600, lineHeight:1.4 }}>{c.name}</div>
            <div style={{ width:"40px", height:"1px", background:`linear-gradient(90deg,transparent,${c.color},transparent)` }} />
            <div className="fd" style={{ fontSize:"8px", color:"#6868a0", letterSpacing:"0.1em", textTransform:"uppercase" }}>Issued {c.date}</div>
            <a
              href={c.credLink} target="_blank" rel="noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ marginTop:"4px", fontFamily:"'Orbitron',monospace", fontSize:"8px", letterSpacing:"0.15em", textTransform:"uppercase", padding:"7px 16px", borderRadius:"2px", background:`${c.color}18`, border:`1px solid ${c.color}55`, color:c.color, textDecoration:"none", transition:"all .2s" }}
              onMouseEnter={e => { e.target.style.background=`${c.color}30`; e.target.style.boxShadow=`0 0 12px ${c.color}44`; }}
              onMouseLeave={e => { e.target.style.background=`${c.color}18`; e.target.style.boxShadow="none"; }}
            >
              Visit Issuer ↗
            </a>
            <div className="fd" style={{ position:"absolute", bottom:"10px", fontSize:"8px", color:`${c.color}55`, letterSpacing:"0.1em" }}>TAP TO FLIP BACK ↺</div>
          </div>

        </div>
      </div>
    </FadeIn>
  );
}

function Certifications() {
  return (
    <section id="certifications" style={{ padding:"90px clamp(1rem,8vw,6rem)" }}>
      <div style={{ maxWidth:"900px", margin:"0 auto" }}>
        <FadeIn>
          <Label color={N.violet}>Certifications</Label>
          <STitle cls="nv">Credentials & Courses</STitle>
          <p style={{ fontSize:"13px", color:"#555568", marginBottom:"32px", marginTop:"-30px", fontFamily:"'Orbitron',monospace", letterSpacing:"0.08em" }}>
            ◈ Click any card to flip and view details
          </p>
        </FadeIn>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"20px" }}>
          {CERTS.map((c, i) => <CertCard key={c.name} c={c} i={i} />)}
        </div>

        {/* Upload hint */}
      </div>
    </section>
  );
}

// EDUCATION
function Education() {
  return (
    <section id="education" style={{ padding:"90px clamp(1rem,8vw,6rem)", background:`${N.card}66`, borderTop:`1px solid ${N.border}`, borderBottom:`1px solid ${N.border}`, position:"relative" }}>
      <TimelineSpine />
      <div style={{ maxWidth:"860px", margin:"0 auto", position:"relative", zIndex:1 }}>
        <FadeIn><Label color={N.violet}>Education</Label><STitle cls="nv">Academic Journey</STitle></FadeIn>
        {EDUCATION.map((edu, i) => {
          const isLeft = i % 2 === 0;
          const card = (
            <div className="tl-card" style={{ background:N.card, border:`1px solid ${edu.color}33`, borderRadius:"4px", padding:"20px 22px", textAlign: isLeft ? "right" : "left", transition:"border-color .3s" }}
              onMouseEnter={ev => ev.currentTarget.style.borderColor=`${edu.color}77`}
              onMouseLeave={ev => ev.currentTarget.style.borderColor=`${edu.color}33`}>
              <div className="fd" style={{ fontSize:"9px", letterSpacing:"0.15em", color:edu.color, marginBottom:"5px", textTransform:"uppercase" }}>{edu.period}</div>
              <div className="fd" style={{ fontSize:"11px", color:"#e0e0f0", fontWeight:700, marginBottom:"2px", lineHeight:1.4 }}>{edu.degree}</div>
              <div style={{ fontSize:"12px", color:"#6868a0", marginBottom:"3px" }}>{edu.institution}</div>
              <div className="fd" style={{ fontSize:"10px", color:N.lime, marginBottom:"8px" }}>{edu.grade}</div>
              <p style={{ fontSize:"12px", color:"#8888a8", lineHeight:1.65, fontWeight:300 }}>{edu.desc}</p>
            </div>
          );
          const dot = <div style={{ position:"absolute", top:"20px", left:"50%", transform:"translateX(-50%)", width:"12px", height:"12px", borderRadius:"50%", background:edu.color, boxShadow:`0 0 10px ${edu.color},0 0 20px ${edu.color}88`, zIndex:2 }} />;
          return (
            <FadeIn key={edu.degree} delay={i*120}>
              <div className="tl-row" style={{ display:"grid", gridTemplateColumns:"1fr 56px 1fr", gap:"0 10px", marginBottom:"32px", position:"relative" }}>
                {isLeft ? <>{card}<div className="tl-mid" style={{ position:"relative" }}>{dot}</div><div className="tl-empty" /></> : <><div className="tl-empty" /><div className="tl-mid" style={{ position:"relative" }}>{dot}</div>{card}</>}
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

// CONTACT
function Contact() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  const inp = { width:"100%", padding:"11px 14px", background:"#0a0a1e", border:`1px solid ${N.violet}44`, borderRadius:"2px", color:"#c8c8e8", fontFamily:"'DM Sans',sans-serif", fontSize:"13px", outline:"none", transition:"border-color .2s,box-shadow .2s", marginBottom:"12px", display:"block" };
  return (
    <section id="contact" style={{ padding:"90px clamp(1rem,8vw,6rem) 80px", background:`${N.card}88`, borderTop:`1px solid ${N.border}` }}>
      <div style={{ maxWidth:"860px", margin:"0 auto" }}>
        <FadeIn><Label color={N.pink}>Contact</Label><STitle cls="np">Let's Build Something</STitle></FadeIn>
        <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"56px", alignItems:"start" }}>
          <FadeIn delay={100}>
            <p style={{ fontSize:".95rem", color:"#9898c0", lineHeight:1.8, fontWeight:300, marginBottom:"28px" }}>
              Have an internship opportunity, want to collaborate, or just want to connect? I'm actively looking for opportunities and always happy to chat about AI, Data Science, or web development.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
              {SOCIALS.map(s => (
                <div key={s.label} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  <span className="fd" style={{ fontSize:"9px", letterSpacing:"0.15em", color:"#444468", textTransform:"uppercase", minWidth:"56px" }}>{s.label}</span>
                  <div style={{ height:"1px", flex:1, background:`linear-gradient(90deg,${s.color}44,transparent)` }} />
                  <a href={s.href} target="_blank" rel="noreferrer" className="fd" style={{ fontSize:"10px", color:s.color, textDecoration:"none", textShadow:`0 0 8px ${s.color}66` }}>{s.value}</a>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            {sent ? (
              <div style={{ textAlign:"center", padding:"40px 20px", border:`1px solid ${N.lime}44`, borderRadius:"4px", background:`${N.lime}08` }}>
                <div className="fd nl" style={{ fontSize:"1.8rem", marginBottom:"8px" }}>◈</div>
                <div className="fd nl" style={{ fontSize:"12px", letterSpacing:"0.1em" }}>Message Sent!</div>
                <p style={{ color:"#8888a8", fontSize:"12px", marginTop:"6px" }}>I'll get back to you soon!</p>
              </div>
            ) : (
              <div>
                <input style={inp} placeholder="Your name" value={form.name} onChange={e => setForm(s=>({...s,name:e.target.value}))}
                  onFocus={e => { e.target.style.borderColor=N.pink; e.target.style.boxShadow=`0 0 8px ${N.pink}33`; }}
                  onBlur={e  => { e.target.style.borderColor=`${N.violet}44`; e.target.style.boxShadow="none"; }} />
                <input style={inp} type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(s=>({...s,email:e.target.value}))}
                  onFocus={e => { e.target.style.borderColor=N.pink; e.target.style.boxShadow=`0 0 8px ${N.pink}33`; }}
                  onBlur={e  => { e.target.style.borderColor=`${N.violet}44`; e.target.style.boxShadow="none"; }} />
                <textarea style={{ ...inp, minHeight:"110px", resize:"vertical", marginBottom:"16px" }} placeholder="What's on your mind?" value={form.message} onChange={e => setForm(s=>({...s,message:e.target.value}))}
                  onFocus={e => { e.target.style.borderColor=N.pink; e.target.style.boxShadow=`0 0 8px ${N.pink}33`; }}
                  onBlur={e  => { e.target.style.borderColor=`${N.violet}44`; e.target.style.boxShadow="none"; }} />
                <button onClick={() => { if (form.name && form.email) setSent(true); }}
                  style={{ width:"100%", padding:"13px", fontFamily:"'Orbitron',monospace", fontSize:"10px", letterSpacing:"0.18em", textTransform:"uppercase", background:`linear-gradient(135deg,${N.pink}22,${N.violet}22)`, border:`1px solid ${N.pink}66`, color:N.pink, borderRadius:"2px", cursor:"pointer", transition:"all .25s", boxShadow:`0 0 14px ${N.pink}33` }}
                  onMouseEnter={e => { e.target.style.background=`${N.pink}22`; e.target.style.boxShadow=`0 0 24px ${N.pink}66`; }}
                  onMouseLeave={e => { e.target.style.background=`linear-gradient(135deg,${N.pink}22,${N.violet}22)`; e.target.style.boxShadow=`0 0 14px ${N.pink}33`; }}>
                  Send Message ◈
                </button>
              </div>
            )}
          </FadeIn>
        </div>
        <FadeIn delay={300}>
          <div style={{ marginTop:"72px", textAlign:"center", paddingTop:"36px", borderTop:`1px solid ${N.border}` }}>
            <div className="fd nc" style={{ fontSize:"16px", fontWeight:900, marginBottom:"6px" }}>HARSHAN K</div>
            <p className="fd" style={{ fontSize:"10px", letterSpacing:"0.1em", color:"#444468" }}>ASPIRING DATA SCIENTIST · KARPAGAM ACADEMY · © 2025</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <>
      <style>{G}</style>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </main>
    </>
  );
}
