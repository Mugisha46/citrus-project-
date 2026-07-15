import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════ TOKENS ══════════════════════════════ */
const N="#0B1E3D",ND="#06111F",NM="#112744",NL="#1A3260";
const W="#FFFFFF",F8="#F8FAFC",F0="#F0F4F8",E2="#E2EAF0";
const T1="#0F172A",T3="#334155",T6="#64748B";
const CITRUS_URL="https://citrus-project-4pqd.vercel.app/";

/* ═══════════════════════════════════════ DATA ════════════════════════════════ */
const TEAM = [
  { name:"Achol",  role:"Team Leader",        photo:"/assets/achol3.png",  initials:"A",  color:"#0D2040",
    bio:"Achol is the heart and driving force of Citrus_alu. As Team Leader, she brings unwavering vision and strategic clarity to every challenge the team faces. Born with a deep connection to South Sudan's story, she channels her passion for economic justice into practical action — rallying her teammates, guiding key decisions, and ensuring the mission stays true to the communities it serves. Her leadership style is both collaborative and decisive, making her the anchor of everything Citrus_alu does." },
  { name:"Elysee", role:"Operations Manager",  photo:"/assets/Elysee.jpg", initials:"El", color:"#0E2448",
    bio:"Elysee is the engine that keeps Citrus_alu moving. As Operations Manager, he transforms big ideas into structured plans, managing timelines, coordinating team activities, and ensuring every deliverable meets the highest standard. His resourcefulness and calm under pressure have been invaluable during the team's most demanding challenges. When something needs to get done, Elysee finds a way — methodically, reliably, and always on time." },
  { name:"Ian",    role:"Secretary",           photo:"/assets/ian.png",    initials:"I",  color:"#112744",
    bio:"Ian is Citrus_alu's institutional memory and communication anchor. As Secretary, he ensures every decision is documented, every meeting is purposefully structured, and every team member stays informed. His precision and quiet reliability create the organizational foundation that allows the rest of the team to operate with confidence. Ian's consistent contributions keep Citrus_alu aligned from the first challenge to the final deliverable." },
  { name:"Frank",  role:"Editor",              photo:"/assets/frank2.png",  initials:"F",  color:"#152A4E",
    bio:"Frank brings creative precision to everything Citrus_alu produces. As Editor, he shapes the team's voice — refining written work, crafting video content, and building the digital identity that represents Citrus_alu to the world. His eye for detail and storytelling instinct ensure every message is clear, compelling, and true to the mission. Frank also leads the team's website development, bridging creativity and technology in service of the team's goals." },
  { name:"Eden",   role:"Researcher",          photo:"/assets/Eden.png",   initials:"Ed", color:"#1A3260",
    bio:"Eden is Citrus_alu's knowledge architect. As Researcher, he leads the evidence-gathering that grounds the team's solutions in reality — from PESTLE analyses to field interviews with organizations like Jobra, to the documentary exploration of the Hadzabe people of northern Tanzania. His curiosity is insatiable and his rigor uncompromising, ensuring that every claim the team makes is backed by solid research and genuine insight." },
];

const VIDEOS = [
  { id:"nsGthX-kdC4", ch:"01", title:"Introduction",        tag:"Who We Are",     desc:"Meet the Citrus_alu think tank — our names, roles, backgrounds, and what drives each of us to create change for South Sudan's youth." },
  { id:"ii9EQ3j5pWo", ch:"02", title:"Discover Africa",     tag:"Documentary",    desc:"We travelled to northern Tanzania near Lake Eyasi to document the Hadzabe people — one of the world's last surviving hunter-gatherer communities — and their ancient way of life." },
  { id:"Z7f2ABngBQ4", ch:"03", title:"HELP-LAB",            tag:"Community",      desc:"Small acts of kindness — our team visited a local hospital, delivering food and covering medicine payments for sick patients who could not afford care.", photos:["/assets/helplab-1.jpg","/assets/helplab-2.jpg","/assets/helplab-3.jpg"] },
  { id:"5a_KFzYQeq4", ch:"04", title:"Hunt for Treasure",   tag:"Interview",      desc:"We interviewed Jobra — an AI-powered African workforce platform — to understand how technology can bridge the youth employment gap in Africa.", photos:["/assets/jobra-visit-1.jpg","/assets/jobra-visit-2.jpg"], partnerLogo:"/assets/jobra.png" },
  { id:"JJOUycjgGy0", ch:"05", title:"Launch Your Mission", tag:"Grant Proposal", desc:"Our $10,000 grant proposal for Youth Enterprise Hubs — a complete entrepreneurship ecosystem designed to transform South Sudan's unemployed youth into job creators." },
];

const YEH_SKILLS = [
  { icon:"💻", cat:"Digital Skills",    items:["Computer Basics","Microsoft Office","Graphic Design","AI Tools","Digital Marketing"] },
  { icon:"🔧", cat:"Technical Skills",  items:["Tailoring & Sewing","Solar Installation","Mobile Repair","Plumbing"] },
  { icon:"🌾", cat:"Agriculture",       items:["Poultry Keeping","Vegetable Farming","Food Processing","Irrigation"] },
  { icon:"📊", cat:"Business Skills",   items:["Financial Literacy","Business Planning","Customer Service","Entrepreneurship"] },
];

const PESTLE = [
  { icon:"🏛️", f:"Political",     t:"Unstable governance and unofficial checkpoints raise operating costs. Startups must navigate bureaucratic delays and local partnership pressures." },
  { icon:"📉", f:"Economic",      t:"Extreme inflation, weak currency, and near-inaccessible borrowing constrain private-sector growth and consumer spending." },
  { icon:"👥", f:"Social",        t:"72% of the population is under 30. Trust flows through tribal and word-of-mouth networks — community-first approaches are essential." },
  { icon:"📡", f:"Technological", t:"Landlocked geography limits fibre access. Unreliable electricity and high internet costs restrict digital infrastructure development." },
  { icon:"⚖️", f:"Legal",         t:"Governed by the Companies Act (2012) and Investment Promotion Act (2009), covering company formation and operational protections." },
  { icon:"🌿", f:"Environmental", t:"The National Environment Policy 2015–2025 encourages sustainable practices, climate adaptation, and natural resource conservation." },
];

const BUDGET = [
  ["Training Materials","$2,000"],["Computers & Internet","$2,000"],
  ["Mentorship Programme","$1,500"],["Startup Seed Fund","$2,500"],
  ["Community Outreach","$1,000"],["Monitoring & Evaluation","$1,000"],
];

/* ═══════════════════════════════════════ HOOKS ═══════════════════════════════ */
function useInView(th=0.12){
  const ref=useRef(null);const[v,setV]=useState(false);
  useEffect(()=>{
    if(!ref.current)return;
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true);},{threshold:th});
    o.observe(ref.current);return()=>o.disconnect();
  },[th]);
  return[ref,v];
}
function useScrolled(px=72){
  const[s,setS]=useState(false);
  useEffect(()=>{
    const h=()=>setS(window.scrollY>px);
    window.addEventListener("scroll",h,{passive:true});
    return()=>window.removeEventListener("scroll",h);
  },[px]);
  return s;
}
function useMouse(){
  const[m,setM]=useState({x:0,y:0});
  useEffect(()=>{
    const h=(e)=>setM({x:(e.clientX/window.innerWidth-.5)*2,y:(e.clientY/window.innerHeight-.5)*2});
    window.addEventListener("mousemove",h,{passive:true});
    return()=>window.removeEventListener("mousemove",h);
  },[]);
  return m;
}

/* ═══════════════════════════════════════ HERO CAROUSEL ══════════════════════ */
const HERO_IMAGES=[
  {src:"/assets/alu-campus-1.jpg", cap:"African Leadership University · Kigali, Rwanda"},
  {src:"/assets/alu-campus-2.jpg", cap:"Our Home — Where We Learn, Innovate & Lead"},
  {src:"/assets/helplab-outdoor-1.jpg", cap:"HELP-LAB Challenge · Community Service in Action"},
  {src:"/assets/helplab-outdoor-2.jpg", cap:"Citrus_alu Think Tank · Together We Create Change"},
];

function HeroCarousel(){
  const[curr,setCurr]=useState(0);
  const[fade,setFade]=useState(true);
  const n=HERO_IMAGES.length;
  useEffect(()=>{
    const t=setInterval(()=>{
      setFade(false);
      setTimeout(()=>{setCurr(c=>(c+1)%n);setFade(true);},300);
    },2000);
    return()=>clearInterval(t);
  },[n]);
  const goTo=(i)=>{setFade(false);setTimeout(()=>{setCurr(i);setFade(true);},400);};
  const prev=()=>goTo((curr-1+n)%n);
  const next=()=>goTo((curr+1)%n);
  const arrowStyle=(side)=>({
    position:"absolute",[side]:20,top:"50%",transform:"translateY(-50%)",
    background:"rgba(255,255,255,.15)",backdropFilter:"blur(8px)",
    border:"1px solid rgba(255,255,255,.22)",color:W,
    width:44,height:44,borderRadius:"50%",fontSize:22,cursor:"pointer",zIndex:3,
    display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s",lineHeight:1,
  });
  return(
    <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
      {HERO_IMAGES.map((img,i)=>(
        <div key={i} style={{position:"absolute",inset:0,zIndex:curr===i?1:0,
          opacity:curr===i?(fade?1:0):0,transition:"opacity .9s ease-in-out"}}>
          <img src={img.src} alt={img.cap}
            style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}/>
        </div>
      ))}
      {/* Overlay */}
      <div style={{position:"absolute",inset:0,
        background:"linear-gradient(to bottom,rgba(6,17,31,.72) 0%,rgba(11,30,61,.8) 55%,rgba(6,17,31,.92) 100%)",
        zIndex:2}}/>
      {/* Arrows */}
      <button onClick={prev} style={arrowStyle("left")}
        onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.28)"}
        onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.15)"}>‹</button>
      <button onClick={next} style={arrowStyle("right")}
        onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.28)"}
        onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.15)"}>›</button>
      {/* Caption */}
      <div style={{position:"absolute",bottom:108,left:0,right:0,textAlign:"center",zIndex:3,
        opacity:fade?1:0,transition:"opacity .5s ease",pointerEvents:"none"}}>
        <span style={{color:"rgba(255,255,255,.5)",fontSize:10,fontFamily:"Space Mono,monospace",
          letterSpacing:".18em",textTransform:"uppercase"}}>{HERO_IMAGES[curr]?.cap}</span>
      </div>
      {/* Dots */}
      <div style={{position:"absolute",bottom:84,left:"50%",transform:"translateX(-50%)",
        display:"flex",gap:8,zIndex:3}}>
        {HERO_IMAGES.map((_,i)=>(
          <button key={i} onClick={()=>goTo(i)} style={{
            width:i===curr?26:8,height:8,borderRadius:4,padding:0,
            background:i===curr?W:"rgba(255,255,255,.38)",
            border:"none",cursor:"pointer",transition:"all .35s"}}/>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════ PRIMITIVES ═════════════════════════ */
function Reveal({children,delay=0,dir="up",style:x={},className}){
  const[ref,vis]=useInView();
  const tr={up:"translateY(34px)",left:"translateX(-34px)",right:"translateX(34px)",scale:"scale(0.93)"};
  return(
    <div ref={ref} className={className} style={{
      opacity:vis?1:0,transform:vis?"none":tr[dir]||tr.up,
      transition:`opacity .75s cubic-bezier(.22,1,.36,1) ${delay}ms,transform .75s cubic-bezier(.22,1,.36,1) ${delay}ms`,...x
    }}>{children}</div>
  );
}

function Num({to,suffix=""}){
  const[v,setV]=useState(0);const[ref,vis]=useInView(0.5);const done=useRef(false);
  useEffect(()=>{
    if(!vis||done.current)return;done.current=true;let s;
    const tick=(ts)=>{if(!s)s=ts;const p=Math.min((ts-s)/2000,1);setV(Math.floor((1-Math.pow(1-p,3))*to));if(p<1)requestAnimationFrame(tick);};
    requestAnimationFrame(tick);
  },[vis,to]);
  return<span ref={ref}>{v}{suffix}</span>;
}

function Logo({size=40,color=W}){
  const sp12=Array.from({length:12},(_,i)=>(i*30*Math.PI)/180);
  const sp8=Array.from({length:8},(_,i)=>(i*45*Math.PI)/180);
  return(
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="4.5"/>
      {sp12.map((a,i)=><line key={i} x1="50" y1="50" x2={50+42*Math.cos(a)} y2={50+42*Math.sin(a)} stroke={color} strokeWidth="2.2" strokeLinecap="round"/>)}
      {sp8.map((a,i)=><line key={i} x1="50" y1="50" x2={50+18*Math.cos(a)} y2={50+18*Math.sin(a)} stroke={color} strokeWidth="1.5" strokeLinecap="round"/>)}
      <circle cx="50" cy="50" r="4.5" fill={color}/>
    </svg>
  );
}

function Rule({dark=false}){
  const c=dark?N:W,op=dark?.18:.32;
  return(
    <div style={{display:"flex",alignItems:"center",gap:10,maxWidth:160,margin:"0 auto"}}>
      <div style={{flex:1,height:1,background:c,opacity:op}}/><Logo size={12} color={dark?N:W}/><div style={{flex:1,height:1,background:c,opacity:op}}/>
    </div>
  );
}

function Btn({label,onClick,filled=true,sm=false}){
  const[h,setH]=useState(false);const p=sm?"9px 22px":"14px 32px",fs=sm?13:14;
  if(filled)return(
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:W,color:N,border:"none",padding:p,borderRadius:10,fontSize:fs,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif",
        boxShadow:h?"0 14px 36px rgba(255,255,255,.22)":"0 6px 20px rgba(255,255,255,.12)",
        transform:h?"translateY(-2px)":"none",transition:"all .25s"}}>{label}</button>
  );
  return(
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:h?"rgba(255,255,255,.09)":"transparent",color:W,
        border:`1.5px solid ${h?"rgba(255,255,255,.65)":"rgba(255,255,255,.3)"}`,
        padding:p,borderRadius:10,fontSize:fs,fontWeight:500,cursor:"pointer",fontFamily:"Inter,sans-serif",transition:"all .25s"}}>{label}</button>
  );
}

function DarkBtn({label,onClick}){
  const[h,setH]=useState(false);
  return(
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:h?N:"transparent",color:h?W:N,border:`1.5px solid ${N}`,
        padding:"11px 28px",borderRadius:9,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"Inter,sans-serif",transition:"all .25s"}}>
      {label}
    </button>
  );
}

function PageTop({eye,h1,em,sub}){
  return(
    <section style={{background:`linear-gradient(145deg,${ND} 0%,${NL} 100%)`,padding:"96px 24px 64px",textAlign:"center"}}>
      {eye&&<p style={{color:"rgba(255,255,255,.42)",fontSize:10,letterSpacing:".25em",fontFamily:"Space Mono,monospace",textTransform:"uppercase",marginBottom:14}}>{eye}</p>}
      <h1 style={{fontFamily:"Playfair Display,serif",fontSize:"clamp(30px,5vw,54px)",fontWeight:900,color:W,lineHeight:1.1,maxWidth:720,margin:"0 auto"}}>
        {h1}{em&&<> <em style={{fontStyle:"italic",fontWeight:700}}>{em}</em></>}
      </h1>
      {sub&&<p style={{color:"rgba(255,255,255,.5)",fontSize:16,maxWidth:520,margin:"18px auto 0",fontFamily:"Inter,sans-serif",lineHeight:1.75}}>{sub}</p>}
    </section>
  );
}

function HCard({children,style:x={}}){
  const[h,setH]=useState(false);
  return(
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{transform:h?"translateY(-5px)":"none",
        boxShadow:h?"0 20px 56px rgba(11,30,61,.13)":"0 2px 12px rgba(0,0,0,.05)",
        transition:"all .3s cubic-bezier(.22,1,.36,1)",...x}}>{children}</div>
  );
}

/* Word-by-word animated headline */
function WordReveal({text,delay=0,style:x={}}){
  const[ref,vis]=useInView();
  const words=text.split(" ");
  return(
    <span ref={ref} style={{display:"block",...x}}>
      {words.map((w,i)=>(
        <span key={i} style={{display:"inline-block",opacity:vis?1:0,
          transform:vis?"none":"translateY(28px)",
          transition:`opacity .65s cubic-bezier(.22,1,.36,1) ${delay+i*90}ms,transform .65s cubic-bezier(.22,1,.36,1) ${delay+i*90}ms`,
          marginRight:"0.28em"}}>{w}</span>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════ NAVBAR ══════════════════════════════ */
const LINKS=["home","about","problem","solution","team","challenges","contact"];
const LBL={home:"Home",about:"About",problem:"Problem",solution:"Solution",team:"Team",challenges:"E-LAB",contact:"Contact"};

function Navbar({page,go}){
  const sc=useScrolled();const[open,setOpen]=useState(false);
  return(
    <nav aria-label="Main" style={{position:"fixed",top:0,left:0,right:0,zIndex:9000,
      background:sc?"rgba(6,15,31,.93)":"transparent",
      backdropFilter:sc?"blur(18px) saturate(180%)":"none",
      borderBottom:sc?"1px solid rgba(255,255,255,.07)":"none",
      transition:"all .5s cubic-bezier(.22,1,.36,1)"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",height:66,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={()=>{go("home");setOpen(false);}} aria-label="Home"
          style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:10,padding:0}}>
          <Logo size={30} color={W}/>
          <span style={{fontFamily:"Playfair Display,serif",color:W,fontSize:18,fontWeight:700}}>
            Citrus<em style={{fontStyle:"italic",fontWeight:400,opacity:.75}}>_alu</em>
          </span>
        </button>
        <div style={{display:"flex",gap:2}}>
          {LINKS.map(id=>{const a=page===id;return(
            <button key={id} onClick={()=>go(id)} aria-current={a?"page":undefined}
              style={{background:a?"rgba(255,255,255,.14)":"transparent",color:a?W:"rgba(255,255,255,.52)",
                border:"none",padding:"7px 13px",borderRadius:8,cursor:"pointer",
                fontSize:13,fontWeight:a?600:400,fontFamily:"Inter,sans-serif",transition:"all .2s"}}
              onMouseEnter={e=>{if(!a)e.currentTarget.style.color=W;}}
              onMouseLeave={e=>{if(!a)e.currentTarget.style.color="rgba(255,255,255,.52)";}}>
              {LBL[id]}
            </button>
          );})}
        </div>
        <button onClick={()=>setOpen(!open)} aria-label="Menu" aria-expanded={open}
          style={{background:"none",border:"none",color:W,fontSize:20,cursor:"pointer",lineHeight:1}}>
          {open?"✕":"☰"}
        </button>
      </div>
      {open&&(
        <div style={{background:"rgba(6,15,31,.97)",borderTop:"1px solid rgba(255,255,255,.07)",padding:"10px 24px 18px"}}>
          {LINKS.map(id=>(
            <button key={id} onClick={()=>{go(id);setOpen(false);}}
              style={{display:"block",width:"100%",textAlign:"left",background:"none",
                border:"none",borderBottom:"1px solid rgba(255,255,255,.05)",
                color:page===id?W:"rgba(255,255,255,.48)",padding:"12px 0",
                fontSize:15,cursor:"pointer",fontFamily:"Inter,sans-serif",fontWeight:page===id?600:400}}>
              {LBL[id]}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════ HOME ════════════════════════════════ */
const HEX=`url("data:image/svg+xml,%3Csvg width='70' height='70' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='35,4 66,21 66,49 35,66 4,49 4,21' fill='none' stroke='%23ffffff' stroke-width='.55'/%3E%3C/svg%3E")`;

function Home({go}){
  const mouse=useMouse();
  return(
    <div>
      {/* HERO ─────────────────────────────────────────────────── */}
      <section style={{minHeight:"100vh",position:"relative",overflow:"hidden",background:ND,
        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
        textAlign:"center",padding:"108px 24px 110px"}}>
        {/* Image carousel background */}
        <HeroCarousel/>
        {/* Subtle hex texture on top of carousel */}
        <div style={{position:"absolute",inset:0,backgroundImage:HEX,backgroundSize:"70px 70px",opacity:.03,pointerEvents:"none",zIndex:3}}/>

        {/* All hero content sits above carousel (z-index 4) */}
        <div style={{position:"relative",zIndex:4,display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
        {/* Parallax container */}
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",
          transform:`translate(${mouse.x*-6}px,${mouse.y*-4}px)`,transition:"transform .08s linear"}}>
          <Reveal>
            <Logo size={88} color={W}/>
          </Reveal>
          <Reveal delay={80}>
            <div style={{display:"flex",alignItems:"center",gap:12,margin:"20px 0 6px"}}>
              <div style={{width:28,height:1,background:"rgba(255,255,255,.28)"}}/>
              <span style={{color:"rgba(255,255,255,.4)",fontSize:10,letterSpacing:".24em",fontFamily:"Space Mono,monospace",textTransform:"uppercase"}}>
                A Citrus_alu Initiative · RWBISD 2026
              </span>
              <div style={{width:28,height:1,background:"rgba(255,255,255,.28)"}}/>
            </div>
          </Reveal>
        </div>

        {/* Headline — word by word */}
        <div style={{maxWidth:920,margin:"0 auto"}}>
          <h1 style={{fontFamily:"Playfair Display,serif",fontSize:"clamp(44px,7.5vw,90px)",fontWeight:900,lineHeight:1.05,color:W,margin:"10px 0 0"}}>
            <WordReveal text="Africa's Youth" delay={160}/>
            <WordReveal text="Deserve More." delay={320} style={{fontStyle:"italic",fontWeight:700,opacity:.9}}/>
          </h1>
        </div>

        <Reveal delay={560} style={{maxWidth:550,margin:"22px auto 0"}}>
          <p style={{color:"rgba(255,255,255,.5)",fontSize:18,fontFamily:"Inter,sans-serif",lineHeight:1.78,margin:0}}>
            Creating localized development funds tied to South Sudan's mineral resources — transparent, community-driven economic futures for young Africans.
          </p>
        </Reveal>

        <Reveal delay={680} style={{marginTop:44}}>
          <div style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"}}>
            <Btn label="Our Solution →" onClick={()=>go("solution")}/>
            <Btn label="E-LAB Challenges" onClick={()=>go("challenges")} filled={false}/>
          </div>
        </Reveal>

        {/* Scroll cue */}
        <Reveal delay={900} style={{marginTop:32,display:"flex",flexDirection:"column",alignItems:"center",gap:6,opacity:.38}}>
          <span style={{color:W,fontSize:9,fontFamily:"Space Mono,monospace",letterSpacing:".22em",textTransform:"uppercase"}}>Scroll</span>
          <div style={{width:1,height:44,background:`linear-gradient(to bottom,${W},transparent)`}}/>
        </Reveal>
        </div>{/* end hero content wrapper */}
      </section>

      {/* STATS ──────────────────────────────────────────────────── */}
      <section style={{background:N,padding:"60px 24px"}}>
        <div style={{maxWidth:1000,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:28,textAlign:"center"}}>
          {[{to:72,sx:"%",l:"of South Sudan's population under 30"},{to:15,sx:"%+",l:"Youth unemployment (UNDP, 2023)"},{to:2030,sx:"",l:"Our target year to reduce unemployment"},{to:5000,sx:"pts",l:"Total E-LAB challenge points at stake"}]
            .map((s,i)=>(
              <Reveal key={i} delay={i*70}>
                <div>
                  <div style={{fontFamily:"Space Mono,monospace",fontSize:"clamp(32px,4.5vw,52px)",fontWeight:700,color:W,lineHeight:1}}>
                    <Num to={s.to} suffix={s.sx}/>
                  </div>
                  <div style={{color:"rgba(255,255,255,.36)",fontSize:12,fontFamily:"Inter,sans-serif",marginTop:9,lineHeight:1.5,maxWidth:150,margin:"9px auto 0"}}>{s.l}</div>
                </div>
              </Reveal>
            ))}
        </div>
      </section>

      {/* MISSION ─────────────────────────────────────────────────── */}
      <section style={{background:F8,padding:"96px 24px",textAlign:"center"}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <Reveal>
            <p style={{color:T6,fontSize:10,letterSpacing:".24em",fontFamily:"Space Mono,monospace",textTransform:"uppercase",marginBottom:16}}>Our Mission</p>
            <Rule dark/>
            <blockquote style={{fontFamily:"Playfair Display,serif",fontSize:"clamp(17px,2.5vw,26px)",color:N,lineHeight:1.85,margin:"36px 0 0",fontStyle:"italic",fontWeight:700,padding:0,border:0}}>
              "Our mission is to create localized development funds tied to the mineral resources sites to directly benefit South Sudan through centralized systems that allow transparent use of resources."
            </blockquote>
          </Reveal>
          <Reveal delay={180} style={{marginTop:36}}>
            <DarkBtn label="Learn About Citrus_alu" onClick={()=>go("about")}/>
          </Reveal>
        </div>
      </section>

      {/* YEHUB TEASER ─────────────────────────────────────────────── */}
      <section style={{background:N,padding:"96px 24px"}}>
        <div style={{maxWidth:1120,margin:"0 auto"}}>
          <Reveal>
            <p style={{color:"rgba(255,255,255,.4)",fontSize:10,letterSpacing:".24em",fontFamily:"Space Mono,monospace",textTransform:"uppercase",marginBottom:14,textAlign:"center"}}>Our Solution</p>
            <h2 style={{fontFamily:"Playfair Display,serif",fontSize:"clamp(28px,4.5vw,48px)",color:W,textAlign:"center",fontWeight:900,marginBottom:14}}>
              Introducing <em style={{fontStyle:"italic"}}>Youth Enterprise Hubs</em>
            </h2>
            <p style={{color:"rgba(255,255,255,.5)",fontSize:16,maxWidth:580,margin:"0 auto 56px",fontFamily:"Inter,sans-serif",lineHeight:1.75,textAlign:"center"}}>
              Community-based centres that transform unemployed youth into job creators through training, mentorship, funding, and market access — all in one place.
            </p>
          </Reveal>
          {/* Journey */}
          <Reveal delay={100}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap",gap:6,marginBottom:56}}>
              {["Register","Assess","Train","Incubate","Fund","Launch","Market"].map((s,i,arr)=>(
                <div key={i} style={{display:"flex",alignItems:"center"}}>
                  <div style={{background:"rgba(255,255,255,.09)",border:"1px solid rgba(255,255,255,.16)",borderRadius:9,padding:"9px 18px",textAlign:"center"}}>
                    <div style={{color:"rgba(255,255,255,.3)",fontSize:9,fontFamily:"Space Mono,monospace",marginBottom:3}}>{`0${i+1}`}</div>
                    <div style={{color:W,fontFamily:"Space Mono,monospace",fontSize:12,fontWeight:700}}>{s}</div>
                  </div>
                  {i<arr.length-1&&<span style={{color:"rgba(255,255,255,.2)",fontSize:16,margin:"0 3px"}}>›</span>}
                </div>
              ))}
            </div>
          </Reveal>
          {/* Skills preview */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:16,marginBottom:48}}>
            {YEH_SKILLS.map((sk,i)=>(
              <Reveal key={i} delay={i*60}>
                <div style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:14,padding:"24px 20px"}}>
                  <div style={{fontSize:26,marginBottom:10}}>{sk.icon}</div>
                  <h3 style={{fontFamily:"Playfair Display,serif",color:W,fontSize:15,marginBottom:10,fontWeight:700}}>{sk.cat}</h3>
                  {sk.items.map((it,j)=>(
                    <div key={j} style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
                      <div style={{width:4,height:4,borderRadius:"50%",background:"rgba(255,255,255,.4)"}}/>
                      <span style={{color:"rgba(255,255,255,.55)",fontSize:12,fontFamily:"Inter,sans-serif"}}>{it}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} style={{textAlign:"center"}}>
            <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
              <Btn label="Explore the Full Solution →" onClick={()=>go("solution")}/>
              <Btn label="Launch YEHUB Prototype" onClick={()=>window.open(CITRUS_URL, "_blank", "noopener,noreferrer")}/>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NAV CARDS ───────────────────────────────────────────────── */}
      <section style={{background:F0,padding:"96px 24px"}}>
        <div style={{maxWidth:1120,margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontFamily:"Playfair Display,serif",fontSize:"clamp(26px,4vw,42px)",color:N,textAlign:"center",marginBottom:52,fontWeight:900}}>Explore Our Work</h2>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:18}}>
            {[
              {id:"problem",icon:"🔍",t:"The Problem",d:"South Sudan's youth unemployment crisis and its structural root causes."},
              {id:"challenges",icon:"🏆",t:"E-LAB Challenges",d:"Six documented challenges — research, fieldwork, and innovation."},
              {id:"team",icon:"🌍",t:"Our Team",d:"Meet the Citrus_alu think tank — fruits of labor Africa has produced."},
              {id:"contact",icon:"📡",t:"Connect With Us",d:"Follow our journey on YouTube and Instagram."},
            ].map((c,i)=>(
              <Reveal key={c.id} delay={i*70}>
                <NavTile icon={c.icon} title={c.t} desc={c.d} onClick={()=>go(c.id)}/>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function NavTile({icon,title,desc,onClick}){
  const[h,setH]=useState(false);
  return(
    <div onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:h?N:W,border:`1px solid ${h?N:E2}`,borderTopWidth:3,borderTopColor:N,borderRadius:16,padding:"26px 22px",cursor:"pointer",
        transform:h?"translateY(-5px)":"none",
        boxShadow:h?"0 20px 56px rgba(11,30,61,.18)":"0 2px 12px rgba(0,0,0,.04)",
        transition:"all .3s cubic-bezier(.22,1,.36,1)"}}>
      <div style={{fontSize:30,marginBottom:14}}>{icon}</div>
      <h3 style={{fontFamily:"Playfair Display,serif",color:h?W:N,fontSize:17,marginBottom:8,transition:"color .3s"}}>{title}</h3>
      <p style={{color:h?"rgba(255,255,255,.58)":T6,fontSize:13,lineHeight:1.65,fontFamily:"Inter,sans-serif",margin:0,transition:"color .3s"}}>{desc}</p>
    </div>
  );
}

/* ═══════════════════════════════════════ ABOUT ═══════════════════════════════ */
function About(){
  return(
    <div style={{paddingTop:66}}>
      <PageTop eye="Who We Are" h1="About" em="Citrus_alu" sub="We are the fruits of labor that Africa has produced."/>
      <section style={{background:F8,padding:"88px 24px",textAlign:"center"}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          <Reveal>
            <p style={{color:T6,fontSize:10,letterSpacing:".24em",fontFamily:"Space Mono,monospace",textTransform:"uppercase",marginBottom:16}}>Mission Statement</p>
            <Rule dark/>
            <blockquote style={{fontFamily:"Playfair Display,serif",fontSize:"clamp(17px,2.4vw,25px)",color:N,lineHeight:1.88,margin:"36px 0 0",fontStyle:"italic",fontWeight:700,padding:0,border:0}}>
              "Our mission is to create localized development funds tied to the mineral resources sites to directly benefit South Sudan through centralized systems that allow transparent use of resources."
            </blockquote>
          </Reveal>
        </div>
      </section>
      <section style={{background:F0,padding:"88px 24px"}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <Reveal><h2 style={{fontFamily:"Playfair Display,serif",fontSize:34,color:N,textAlign:"center",marginBottom:52,fontWeight:900}}>Why South Sudan?</h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:22}}>
            {[
              {icon:"⛏️",t:"Mineral Wealth, Human Poverty",d:"South Sudan holds significant mineral resources, yet its youth remain largely disconnected from the economic benefits those resources generate."},
              {icon:"🏗️",t:"Transparency as Foundation",d:"Centralized, transparent systems are the missing link between resource wealth and real, lasting community development."},
              {icon:"🌱",t:"Youth-Led Change",d:"With 72% under 30, South Sudan's greatest resource isn't underground — it's its young people. We exist to channel that energy productively."},
            ].map((c,i)=>(
              <Reveal key={i} delay={i*80}>
                <HCard style={{background:W,borderRadius:14,padding:"28px 26px",borderLeft:`4px solid ${N}`}}>
                  <div style={{fontSize:30,marginBottom:12}}>{c.icon}</div>
                  <h3 style={{fontFamily:"Playfair Display,serif",color:N,fontSize:17,marginBottom:8}}>{c.t}</h3>
                  <p style={{color:T6,fontSize:14,lineHeight:1.72,fontFamily:"Inter,sans-serif",margin:0}}>{c.d}</p>
                </HCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════ PROBLEM ════════════════════════════ */
function Problem(){
  const[tab,setTab]=useState("stmt");
  return(
    <div style={{paddingTop:66}}>
      <PageTop eye="The Challenge" h1="South Sudan's" em="Youth Crisis"/>
      <div style={{background:NM,display:"flex",justifyContent:"center"}}>
        {[["stmt","Problem Statement"],["pestle","PESTLE Analysis"]].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)}
            style={{background:"transparent",border:"none",color:tab===id?W:"rgba(255,255,255,.42)",
              borderBottom:tab===id?`2px solid ${W}`:"2px solid transparent",
              padding:"15px 28px",cursor:"pointer",fontSize:12,fontWeight:tab===id?600:400,
              fontFamily:"Inter,sans-serif",letterSpacing:".04em",textTransform:"uppercase",transition:"all .2s"}}>
            {label}
          </button>
        ))}
      </div>
      {tab==="stmt"&&(
        <section style={{background:F8,padding:"64px 24px"}}>
          <div style={{maxWidth:860,margin:"0 auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(172px,1fr))",gap:16,marginBottom:52}}>
              {[{n:"72%",l:"Population under 30",col:"#1A3260"},{n:"15%+",l:"Youth unemployment (UNDP 2023)",col:"#C0392B"},{n:"2030",l:"Target reduction year",col:"#1E7E4E"},{n:"18–35",l:"Age group we serve",col:N}]
                .map((s,i)=>(
                  <Reveal key={i} delay={i*70}>
                    <div style={{background:W,borderRadius:12,padding:"22px 18px",textAlign:"center",boxShadow:"0 2px 14px rgba(0,0,0,.06)",borderTop:`4px solid ${s.col}`}}>
                      <div style={{fontFamily:"Space Mono,monospace",fontSize:28,fontWeight:700,color:s.col,lineHeight:1}}>{s.n}</div>
                      <div style={{fontSize:12,color:T6,fontFamily:"Inter,sans-serif",marginTop:6,lineHeight:1.4}}>{s.l}</div>
                    </div>
                  </Reveal>
                ))}
            </div>
            <Reveal>
              <div style={{background:W,borderRadius:16,padding:44,boxShadow:"0 4px 28px rgba(0,0,0,.06)"}}>
                <h3 style={{fontFamily:"Playfair Display,serif",color:N,fontSize:24,marginTop:0,marginBottom:8}}>Problem Statement</h3>
                <div style={{height:2,background:N,width:48,marginBottom:24,opacity:.15}}/>
                {["High unemployment among young people in South Sudan remains a major challenge, particularly in urban and peri-urban communities where many youth struggle to find stable employment opportunities. The problem occurs continuously as thousands of young people enter the labour market each year but face limited job opportunities due to a weak private sector and low levels of investment.",
                  "This issue is important because unemployment contributes to poverty, economic dependence, and reduced community development. By 2030, South Sudan should aim to reduce youth unemployment by increasing access to employment opportunities, entrepreneurship support, and skills development programmes for young people aged 18–35. Approximately 72% of the total population is under 30, with youth unemployment exceeding 15% (UNDP, 2023)."]
                  .map((p,i)=><p key={i} style={{color:T3,lineHeight:1.9,fontFamily:"Inter,sans-serif",fontSize:15,marginBottom:i===0?16:0}}>{p}</p>)}
                <p style={{color:T6,fontSize:12,fontStyle:"italic",fontFamily:"Inter,sans-serif",marginTop:14,marginBottom:0}}>Source: United Nations Development Programme, 2023</p>
              </div>
            </Reveal>
          </div>
        </section>
      )}
      {tab==="pestle"&&(
        <section style={{background:F8,padding:"64px 24px"}}>
          <div style={{maxWidth:1060,margin:"0 auto"}}>
            <Reveal><p style={{textAlign:"center",color:T6,fontFamily:"Inter,sans-serif",marginBottom:42}}>Contextual factors affecting startups operating in South Sudan</p></Reveal>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(295px,1fr))",gap:18}}>
              {PESTLE.map((item,i)=>(
                <Reveal key={i} delay={i*60}>
                  <HCard style={{background:W,borderRadius:14,padding:26,borderLeft:`4px solid ${N}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                      <span style={{fontSize:20}}>{item.icon}</span>
                      <span style={{fontFamily:"Space Mono,monospace",color:N,fontSize:11,textTransform:"uppercase",letterSpacing:".06em",fontWeight:700}}>{item.f}</span>
                    </div>
                    <p style={{color:T3,fontSize:14,lineHeight:1.76,fontFamily:"Inter,sans-serif",margin:0}}>{item.t}</p>
                  </HCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════ SOLUTION ═══════════════════════════ */
function Solution(){
  return(
    <div style={{paddingTop:66}}>
      <PageTop eye="Our Solution" h1="Youth Enterprise" em="Hubs" sub="Community-based entrepreneurship centres that equip unemployed South Sudanese youth with practical skills, mentorship, startup support, and market access."/>
      {/* Journey */}
      <section style={{background:N,padding:"52px 24px"}}>
        <div style={{maxWidth:1000,margin:"0 auto",textAlign:"center"}}>
          <Reveal><p style={{color:"rgba(255,255,255,.45)",fontSize:11,fontFamily:"Space Mono,monospace",textTransform:"uppercase",letterSpacing:".15em",marginBottom:24}}>The Journey: Job Seeker → Job Creator</p></Reveal>
          <Reveal delay={100}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap",gap:6}}>
              {["Register","Assess","Train","Incubate","Fund","Launch","Market"].map((s,i,arr)=>(
                <div key={i} style={{display:"flex",alignItems:"center"}}>
                  <div style={{background:"rgba(255,255,255,.09)",border:"1px solid rgba(255,255,255,.18)",borderRadius:9,padding:"8px 16px",textAlign:"center"}}>
                    <div style={{color:"rgba(255,255,255,.32)",fontSize:9,fontFamily:"Space Mono,monospace",marginBottom:3}}>{`0${i+1}`}</div>
                    <div style={{color:W,fontFamily:"Space Mono,monospace",fontSize:12,fontWeight:700}}>{s}</div>
                  </div>
                  {i<arr.length-1&&<span style={{color:"rgba(255,255,255,.22)",fontSize:16,margin:"0 3px"}}>›</span>}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      {/* Skills */}
      <section style={{background:F0,padding:"88px 24px"}}>
        <div style={{maxWidth:1060,margin:"0 auto"}}>
          <Reveal><h2 style={{fontFamily:"Playfair Display,serif",fontSize:34,color:N,textAlign:"center",marginBottom:52,fontWeight:900}}>Skills We Teach</h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:20}}>
            {YEH_SKILLS.map((sk,i)=>(
              <Reveal key={i} delay={i*60}>
                <HCard style={{background:W,borderRadius:14,padding:"26px 22px",borderTop:`3px solid ${N}`}}>
                  <div style={{fontSize:30,marginBottom:12}}>{sk.icon}</div>
                  <h3 style={{fontFamily:"Playfair Display,serif",color:N,fontSize:16,marginBottom:12,fontWeight:700}}>{sk.cat}</h3>
                  {sk.items.map((it,j)=>(
                    <div key={j} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                      <div style={{width:5,height:5,borderRadius:"50%",background:N,opacity:.35}}/>
                      <span style={{color:T3,fontSize:13,fontFamily:"Inter,sans-serif"}}>{it}</span>
                    </div>
                  ))}
                </HCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* Budget */}
      <section style={{background:F8,padding:"88px 24px"}}>
        <div style={{maxWidth:660,margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontFamily:"Playfair Display,serif",fontSize:34,color:N,textAlign:"center",marginBottom:38,fontWeight:900}}>Grant Budget — $10,000</h2>
            <div style={{background:W,borderRadius:16,overflow:"hidden",boxShadow:"0 4px 28px rgba(0,0,0,.07)"}}>
              {BUDGET.map(([item,amt],i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"14px 24px",background:i%2===0?W:F8,borderBottom:`1px solid ${E2}`}}>
                  <span style={{fontFamily:"Inter,sans-serif",color:T3,fontSize:14}}>{item}</span>
                  <span style={{fontFamily:"Space Mono,monospace",color:N,fontSize:14,fontWeight:700}}>{amt}</span>
                </div>
              ))}
              <div style={{display:"flex",justifyContent:"space-between",padding:"16px 24px",background:N}}>
                <span style={{fontFamily:"Inter,sans-serif",color:W,fontSize:15,fontWeight:700}}>TOTAL</span>
                <span style={{fontFamily:"Space Mono,monospace",color:W,fontSize:15,fontWeight:700}}>$10,000</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      {/* YEHUB CTA */}
      <section style={{background:`linear-gradient(145deg,${ND} 0%,${NL} 100%)`,padding:"88px 24px",textAlign:"center"}}>
        <Reveal>
          <p style={{color:"rgba(255,255,255,.4)",fontSize:10,letterSpacing:".24em",fontFamily:"Space Mono,monospace",textTransform:"uppercase",marginBottom:14}}>Interactive Prototype</p>
          <Logo size={56} color={W}/>
          <h2 style={{fontFamily:"Playfair Display,serif",color:W,fontSize:"clamp(28px,4.5vw,46px)",marginTop:16,marginBottom:14,fontWeight:900}}>
            Experience <em style={{fontStyle:"italic"}}>YEHUB</em>
          </h2>
          <p style={{color:"rgba(255,255,255,.48)",fontFamily:"Inter,sans-serif",maxWidth:480,margin:"0 auto 36px",lineHeight:1.75}}>
            Our interactive prototype lets you experience what it feels like to be a Youth Enterprise Hub member — from registration to business launch, guided by Citrus AI.
          </p>
          <Btn label="Launch YEHUB Prototype →" onClick={()=>window.open(CITRUS_URL, "_blank", "noopener,noreferrer")}/>
        </Reveal>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════ TEAM ════════════════════════════════ */
const COLORS=["#1A3260","#0B2E5A","#0E2448","#152A4E","#0D2040"];
function Team(){
  return(
    <div style={{paddingTop:66}}>
      <PageTop eye="Think Tank" h1="Meet Our" em="Team" sub="We are the fruits of labor that Africa has produced."/>
      <section style={{background:F0,padding:"88px 24px"}}>
        <div style={{maxWidth:1080,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24}}>
            {TEAM.map((m,i)=>(
              <Reveal key={i} delay={i*70}>
                <HCard style={{background:W,borderRadius:18,overflow:"hidden"}}>
                  {/* Photo area */}
                  <div style={{background:`linear-gradient(140deg,${COLORS[i]},${NL})`,height:180,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                    <div style={{width:88,height:88,borderRadius:"50%",background:"rgba(255,255,255,.1)",border:"2px solid rgba(255,255,255,.3)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <span style={{fontFamily:"Playfair Display,serif",color:W,fontSize:28,fontWeight:700}}>{m.initials}</span>
                    </div>
                    <div style={{position:"absolute",bottom:14,right:14}}>
                      <span style={{background:"rgba(255,255,255,.15)",color:W,fontFamily:"Space Mono,monospace",fontSize:9,padding:"3px 8px",borderRadius:4,letterSpacing:".05em",textTransform:"uppercase"}}>{m.role}</span>
                    </div>
                  </div>
                  {/* Info */}
                  <div style={{padding:"22px 24px 26px"}}>
                    <h3 style={{fontFamily:"Playfair Display,serif",color:N,fontSize:20,marginBottom:4,fontWeight:700}}>{m.name}</h3>
                    <p style={{color:T6,fontFamily:"Space Mono,monospace",fontSize:10,marginBottom:14,textTransform:"uppercase",letterSpacing:".06em"}}>{m.role}</p>
                    <p style={{color:T3,fontFamily:"Inter,sans-serif",fontSize:13,lineHeight:1.75,margin:0}}>{m.bio}</p>
                  </div>
                </HCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400} style={{marginTop:28}}>
            <div style={{background:N,borderRadius:14,padding:"28px 32px",textAlign:"center"}}>
              <Logo size={32} color={W}/>
              <p style={{color:"rgba(255,255,255,.55)",fontFamily:"Playfair Display,serif",fontSize:16,fontStyle:"italic",marginTop:12,marginBottom:4}}>
                "We are the fruits of labor that Africa has produced."
              </p>
              <p style={{color:"rgba(255,255,255,.28)",fontFamily:"Space Mono,monospace",fontSize:10}}>Citrus_alu · African Leadership University · RWBISD</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════ CHALLENGES ══════════════════════════ */
const CH_EXTRA = {
  "02": {
    subtitle:"The Hadzabe Tribe — Tanzania's Last Hunter-Gatherers",
    extra:"We travelled to northern Tanzania near Lake Eyasi to meet the Hadzabe people, one of the world's last surviving hunter-gatherer communities. Often mischaracterized as 'primitive,' the Hadzabe possess deep knowledge of nature, sustainable living practices, and a unique culture that has endured for thousands of years. Yet they face modern challenges — land loss, cultural change, and increasing contact with the outside world.",
  },
  "03": {
    extra:"The Citrus_alu team organized a community visit to a local hospital, bringing food, essentials, and covering medicine payments for patients who could not afford care. This challenge reinforced our belief that meaningful change starts with small, consistent acts of kindness to those around us.",
  },
  "04": {
    extra:"Jobra (formerly Umurava) is an AI-powered African workforce platform that connects vetted African talent with companies across the continent. Our interview explored three core barriers they tackle: skills mismatch, limited access to networks, and lack of work experience — all directly relevant to the problem we're solving in South Sudan.",
  },
};

function Challenges(){
  const[active,setActive]=useState(0);
  const v=VIDEOS[active];
  const ex=CH_EXTRA[v.ch]||{};
  return(
    <div style={{paddingTop:66}}>
      <PageTop eye="Documented Journey" h1="E-LAB" em="Challenges" sub="Six challenges that shaped our solution, our team, and our mission."/>
      {/* Tabs */}
      <div style={{background:NM,overflowX:"auto"}}>
        <div style={{display:"flex",justifyContent:"center",minWidth:"max-content",margin:"0 auto"}}>
          {VIDEOS.map((c,i)=>(
            <button key={i} onClick={()=>setActive(i)}
              style={{background:"transparent",border:"none",
                color:active===i?W:"rgba(255,255,255,.4)",
                borderBottom:active===i?`2px solid ${W}`:"2px solid transparent",
                padding:"14px 18px",cursor:"pointer",fontSize:11,
                fontFamily:"Space Mono,monospace",whiteSpace:"nowrap",fontWeight:active===i?700:400,transition:"all .2s"}}>
              #{c.ch} {c.title}
            </button>
          ))}
          <button style={{background:"transparent",border:"none",borderBottom:"2px solid transparent",color:"rgba(255,255,255,.22)",padding:"14px 18px",fontSize:11,fontFamily:"Space Mono,monospace",whiteSpace:"nowrap"}}>
            #06 Solution ⏳
          </button>
        </div>
      </div>
      {/* Active */}
      <section style={{background:F8,padding:"64px 24px"}}>
        <div style={{maxWidth:920,margin:"0 auto"}}>
          <Reveal>
            <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
              <span style={{background:N,color:W,fontFamily:"Space Mono,monospace",fontSize:9,padding:"3px 9px",borderRadius:4,letterSpacing:".06em",textTransform:"uppercase"}}>Challenge {v.ch}</span>
              <span style={{background:F0,color:T6,fontFamily:"Space Mono,monospace",fontSize:9,padding:"3px 9px",borderRadius:4,letterSpacing:".06em",textTransform:"uppercase",border:`1px solid ${E2}`}}>{v.tag}</span>
            </div>
            <h2 style={{fontFamily:"Playfair Display,serif",color:N,fontSize:"clamp(26px,4vw,40px)",marginBottom:8,fontWeight:900}}>{v.title}</h2>
            {ex.subtitle&&<p style={{fontFamily:"Playfair Display,serif",color:T6,fontSize:16,fontStyle:"italic",marginBottom:12}}>{ex.subtitle}</p>}
            <p style={{color:T3,fontFamily:"Inter,sans-serif",fontSize:16,lineHeight:1.76,marginBottom: ex.extra?16:36,maxWidth:680}}>{v.desc}</p>
            {ex.extra&&<p style={{color:T6,fontFamily:"Inter,sans-serif",fontSize:14,lineHeight:1.78,marginBottom:36,maxWidth:680}}>{ex.extra}</p>}
            <div style={{borderRadius:16,overflow:"hidden",boxShadow:"0 12px 56px rgba(0,0,0,.14)",position:"relative",paddingTop:"56.25%"}}>
              <iframe key={v.id} src={`https://www.youtube.com/embed/${v.id}`} title={v.title}
                frameBorder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                allowFullScreen style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}/>
            </div>
          </Reveal>
        </div>
      </section>
      {/* Cards */}
      <section style={{background:F0,padding:"64px 24px"}}>
        <div style={{maxWidth:1060,margin:"0 auto"}}>
          <Reveal><h2 style={{fontFamily:"Playfair Display,serif",fontSize:30,color:N,textAlign:"center",marginBottom:36,fontWeight:900}}>All Challenges</h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}>
            {VIDEOS.map((c,i)=>(
              <Reveal key={i} delay={i*55}>
                <div onClick={()=>{setActive(i);window.scrollTo({top:66,behavior:"smooth"});}}
                  style={{background:W,borderRadius:14,padding:22,cursor:"pointer",
                    borderLeft:`4px solid ${active===i?N:E2}`,
                    boxShadow:active===i?`0 4px 20px rgba(11,30,61,.1)`:"none",transition:"all .25s"}}>
                  <div style={{display:"flex",gap:7,marginBottom:10}}>
                    <span style={{background:N,color:W,fontFamily:"Space Mono,monospace",fontSize:9,padding:"2px 7px",borderRadius:3,textTransform:"uppercase"}}>#{c.ch}</span>
                    <span style={{background:F0,color:T6,fontFamily:"Space Mono,monospace",fontSize:9,padding:"2px 7px",borderRadius:3,textTransform:"uppercase",border:`1px solid ${E2}`}}>{c.tag}</span>
                  </div>
                  <h3 style={{fontFamily:"Playfair Display,serif",color:N,fontSize:16,marginBottom:6}}>{c.title}</h3>
                  <p style={{color:T6,fontSize:12,lineHeight:1.6,fontFamily:"Inter,sans-serif",margin:0}}>{c.desc.slice(0,80)}…</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={5*55}>
              <div style={{background:F0,borderRadius:14,padding:22,borderLeft:`4px solid ${E2}`,opacity:.5}}>
                <div style={{display:"flex",gap:7,marginBottom:10}}>
                  <span style={{background:T6,color:W,fontFamily:"Space Mono,monospace",fontSize:9,padding:"2px 7px",borderRadius:3}}>#06</span>
                  <span style={{background:F0,color:T6,fontFamily:"Space Mono,monospace",fontSize:9,padding:"2px 7px",borderRadius:3,border:`1px solid ${E2}`}}>Coming Soon</span>
                </div>
                <h3 style={{fontFamily:"Playfair Display,serif",color:N,fontSize:16,marginBottom:6}}>Solution</h3>
                <p style={{color:T6,fontSize:12,fontFamily:"Inter,sans-serif",margin:0}}>Full solution challenge documentation — coming soon.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════ CONTACT ════════════════════════════ */
function Contact(){
  return(
    <div style={{paddingTop:66}}>
      <PageTop eye="Get in Touch" h1="Connect With" em="Us"/>
      <section style={{background:F8,padding:"88px 24px"}}>
        <div style={{maxWidth:720,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(265px,1fr))",gap:20,marginBottom:22}}>
            {[
              {icon:"▶️",platform:"YouTube",handle:"@citrus-k9l",link:"https://youtube.com/@citrus-k9l",desc:"Watch our E-LAB challenge videos and team updates.",border:"#FF0000"},
              {icon:"📸",platform:"Instagram",handle:"@citrus_alu",link:"https://instagram.com/citrus_alu",desc:"Follow our journey and behind-the-scenes moments.",border:"#E1306C"},
            ].map((s,i)=>(
              <Reveal key={i} delay={i*80}>
                <HCard style={{background:W,borderRadius:14,padding:32,textAlign:"center",borderTop:`4px solid ${s.border}`}}>
                  <div style={{fontSize:36,marginBottom:14}}>{s.icon}</div>
                  <h3 style={{fontFamily:"Playfair Display,serif",color:N,fontSize:20,marginBottom:4}}>{s.platform}</h3>
                  <p style={{color:T6,fontFamily:"Space Mono,monospace",fontSize:11,marginBottom:12}}>{s.handle}</p>
                  <p style={{color:T6,fontFamily:"Inter,sans-serif",fontSize:13,marginBottom:22,lineHeight:1.6}}>{s.desc}</p>
                  <a href={s.link} target="_blank" rel="noopener noreferrer"
                    style={{display:"inline-block",background:N,color:W,padding:"10px 24px",borderRadius:8,fontSize:13,textDecoration:"none",fontFamily:"Inter,sans-serif",fontWeight:500}}>
                    Follow Us
                  </a>
                </HCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={160}>
            <div style={{background:`linear-gradient(140deg,${N},${NL})`,borderRadius:14,padding:36,textAlign:"center"}}>
              <Logo size={42} color={W}/>
              <p style={{color:"rgba(255,255,255,.52)",fontFamily:"Inter,sans-serif",fontSize:13,marginTop:14,marginBottom:4}}>
                Citrus_alu · African Leadership University · RWBISD
              </p>
              <p style={{color:"rgba(255,255,255,.26)",fontFamily:"Space Mono,monospace",fontSize:10,margin:0}}>
                "We are the fruits of labor that Africa has produced."
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════ FOOTER ══════════════════════════════ */
function Footer({go}){
  return(
    <footer style={{background:ND,borderTop:"1px solid rgba(255,255,255,.06)",padding:"52px 24px 28px"}}>
      <div style={{maxWidth:1120,margin:"0 auto"}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:40,justifyContent:"space-between",marginBottom:40}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <Logo size={28} color={W}/><span style={{fontFamily:"Playfair Display,serif",color:W,fontSize:17,fontWeight:700}}>Citrus<em style={{fontStyle:"italic",fontWeight:400,opacity:.7}}>_alu</em></span>
            </div>
            <p style={{color:"rgba(255,255,255,.3)",fontSize:12,fontFamily:"Inter,sans-serif",maxWidth:220,lineHeight:1.65,margin:0}}>We are the fruits of labor that Africa has produced.</p>
          </div>
          <div style={{display:"flex",gap:48}}>
            {[["Pages",["home","about","problem","solution"]],["More",["team","challenges","contact"]]].map(([grp,ids])=>(
              <div key={grp}>
                <p style={{color:"rgba(255,255,255,.28)",fontSize:10,fontFamily:"Space Mono,monospace",letterSpacing:".15em",textTransform:"uppercase",marginBottom:14}}>{grp}</p>
                {ids.map(id=>(
                  <button key={id} onClick={()=>go(id)}
                    style={{display:"block",background:"none",border:"none",color:"rgba(255,255,255,.46)",fontSize:13,fontFamily:"Inter,sans-serif",cursor:"pointer",marginBottom:8,padding:0,textTransform:"capitalize"}}
                    onMouseEnter={e=>e.currentTarget.style.color=W}
                    onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.46)"}>
                    {LBL[id]}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:20,display:"flex",flexWrap:"wrap",gap:12,justifyContent:"space-between",alignItems:"center"}}>
          <p style={{color:"rgba(255,255,255,.2)",fontFamily:"Space Mono,monospace",fontSize:10,margin:0}}>© 2026 Citrus_alu · All rights reserved</p>
          <p style={{color:"rgba(255,255,255,.14)",fontFamily:"Space Mono,monospace",fontSize:9,margin:0}}>UCl9c1KOjXztDQ2BCB2BybCg</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════ PAGE FADE ══════════════════════════ */
function PageFade({children,id}){
  const[vis,setVis]=useState(false);
  useEffect(()=>{setVis(false);const t=setTimeout(()=>setVis(true),40);return()=>clearTimeout(t);},[id]);
  return<div style={{opacity:vis?1:0,transition:"opacity .45s ease"}}>{children}</div>;
}

/* ═══════════════════════════════════════ APP ═════════════════════════════════ */
const PAGES={
  home:(go)=><Home go={go}/>,
  about:()=><About/>,
  problem:()=><Problem/>,
  solution:()=><Solution/>,
  team:()=><Team/>,
  challenges:()=><Challenges/>,
  contact:()=><Contact/>,
};

export default function App(){
  const[page,setPage]=useState("home");
  const go=(id)=>{setPage(id);window.scrollTo({top:0,behavior:"smooth"});};
  return(
    <div style={{fontFamily:"Inter,sans-serif",background:F8}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        @keyframes floatA{0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-22px) scale(1.04);}}
        @keyframes floatB{0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(18px) scale(0.97);}}
        @media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important;}}
      `}</style>
      <Navbar page={page} go={go}/>
      <main>
        <PageFade id={page}>{(PAGES[page]||PAGES.home)(go)}</PageFade>
      </main>
      <Footer go={go}/>
    </div>
  );
}
