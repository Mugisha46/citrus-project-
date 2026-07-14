import { useState, useEffect, useRef } from "react";

/* ═══ TOKENS ═══════════════════════════════════════════════ */
const B="#1565C0",BD="#0D47A1",BL="#E3F2FD",BLL="#F0F7FF";
const N="#0B1E3D",NL="#1A3260";
const G="#1B5E20",GL="#E8F5E9";
const AM="#E65100",AML="#FFF3E0";
const W="#FFFFFF",F8="#F8FAFC",F0="#F0F4F8",E2="#E2EAF0";
const T1="#0F172A",T3="#334155",T6="#64748B";
const CITRUS_URL="https://citrus-alu.vercel.app";

/* ═══ STATIC DATA ═══════════════════════════════════════════ */
const STAGE_CONTENT=[
  { id:0,label:"Register",icon:"📝",color:B,duration:"Day 1",
    desc:"Create your YEHUB profile, choose your interests, and officially join the hub community.",
    activities:["Fill in personal details & goals","Choose your skill area of interest","Review and sign hub guidelines","Get your member ID and orientation pack"],
    resources:["Orientation guide (PDF)","Community handbook","Mentor directory","Hub schedule & timetable"] },
  { id:1,label:"Assess",icon:"🎯",color:"#7B1FA2",duration:"Days 2–4",
    desc:"Complete a skills assessment to understand where you are and where you need to grow.",
    activities:["Digital literacy test (30 min)","Business knowledge quiz (20 min)","Personal strengths & interests survey","One-on-one session with an advisor to review results"],
    resources:["Skills assessment workbook","Career pathway guide","Skill gap analysis report","Advisor meeting notes"] },
  { id:2,label:"Train",icon:"📚",color:AM,duration:"Weeks 1–6",
    desc:"Complete hands-on training in your chosen skill area with expert instructors.",
    activities:["Attend daily training sessions (Mon–Fri)","Complete weekly practical assignments","Participate in peer group discussions","Pass mid-training assessment"],
    resources:["Training manuals & workbooks","Online learning resources","Equipment & tools access","Instructor support & feedback"] },
  { id:3,label:"Incubate",icon:"💡",color:"#C62828",duration:"Weeks 7–10",
    desc:"Turn your idea into a real business plan with mentor guidance and peer collaboration.",
    activities:["Develop your business model canvas","Create a detailed business plan","Pitch to mentors for feedback","Refine based on market research"],
    resources:["Business plan template","Market research tools","Mentor matching service","Business model canvas worksheet"] },
  { id:4,label:"Fund",icon:"💰",color:G,duration:"Weeks 11–12",
    desc:"Apply for grants, seed funding, and microfinance to launch your business.",
    activities:["Complete YEHub seed fund application","Meet with microfinance partners","Explore available grants & NGO support","Prepare financial projections"],
    resources:["Grant application templates","Microfinance partner contacts","Financial literacy workbook","Budget planning tool"] },
  { id:5,label:"Launch",icon:"🚀",color:"#1565C0",duration:"Week 13",
    desc:"Officially launch your business with hub support, marketing help, and community exposure.",
    activities:["Register your business officially","Launch marketing campaign with hub support","Set up your YEHub marketplace store","Announce launch to community & partners"],
    resources:["Business registration guide","Marketing toolkit","Marketplace setup guide","Launch event support"] },
  { id:6,label:"Market",icon:"🌍",color:"#00695C",duration:"Ongoing",
    desc:"Scale your business, grow your customer base, and give back by mentoring others.",
    activities:["Expand to new markets & customers","Monthly business health check-in with Citrus AI","Join alumni mentorship programme","Participate in hub innovation competitions"],
    resources:["Growth strategy toolkit","Business health scorecard","Alumni network access","Export & partnership opportunities"] },
];

const ALL_SKILLS=[
  { icon:"💻",cat:"Digital Skills",color:B,
    courses:[
      { name:"Computer Basics",dur:"1 week",level:"Beginner",desc:"Learn to use a computer, manage files, and browse the internet safely." },
      { name:"Microsoft Office",dur:"2 weeks",level:"Beginner",desc:"Master Word, Excel, and PowerPoint for professional documents and presentations." },
      { name:"Graphic Design",dur:"3 weeks",level:"Intermediate",desc:"Create logos, posters, and marketing materials using free design tools." },
      { name:"AI Tools",dur:"1 week",level:"Beginner",desc:"Use AI tools like ChatGPT, Canva AI, and others to boost your productivity." },
      { name:"Digital Marketing",dur:"2 weeks",level:"Intermediate",desc:"Grow a business online through social media, SEO, and email campaigns." },
      { name:"Internet Research",dur:"3 days",level:"Beginner",desc:"Find reliable information, verify sources, and conduct market research online." },
    ]},
  { icon:"🔧",cat:"Technical Skills",color:"#7B1FA2",
    courses:[
      { name:"Tailoring & Sewing",dur:"4 weeks",level:"Beginner",desc:"Design, sew, and repair clothes for personal use and the local fashion market." },
      { name:"Solar Installation",dur:"3 weeks",level:"Intermediate",desc:"Install and maintain solar panels and solar-powered systems for homes and businesses." },
      { name:"Mobile Phone Repair",dur:"3 weeks",level:"Intermediate",desc:"Diagnose and repair smartphones and basic electronic devices — a high-demand skill." },
      { name:"Plumbing Basics",dur:"2 weeks",level:"Beginner",desc:"Install and repair water systems, taps, and basic plumbing infrastructure." },
    ]},
  { icon:"🌾",cat:"Agriculture",color:G,
    courses:[
      { name:"Poultry Keeping",dur:"2 weeks",level:"Beginner",desc:"Start and manage a profitable poultry business — from chicks to market-ready birds." },
      { name:"Vegetable Farming",dur:"3 weeks",level:"Beginner",desc:"Grow high-value vegetables using modern techniques suitable for South Sudan's climate." },
      { name:"Food Processing",dur:"2 weeks",level:"Intermediate",desc:"Process and package local foods (juices, dried goods) to sell at a premium." },
      { name:"Irrigation Systems",dur:"1 week",level:"Intermediate",desc:"Design simple irrigation systems to grow crops year-round, even in dry seasons." },
    ]},
  { icon:"📊",cat:"Business Skills",color:AM,
    courses:[
      { name:"Financial Literacy",dur:"1 week",level:"Beginner",desc:"Learn to save, budget, manage cash flow, and keep simple business records." },
      { name:"Business Planning",dur:"2 weeks",level:"Intermediate",desc:"Write a complete business plan including market analysis, budget, and strategy." },
      { name:"Customer Service",dur:"3 days",level:"Beginner",desc:"Build loyal customers through excellent service and effective communication." },
      { name:"Entrepreneurship",dur:"2 weeks",level:"Beginner",desc:"Identify business opportunities, start small, and scale sustainably." },
      { name:"Marketing & Sales",dur:"1 week",level:"Beginner",desc:"Promote your products and services using word-of-mouth, social media, and community networks." },
    ]},
];

const PROGRAMS=[
  { icon:"🎓",title:"Entrepreneurship Training",color:B,
    desc:"Hands-on training in practical, market-relevant skills. Sessions run Monday–Friday in a structured 6-week programme tailored to your chosen area.",
    features:["Expert instructors from local industry","Small group sessions (max 15 learners)","Practical assignments & real projects","Certificate on completion"] },
  { icon:"🌱",title:"Business Incubation",color:"#7B1FA2",
    desc:"One-on-one mentorship from experienced entrepreneurs to transform your business idea into a viable, funded enterprise.",
    features:["Matched mentor based on your industry","Weekly 1-on-1 sessions","Business model canvas development","Pitch practice & investor readiness"] },
  { icon:"💻",title:"Shared Workspace",color:AM,
    desc:"Affordable access to computers, internet, meeting rooms, and business equipment you may not be able to afford on your own.",
    features:["High-speed internet access","8 computers available daily","3 private meeting rooms","Printing, scanning & business tools"] },
  { icon:"💰",title:"Access to Finance",color:G,
    desc:"The hub connects you with grants, savings groups, microfinance institutions, and investors who can fund your business idea.",
    features:["YEHub seed fund ($200–$500)","Microfinance partner connections","Grant application support","Monthly investor pitch day"] },
  { icon:"🤝",title:"Market Linkages",color:"#C62828",
    desc:"Get introduced to local businesses, cooperatives, NGOs, and customers ready to buy your products and services.",
    features:["Monthly B2B networking events","YEHub online marketplace store","NGO procurement opportunities","Export pathways support"] },
  { icon:"🏆",title:"Community Learning",color:"#00695C",
    desc:"Workshops, networking events, and innovation competitions where youth learn from each other and showcase their best ideas.",
    features:["Weekly skill-share workshops","Quarterly innovation competitions","Alumni mentorship network","Annual YEHub Demo Day"] },
];

const STORIES=[
  { name:"Amara Deng",age:24,city:"Juba",skill:"Tailoring & Sewing",before:"Unemployed school leaver with no income",after:"Runs a tailoring business serving 30+ clients monthly",income:"$280/month",quote:"YEHUB gave me the skills and the confidence to stop waiting for a job and create one.",emoji:"👗"},
  { name:"David Akol",age:28,city:"Wau",skill:"Solar Installation",before:"Struggling to find work after graduation",after:"Certified solar installer with 3 permanent employees",income:"$420/month",quote:"The mentorship was everything. My mentor helped me see a business where I only saw a skill.",emoji:"☀️"},
  { name:"Grace Achol",age:22,city:"Malakal",skill:"Digital Marketing",before:"Recent graduate with no professional network",after:"Freelance digital marketer with 5 business clients",income:"$350/month",quote:"I learned how to turn my phone into a money-making tool. Now I help other businesses grow online.",emoji:"📱"},
];

const PARTNERS=[
  { name:"Ministry of Youth & Sports",type:"Government",icon:"🏛️",desc:"Policy support, official recognition, and national scale-up pathway." },
  { name:"African Leadership University",type:"Education",icon:"🎓",desc:"Research partnership, curriculum design, and student volunteer mentors." },
  { name:"Local Microfinance Institutions",type:"Finance",icon:"🏦",desc:"Affordable loans and savings group programmes for hub graduates." },
  { name:"South Sudan NGO Network",type:"Development",icon:"🌍",desc:"Community outreach, rural access, and joint programme funding." },
  { name:"Local Chambers of Commerce",type:"Private Sector",icon:"💼",desc:"Employment opportunities, internships, and market linkage connections." },
  { name:"UN Development Programme",type:"International",icon:"🌐",desc:"Research support, impact measurement, and funding partnerships." },
];

const AI_PROMPT=`You are Citrus AI, the intelligent career and entrepreneurship assistant for YEHUB (Youth Enterprise Hubs) in South Sudan. You help young people aged 18–35 discover skills, plan their business journey, and build sustainable enterprises.

Your personality: warm, encouraging, practical, action-oriented. Use short paragraphs, emojis, and bullet points. Never give walls of text.

Your role:
- Create personalised business roadmaps for users based on their interests
- Recommend which YEHUB skills to start with and why
- Suggest funding sources available to South Sudanese youth
- Guide users through the 7-stage YEHUB journey
- Generate monthly Business Health Scores when asked (score out of 100 with specific recommendations)
- Answer questions about entrepreneurship and business in South Sudan context

South Sudan context: limited connectivity, community trust networks are key, high-demand sectors are agriculture, solar, tailoring, phone repair, digital services, food processing.

Always end every response with one clear next action step or question. Keep responses under 200 words.`;

/* ═══ HOOKS ═════════════════════════════════════════════════ */
function useScrolled(px=60){
  const[s,setS]=useState(false);
  useEffect(()=>{
    const h=()=>setS(window.scrollY>px);
    window.addEventListener("scroll",h,{passive:true});
    return()=>window.removeEventListener("scroll",h);
  },[px]);
  return s;
}

/* ═══ PRIMITIVES ════════════════════════════════════════════ */
function YELogo({size=36,color=W}){
  return(
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="62" cy="32" r="24" stroke={color} strokeWidth="8"/>
      <line x1="62" y1="56" x2="62" y2="92" stroke={color} strokeWidth="8" strokeLinecap="round"/>
      <line x1="36" y1="19" x2="62" y2="40" stroke={color} strokeWidth="8" strokeLinecap="round"/>
      <line x1="40" y1="58" x2="62" y2="40" stroke={color} strokeWidth="8" strokeLinecap="round"/>
    </svg>
  );
}

function Pill({label,bg=BL,color=B}){
  return <span style={{background:bg,color,fontFamily:"Inter,sans-serif",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20,letterSpacing:".04em",textTransform:"uppercase"}}>{label}</span>;
}

function PrimaryBtn({label,onClick,full=false,sm=false}){
  const[h,setH]=useState(false);
  return <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{background:h?BD:B,color:W,border:"none",padding:sm?"8px 18px":"13px 28px",borderRadius:9,fontSize:sm?12:14,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif",width:full?"100%":"auto",transition:"all .22s",boxShadow:h?"0 8px 24px rgba(21,101,192,.3)":"0 4px 12px rgba(21,101,192,.15)"}}>{label}</button>;
}
function OutlineBtn({label,onClick,full=false,sm=false}){
  const[h,setH]=useState(false);
  return <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{background:h?BL:"transparent",color:B,border:`1.5px solid ${B}`,padding:sm?"8px 18px":"13px 28px",borderRadius:9,fontSize:sm?12:14,fontWeight:600,cursor:"pointer",fontFamily:"Inter,sans-serif",width:full?"100%":"auto",transition:"all .22s"}}>{label}</button>;
}

function Input({label,type="text",value,onChange,placeholder,icon}){
  const[f,setF]=useState(false);
  return(
    <div style={{marginBottom:14}}>
      {label&&<label style={{display:"block",fontSize:12,fontWeight:600,color:T3,fontFamily:"Inter,sans-serif",marginBottom:5}}>{label}</label>}
      <div style={{position:"relative"}}>
        {icon&&<span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",fontSize:15}}>{icon}</span>}
        <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
          onFocus={()=>setF(true)} onBlur={()=>setF(false)}
          style={{width:"100%",padding:icon?"10px 12px 10px 38px":"10px 13px",borderRadius:8,border:`1.5px solid ${f?B:E2}`,outline:"none",fontSize:13,fontFamily:"Inter,sans-serif",background:W,color:T1,transition:"border .2s",boxSizing:"border-box"}}/>
      </div>
    </div>
  );
}
function Select({label,value,onChange,options}){
  return(
    <div style={{marginBottom:14}}>
      {label&&<label style={{display:"block",fontSize:12,fontWeight:600,color:T3,fontFamily:"Inter,sans-serif",marginBottom:5}}>{label}</label>}
      <select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",padding:"10px 13px",borderRadius:8,border:`1.5px solid ${E2}`,outline:"none",fontSize:13,fontFamily:"Inter,sans-serif",background:W,color:T1,cursor:"pointer"}}>
        {options.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </div>
  );
}

/* ═══ AUTH MODAL ════════════════════════════════════════════ */
function AuthModal({defaultTab="login",onClose,onAuth}){
  const[tab,setTab]=useState(defaultTab);
  const[step,setStep]=useState(1);
  const[form,setForm]=useState({name:"",email:"",password:"",age:"",location:"",interest:"",goal:""});
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));

  const handleDemo=()=>{ onAuth({name:"Demo Explorer",email:"demo@yehub.org",interest:"digital",goal:"business",stage:2,isDemo:true}); onClose(); };
  const handleLogin=()=>{ onAuth({name:form.email.split("@")[0]||"Member",email:form.email,interest:"digital",goal:"business",stage:1}); onClose(); };
  const handleNext=()=>{
    if(step<3)setStep(s=>s+1);
    else{ onAuth({...form,stage:0}); onClose(); }
  };

  return(
    <div onClick={e=>{if(e.target===e.currentTarget)onClose();}} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",backdropFilter:"blur(5px)",zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div style={{background:W,borderRadius:22,padding:36,width:"100%",maxWidth:440,position:"relative",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 24px 64px rgba(0,0,0,.2)"}}>
        {/* Close */}
        <button onClick={onClose} style={{position:"absolute",top:16,right:18,background:"none",border:"none",fontSize:20,cursor:"pointer",color:T6,lineHeight:1}}>✕</button>

        {/* Tab switcher */}
        <div style={{display:"flex",background:F0,borderRadius:10,padding:4,marginBottom:24}}>
          {[["login","Log In"],["register","Join Free"]].map(([id,l])=>(
            <button key={id} onClick={()=>{setTab(id);setStep(1);}}
              style={{flex:1,background:tab===id?W:"transparent",color:tab===id?N:T6,border:"none",padding:"9px 0",borderRadius:8,fontSize:13,fontWeight:tab===id?700:500,cursor:"pointer",fontFamily:"Inter,sans-serif",transition:"all .2s",boxShadow:tab===id?"0 2px 8px rgba(0,0,0,.08)":"none"}}>
              {l}
            </button>
          ))}
        </div>

        {tab==="login"&&(
          <>
            <div style={{textAlign:"center",marginBottom:22}}>
              <YELogo size={40} color={B}/>
              <h2 style={{fontFamily:"Inter,sans-serif",fontSize:20,fontWeight:800,color:N,marginTop:10,marginBottom:4}}>Welcome Back</h2>
              <p style={{color:T6,fontSize:13,fontFamily:"Inter,sans-serif"}}>Log in to your YEHUB account</p>
            </div>
            <Input label="Email address" type="email" value={form.email} onChange={v=>set("email",v)} placeholder="your@email.com" icon="✉️"/>
            <Input label="Password" type="password" value={form.password} onChange={v=>set("password",v)} placeholder="Your password" icon="🔒"/>
            <PrimaryBtn label="Log In →" onClick={handleLogin} full/>
            <div style={{textAlign:"center",margin:"16px 0 8px"}}><span style={{color:T6,fontSize:12,fontFamily:"Inter,sans-serif"}}>or</span></div>
            <button onClick={handleDemo} style={{width:"100%",background:F0,color:T3,border:`1.5px solid ${E2}`,padding:"11px 0",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"Inter,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              🎭 Try Demo — Explore Without Registering
            </button>
          </>
        )}

        {tab==="register"&&(
          <>
            {/* Step dots */}
            <div style={{display:"flex",gap:6,marginBottom:22}}>
              {[1,2,3].map(n=><div key={n} style={{flex:1,height:4,borderRadius:4,background:step>=n?B:E2,transition:"background .3s"}}/>)}
            </div>
            <div style={{textAlign:"center",marginBottom:20}}>
              <YELogo size={36} color={B}/>
              <h2 style={{fontFamily:"Inter,sans-serif",fontSize:19,fontWeight:800,color:N,marginTop:8,marginBottom:3}}>
                {step===1?"Create Your Account":step===2?"About You":"Your Goal"}
              </h2>
              <p style={{color:T6,fontSize:12,fontFamily:"Inter,sans-serif"}}>Step {step} of 3</p>
            </div>
            {step===1&&<>
              <Input label="Full Name" value={form.name} onChange={v=>set("name",v)} placeholder="Your full name" icon="👤"/>
              <Input label="Email" type="email" value={form.email} onChange={v=>set("email",v)} placeholder="your@email.com" icon="✉️"/>
              <Input label="Password" type="password" value={form.password} onChange={v=>set("password",v)} placeholder="Create a password" icon="🔒"/>
            </>}
            {step===2&&<>
              <Input label="Age" type="number" value={form.age} onChange={v=>set("age",v)} placeholder="e.g. 23" icon="🎂"/>
              <Input label="Location" value={form.location} onChange={v=>set("location",v)} placeholder="e.g. Juba, South Sudan" icon="📍"/>
              <Select label="Skill area I'm interested in" value={form.interest} onChange={v=>set("interest",v)}
                options={[{v:"",l:"Choose..."},{v:"digital",l:"Digital Skills"},{v:"technical",l:"Technical Skills"},{v:"agriculture",l:"Agriculture"},{v:"business",l:"Business Skills"}]}/>
            </>}
            {step===3&&<>
              <Select label="My main goal is to..." value={form.goal} onChange={v=>set("goal",v)}
                options={[{v:"",l:"Choose..."},{v:"job",l:"Find stable employment"},{v:"business",l:"Start my own business"},{v:"grow",l:"Grow an existing business"},{v:"skills",l:"Just learn new skills"}]}/>
              <div style={{background:BLL,border:`1px solid ${B}30`,borderRadius:10,padding:14,marginBottom:14}}>
                <p style={{color:B,fontFamily:"Inter,sans-serif",fontSize:12,lineHeight:1.65,margin:0}}><strong>You'll get:</strong> Free training, a personal mentor, shared workspace, access to funding, and Citrus AI coaching.</p>
              </div>
            </>}
            <PrimaryBtn label={step<3?"Continue →":"Join YEHUB Free 🚀"} onClick={handleNext} full/>
            {step>1&&<button onClick={()=>setStep(s=>s-1)} style={{width:"100%",marginTop:8,background:"none",border:"none",color:T6,fontSize:12,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>← Back</button>}
            <div style={{textAlign:"center",marginTop:14}}>
              <button onClick={handleDemo} style={{background:"none",border:"none",color:B,fontSize:12,cursor:"pointer",fontFamily:"Inter,sans-serif",fontWeight:600,textDecoration:"underline"}}>
                🎭 Try demo instead
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══ NAVBAR ════════════════════════════════════════════════ */
const PUBLIC_NAV=[{id:"home",l:"Home"},{id:"about",l:"About"},{id:"programs",l:"Programs"},{id:"skills",l:"Skills"},{id:"stories",l:"Stories"},{id:"partners",l:"Partners"},{id:"community",l:"Community"},{id:"contact",l:"Contact"}];
const AUTH_NAV=[{id:"home",l:"Home"},{id:"dashboard",l:"Dashboard"},{id:"journey",l:"My Journey"},{id:"skills",l:"Skills"},{id:"ai",l:"Citrus AI"}];

function Navbar({page,go,user,openAuth,onLogout}){
  const sc=useScrolled();const[open,setOpen]=useState(false);
  const nav=user?AUTH_NAV:PUBLIC_NAV;
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:9000,
      background:sc||page!=="home"?"rgba(21,101,192,.97)":"transparent",
      backdropFilter:"blur(16px)",borderBottom:`1px solid rgba(255,255,255,${sc||page!=="home"?.1:0})`,transition:"all .4s"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 20px",height:62,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={()=>{go("home");setOpen(false);}} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:9,padding:0}}>
          <YELogo size={28}/>
          <div><div style={{fontFamily:"Inter,sans-serif",color:W,fontSize:15,fontWeight:800,lineHeight:1}}>YEHUB</div>
          <div style={{color:"rgba(255,255,255,.45)",fontSize:8,fontFamily:"Inter,sans-serif",letterSpacing:".1em"}}>POWERED BY CITRUS AI</div></div>
        </button>
        <div style={{display:"flex",alignItems:"center",gap:2}}>
          {nav.slice(0,6).map(n=>{const a=page===n.id;return(
            <button key={n.id} onClick={()=>{go(n.id);setOpen(false);}}
              style={{background:a?"rgba(255,255,255,.16)":"transparent",color:a?W:"rgba(255,255,255,.6)",border:"none",padding:"6px 12px",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:a?700:400,fontFamily:"Inter,sans-serif",transition:"all .2s"}}
              onMouseEnter={e=>{if(!a)e.currentTarget.style.color=W;}} onMouseLeave={e=>{if(!a)e.currentTarget.style.color="rgba(255,255,255,.6);";}}>
              {n.l}
            </button>
          );})}
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {user?(
            <>
              {user.isDemo&&<span style={{background:"rgba(255,165,0,.2)",color:"#FFD700",fontFamily:"Inter,sans-serif",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:6}}>DEMO</span>}
              <button onClick={onLogout} style={{background:"rgba(255,255,255,.12)",color:W,border:"1px solid rgba(255,255,255,.2)",padding:"7px 14px",borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Logout</button>
            </>
          ):(
            <>
              <button onClick={()=>openAuth("login")} style={{background:"rgba(255,255,255,.12)",color:W,border:"1px solid rgba(255,255,255,.22)",padding:"7px 16px",borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:"Inter,sans-serif",fontWeight:500}}>Log In</button>
              <button onClick={()=>openAuth("register")} style={{background:W,color:B,border:"none",padding:"8px 16px",borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:"Inter,sans-serif",fontWeight:800}}>Join Free</button>
            </>
          )}
          <button onClick={()=>setOpen(!open)} style={{background:"none",border:"none",color:W,fontSize:18,cursor:"pointer",lineHeight:1,marginLeft:4}}>{open?"✕":"☰"}</button>
        </div>
      </div>
      {open&&(
        <div style={{background:"rgba(13,71,161,.97)",borderTop:"1px solid rgba(255,255,255,.08)",padding:"10px 20px 16px"}}>
          {nav.map(n=><button key={n.id} onClick={()=>{go(n.id);setOpen(false);}} style={{display:"block",width:"100%",textAlign:"left",background:"none",border:"none",borderBottom:"1px solid rgba(255,255,255,.06)",color:page===n.id?W:"rgba(255,255,255,.55)",padding:"11px 0",fontSize:14,cursor:"pointer",fontFamily:"Inter,sans-serif",fontWeight:page===n.id?700:400}}>{n.l}</button>)}
        </div>
      )}
    </nav>
  );
}

/* ═══ HERO / HOME ════════════════════════════════════════════ */
function Home({go,openAuth}){
  return(
    <div>
      <section style={{background:`linear-gradient(145deg,${BD} 0%,${B} 58%,#1E88E5 100%)`,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"100px 20px 64px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:`url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1.5' fill='%23ffffff' opacity='0.09'/%3E%3C/svg%3E")`,backgroundSize:"60px 60px",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"10%",right:"5%",width:300,height:300,borderRadius:"50%",background:"rgba(255,255,255,.06)",animation:"pulse 7s ease-in-out infinite",pointerEvents:"none"}}/>
        <div style={{background:"rgba(255,255,255,.12)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,.18)",borderRadius:20,padding:"5px 18px",marginBottom:24,display:"inline-block"}}>
          <span style={{color:W,fontSize:11,fontFamily:"Inter,sans-serif",fontWeight:700,letterSpacing:".08em"}}>YOUTH ENTERPRISE HUBS · SOUTH SUDAN</span>
        </div>
        <h1 style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(38px,7vw,78px)",fontWeight:900,color:W,lineHeight:1.05,maxWidth:860,marginBottom:18}}>
          Building South Sudan's<br/><span style={{opacity:.88}}>Next Generation of</span><br/>
          <span style={{background:"rgba(255,255,255,.15)",borderRadius:10,padding:"2px 12px"}}>Entrepreneurs</span>
        </h1>
        <p style={{color:"rgba(255,255,255,.65)",fontSize:17,maxWidth:520,marginBottom:40,fontFamily:"Inter,sans-serif",lineHeight:1.75}}>
          Free training, mentorship, shared workspace, funding access, and Citrus AI — your personal career coach. Ages 18–35.
        </p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",marginBottom:16}}>
          <button onClick={()=>openAuth("register")} style={{background:W,color:B,border:"none",padding:"15px 36px",borderRadius:12,fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"Inter,sans-serif",boxShadow:"0 8px 28px rgba(0,0,0,.2)"}}>Join YEHUB Free →</button>
          <button onClick={()=>openAuth("login")} style={{background:"rgba(255,255,255,.12)",color:W,border:"1.5px solid rgba(255,255,255,.3)",padding:"15px 28px",borderRadius:12,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>🎭 Try Demo</button>
        </div>
        <p style={{color:"rgba(255,255,255,.38)",fontSize:11,fontFamily:"Inter,sans-serif"}}>Free to join · No experience required · Ages 18–35</p>
      </section>

      {/* Stats */}
      <section style={{background:N,padding:"48px 20px"}}>
        <div style={{maxWidth:900,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:24,textAlign:"center"}}>
          {[{n:"1,250+",l:"Youth Trained"},{n:"250+",l:"Businesses Started"},{n:"900+",l:"Jobs Created"},{n:"30+",l:"Partner Orgs"}]
            .map((s,i)=><div key={i}><div style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(28px,4vw,44px)",fontWeight:900,color:W}}>{s.n}</div><div style={{color:"rgba(255,255,255,.4)",fontSize:12,fontFamily:"Inter,sans-serif",marginTop:4}}>{s.l}</div><div style={{color:"rgba(255,255,255,.2)",fontSize:9,fontFamily:"Inter,sans-serif",marginTop:2}}>Project Target</div></div>)}
        </div>
      </section>

      {/* Journey preview */}
      <section style={{background:F8,padding:"80px 20px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <p style={{color:B,fontSize:10,letterSpacing:".2em",fontFamily:"Inter,sans-serif",textTransform:"uppercase",textAlign:"center",marginBottom:8,fontWeight:700}}>How It Works</p>
          <h2 style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(24px,4vw,38px)",fontWeight:800,color:N,textAlign:"center",marginBottom:48}}>From Job Seeker to Job Creator</h2>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"center",flexWrap:"wrap",gap:0}}>
            {STAGE_CONTENT.map((s,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",flex:"1 1 100px",minWidth:0}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",flex:1,textAlign:"center",padding:"0 4px"}}>
                  <div style={{width:46,height:46,borderRadius:"50%",background:BL,border:`2px solid ${s.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,marginBottom:8}}>{s.icon}</div>
                  <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,color:N,fontSize:11,marginBottom:2}}>{s.label}</div>
                  <div style={{color:T6,fontSize:9,fontFamily:"Inter,sans-serif"}}>{s.duration}</div>
                </div>
                {i<STAGE_CONTENT.length-1&&<div style={{width:16,height:2,background:E2,marginTop:22,flexShrink:0}}/>}
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:36}}>
            <button onClick={()=>openAuth("register")} style={{background:B,color:W,border:"none",padding:"13px 32px",borderRadius:10,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Start Your Journey →</button>
          </div>
        </div>
      </section>

      {/* Skills preview */}
      <section style={{background:F0,padding:"80px 20px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <h2 style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(24px,4vw,38px)",fontWeight:800,color:N,textAlign:"center",marginBottom:44}}>Skills for the Real World</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:18}}>
            {ALL_SKILLS.map((sk,i)=>{
              const[h,setH]=useState(false);
              return(<div key={i} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
                style={{background:W,borderRadius:14,padding:"22px 20px",borderTop:`4px solid ${sk.color}`,transform:h?"translateY(-4px)":"none",boxShadow:h?"0 14px 40px rgba(0,0,0,.1)":"0 2px 10px rgba(0,0,0,.04)",transition:"all .26s"}}>
                <div style={{fontSize:26,marginBottom:10}}>{sk.icon}</div>
                <h3 style={{fontFamily:"Inter,sans-serif",color:N,fontSize:15,marginBottom:10,fontWeight:700}}>{sk.cat}</h3>
                {sk.courses.slice(0,3).map((c,j)=><div key={j} style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}><div style={{width:5,height:5,borderRadius:"50%",background:sk.color,opacity:.6}}/><span style={{color:T3,fontSize:12,fontFamily:"Inter,sans-serif"}}>{c.name}</span></div>)}
                <button onClick={()=>openAuth("register")} style={{marginTop:10,background:"none",border:"none",color:sk.color,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif",padding:0}}>View all {sk.courses.length} courses →</button>
              </div>);
            })}
          </div>
        </div>
      </section>

      {/* AI teaser */}
      <section style={{background:`linear-gradient(145deg,${N} 0%,${NL} 100%)`,padding:"80px 20px"}}>
        <div style={{maxWidth:960,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:48,alignItems:"center"}}>
          <div>
            <Pill label="Powered by AI" bg="rgba(255,255,255,.12)" color={W}/>
            <h2 style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(26px,4vw,40px)",fontWeight:900,color:W,marginTop:14,marginBottom:14,lineHeight:1.15}}>Meet Citrus AI</h2>
            <p style={{color:"rgba(255,255,255,.55)",fontFamily:"Inter,sans-serif",lineHeight:1.75,marginBottom:22,fontSize:14}}>Your personal career coach. Get business roadmaps, skill recommendations, funding guidance, and your monthly Business Health Score.</p>
            {["Personalised business roadmaps","Skill & opportunity recommendations","Monthly Business Health Score","Real-time funding guidance"].map((t,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:9,marginBottom:9}}>
                <span style={{color:"#4CAF50",fontSize:14}}>✓</span>
                <span style={{color:"rgba(255,255,255,.7)",fontFamily:"Inter,sans-serif",fontSize:13}}>{t}</span>
              </div>
            ))}
            <button onClick={()=>openAuth("register")} style={{marginTop:20,background:W,color:B,border:"none",padding:"12px 28px",borderRadius:9,fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Try Citrus AI →</button>
          </div>
          {/* Mock chat */}
          <div style={{background:"rgba(255,255,255,.07)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,.12)",borderRadius:18,padding:22}}>
            <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:18,paddingBottom:12,borderBottom:"1px solid rgba(255,255,255,.1)"}}>
              <div style={{width:34,height:34,borderRadius:"50%",background:`linear-gradient(135deg,${B},#42A5F5)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🤖</div>
              <div><div style={{color:W,fontWeight:700,fontSize:13}}>Citrus AI</div><div style={{color:"rgba(255,255,255,.4)",fontSize:10}}>Your career coach</div></div>
              <div style={{marginLeft:"auto",width:7,height:7,borderRadius:"50%",background:"#4CAF50"}}/>
            </div>
            {[{f:"ai",m:"Hi! What business do you want to start? 🚀"},{f:"user",m:"I want to start a poultry business."},{f:"ai",m:"🐔 Great choice! Your roadmap:\n✓ Poultry Training (2 weeks)\n✓ Budget: ~$200\n✓ Apply for seed fund\n✓ Connect to local suppliers\n\nReady to begin your assessment?"}]
              .map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.f==="user"?"flex-end":"flex-start",marginBottom:9}}>
                <div style={{background:m.f==="user"?B:"rgba(255,255,255,.12)",color:W,borderRadius:m.f==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px",padding:"9px 13px",maxWidth:"84%",fontSize:12,lineHeight:1.6,fontFamily:"Inter,sans-serif",whiteSpace:"pre-line"}}>{m.m}</div>
              </div>)}
          </div>
        </div>
      </section>
      <section style={{background:B,padding:"64px 20px",textAlign:"center"}}>
        <h2 style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(24px,4vw,38px)",fontWeight:900,color:W,marginBottom:12}}>Ready to Start Your Journey?</h2>
        <p style={{color:"rgba(255,255,255,.65)",fontFamily:"Inter,sans-serif",marginBottom:28,fontSize:15}}>Join hundreds of young South Sudanese building their future with YEHUB.</p>
        <button onClick={()=>openAuth("register")} style={{background:W,color:B,border:"none",padding:"14px 36px",borderRadius:11,fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Join YEHUB Free →</button>
      </section>
    </div>
  );
}

/* ═══ ABOUT ═════════════════════════════════════════════════ */
function About(){
  return(
    <div style={{paddingTop:62}}>
      <section style={{background:`linear-gradient(145deg,${BD},${NL})`,padding:"80px 20px",textAlign:"center"}}>
        <Pill label="Who We Are" bg="rgba(255,255,255,.12)" color={W}/>
        <h1 style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(28px,5vw,50px)",fontWeight:900,color:W,margin:"14px 0 14px"}}>About YEHUB</h1>
        <p style={{color:"rgba(255,255,255,.6)",fontSize:16,maxWidth:540,margin:"0 auto",fontFamily:"Inter,sans-serif",lineHeight:1.75}}>Youth Enterprise Hubs are community-based centres that transform unemployed youth into job creators.</p>
      </section>
      <section style={{background:F8,padding:"72px 20px"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:22,marginBottom:56}}>
            {[{icon:"🎯",t:"Our Mission",c:"To equip young South Sudanese people aged 18–35 with the practical skills, mentorship, funding, and market connections needed to create sustainable businesses and employment opportunities."},{icon:"🌍",t:"Our Vision",c:"A South Sudan where every young person has access to the tools, support, and opportunities to build a prosperous and self-reliant life through entrepreneurship."},{icon:"💡",t:"Our Approach",c:"We combine practical training, one-on-one mentorship, shared workspaces, funding access, and Citrus AI technology into one complete hub — addressing root causes, not just symptoms."}]
              .map((c,i)=><div key={i} style={{background:W,borderRadius:14,padding:"26px 22px",borderLeft:`4px solid ${B}`,boxShadow:"0 2px 12px rgba(0,0,0,.05)"}}><div style={{fontSize:28,marginBottom:10}}>{c.icon}</div><h3 style={{fontFamily:"Inter,sans-serif",color:N,fontSize:17,marginBottom:8,fontWeight:700}}>{c.t}</h3><p style={{color:T6,fontSize:13,lineHeight:1.72,fontFamily:"Inter,sans-serif",margin:0}}>{c.c}</p></div>)}
          </div>
          <h2 style={{fontFamily:"Inter,sans-serif",fontSize:28,fontWeight:800,color:N,marginBottom:28}}>Who Will Benefit?</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
            <div style={{background:BLL,border:`1px solid ${B}20`,borderRadius:14,padding:24}}>
              <h3 style={{fontFamily:"Inter,sans-serif",color:B,fontSize:15,fontWeight:700,marginBottom:14}}>Primary Beneficiaries</h3>
              {["Young people aged 18–35","Unemployed graduates","School leavers seeking skills","Women entrepreneurs","First-time business owners"].map((t,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:8}}><span style={{color:B,fontSize:14}}>→</span><span style={{color:T3,fontSize:13,fontFamily:"Inter,sans-serif"}}>{t}</span></div>)}
            </div>
            <div style={{background:GL,border:`1px solid ${G}20`,borderRadius:14,padding:24}}>
              <h3 style={{fontFamily:"Inter,sans-serif",color:G,fontSize:15,fontWeight:700,marginBottom:14}}>Secondary Beneficiaries</h3>
              {["Local businesses (skilled workers)","Families (increased income)","Communities (new businesses)","Government (lower unemployment)","South Sudan's economy"].map((t,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:8}}><span style={{color:G,fontSize:14}}>→</span><span style={{color:T3,fontSize:13,fontFamily:"Inter,sans-serif"}}>{t}</span></div>)}
            </div>
          </div>
        </div>
      </section>
      {/* Revenue model */}
      <section style={{background:F0,padding:"72px 20px"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <h2 style={{fontFamily:"Inter,sans-serif",fontSize:26,fontWeight:800,color:N,marginBottom:8}}>How YEHUB Sustains Itself</h2>
          <p style={{color:T6,fontFamily:"Inter,sans-serif",fontSize:14,marginBottom:28}}>After the initial $10,000 grant, YEHUB becomes financially self-sustaining through:</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16}}>
            {[{icon:"💳",t:"Membership Fees",d:"Small monthly subscription from active members using hub services."},{icon:"📚",t:"Advanced Courses",d:"Specialised courses (e.g. digital marketing, graphic design) offered at affordable fees."},{icon:"🖥️",t:"Workspace Rental",d:"Entrepreneurs rent desks, meeting rooms, and internet at low cost."},{icon:"📋",t:"Business Support",d:"Small fees for business registration, plan writing, and printing services."},{icon:"🤝",t:"Partnership Projects",d:"NGOs and companies pay YEHUB to deliver youth training programmes."},{icon:"🏆",t:"Community Events",d:"Business exhibitions, workshops, and competitions sponsored by local organisations."}]
              .map((r,i)=><div key={i} style={{background:W,borderRadius:12,padding:"20px 18px",boxShadow:"0 2px 10px rgba(0,0,0,.05)"}}><div style={{fontSize:24,marginBottom:8}}>{r.icon}</div><h3 style={{fontFamily:"Inter,sans-serif",color:N,fontSize:14,marginBottom:5,fontWeight:700}}>{r.t}</h3><p style={{color:T6,fontSize:12,lineHeight:1.6,fontFamily:"Inter,sans-serif",margin:0}}>{r.d}</p></div>)}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══ PROGRAMS ══════════════════════════════════════════════ */
function Programs({openAuth}){
  const[active,setActive]=useState(null);
  return(
    <div style={{paddingTop:62}}>
      <section style={{background:`linear-gradient(145deg,${BD},${NL})`,padding:"80px 20px",textAlign:"center"}}>
        <Pill label="What We Offer" bg="rgba(255,255,255,.12)" color={W}/>
        <h1 style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(28px,5vw,50px)",fontWeight:900,color:W,margin:"14px 0 14px"}}>Hub Programmes</h1>
        <p style={{color:"rgba(255,255,255,.6)",fontSize:16,maxWidth:520,margin:"0 auto",fontFamily:"Inter,sans-serif",lineHeight:1.75}}>Six integrated programmes that take you from skill to sustainable business.</p>
      </section>
      <section style={{background:F8,padding:"72px 20px"}}>
        <div style={{maxWidth:1060,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20}}>
            {PROGRAMS.map((p,i)=>{
              const open=active===i;
              return(<div key={i} style={{background:W,borderRadius:16,overflow:"hidden",boxShadow:"0 2px 14px rgba(0,0,0,.06)",border:`1px solid ${E2}`}}>
                <div style={{background:p.color,padding:"24px 22px"}}>
                  <div style={{fontSize:32,marginBottom:8}}>{p.icon}</div>
                  <h3 style={{fontFamily:"Inter,sans-serif",color:W,fontSize:18,fontWeight:800,marginBottom:6}}>{p.title}</h3>
                  <p style={{color:"rgba(255,255,255,.75)",fontSize:13,fontFamily:"Inter,sans-serif",lineHeight:1.65,margin:0}}>{p.desc}</p>
                </div>
                <div style={{padding:"18px 22px"}}>
                  {open&&p.features.map((f,j)=><div key={j} style={{display:"flex",gap:10,marginBottom:9}}><span style={{color:p.color,fontSize:14,flexShrink:0}}>✓</span><span style={{color:T3,fontSize:13,fontFamily:"Inter,sans-serif"}}>{f}</span></div>)}
                  <button onClick={()=>setActive(open?null:i)} style={{background:"none",border:`1px solid ${p.color}`,color:p.color,padding:"7px 16px",borderRadius:7,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif",marginRight:8}}>{open?"Hide Details":"Learn More"}</button>
                  <button onClick={openAuth} style={{background:p.color,color:W,border:"none",padding:"7px 16px",borderRadius:7,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Apply Now</button>
                </div>
              </div>);
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══ SKILLS ════════════════════════════════════════════════ */
function SkillsPage({openAuth}){
  const[cat,setCat]=useState(0);
  const sk=ALL_SKILLS[cat];
  return(
    <div style={{paddingTop:62}}>
      <section style={{background:`linear-gradient(145deg,${BD},${NL})`,padding:"80px 20px",textAlign:"center"}}>
        <Pill label="Learn" bg="rgba(255,255,255,.12)" color={W}/>
        <h1 style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(28px,5vw,50px)",fontWeight:900,color:W,margin:"14px 0 14px"}}>Skills for the Real World</h1>
        <p style={{color:"rgba(255,255,255,.6)",fontSize:16,maxWidth:500,margin:"0 auto",fontFamily:"Inter,sans-serif",lineHeight:1.75}}>Practical, market-relevant training that directly creates income opportunities in South Sudan.</p>
      </section>
      <section style={{background:F8,padding:"60px 20px"}}>
        <div style={{maxWidth:1060,margin:"0 auto"}}>
          {/* Category tabs */}
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:40,justifyContent:"center"}}>
            {ALL_SKILLS.map((s,i)=><button key={i} onClick={()=>setCat(i)}
              style={{background:cat===i?s.color:W,color:cat===i?W:T3,border:`2px solid ${cat===i?s.color:E2}`,padding:"10px 20px",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"Inter,sans-serif",display:"flex",alignItems:"center",gap:7,transition:"all .22s"}}>
              <span>{s.icon}</span>{s.cat}
            </button>)}
          </div>
          {/* Courses grid */}
          <h2 style={{fontFamily:"Inter,sans-serif",fontSize:22,fontWeight:800,color:N,marginBottom:24}}>{sk.icon} {sk.cat} — {sk.courses.length} Courses</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:18}}>
            {sk.courses.map((c,i)=><div key={i} style={{background:W,borderRadius:14,padding:"22px 20px",borderLeft:`4px solid ${sk.color}`,boxShadow:"0 2px 10px rgba(0,0,0,.05)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <h3 style={{fontFamily:"Inter,sans-serif",color:N,fontSize:15,fontWeight:700,margin:0}}>{c.name}</h3>
                <Pill label={c.level} bg={c.level==="Beginner"?GL:BL} color={c.level==="Beginner"?G:B}/>
              </div>
              <p style={{color:T6,fontSize:13,lineHeight:1.65,fontFamily:"Inter,sans-serif",marginBottom:12}}>{c.desc}</p>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{color:T6,fontSize:11,fontFamily:"Inter,sans-serif"}}>⏱ {c.dur}</span>
                <button onClick={openAuth} style={{background:sk.color,color:W,border:"none",padding:"6px 14px",borderRadius:7,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Enrol →</button>
              </div>
            </div>)}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══ SUCCESS STORIES ════════════════════════════════════════ */
function Stories(){
  return(
    <div style={{paddingTop:62}}>
      <section style={{background:`linear-gradient(145deg,${BD},${NL})`,padding:"80px 20px",textAlign:"center"}}>
        <Pill label="Impact" bg="rgba(255,255,255,.12)" color={W}/>
        <h1 style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(28px,5vw,50px)",fontWeight:900,color:W,margin:"14px 0 14px"}}>Success Stories</h1>
        <p style={{color:"rgba(255,255,255,.6)",fontSize:16,maxWidth:500,margin:"0 auto",fontFamily:"Inter,sans-serif",lineHeight:1.75}}>Real people. Real businesses. Real change.</p>
      </section>
      <section style={{background:F8,padding:"72px 20px"}}>
        <div style={{maxWidth:1000,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:24}}>
          {STORIES.map((s,i)=><div key={i} style={{background:W,borderRadius:18,overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,.08)"}}>
            <div style={{background:`linear-gradient(135deg,${N},${NL})`,padding:"28px 24px",textAlign:"center"}}>
              <div style={{fontSize:48,marginBottom:10}}>{s.emoji}</div>
              <h3 style={{fontFamily:"Inter,sans-serif",color:W,fontSize:19,fontWeight:800,marginBottom:2}}>{s.name}</h3>
              <p style={{color:"rgba(255,255,255,.55)",fontSize:12,fontFamily:"Inter,sans-serif"}}>{s.age} years old · {s.city}</p>
              <Pill label={s.skill} bg="rgba(255,255,255,.12)" color={W}/>
            </div>
            <div style={{padding:"22px 24px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>
                <div style={{background:F0,borderRadius:10,padding:"12px 14px"}}><div style={{color:T6,fontSize:10,fontFamily:"Inter,sans-serif",marginBottom:3}}>BEFORE</div><div style={{color:T3,fontSize:12,fontFamily:"Inter,sans-serif",lineHeight:1.4}}>{s.before}</div></div>
                <div style={{background:GL,borderRadius:10,padding:"12px 14px"}}><div style={{color:G,fontSize:10,fontFamily:"Inter,sans-serif",fontWeight:700,marginBottom:3}}>AFTER</div><div style={{color:G,fontSize:12,fontFamily:"Inter,sans-serif",lineHeight:1.4}}>{s.after}</div></div>
              </div>
              <div style={{background:BLL,borderRadius:8,padding:"10px 14px",marginBottom:14}}>
                <span style={{color:B,fontSize:11,fontFamily:"Inter,sans-serif",fontWeight:700}}>Monthly Income: </span>
                <span style={{color:B,fontSize:16,fontFamily:"Inter,sans-serif",fontWeight:900}}>{s.income}</span>
              </div>
              <p style={{color:T3,fontSize:13,fontStyle:"italic",fontFamily:"Inter,sans-serif",lineHeight:1.65,margin:0}}>"{s.quote}"</p>
            </div>
          </div>)}
        </div>
      </section>
    </div>
  );
}

/* ═══ PARTNERS ══════════════════════════════════════════════ */
function PartnersPage(){
  return(
    <div style={{paddingTop:62}}>
      <section style={{background:`linear-gradient(145deg,${BD},${NL})`,padding:"80px 20px",textAlign:"center"}}>
        <Pill label="Partners" bg="rgba(255,255,255,.12)" color={W}/>
        <h1 style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(28px,5vw,50px)",fontWeight:900,color:W,margin:"14px 0 14px"}}>Our Partners</h1>
        <p style={{color:"rgba(255,255,255,.6)",fontSize:16,maxWidth:500,margin:"0 auto",fontFamily:"Inter,sans-serif",lineHeight:1.75}}>YEHUB succeeds through collaboration. Each partner contributes expertise, funding, or opportunity.</p>
      </section>
      <section style={{background:F8,padding:"72px 20px"}}>
        <div style={{maxWidth:1000,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:20,marginBottom:56}}>
            {PARTNERS.map((p,i)=><div key={i} style={{background:W,borderRadius:14,padding:"24px 22px",boxShadow:"0 2px 12px rgba(0,0,0,.05)",borderTop:`3px solid ${B}`}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                <div style={{width:44,height:44,borderRadius:10,background:BL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{p.icon}</div>
                <div><div style={{fontFamily:"Inter,sans-serif",fontWeight:700,color:N,fontSize:14}}>{p.name}</div><Pill label={p.type}/></div>
              </div>
              <p style={{color:T6,fontSize:13,lineHeight:1.65,fontFamily:"Inter,sans-serif",margin:0}}>{p.desc}</p>
            </div>)}
          </div>
          <div style={{background:`linear-gradient(135deg,${N},${NL})`,borderRadius:18,padding:"40px 32px",textAlign:"center"}}>
            <h2 style={{fontFamily:"Inter,sans-serif",color:W,fontSize:24,fontWeight:800,marginBottom:12}}>Become a Partner</h2>
            <p style={{color:"rgba(255,255,255,.6)",fontFamily:"Inter,sans-serif",fontSize:14,maxWidth:480,margin:"0 auto 24px",lineHeight:1.72}}>NGOs, government agencies, businesses, and universities — partner with YEHUB to train youth, offer internships, fund programmes, or provide mentors.</p>
            <button style={{background:W,color:N,border:"none",padding:"13px 32px",borderRadius:10,fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Partner With Us →</button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══ COMMUNITY ═════════════════════════════════════════════ */
function Community(){
  const posts=[
    {user:"Amara D.",tag:"Question",time:"2h ago",content:"Has anyone tried the solar installation course? Is it available in Wau?",replies:3,likes:7},
    {user:"David A.",tag:"Success",time:"1d ago",content:"Just hit my first 50 customers! Thank you to my mentor James for the push. The market linkage programme really works 🙌",replies:5,likes:24},
    {user:"Grace M.",tag:"Tip",time:"2d ago",content:"For anyone starting digital marketing: Facebook groups in Juba are underrated. I got 3 clients in a week just by posting in community groups.",replies:8,likes:31},
  ];
  return(
    <div style={{paddingTop:62}}>
      <section style={{background:`linear-gradient(145deg,${BD},${NL})`,padding:"80px 20px",textAlign:"center"}}>
        <Pill label="Community" bg="rgba(255,255,255,.12)" color={W}/>
        <h1 style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(28px,5vw,50px)",fontWeight:900,color:W,margin:"14px 0 14px"}}>YEHUB Community</h1>
        <p style={{color:"rgba(255,255,255,.6)",fontSize:16,maxWidth:500,margin:"0 auto",fontFamily:"Inter,sans-serif",lineHeight:1.75}}>Connect, learn, and grow together with fellow entrepreneurs across South Sudan.</p>
      </section>
      <section style={{background:F8,padding:"64px 20px"}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginBottom:48}}>
            {[{icon:"💬",t:"Discussion Forum",d:"Ask questions, share tips, get answers from peers."},{icon:"📅",t:"Events & Workshops",d:"Monthly workshops, pitch days, and innovation competitions."},{icon:"🏆",t:"Innovation Challenges",d:"Compete for prizes and recognition in quarterly challenges."},{icon:"👥",t:"Alumni Network",d:"Connect with graduates who are already running businesses."}]
              .map((c,i)=><div key={i} style={{background:W,borderRadius:12,padding:"18px 16px",boxShadow:"0 2px 10px rgba(0,0,0,.05)",textAlign:"center"}}><div style={{fontSize:28,marginBottom:8}}>{c.icon}</div><h3 style={{fontFamily:"Inter,sans-serif",color:N,fontSize:13,fontWeight:700,marginBottom:5}}>{c.t}</h3><p style={{color:T6,fontSize:11,lineHeight:1.55,fontFamily:"Inter,sans-serif",margin:0}}>{c.d}</p></div>)}
          </div>
          <h2 style={{fontFamily:"Inter,sans-serif",fontSize:20,fontWeight:800,color:N,marginBottom:20}}>Recent Community Posts</h2>
          {posts.map((p,i)=><div key={i} style={{background:W,borderRadius:14,padding:"20px 22px",marginBottom:14,boxShadow:"0 2px 10px rgba(0,0,0,.05)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:BL,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Inter,sans-serif",fontWeight:700,color:B,fontSize:14}}>{p.user[0]}</div>
              <div><div style={{fontFamily:"Inter,sans-serif",fontWeight:700,color:N,fontSize:13}}>{p.user}</div><div style={{color:T6,fontSize:11,fontFamily:"Inter,sans-serif"}}>{p.time}</div></div>
              <Pill label={p.tag} bg={p.tag==="Success"?GL:p.tag==="Tip"?AML:BL} color={p.tag==="Success"?G:p.tag==="Tip"?AM:B}/>
            </div>
            <p style={{color:T3,fontSize:14,fontFamily:"Inter,sans-serif",lineHeight:1.65,marginBottom:12}}>{p.content}</p>
            <div style={{display:"flex",gap:16}}><span style={{color:T6,fontSize:12,fontFamily:"Inter,sans-serif"}}>💬 {p.replies} replies</span><span style={{color:T6,fontSize:12,fontFamily:"Inter,sans-serif"}}>❤️ {p.likes}</span></div>
          </div>)}
          <div style={{textAlign:"center",marginTop:24}}><button style={{background:B,color:W,border:"none",padding:"12px 28px",borderRadius:9,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Join the Community →</button></div>
        </div>
      </section>
    </div>
  );
}

/* ═══ CONTACT ═══════════════════════════════════════════════ */
function Contact(){
  const[form,setForm]=useState({name:"",email:"",subject:"",msg:""});
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const[sent,setSent]=useState(false);
  return(
    <div style={{paddingTop:62}}>
      <section style={{background:`linear-gradient(145deg,${BD},${NL})`,padding:"80px 20px",textAlign:"center"}}>
        <Pill label="Get In Touch" bg="rgba(255,255,255,.12)" color={W}/>
        <h1 style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(28px,5vw,50px)",fontWeight:900,color:W,margin:"14px 0 14px"}}>Contact Us</h1>
        <p style={{color:"rgba(255,255,255,.6)",fontSize:16,maxWidth:500,margin:"0 auto",fontFamily:"Inter,sans-serif",lineHeight:1.75}}>Questions? Want to partner with us? We'd love to hear from you.</p>
      </section>
      <section style={{background:F8,padding:"64px 20px"}}>
        <div style={{maxWidth:860,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:32}}>
          <div>
            <h2 style={{fontFamily:"Inter,sans-serif",fontSize:22,fontWeight:800,color:N,marginBottom:20}}>Get in Touch</h2>
            {[{icon:"📍",t:"Location",d:"Juba, South Sudan"},{icon:"✉️",t:"Email",d:"hello@yehub.org"},{icon:"📞",t:"Phone",d:"+211 912 345 678"},{icon:"⏰",t:"Hub Hours",d:"Mon–Fri, 8am–6pm"}]
              .map((c,i)=><div key={i} style={{display:"flex",gap:14,marginBottom:18}}>
                <div style={{width:40,height:40,borderRadius:10,background:BL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{c.icon}</div>
                <div><div style={{fontFamily:"Inter,sans-serif",fontWeight:600,color:N,fontSize:13}}>{c.t}</div><div style={{color:T6,fontSize:13,fontFamily:"Inter,sans-serif"}}>{c.d}</div></div>
              </div>)}
          </div>
          <div style={{background:W,borderRadius:16,padding:28,boxShadow:"0 4px 20px rgba(0,0,0,.07)"}}>
            {sent?<div style={{textAlign:"center",padding:"32px 0"}}><div style={{fontSize:48,marginBottom:12}}>✅</div><h3 style={{fontFamily:"Inter,sans-serif",color:N,fontWeight:800,marginBottom:8}}>Message Sent!</h3><p style={{color:T6,fontFamily:"Inter,sans-serif",fontSize:13}}>We'll get back to you within 2 business days.</p></div>:<>
              <h3 style={{fontFamily:"Inter,sans-serif",color:N,fontSize:17,fontWeight:700,marginBottom:18}}>Send a Message</h3>
              <Input label="Your Name" value={form.name} onChange={v=>set("name",v)} placeholder="Full name" icon="👤"/>
              <Input label="Email" type="email" value={form.email} onChange={v=>set("email",v)} placeholder="your@email.com" icon="✉️"/>
              <Input label="Subject" value={form.subject} onChange={v=>set("subject",v)} placeholder="How can we help?" icon="💬"/>
              <div style={{marginBottom:14}}>
                <label style={{display:"block",fontSize:12,fontWeight:600,color:T3,fontFamily:"Inter,sans-serif",marginBottom:5}}>Message</label>
                <textarea value={form.msg} onChange={e=>set("msg",e.target.value)} placeholder="Write your message..." rows={4} style={{width:"100%",padding:"10px 13px",borderRadius:8,border:`1.5px solid ${E2}`,outline:"none",fontSize:13,fontFamily:"Inter,sans-serif",resize:"vertical",boxSizing:"border-box"}}/>
              </div>
              <PrimaryBtn label="Send Message →" onClick={()=>setSent(true)} full/>
            </>}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══ DASHBOARD ═════════════════════════════════════════════ */
function Dashboard({user,go}){
  const stage=user?.stage??1;
  return(
    <div style={{background:F8,minHeight:"100vh",paddingTop:62}}>
      <div style={{background:`linear-gradient(135deg,${BD},${B})`,padding:"32px 20px 22px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          {user?.isDemo&&<div style={{background:"rgba(255,165,0,.15)",border:"1px solid rgba(255,165,0,.3)",borderRadius:8,padding:"8px 16px",marginBottom:14,display:"inline-block"}}><span style={{color:"#FFD700",fontFamily:"Inter,sans-serif",fontSize:12,fontWeight:600}}>🎭 Demo Mode — Explore freely. Register to save your progress.</span></div>}
          <p style={{color:"rgba(255,255,255,.6)",fontFamily:"Inter,sans-serif",fontSize:12,marginBottom:2}}>Welcome back,</p>
          <h1 style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(20px,4vw,32px)",fontWeight:800,color:W,marginBottom:4}}>{user?.name} 👋</h1>
          <p style={{color:"rgba(255,255,255,.55)",fontFamily:"Inter,sans-serif",fontSize:13}}>Current Stage: <strong style={{color:W}}>{STAGE_CONTENT[stage]?.label}</strong> — {STAGE_CONTENT[stage]?.duration}</p>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"24px 20px"}}>
        {/* Progress */}
        <div style={{background:W,borderRadius:16,padding:"24px 24px 20px",marginBottom:20,boxShadow:"0 2px 14px rgba(0,0,0,.06)"}}>
          <h2 style={{fontFamily:"Inter,sans-serif",fontSize:15,fontWeight:700,color:N,marginBottom:18}}>Your Journey</h2>
          <div style={{display:"flex",alignItems:"center",overflowX:"auto",paddingBottom:8,gap:0}}>
            {STAGE_CONTENT.map((s,i)=>{
              const done=i<stage,active=i===stage;
              return(<div key={i} style={{display:"flex",alignItems:"center",flexShrink:0}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:72}}>
                  <div onClick={()=>go("journey")} style={{width:42,height:42,borderRadius:"50%",background:done?G:active?B:F0,border:`2px solid ${done?G:active?B:E2}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:done?14:16,marginBottom:5,boxShadow:active?"0 0 0 4px rgba(21,101,192,.2)":"none",cursor:"pointer",transition:"all .3s"}}>
                    {done?"✓":s.icon}
                  </div>
                  <div style={{fontFamily:"Inter,sans-serif",fontSize:10,fontWeight:active?700:500,color:done?G:active?B:T6,textAlign:"center",lineHeight:1.2}}>{s.label}</div>
                </div>
                {i<STAGE_CONTENT.length-1&&<div style={{width:24,height:2,background:i<stage?G:E2,marginBottom:16,flexShrink:0}}/>}
              </div>);
            })}
          </div>
          <div style={{marginTop:18,background:BL,borderRadius:9,padding:"12px 16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <span style={{fontFamily:"Inter,sans-serif",fontSize:12,fontWeight:600,color:B}}>Overall Progress</span>
              <span style={{fontFamily:"Inter,sans-serif",fontSize:12,fontWeight:800,color:B}}>{Math.round((stage/6)*100)}%</span>
            </div>
            <div style={{background:"rgba(21,101,192,.15)",borderRadius:5,height:7,overflow:"hidden"}}>
              <div style={{height:"100%",borderRadius:5,background:B,width:`${Math.round((stage/6)*100)}%`,transition:"width .6s ease"}}/>
            </div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginBottom:18}}>
          {[{icon:"📍",l:"Current Stage",v:STAGE_CONTENT[stage]?.label,c:B},{icon:"⏱",l:"Duration",v:STAGE_CONTENT[stage]?.duration,c:"#7B1FA2"},{icon:"💰",l:"Funding",v:"Eligible",c:G},{icon:"🏆",l:"Health Score",v:stage>3?"72%":"Not yet",c:stage>3?G:T6}]
            .map((s,i)=><div key={i} style={{background:W,borderRadius:12,padding:"18px 16px",boxShadow:"0 2px 10px rgba(0,0,0,.05)"}}><div style={{fontSize:20,marginBottom:7}}>{s.icon}</div><div style={{fontFamily:"Inter,sans-serif",fontSize:19,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T6,marginTop:2}}>{s.l}</div></div>)}
        </div>
        {/* Quick actions */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginBottom:18}}>
          {[{icon:"🗺️",l:"Continue Journey",sub:"View your current stage",action:"journey",bg:B},{icon:"🤖",l:"Open Citrus AI",sub:"Get coaching & advice",action:"ai",bg:"#7B1FA2"},{icon:"📚",l:"Browse Skills",sub:"Explore training courses",action:"skills",bg:AM}]
            .map((a,i)=><button key={i} onClick={()=>go(a.action)} style={{background:a.bg,borderRadius:12,padding:"18px 16px",border:"none",cursor:"pointer",textAlign:"left",transition:"all .22s",opacity:1}} onMouseEnter={e=>e.currentTarget.style.opacity=".85"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              <div style={{fontSize:24,marginBottom:7}}>{a.icon}</div>
              <div style={{fontFamily:"Inter,sans-serif",color:W,fontSize:14,fontWeight:700}}>{a.l}</div>
              <div style={{color:"rgba(255,255,255,.6)",fontSize:11,fontFamily:"Inter,sans-serif",marginTop:2}}>{a.sub}</div>
            </button>)}
        </div>
        <div style={{background:`linear-gradient(135deg,${N},${NL})`,borderRadius:14,padding:"22px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:46,height:46,borderRadius:"50%",background:`linear-gradient(135deg,${B},#42A5F5)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🤖</div>
            <div><div style={{fontFamily:"Inter,sans-serif",fontWeight:800,color:W,fontSize:15}}>Citrus AI</div><div style={{color:"rgba(255,255,255,.5)",fontSize:12,fontFamily:"Inter,sans-serif"}}>Ask me anything about your business journey</div></div>
          </div>
          <button onClick={()=>go("ai")} style={{background:W,color:N,border:"none",padding:"10px 22px",borderRadius:9,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Open →</button>
        </div>
      </div>
    </div>
  );
}

/* ═══ JOURNEY (INTERACTIVE STAGES) ══════════════════════════ */
function Journey({user,go,onStageUpdate}){
  const[current,setCurrent]=useState(user?.stage??1);
  const s=STAGE_CONTENT[current];
  const[checked,setChecked]=useState({});
  const toggle=(k)=>setChecked(p=>({...p,[k]:!p[k]}));
  const done=Object.values(checked).filter(Boolean).length;

  const goNext=()=>{
    if(current<6){const next=current+1;setCurrent(next);setChecked({});onStageUpdate(next);}
  };
  const goPrev=()=>{if(current>0){setCurrent(c=>c-1);setChecked({});}};

  return(
    <div style={{background:F8,minHeight:"100vh",paddingTop:62}}>
      <div style={{background:`linear-gradient(135deg,${s.color},${BD})`,padding:"32px 20px 24px"}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <p style={{color:"rgba(255,255,255,.6)",fontSize:11,fontFamily:"Inter,sans-serif",fontWeight:600,letterSpacing:".12em",textTransform:"uppercase",marginBottom:6}}>Stage {current+1} of 7</p>
          <h1 style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(24px,5vw,44px)",fontWeight:900,color:W,marginBottom:6}}>{s.icon} {s.label}</h1>
          <p style={{color:"rgba(255,255,255,.65)",fontFamily:"Inter,sans-serif",fontSize:14,marginBottom:0}}>{s.duration} · {s.desc}</p>
        </div>
      </div>
      {/* Stage selector strip */}
      <div style={{background:W,borderBottom:`1px solid ${E2}`,overflowX:"auto"}}>
        <div style={{display:"flex",justifyContent:"center",minWidth:"max-content",margin:"0 auto"}}>
          {STAGE_CONTENT.map((st,i)=><button key={i} onClick={()=>{setCurrent(i);setChecked({});}}
            style={{background:"transparent",border:"none",borderBottom:`2px solid ${i===current?st.color:"transparent"}`,color:i===current?st.color:T6,padding:"12px 16px",cursor:"pointer",fontSize:11,fontFamily:"Inter,sans-serif",whiteSpace:"nowrap",fontWeight:i===current?700:400,display:"flex",alignItems:"center",gap:5,transition:"all .2s"}}>
            {i<(user?.stage??1)?"✅":st.icon} {st.label}
          </button>)}
        </div>
      </div>
      <div style={{maxWidth:860,margin:"0 auto",padding:"32px 20px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20,marginBottom:24}}>
          {/* Activities */}
          <div style={{background:W,borderRadius:16,padding:"24px 22px",boxShadow:"0 2px 14px rgba(0,0,0,.06)"}}>
            <h3 style={{fontFamily:"Inter,sans-serif",color:N,fontSize:16,fontWeight:700,marginBottom:16}}>📋 Activities ({done}/{s.activities.length} done)</h3>
            <div style={{background:E2,borderRadius:5,height:6,marginBottom:18,overflow:"hidden"}}>
              <div style={{height:"100%",borderRadius:5,background:s.color,width:`${(done/s.activities.length)*100}%`,transition:"width .4s"}}/>
            </div>
            {s.activities.map((act,i)=>(<div key={i} onClick={()=>toggle(i)} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:12,cursor:"pointer",padding:"8px 10px",borderRadius:8,background:checked[i]?`${s.color}12`:"transparent",border:`1px solid ${checked[i]?s.color:E2}`,transition:"all .2s"}}>
              <div style={{width:20,height:20,borderRadius:5,border:`2px solid ${checked[i]?s.color:E2}`,background:checked[i]?s.color:W,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s",fontSize:11,color:W,fontWeight:700}}>{checked[i]?"✓":""}</div>
              <span style={{color:checked[i]?T6:T3,fontSize:13,fontFamily:"Inter,sans-serif",lineHeight:1.5,textDecoration:checked[i]?"line-through":"none"}}>{act}</span>
            </div>))}
          </div>
          {/* Resources */}
          <div style={{background:W,borderRadius:16,padding:"24px 22px",boxShadow:"0 2px 14px rgba(0,0,0,.06)"}}>
            <h3 style={{fontFamily:"Inter,sans-serif",color:N,fontSize:16,fontWeight:700,marginBottom:16}}>📦 Resources Available</h3>
            {s.resources.map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:9,background:F0,marginBottom:10,border:`1px solid ${E2}`}}>
              <span style={{color:s.color,fontSize:16}}>📄</span>
              <span style={{color:T3,fontSize:13,fontFamily:"Inter,sans-serif"}}>{r}</span>
              <button style={{marginLeft:"auto",background:"none",border:"none",color:s.color,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Download</button>
            </div>)}
            <div style={{background:BLL,borderRadius:10,padding:"14px 16px",marginTop:16}}>
              <p style={{color:B,fontFamily:"Inter,sans-serif",fontSize:12,lineHeight:1.6,margin:0}}><strong>💡 Citrus AI Tip:</strong> Not sure where to start at this stage? Ask Citrus AI for a personalised action plan.</p>
              <button onClick={()=>go("ai")} style={{marginTop:8,background:"none",border:"none",color:B,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif",padding:0}}>Open Citrus AI →</button>
            </div>
          </div>
        </div>
        {/* Navigation */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:W,borderRadius:14,padding:"18px 22px",boxShadow:"0 2px 10px rgba(0,0,0,.05)"}}>
          <button onClick={goPrev} disabled={current===0} style={{background:current===0?F0:N,color:current===0?T6:W,border:"none",padding:"11px 24px",borderRadius:9,fontSize:13,fontWeight:700,cursor:current===0?"default":"pointer",fontFamily:"Inter,sans-serif",opacity:current===0?.5:1}}>← Previous Stage</button>
          <div style={{textAlign:"center"}}>
            <div style={{fontFamily:"Inter,sans-serif",color:N,fontWeight:700,fontSize:14}}>{s.label}</div>
            <div style={{color:T6,fontSize:11,fontFamily:"Inter,sans-serif"}}>{current+1} of 7</div>
          </div>
          <button onClick={goNext} disabled={current===6} style={{background:current===6?F0:s.color,color:current===6?T6:W,border:"none",padding:"11px 24px",borderRadius:9,fontSize:13,fontWeight:700,cursor:current===6?"default":"pointer",fontFamily:"Inter,sans-serif",opacity:current===6?.5:1}}>{current===6?"Completed! 🎉":"Next Stage →"}</button>
        </div>
      </div>
    </div>
  );
}

/* ═══ CITRUS AI ══════════════════════════════════════════════ */
function CitrusAI({user,go}){
  const[msgs,setMsgs]=useState([{role:"assistant",content:`Hi ${user?.name?.split(" ")[0]||"there"}! 👋 I'm Citrus AI — your personal career and entrepreneurship coach.\n\nI can help you:\n• 📋 Plan your business journey step by step\n• 🎯 Discover the right skills to learn first\n• 💰 Find funding & grants for your business\n• 📊 Get your monthly Business Health Score\n\nWhat would you like help with today?`}]);
  const[input,setInput]=useState("");const[loading,setLoading]=useState(false);
  const bottom=useRef(null);const inputRef=useRef(null);
  useEffect(()=>bottom.current?.scrollIntoView({behavior:"smooth"}),[msgs]);

  const send=async()=>{
    if(!input.trim()||loading)return;
    const msg=input.trim();setInput("");
    setMsgs(p=>[...p,{role:"user",content:msg}]);
    setLoading(true);
    try{
      const ctx=user?`\nUser: ${user.name}, Interest: ${user.interest||"general"}, Goal: ${user.goal||"business"}, Stage: ${STAGE_CONTENT[user.stage||1]?.label}`:"";
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,system:AI_PROMPT+ctx,messages:[...msgs,{role:"user",content:msg}].map(m=>({role:m.role,content:m.content}))})});
      const data=await res.json();
      const text=data.content?.find(c=>c.type==="text")?.text||"Sorry, I couldn't respond. Please try again.";
      setMsgs(p=>[...p,{role:"assistant",content:text}]);
    }catch{ setMsgs(p=>[...p,{role:"assistant",content:"Sorry, something went wrong. Please try again. 🙏"}]); }
    setLoading(false);
  };

  const QUICK=[{l:"🐔 Start a poultry business",v:"I want to start a poultry business. What do I need?"},{l:"💡 Best skills for Juba",v:"What are the best skills to learn for business in Juba, South Sudan?"},{l:"📊 Business Health Score",v:"Can you give me my monthly Business Health Score and recommendations?"},{l:"💰 Available funding",v:"What funding and grants are available for young entrepreneurs in South Sudan?"}];

  return(
    <div style={{background:F8,minHeight:"100vh",paddingTop:62,display:"flex",flexDirection:"column"}}>
      <div style={{background:`linear-gradient(135deg,${BD},${B})`,padding:"18px 20px"}}>
        <div style={{maxWidth:800,margin:"0 auto",display:"flex",alignItems:"center",gap:10}}>
          <button onClick={()=>go("dashboard")} style={{background:"rgba(255,255,255,.15)",border:"none",color:W,padding:"6px 13px",borderRadius:7,cursor:"pointer",fontSize:12,fontFamily:"Inter,sans-serif"}}>← Back</button>
          <div style={{width:38,height:38,borderRadius:"50%",background:`linear-gradient(135deg,${B},#42A5F5)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🤖</div>
          <div><div style={{fontFamily:"Inter,sans-serif",fontWeight:800,color:W,fontSize:15}}>Citrus AI</div><div style={{color:"rgba(255,255,255,.5)",fontSize:10,fontFamily:"Inter,sans-serif"}}>YEHUB Career & Business Coach</div></div>
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8}}>
            <button onClick={()=>setMsgs(m=>m.slice(0,1))} style={{background:"rgba(255,255,255,.1)",border:"none",color:"rgba(255,255,255,.6)",padding:"4px 10px",borderRadius:6,cursor:"pointer",fontSize:11,fontFamily:"Inter,sans-serif"}}>Clear</button>
            <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:7,height:7,borderRadius:"50%",background:"#4CAF50"}}/><span style={{color:"rgba(255,255,255,.6)",fontSize:11,fontFamily:"Inter,sans-serif"}}>Online</span></div>
          </div>
        </div>
      </div>
      {/* Quick replies */}
      <div style={{background:W,borderBottom:`1px solid ${E2}`,padding:"10px 20px",overflowX:"auto"}}>
        <div style={{maxWidth:800,margin:"0 auto",display:"flex",gap:8,minWidth:"max-content"}}>
          {QUICK.map((q,i)=><button key={i} onClick={()=>{setInput(q.v);inputRef.current?.focus();}} style={{background:BLL,color:B,border:`1px solid ${B}20`,padding:"6px 14px",borderRadius:20,fontSize:11,cursor:"pointer",fontFamily:"Inter,sans-serif",fontWeight:500,whiteSpace:"nowrap"}}>{q.l}</button>)}
        </div>
      </div>
      {/* Messages */}
      <div style={{flex:1,overflow:"auto",padding:"20px"}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          {msgs.map((m,i)=>(
            <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:14}}>
              {m.role==="assistant"&&<div style={{width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${B},#42A5F5)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,marginRight:8,flexShrink:0,alignSelf:"flex-end"}}>🤖</div>}
              <div style={{background:m.role==="user"?B:W,color:m.role==="user"?W:T1,borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",padding:"12px 16px",maxWidth:"78%",fontSize:13,lineHeight:1.72,fontFamily:"Inter,sans-serif",whiteSpace:"pre-line",boxShadow:"0 2px 10px rgba(0,0,0,.07)"}}>
                {m.content}
              </div>
            </div>
          ))}
          {loading&&<div style={{display:"flex",justifyContent:"flex-start",marginBottom:14}}>
            <div style={{width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${B},#42A5F5)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,marginRight:8,flexShrink:0}}>🤖</div>
            <div style={{background:W,borderRadius:"18px 18px 18px 4px",padding:"12px 16px",boxShadow:"0 2px 10px rgba(0,0,0,.07)",display:"flex",gap:4,alignItems:"center"}}>
              {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:T6,animation:`dot .9s ${i*.2}s ease-in-out infinite`}}/>)}
            </div>
          </div>}
          <div ref={bottom}/>
        </div>
      </div>
      {/* Input */}
      <div style={{padding:"12px 20px 20px",background:W,borderTop:`1px solid ${E2}`}}>
        <div style={{maxWidth:800,margin:"0 auto",display:"flex",gap:8}}>
          <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()} placeholder="Ask Citrus AI anything..." style={{flex:1,padding:"12px 16px",borderRadius:11,border:`1.5px solid ${E2}`,outline:"none",fontSize:13,fontFamily:"Inter,sans-serif",color:T1,background:F8}}/>
          <button onClick={send} disabled={loading||!input.trim()} style={{background:loading||!input.trim()?"#90CAF9":B,color:W,border:"none",width:48,height:46,borderRadius:11,fontSize:18,cursor:"pointer",flexShrink:0,transition:"background .2s"}}>➤</button>
        </div>
        <div style={{maxWidth:800,margin:"6px auto 0",textAlign:"center"}}><span style={{color:T6,fontSize:10,fontFamily:"Inter,sans-serif"}}>Citrus AI · Powered by Claude · For South Sudan youth entrepreneurs</span></div>
      </div>
    </div>
  );
}

/* ═══ APP ROOT ═══════════════════════════════════════════════ */
export default function App(){
  const[page,setPage]=useState("home");
  const[user,setUser]=useState(null);
  const[authModal,setAuthModal]=useState({open:false,tab:"login"});

  const go=(id)=>{setPage(id);window.scrollTo({top:0,behavior:"smooth"});};
  const openAuth=(tab="login")=>setAuthModal({open:true,tab});
  const closeAuth=()=>setAuthModal({open:false,tab:"login"});
  const handleAuth=(u)=>{setUser(u);go("dashboard");};
  const handleLogout=()=>{setUser(null);go("home");};
  const handleStageUpdate=(s)=>setUser(p=>p?{...p,stage:s}:p);

  return(
    <div style={{fontFamily:"Inter,sans-serif",background:F8}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        @keyframes pulse{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.05);opacity:.87;}}
        @keyframes dot{0%,100%{transform:translateY(0);}50%{transform:translateY(-5px);}}
        @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;}}
      `}</style>

      {authModal.open&&<AuthModal defaultTab={authModal.tab} onClose={closeAuth} onAuth={handleAuth}/>}
      <Navbar page={page} go={go} user={user} openAuth={openAuth} onLogout={handleLogout}/>

      <main>
        {page==="home"      && <Home       go={go} openAuth={openAuth}/>}
        {page==="about"     && <About/>}
        {page==="programs"  && <Programs   openAuth={()=>openAuth("register")}/>}
        {page==="skills"    && <SkillsPage openAuth={()=>openAuth("register")}/>}
        {page==="stories"   && <Stories/>}
        {page==="partners"  && <PartnersPage/>}
        {page==="community" && <Community/>}
        {page==="contact"   && <Contact/>}
        {page==="dashboard" && (user?<Dashboard user={user} go={go}/>:<Home go={go} openAuth={openAuth}/>)}
        {page==="journey"   && (user?<Journey user={user} go={go} onStageUpdate={handleStageUpdate}/>:<Home go={go} openAuth={openAuth}/>)}
        {page==="ai"        && (user?<CitrusAI user={user} go={go}/>:<Home go={go} openAuth={openAuth}/>)}
      </main>

      {!["dashboard","journey","ai"].includes(page)&&(
        <footer style={{background:"#060F1F",padding:"32px 20px",textAlign:"center"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:9,marginBottom:8}}>
            <YELogo size={22}/><span style={{fontFamily:"Inter,sans-serif",color:W,fontWeight:800,fontSize:14}}>YEHUB</span>
          </div>
          <p style={{color:"rgba(255,255,255,.28)",fontSize:11,fontFamily:"Inter,sans-serif",marginBottom:4}}>A Citrus_alu Initiative · African Leadership University · RWBISD 2026</p>
          <a href={CITRUS_URL} target="_blank" rel="noopener noreferrer" style={{color:"rgba(255,255,255,.35)",fontSize:11,fontFamily:"Inter,sans-serif",textDecoration:"none"}}>← Visit Citrus_alu</a>
        </footer>
      )}
    </div>
  );
}
