import React, { useMemo, useState } from "react";
import * as XLSX from "xlsx";

const ADMIN_EMAIL = "admin@nefertari.com";
const ADMIN_PASSWORD = "123456";

const defaultData = {
  company: {
    nameEn: "NEFERTARI",
    nameAr: "نفرتاري للتنظيفات والضيافة",
    logoUrl: "",
    slogan: "خدمات تنظيف وضيافة راقية في قطر",
  },
  contact: {
    phone: "72081178",
    whatsapp: "97472081178",
    email: "neferclean@gmail.com",
    address: "الدوحة - قطر",
    workingHours: "24/7",
  },
  homepage: {
    badge: "تواصل معنا",
    title: "جاهزون لخدمتك",
    subtitle: "للطلب أو الاستفسار تواصل معنا الآن.",
    cta: "اطلب الخدمة الآن",
    secondaryCta: "عرض الخدمات",
  },
  services: [
    { id: 1, icon: "🏠", title: "خادمات للمبيت الشهري", price: "حسب الاتفاق", status: "نشطة", description: "خادمات للإقامة الشهرية وخدمة المنازل." },
    { id: 2, icon: "🧹", title: "تنظيف منزلي", price: "حسب الطلب", status: "نشطة", description: "تنظيف يومي أو أسبوعي حسب احتياج العميل." },
    { id: 3, icon: "☕", title: "خدمات ضيافة", price: "حسب المناسبة", status: "نشطة", description: "ضيافة وتنظيم للمناسبات والزيارات." },
  ],
  maids: [
    { id: 1, name: "عاملة 1", nationality: "كينيا", age: "28", experience: "3 سنوات", skills: "تنظيف، طبخ بسيط", salary: "شهري", status: "متاحة", photo: "", notes: "خبرة في التنظيف والضيافة" },
  ],
  orders: [
    { id: 1001, client: "عميل تجريبي", phone: "55540259", service: "خادمة للمبيت", status: "جديد", date: new Date().toISOString().slice(0,10), notes: "طلب من الموقع" },
  ],
  clients: [
    { id: 1, name: "عميل تجريبي", phone: "55540259", area: "الدوحة", orders: 1, status: "نشط" },
  ],
  icons: {
    whatsapp: "💬",
    phone: "📞",
    email: "✉️",
    home: "🏠",
    service: "🧹",
    maid: "👩‍💼",
    client: "👥",
    order: "📋",
  },
  social: { instagram: "", facebook: "", tiktok: "", snapchat: "" },
  seo: {
    title: "NEFERTARI Cleaning & Hospitality",
    description: "نفرتاري للتنظيفات والضيافة في قطر",
    keywords: "تنظيف, ضيافة, خادمات, قطر",
  },
  theme: {
    primary: "#041f3d",
    secondary: "#06264a",
    gold: "#e5c05b",
    card: "#ffffff",
    adminBg: "#f3f6fb",
  },
};

function loadData() {
  try {
    return JSON.parse(localStorage.getItem("nefertari_pro_v2")) || defaultData;
  } catch {
    return defaultData;
  }
}

function saveData(data) {
  localStorage.setItem("nefertari_pro_v2", JSON.stringify(data));
}

export default function App() {
  const [data, setData] = useState(loadData());
  const isAdmin = window.location.pathname === "/admin";
  return isAdmin ? <Admin data={data} setData={setData} /> : <Website data={data} />;
}

function Website({ data }) {
  const whatsapp = String(data.contact.whatsapp || "").replace(/[^\d]/g, "");
  return (
    <div className="site" style={{"--primary": data.theme.primary, "--secondary": data.theme.secondary, "--gold": data.theme.gold}}>
      <style>{css}</style>
      <header className="siteHeader">
        <a className="goldBtn" href={`https://wa.me/${whatsapp}`} target="_blank">{data.homepage.cta}</a>
        <nav>
          <a href="#home">الرئيسية</a>
          <a href="#services">خدماتنا</a>
          <a href="#maids">الخادمات</a>
          <a href="#contact">تواصل معنا</a>
          <a href="/admin">لوحة التحكم</a>
        </nav>
        <div className="brand">
          {data.company.logoUrl && <img src={data.company.logoUrl} />}
          <b>{data.company.nameEn}</b>
          <span>{data.company.nameAr}</span>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="heroCard">
            <small>{data.homepage.badge}</small>
            <h1>{data.homepage.title}</h1>
            <p>{data.homepage.subtitle}</p>
            <div className="chips">
              <a href={`mailto:${data.contact.email}`}>{data.contact.email} {data.icons.email}</a>
              <a href={`tel:${data.contact.phone}`}>{data.contact.phone} {data.icons.phone}</a>
            </div>
            <a className="goldBtn" href={`https://wa.me/${whatsapp}`} target="_blank">{data.homepage.cta}</a>
          </div>
        </section>

        <Section id="services" title="خدماتنا">
          {data.services.filter(x=>x.status !== "مخفية").map(s => (
            <div className="publicCard" key={s.id}>
              <div className="bigIcon">{s.icon || data.icons.service}</div>
              <h3>{s.title}</h3><p>{s.description}</p><b>{s.price}</b>
            </div>
          ))}
        </Section>

        <Section id="maids" title="الخادمات">
          {data.maids.map(m => (
            <div className="publicCard" key={m.id}>
              {m.photo ? <img className="maidPhoto" src={m.photo} /> : <div className="bigIcon">{data.icons.maid}</div>}
              <h3>{m.name}</h3>
              <p>{m.nationality} - {m.age} سنة</p>
              <p>{m.experience}</p>
              <p>{m.skills}</p>
              <b>{m.status}</b>
            </div>
          ))}
        </Section>

        <section id="contact" className="contact">
          <h2>تواصل معنا</h2>
          <p>{data.contact.address}</p>
          <p>{data.contact.workingHours}</p>
          <div className="chips">
            <a href={`tel:${data.contact.phone}`}>{data.icons.phone} {data.contact.phone}</a>
            <a href={`https://wa.me/${whatsapp}`} target="_blank">{data.icons.whatsapp} {data.contact.whatsapp}</a>
          </div>
        </section>
      </main>
      <a className="floatWa" href={`https://wa.me/${whatsapp}`} target="_blank">{data.icons.whatsapp}</a>
      <footer>© 2026 {data.company.nameAr}. جميع الحقوق محفوظة.</footer>
    </div>
  );
}

function Section({id,title,children}) {
  return <section id={id} className="section"><h2>{title}</h2><div className="grid">{children}</div></section>
}

function Admin({ data, setData }) {
  const [logged, setLogged] = useState(localStorage.getItem("nef_admin") === "yes");
  const [login, setLogin] = useState({email:"", password:""});
  const [tab, setTab] = useState("dashboard");
  const [query, setQuery] = useState("");

  const stats = useMemo(() => ({
    orders: data.orders.length,
    maids: data.maids.length,
    clients: data.clients.length,
    services: data.services.length,
    newOrders: data.orders.filter(o=>o.status==="جديد").length,
    availableMaids: data.maids.filter(m=>m.status==="متاحة").length,
  }), [data]);

  function doLogin(e){
    e.preventDefault();
    if(login.email === ADMIN_EMAIL && login.password === ADMIN_PASSWORD){
      localStorage.setItem("nef_admin","yes"); setLogged(true);
    } else alert("بيانات الدخول غير صحيحة");
  }

  function commit(next){ setData(next); saveData(next); }
  function update(path, value){
    const [a,b] = path.split(".");
    commit({...data, [a]: {...data[a], [b]: value}});
  }

  if(!logged) return <Login login={login} setLogin={setLogin} doLogin={doLogin} />;

  return (
    <div className="adminShell">
      <style>{css}</style>
      <aside className="sidebar">
        <h2>NEFERTARI</h2>
        {[
          ["dashboard","الرئيسية"],
          ["website","إدارة الموقع"],
          ["services","الخدمات والأيقونات"],
          ["maids","الخادمات + رفع Excel"],
          ["orders","الطلبات"],
          ["clients","العملاء"],
          ["icons","الأيقونات العامة"],
          ["marketing","السوشيال و SEO"],
          ["settings","الإعدادات"],
        ].map(([k,v]) => <button key={k} className={tab===k?"active":""} onClick={()=>setTab(k)}>{v}</button>)}
        <a href="/" className="sideLink">معاينة الموقع</a>
        <button className="danger" onClick={()=>{localStorage.removeItem("nef_admin"); setLogged(false)}}>خروج</button>
      </aside>

      <main className="adminMain">
        <div className="topbar">
          <div><h1>لوحة تحكم نفرتاري الاحترافية</h1><p>إدارة كاملة للموقع والخادمات والطلبات والعملاء</p></div>
          <input placeholder="بحث..." value={query} onChange={e=>setQuery(e.target.value)} />
        </div>

        {tab==="dashboard" && <Dashboard stats={stats} data={data} />}
        {tab==="website" && <WebsiteAdmin data={data} update={update} />}
        {tab==="services" && <TableEditor title="إدارة الخدمات والأيقونات" rows={data.services} setRows={(rows)=>commit({...data, services:rows})} fields={["icon","title","price","status","description"]} />}
        {tab==="maids" && <MaidsAdmin data={data} commit={commit} />}
        {tab==="orders" && <TableEditor title="إدارة الطلبات" rows={data.orders} setRows={(rows)=>commit({...data, orders:rows})} fields={["client","phone","service","status","date","notes"]} />}
        {tab==="clients" && <TableEditor title="إدارة العملاء" rows={data.clients} setRows={(rows)=>commit({...data, clients:rows})} fields={["name","phone","area","orders","status"]} />}
        {tab==="icons" && <IconsAdmin data={data} update={update} />}
        {tab==="marketing" && <Marketing data={data} update={update} />}
        {tab==="settings" && <Settings data={data} update={update} commit={commit} />}
      </main>
    </div>
  );
}

function MaidsAdmin({ data, commit }) {
  async function importExcel(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const maids = rows.map((r, i) => ({
      id: Date.now() + i,
      name: r.name || r.Name || r["اسم الخادمة"] || r["الاسم"] || "",
      nationality: r.nationality || r.Nationality || r["الجنسية"] || "",
      age: String(r.age || r.Age || r["العمر"] || ""),
      experience: r.experience || r.Experience || r["الخبرة"] || "",
      skills: r.skills || r.Skills || r["المهارات"] || r["المميزات"] || "",
      salary: r.salary || r.Salary || r["الراتب"] || "",
      status: r.status || r.Status || r["الحالة"] || "متاحة",
      photo: r.photo || r.Photo || r["الصورة"] || "",
      notes: r.notes || r.Notes || r["ملاحظات"] || "",
    })).filter(x => x.name);

    if (!maids.length) {
      alert("لم يتم العثور على أسماء. استخدم عمود: name أو اسم الخادمة");
      return;
    }

    commit({ ...data, maids: [...data.maids, ...maids] });
    alert(`تم استيراد ${maids.length} خادمة من ملف Excel`);
  }

  function downloadTemplate() {
    const rows = [
      { "اسم الخادمة": "مثال: ماري", "الجنسية": "كينيا", "العمر": "28", "الخبرة": "3 سنوات", "المميزات": "تنظيف، طبخ، أطفال", "الراتب": "شهري", "الحالة": "متاحة", "الصورة": "", "ملاحظات": "" }
    ];
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "maids");
    XLSX.writeFile(wb, "maids-template.xlsx");
  }

  return (
    <div className="panel">
      <div className="panelHead">
        <h2>إدارة الخادمات + رفع Excel</h2>
        <div className="actions">
          <button onClick={downloadTemplate}>تحميل نموذج Excel</button>
          <label className="uploadBtn">رفع Excel<input type="file" accept=".xlsx,.xls,.csv" onChange={importExcel} hidden /></label>
        </div>
      </div>
      <p className="note">الأعمدة المقبولة: اسم الخادمة، الجنسية، العمر، الخبرة، المميزات، الراتب، الحالة، الصورة، ملاحظات.</p>
      <TableEditor rows={data.maids} setRows={(rows)=>commit({...data, maids:rows})} fields={["name","nationality","age","experience","skills","salary","status","photo","notes"]} noPanel />
    </div>
  );
}

function Login({login,setLogin,doLogin}) {
  return <div className="loginPage"><form className="loginBox" onSubmit={doLogin}>
    <h2>تسجيل دخول لوحة التحكم</h2>
    <input placeholder="Email" value={login.email} onChange={e=>setLogin({...login,email:e.target.value})}/>
    <input placeholder="Password" type="password" value={login.password} onChange={e=>setLogin({...login,password:e.target.value})}/>
    <button>دخول</button><small>admin@nefertari.com / 123456</small>
  </form></div>
}

function Dashboard({stats,data}) {
  return <>
    <div className="statGrid">
      <Stat title="الطلبات" value={stats.orders} icon={data.icons.order} />
      <Stat title="طلبات جديدة" value={stats.newOrders} icon="🔔" />
      <Stat title="الخادمات" value={stats.maids} icon={data.icons.maid} />
      <Stat title="متاحات" value={stats.availableMaids} icon="✅" />
      <Stat title="العملاء" value={stats.clients} icon={data.icons.client} />
      <Stat title="الخدمات" value={stats.services} icon={data.icons.service} />
    </div>
    <div className="panel"><h2>آخر الطلبات</h2>{data.orders.slice(-5).reverse().map(o=><div className="row" key={o.id}><b>{o.client}</b><span>{o.service}</span><em>{o.status}</em></div>)}</div>
  </>
}
function Stat({title,value,icon}){return <div className="stat"><span>{icon}</span><p>{title}</p><b>{value}</b></div>}

function WebsiteAdmin({data,update}) {
  return <div className="panel"><h2>إدارة محتوى الموقع</h2><div className="formGrid">
    <Field label="اسم الشركة EN" value={data.company.nameEn} onChange={v=>update("company.nameEn",v)} />
    <Field label="اسم الشركة AR" value={data.company.nameAr} onChange={v=>update("company.nameAr",v)} />
    <Field label="رابط صورة الشعار" value={data.company.logoUrl} onChange={v=>update("company.logoUrl",v)} />
    <Field label="السلوغان" value={data.company.slogan} onChange={v=>update("company.slogan",v)} />
    <Field label="عنوان الرئيسية" value={data.homepage.title} onChange={v=>update("homepage.title",v)} />
    <Area label="وصف الرئيسية" value={data.homepage.subtitle} onChange={v=>update("homepage.subtitle",v)} />
    <Field label="زر الطلب" value={data.homepage.cta} onChange={v=>update("homepage.cta",v)} />
    <Field label="الهاتف" value={data.contact.phone} onChange={v=>update("contact.phone",v)} />
    <Field label="واتساب" value={data.contact.whatsapp} onChange={v=>update("contact.whatsapp",v)} />
    <Field label="الإيميل" value={data.contact.email} onChange={v=>update("contact.email",v)} />
    <Field label="العنوان" value={data.contact.address} onChange={v=>update("contact.address",v)} />
    <Field label="مواعيد العمل" value={data.contact.workingHours} onChange={v=>update("contact.workingHours",v)} />
  </div></div>
}

function IconsAdmin({data,update}) {
  return <div className="panel"><h2>التحكم الكامل في الأيقونات</h2><div className="formGrid">
    {Object.keys(data.icons).map(k => <Field key={k} label={label(k)} value={data.icons[k]} onChange={v=>update(`icons.${k}`,v)} />)}
  </div><p className="note">يمكنك وضع Emoji مثل 💬 أو رابط صورة أيقونة لاحقًا.</p></div>
}

function Marketing({data,update}) {
  return <div className="panel"><h2>التسويق و SEO</h2><div className="formGrid">
    <Field label="Instagram" value={data.social.instagram} onChange={v=>update("social.instagram",v)} />
    <Field label="Facebook" value={data.social.facebook} onChange={v=>update("social.facebook",v)} />
    <Field label="TikTok" value={data.social.tiktok} onChange={v=>update("social.tiktok",v)} />
    <Field label="Snapchat" value={data.social.snapchat} onChange={v=>update("social.snapchat",v)} />
    <Field label="SEO Title" value={data.seo.title} onChange={v=>update("seo.title",v)} />
    <Area label="SEO Description" value={data.seo.description} onChange={v=>update("seo.description",v)} />
    <Field label="Keywords" value={data.seo.keywords} onChange={v=>update("seo.keywords",v)} />
  </div></div>
}

function Settings({data,update,commit}) {
  function exportData(){
    const blob = new Blob([JSON.stringify(data,null,2)], {type:"application/json"});
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download="nefertari-backup.json"; a.click();
  }
  return <div className="panel"><h2>الإعدادات والألوان والنسخ الاحتياطي</h2><div className="formGrid">
    <Color label="الأزرق الأساسي" value={data.theme.primary} onChange={v=>update("theme.primary",v)} />
    <Color label="الخلفية" value={data.theme.secondary} onChange={v=>update("theme.secondary",v)} />
    <Color label="الذهبي" value={data.theme.gold} onChange={v=>update("theme.gold",v)} />
    <Color label="لون خلفية الإدارة" value={data.theme.adminBg} onChange={v=>update("theme.adminBg",v)} />
  </div><div className="actions"><button onClick={exportData}>تصدير نسخة احتياطية</button><button className="danger" onClick={()=>{if(confirm("رجوع للإعدادات الأصلية؟")) commit(defaultData)}}>إرجاع الأصل</button></div>
  <p className="note">هذه النسخة تحفظ البيانات في المتصفح الحالي. لظهور التغييرات لكل الزوار نحتاج قاعدة بيانات لاحقًا.</p></div>
}

function TableEditor({title,rows,setRows,fields,noPanel}) {
  const add = () => { const id = Date.now(); const row = { id }; fields.forEach(f=>row[f]=""); setRows([...rows,row]); };
  const update = (i,k,v) => { const copy=[...rows]; copy[i]={...copy[i],[k]:v}; setRows(copy); };
  const del = (i)=>setRows(rows.filter((_,idx)=>idx!==i));
  const body = <><div className="panelHead">{title && <h2>{title}</h2>}<button onClick={add}>إضافة جديد</button></div>
    <div className="tableWrap"><table><thead><tr>{fields.map(f=><th key={f}>{label(f)}</th>)}<th>إجراء</th></tr></thead><tbody>
      {rows.map((r,i)=><tr key={r.id||i}>{fields.map(f=><td key={f}><input value={r[f]||""} onChange={e=>update(i,f,e.target.value)}/></td>)}<td><button className="danger" onClick={()=>del(i)}>حذف</button></td></tr>)}
    </tbody></table></div></>;
  return noPanel ? body : <div className="panel">{body}</div>;
}

function label(f){return ({whatsapp:"واتساب",phone:"الهاتف",email:"الإيميل",home:"المنزل",service:"الخدمة",maid:"الخادمة",client:"العميل",order:"الطلب",icon:"الأيقونة",title:"العنوان",description:"الوصف",price:"السعر",status:"الحالة",name:"الاسم",nationality:"الجنسية",age:"العمر",experience:"الخبرة",skills:"المميزات",salary:"الراتب",photo:"الصورة",notes:"ملاحظات",client:"العميل",phone:"الهاتف",service:"الخدمة",date:"التاريخ",area:"المنطقة",orders:"الطلبات"})[f]||f}
function Field({label,value,onChange}){return <label><span>{label}</span><input value={value||""} onChange={e=>onChange(e.target.value)}/></label>}
function Area({label,value,onChange}){return <label><span>{label}</span><textarea value={value||""} onChange={e=>onChange(e.target.value)}/></label>}
function Color({label,value,onChange}){return <label><span>{label}</span><div className="colorRow"><input type="color" value={value} onChange={e=>onChange(e.target.value)}/><input value={value} onChange={e=>onChange(e.target.value)}/></div></label>}

const css = `
*{box-sizing:border-box} body{margin:0} .site{font-family:Arial,Tahoma,sans-serif;direction:rtl;min-height:100vh;background:var(--secondary);color:#fff}.siteHeader{background:var(--primary);min-height:135px;padding:25px 70px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.12)}.brand{text-align:right}.brand img{height:60px;display:block}.brand b{display:block;color:var(--gold);font-size:44px;letter-spacing:2px}.brand span{color:var(--gold);font-weight:700}.siteHeader nav{display:flex;gap:28px}.siteHeader nav a,.contact a{color:#fff;text-decoration:none;font-weight:800}.goldBtn,.loginBox button{background:var(--gold);color:#000;border:0;border-radius:14px;padding:15px 28px;font-weight:900;text-decoration:none;cursor:pointer}.hero{min-height:70vh;display:grid;place-items:center;padding:30px}.heroCard{width:min(980px,94%);background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);border-radius:28px;text-align:center;padding:65px 40px}.heroCard small,.section h2,.contact h2{color:var(--gold);font-weight:900;font-size:22px}.heroCard h1{font-size:58px;margin:18px 0}.heroCard p{font-size:25px}.chips{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin:25px 0}.chips a{color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.22);border-radius:40px;padding:14px 24px;font-weight:800}.section,.contact{padding:60px 7%;text-align:center}.section h2{font-size:38px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:20px}.publicCard{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:20px;padding:28px;color:#fff}.bigIcon{font-size:44px}.maidPhoto{width:100%;height:180px;object-fit:cover;border-radius:16px}.floatWa{position:fixed;left:28px;bottom:28px;width:82px;height:82px;border-radius:50%;background:#25d366;display:grid;place-items:center;font-size:40px;text-decoration:none;box-shadow:0 10px 28px rgba(0,0,0,.3)}footer{background:#03182e;color:#fff;text-align:center;padding:25px}.loginPage{min-height:100vh;background:#06264a;display:grid;place-items:center;direction:rtl;font-family:Arial}.loginBox{background:#fff;padding:38px;border-radius:20px;display:grid;gap:14px;width:390px;text-align:center}.loginBox input,.adminMain input,.adminMain textarea{padding:13px;border:1px solid #d9dee8;border-radius:12px;font-size:15px;width:100%}.adminShell{direction:rtl;display:grid;grid-template-columns:285px 1fr;min-height:100vh;background:#f3f6fb;font-family:Arial,Tahoma,sans-serif}.sidebar{background:#071d35;color:#fff;padding:24px;display:flex;flex-direction:column;gap:9px;position:sticky;top:0;height:100vh;overflow:auto}.sidebar h2{color:#e5c05b;font-size:30px}.sidebar button,.sideLink{border:0;border-radius:12px;padding:13px 14px;text-align:right;text-decoration:none;font-weight:900;cursor:pointer;background:transparent;color:#fff}.sidebar button.active{background:#e5c05b;color:#000}.sidebar .danger{background:#dc2626;color:#fff;margin-top:auto}.adminMain{padding:32px;overflow:hidden}.topbar{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:24px}.topbar h1{margin:0;font-size:34px}.topbar p{color:#64748b}.topbar input{max-width:280px}.statGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:18px;margin-bottom:22px}.stat,.panel{background:#fff;border-radius:20px;padding:24px;box-shadow:0 8px 24px rgba(0,0,0,.06)}.stat span{font-size:30px}.stat p{color:#64748b}.stat b{font-size:34px;color:#041f3d}.panel{margin-bottom:22px}.panelHead{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}.panel button,.actions button,.uploadBtn{background:#16a34a;color:#fff;border:0;border-radius:12px;padding:12px 16px;font-weight:900;cursor:pointer;display:inline-block}.panel button.danger,.actions .danger{background:#dc2626}.formGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:15px}.adminMain label{display:grid;gap:7px;font-weight:800}.adminMain textarea{min-height:110px}.tableWrap{overflow:auto}.tableWrap table{width:100%;border-collapse:collapse;min-width:950px}.tableWrap th,.tableWrap td{padding:10px;border-bottom:1px solid #e5e7eb;text-align:right}.row{display:flex;justify-content:space-between;padding:12px;border-bottom:1px solid #eee}.colorRow{display:flex;gap:10px}.colorRow input[type=color]{width:55px;padding:3px}.actions{display:flex;gap:12px;margin-top:18px;flex-wrap:wrap}.note{background:#fff7ed;border:1px solid #fed7aa;color:#9a3412;padding:15px;border-radius:14px;line-height:1.7}@media(max-width:900px){.adminShell{grid-template-columns:1fr}.sidebar{height:auto;position:relative}.siteHeader{padding:20px;flex-direction:column}.siteHeader nav{justify-content:center;flex-wrap:wrap}.heroCard h1{font-size:38px}.adminMain{padding:18px}}
`;
