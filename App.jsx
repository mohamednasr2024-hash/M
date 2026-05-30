from pathlib import Path

code = r'''import React, { useEffect, useMemo, useState } from "react";

const ADMIN_EMAIL = "admin@nefertari.com";
const ADMIN_PASSWORD = "123456";

const defaultData = {
  brand: {
    companyName: "NEFERTARI",
    arabicName: "نفرتاري للتنظيفات والضيافة",
    logoText: "NEFERTARI",
    logoImage: "",
    slogan: "خدمات تنظيف وضيافة راقية في قطر",
  },
  theme: {
    primary: "#041f3d",
    secondary: "#06264a",
    gold: "#e5c05b",
    light: "#f4f6fa",
    text: "#ffffff",
  },
  nav: {
    home: "الرئيسية",
    services: "خدماتنا",
    why: "لماذا نحن",
    steps: "طريقة العمل",
    contact: "تواصل معنا",
    admin: "لوحة التحكم",
  },
  hero: {
    badge: "تواصل معنا",
    title: "جاهزون لخدمتك",
    subtitle: "للطلب أو الاستفسار تواصل معنا الآن.",
    buttonText: "اطلب الخدمة الآن",
    secondaryButtonText: "عرض الخدمات",
    backgroundImage: "",
  },
  contact: {
    phone: "72081178",
    whatsapp: "97472081178",
    email: "neferclean@gmail.com",
    address: "الدوحة - قطر",
    workingHours: "24 ساعة / 7 أيام",
  },
  services: [
    { title: "خادمات للمبيت الشهري", description: "خادمات مؤهلات للإقامة الشهرية وخدمة المنازل.", icon: "🏠" },
    { title: "تنظيف منزلي", description: "خدمات تنظيف مرنة حسب احتياجات المنزل.", icon: "🧹" },
    { title: "خدمات ضيافة", description: "خدمات ضيافة وتنظيم للمناسبات والزيارات.", icon: "☕" },
    { title: "تنظيف عميق", description: "تنظيف شامل ودقيق للمنازل والشقق.", icon: "✨" },
  ],
  why: [
    { title: "فريق موثوق", description: "عمالة ملتزمة ومدربة على معايير الخدمة." },
    { title: "استجابة سريعة", description: "تواصل مباشر وسرعة في ترتيب الخدمة." },
    { title: "متابعة مستمرة", description: "متابعة رضا العملاء بعد تقديم الخدمة." },
  ],
  steps: [
    { title: "تواصل معنا", description: "ارسل طلبك أو تواصل عبر واتساب." },
    { title: "تحديد الخدمة", description: "نحدد نوع الخدمة والتفاصيل المطلوبة." },
    { title: "تنفيذ الخدمة", description: "يتم ترتيب الخدمة حسب الموعد المتفق عليه." },
  ],
  buttons: {
    request: "طلب خدمة",
    call: "اتصال",
    whatsapp: "واتساب",
  },
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
    snapchat: "",
  },
  seo: {
    title: "NEFERTARI Cleaning & Hospitality",
    description: "نفرتاري للتنظيفات والضيافة في قطر - خدمات خادمات للمبيت وتنظيف وضيافة.",
    keywords: "تنظيف, ضيافة, خادمات, قطر, الدوحة, نفرتاري",
  },
  footer: {
    text: "© 2026 نفرتاري للتنظيفات والضيافة. جميع الحقوق محفوظة.",
  },
};

function loadData() {
  try {
    const saved = localStorage.getItem("nefertari_full_site_data");
    return saved ? mergeData(defaultData, JSON.parse(saved)) : defaultData;
  } catch {
    return defaultData;
  }
}

function mergeData(base, saved) {
  return {
    ...base,
    ...saved,
    brand: { ...base.brand, ...(saved.brand || {}) },
    theme: { ...base.theme, ...(saved.theme || {}) },
    nav: { ...base.nav, ...(saved.nav || {}) },
    hero: { ...base.hero, ...(saved.hero || {}) },
    contact: { ...base.contact, ...(saved.contact || {}) },
    buttons: { ...base.buttons, ...(saved.buttons || {}) },
    social: { ...base.social, ...(saved.social || {}) },
    seo: { ...base.seo, ...(saved.seo || {}) },
    footer: { ...base.footer, ...(saved.footer || {}) },
    services: saved.services || base.services,
    why: saved.why || base.why,
    steps: saved.steps || base.steps,
  };
}

export default function App() {
  const [data, setData] = useState(loadData());
  const [logged, setLogged] = useState(localStorage.getItem("nefertari_admin_logged") === "yes");
  const isAdmin = window.location.pathname === "/admin";

  useEffect(() => {
    document.title = data.seo.title;
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement("meta");
      desc.name = "description";
      document.head.appendChild(desc);
    }
    desc.content = data.seo.description;
  }, [data]);

  return isAdmin ? (
    <Admin data={data} setData={setData} logged={logged} setLogged={setLogged} />
  ) : (
    <Website data={data} />
  );
}

function Website({ data }) {
  const t = data.theme;

  const openWhatsApp = () => {
    window.open(`https://wa.me/${cleanPhone(data.contact.whatsapp)}`, "_blank");
  };

  return (
    <div style={{ ...styles.site, background: t.secondary, color: t.text }}>
      <header style={{ ...styles.header, background: t.primary }}>
        <button style={{ ...styles.goldButton, background: t.gold }} onClick={openWhatsApp}>
          {data.buttons.request}
        </button>

        <nav style={styles.nav}>
          <a href="#home" style={styles.navLink}>{data.nav.home}</a>
          <a href="#services" style={styles.navLink}>{data.nav.services}</a>
          <a href="#why" style={styles.navLink}>{data.nav.why}</a>
          <a href="#steps" style={styles.navLink}>{data.nav.steps}</a>
          <a href="#contact" style={styles.navLink}>{data.nav.contact}</a>
          <a href="/admin" style={styles.navLink}>{data.nav.admin}</a>
        </nav>

        <div style={styles.brandWrap}>
          {data.brand.logoImage ? <img src={data.brand.logoImage} alt="logo" style={styles.logoImage} /> : null}
          <div style={{ ...styles.logoText, color: t.gold }}>{data.brand.logoText || data.brand.companyName}</div>
          <div style={{ ...styles.logoSub, color: t.gold }}>{data.brand.arabicName}</div>
        </div>
      </header>

      <main>
        <section id="home" style={{ ...styles.heroSection, backgroundImage: data.hero.backgroundImage ? `linear-gradient(rgba(6,38,74,.82),rgba(6,38,74,.82)), url(${data.hero.backgroundImage})` : undefined }}>
          <div style={styles.heroBox}>
            <div style={{ ...styles.badge, color: t.gold }}>{data.hero.badge}</div>
            <h1 style={styles.heroTitle}>{data.hero.title}</h1>
            <p style={styles.heroSubtitle}>{data.hero.subtitle}</p>

            <div style={styles.contactRow}>
              <a href={`mailto:${data.contact.email}`} style={styles.pill}>{data.contact.email} ✉</a>
              <a href={`tel:${data.contact.phone}`} style={styles.pill}>{data.contact.phone} 📞</a>
            </div>

            <div style={styles.heroButtons}>
              <button style={{ ...styles.goldButton, background: t.gold }} onClick={openWhatsApp}>{data.hero.buttonText}</button>
              <a href="#services" style={styles.outlineButton}>{data.hero.secondaryButtonText}</a>
            </div>
          </div>
        </section>

        <Section title={data.nav.services} id="services" color={t.gold}>
          <div style={styles.grid}>
            {data.services.map((s, i) => (
              <div key={i} style={styles.publicCard}>
                <div style={styles.icon}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title={data.nav.why} id="why" color={t.gold}>
          <div style={styles.grid}>
            {data.why.map((w, i) => (
              <div key={i} style={styles.publicCard}>
                <h3>{String(i + 1).padStart(2, "0")} - {w.title}</h3>
                <p>{w.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title={data.nav.steps} id="steps" color={t.gold}>
          <div style={styles.grid}>
            {data.steps.map((s, i) => (
              <div key={i} style={styles.publicCard}>
                <div style={styles.stepNumber}>{i + 1}</div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <section id="contact" style={styles.contactSection}>
          <h2 style={{ color: t.gold }}>{data.nav.contact}</h2>
          <p>{data.contact.address}</p>
          <p>{data.contact.workingHours}</p>
          <div style={styles.contactRow}>
            <a href={`tel:${data.contact.phone}`} style={styles.pill}>{data.buttons.call}: {data.contact.phone}</a>
            <a href={`https://wa.me/${cleanPhone(data.contact.whatsapp)}`} target="_blank" rel="noreferrer" style={styles.pill}>{data.buttons.whatsapp}: {data.contact.whatsapp}</a>
            <a href={`mailto:${data.contact.email}`} style={styles.pill}>{data.contact.email}</a>
          </div>
          <div style={styles.socials}>
            {data.social.facebook && <a href={data.social.facebook} target="_blank" rel="noreferrer" style={styles.navLink}>Facebook</a>}
            {data.social.instagram && <a href={data.social.instagram} target="_blank" rel="noreferrer" style={styles.navLink}>Instagram</a>}
            {data.social.tiktok && <a href={data.social.tiktok} target="_blank" rel="noreferrer" style={styles.navLink}>TikTok</a>}
            {data.social.snapchat && <a href={data.social.snapchat} target="_blank" rel="noreferrer" style={styles.navLink}>Snapchat</a>}
          </div>
        </section>
      </main>

      <a href={`https://wa.me/${cleanPhone(data.contact.whatsapp)}`} target="_blank" rel="noreferrer" style={styles.whatsapp}>💬</a>
      <footer style={{ ...styles.footer, background: "#03182e" }}>{data.footer.text}</footer>
    </div>
  );
}

function Section({ id, title, children, color }) {
  return (
    <section id={id} style={styles.section}>
      <h2 style={{ ...styles.sectionTitle, color }}>{title}</h2>
      {children}
    </section>
  );
}

function Admin({ data, setData, logged, setLogged }) {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [tab, setTab] = useState("dashboard");

  const doLogin = (e) => {
    e.preventDefault();
    if (login.email === ADMIN_EMAIL && login.password === ADMIN_PASSWORD) {
      localStorage.setItem("nefertari_admin_logged", "yes");
      setLogged(true);
    } else {
      alert("بيانات الدخول غير صحيحة");
    }
  };

  if (!logged) {
    return (
      <div style={styles.loginPage}>
        <form onSubmit={doLogin} style={styles.loginBox}>
          <h2>تسجيل دخول لوحة التحكم</h2>
          <input style={styles.input} placeholder="Email" onChange={(e) => setLogin({ ...login, email: e.target.value })} />
          <input style={styles.input} placeholder="Password" type="password" onChange={(e) => setLogin({ ...login, password: e.target.value })} />
          <button style={styles.adminPrimary}>دخول</button>
          <small>admin@nefertari.com / 123456</small>
        </form>
      </div>
    );
  }

  const update = (path, value) => {
    const [group, key] = path.split(".");
    setData({ ...data, [group]: { ...data[group], [key]: value } });
  };

  const save = () => {
    localStorage.setItem("nefertari_full_site_data", JSON.stringify(data));
    alert("تم حفظ التعديلات بنجاح");
  };

  const reset = () => {
    if (confirm("هل تريد الرجوع للإعدادات الأصلية؟")) {
      localStorage.removeItem("nefertari_full_site_data");
      setData(defaultData);
    }
  };

  const logout = () => {
    localStorage.removeItem("nefertari_admin_logged");
    setLogged(false);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    downloadBlob(blob, "nefertari-content.json");
  };

  return (
    <div style={styles.adminLayout}>
      <aside style={styles.adminSidebar}>
        <h2 style={styles.adminLogo}>NEFERTARI</h2>
        <AdminBtn label="لوحة التحكم" active={tab === "dashboard"} onClick={() => setTab("dashboard")} />
        <AdminBtn label="الهوية والهيدر" active={tab === "brand"} onClick={() => setTab("brand")} />
        <AdminBtn label="الرئيسية" active={tab === "hero"} onClick={() => setTab("hero")} />
        <AdminBtn label="الخدمات" active={tab === "services"} onClick={() => setTab("services")} />
        <AdminBtn label="لماذا نحن" active={tab === "why"} onClick={() => setTab("why")} />
        <AdminBtn label="طريقة العمل" active={tab === "steps"} onClick={() => setTab("steps")} />
        <AdminBtn label="التواصل" active={tab === "contact"} onClick={() => setTab("contact")} />
        <AdminBtn label="السوشيال" active={tab === "social"} onClick={() => setTab("social")} />
        <AdminBtn label="الألوان" active={tab === "theme"} onClick={() => setTab("theme")} />
        <AdminBtn label="SEO والفوتر" active={tab === "seo"} onClick={() => setTab("seo")} />
        <a href="/" style={styles.adminLink}>معاينة الموقع</a>
        <button onClick={logout} style={styles.logout}>خروج</button>
      </aside>

      <main style={styles.adminMain}>
        <div style={styles.adminTop}>
          <div>
            <h1 style={styles.adminTitle}>لوحة تحكم نفرتاري الشاملة</h1>
            <p style={styles.muted}>تحكم كامل في محتوى وشكل الموقع</p>
          </div>
          <div style={styles.topActions}>
            <button onClick={save} style={styles.adminPrimary}>حفظ التعديلات</button>
            <button onClick={exportJson} style={styles.adminSecondary}>تصدير JSON</button>
            <button onClick={reset} style={styles.adminDanger}>إرجاع الأصل</button>
          </div>
        </div>

        {tab === "dashboard" && <Dashboard data={data} />}
        {tab === "brand" && <Panel title="الهوية والهيدر">
          <Field label="اسم الشركة EN" value={data.brand.companyName} onChange={(v) => update("brand.companyName", v)} />
          <Field label="اسم الشركة AR" value={data.brand.arabicName} onChange={(v) => update("brand.arabicName", v)} />
          <Field label="نص اللوجو" value={data.brand.logoText} onChange={(v) => update("brand.logoText", v)} />
          <Field label="رابط صورة اللوجو" value={data.brand.logoImage} onChange={(v) => update("brand.logoImage", v)} />
          <Field label="السلوغان" value={data.brand.slogan} onChange={(v) => update("brand.slogan", v)} />
          <Field label="الرئيسية" value={data.nav.home} onChange={(v) => update("nav.home", v)} />
          <Field label="خدماتنا" value={data.nav.services} onChange={(v) => update("nav.services", v)} />
          <Field label="لماذا نحن" value={data.nav.why} onChange={(v) => update("nav.why", v)} />
          <Field label="طريقة العمل" value={data.nav.steps} onChange={(v) => update("nav.steps", v)} />
          <Field label="تواصل معنا" value={data.nav.contact} onChange={(v) => update("nav.contact", v)} />
        </Panel>}

        {tab === "hero" && <Panel title="قسم الرئيسية">
          <Field label="الشارة" value={data.hero.badge} onChange={(v) => update("hero.badge", v)} />
          <Field label="العنوان الرئيسي" value={data.hero.title} onChange={(v) => update("hero.title", v)} />
          <Area label="النص" value={data.hero.subtitle} onChange={(v) => update("hero.subtitle", v)} />
          <Field label="زر الطلب" value={data.hero.buttonText} onChange={(v) => update("hero.buttonText", v)} />
          <Field label="الزر الثاني" value={data.hero.secondaryButtonText} onChange={(v) => update("hero.secondaryButtonText", v)} />
          <Field label="رابط صورة خلفية" value={data.hero.backgroundImage} onChange={(v) => update("hero.backgroundImage", v)} />
        </Panel>}

        {tab === "services" && <ListEditor title="الخدمات" list={data.services} setList={(list) => setData({ ...data, services: list })} fields={["icon", "title", "description"]} />}
        {tab === "why" && <ListEditor title="لماذا نحن" list={data.why} setList={(list) => setData({ ...data, why: list })} fields={["title", "description"]} />}
        {tab === "steps" && <ListEditor title="طريقة العمل" list={data.steps} setList={(list) => setData({ ...data, steps: list })} fields={["title", "description"]} />}

        {tab === "contact" && <Panel title="بيانات التواصل">
          <Field label="الهاتف" value={data.contact.phone} onChange={(v) => update("contact.phone", v)} />
          <Field label="واتساب مع كود الدولة" value={data.contact.whatsapp} onChange={(v) => update("contact.whatsapp", v)} />
          <Field label="الإيميل" value={data.contact.email} onChange={(v) => update("contact.email", v)} />
          <Field label="العنوان" value={data.contact.address} onChange={(v) => update("contact.address", v)} />
          <Field label="مواعيد العمل" value={data.contact.workingHours} onChange={(v) => update("contact.workingHours", v)} />
          <Field label="زر الطلب" value={data.buttons.request} onChange={(v) => update("buttons.request", v)} />
          <Field label="زر الاتصال" value={data.buttons.call} onChange={(v) => update("buttons.call", v)} />
          <Field label="زر واتساب" value={data.buttons.whatsapp} onChange={(v) => update("buttons.whatsapp", v)} />
        </Panel>}

        {tab === "social" && <Panel title="روابط السوشيال ميديا">
          <Field label="Facebook" value={data.social.facebook} onChange={(v) => update("social.facebook", v)} />
          <Field label="Instagram" value={data.social.instagram} onChange={(v) => update("social.instagram", v)} />
          <Field label="TikTok" value={data.social.tiktok} onChange={(v) => update("social.tiktok", v)} />
          <Field label="Snapchat" value={data.social.snapchat} onChange={(v) => update("social.snapchat", v)} />
        </Panel>}

        {tab === "theme" && <Panel title="ألوان الموقع">
          <ColorField label="اللون الأساسي" value={data.theme.primary} onChange={(v) => update("theme.primary", v)} />
          <ColorField label="الخلفية" value={data.theme.secondary} onChange={(v) => update("theme.secondary", v)} />
          <ColorField label="الذهبي" value={data.theme.gold} onChange={(v) => update("theme.gold", v)} />
          <ColorField label="لون النص" value={data.theme.text} onChange={(v) => update("theme.text", v)} />
        </Panel>}

        {tab === "seo" && <Panel title="SEO والفوتر">
          <Field label="SEO Title" value={data.seo.title} onChange={(v) => update("seo.title", v)} />
          <Area label="SEO Description" value={data.seo.description} onChange={(v) => update("seo.description", v)} />
          <Field label="Keywords" value={data.seo.keywords} onChange={(v) => update("seo.keywords", v)} />
          <Area label="نص الفوتر" value={data.footer.text} onChange={(v) => update("footer.text", v)} />
        </Panel>}

        <div style={styles.note}>
          ملاحظة: هذه اللوحة تحفظ التعديلات في المتصفح الحالي عبر localStorage. إذا أردت أن تظهر التعديلات لكل الزوار ومن أي جهاز، نربطها لاحقًا بقاعدة بيانات أو CMS.
        </div>
      </main>
    </div>
  );
}

function Dashboard({ data }) {
  return (
    <div style={styles.cards}>
      <Stat title="الهاتف" value={data.contact.phone} />
      <Stat title="واتساب" value={data.contact.whatsapp} />
      <Stat title="الخدمات" value={data.services.length} />
      <Stat title="لماذا نحن" value={data.why.length} />
      <Stat title="خطوات العمل" value={data.steps.length} />
      <Stat title="الإيميل" value={data.contact.email} />
    </div>
  );
}

function Stat({ title, value }) {
  return <div style={styles.stat}><span>{title}</span><b>{value}</b></div>;
}

function Panel({ title, children }) {
  return <div style={styles.panel}><h2>{title}</h2><div style={styles.formGrid}>{children}</div></div>;
}

function Field({ label, value, onChange }) {
  return (
    <label style={styles.label}>
      <span>{label}</span>
      <input style={styles.input} value={value || ""} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function Area({ label, value, onChange }) {
  return (
    <label style={styles.label}>
      <span>{label}</span>
      <textarea style={styles.textarea} value={value || ""} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function ColorField({ label, value, onChange }) {
  return (
    <label style={styles.label}>
      <span>{label}</span>
      <div style={{ display: "flex", gap: 10 }}>
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} />
        <input style={styles.input} value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </label>
  );
}

function ListEditor({ title, list, setList, fields }) {
  const add = () => {
    const item = {};
    fields.forEach(f => item[f] = f === "icon" ? "✨" : "");
    setList([...list, item]);
  };

  const updateItem = (i, key, value) => {
    const copy = [...list];
    copy[i] = { ...copy[i], [key]: value };
    setList(copy);
  };

  const remove = (i) => setList(list.filter((_, index) => index !== i));

  return (
    <div style={styles.panel}>
      <div style={styles.panelHeader}>
        <h2>{title}</h2>
        <button onClick={add} style={styles.adminPrimary}>إضافة</button>
      </div>
      {list.map((item, i) => (
        <div key={i} style={styles.listItem}>
          {fields.map(f => (
            f === "description"
              ? <Area key={f} label={fieldName(f)} value={item[f]} onChange={(v) => updateItem(i, f, v)} />
              : <Field key={f} label={fieldName(f)} value={item[f]} onChange={(v) => updateItem(i, f, v)} />
          ))}
          <button onClick={() => remove(i)} style={styles.adminDanger}>حذف</button>
        </div>
      ))}
    </div>
  );
}

function AdminBtn({ label, active, onClick }) {
  return <button onClick={onClick} style={{ ...styles.sideButton, background: active ? "#e5c05b" : "transparent", color: active ? "#000" : "#fff" }}>{label}</button>;
}

function fieldName(f) {
  const names = { icon: "الأيقونة", title: "العنوان", description: "الوصف" };
  return names[f] || f;
}

function cleanPhone(p) {
  return String(p || "").replace(/[^\d]/g, "");
}

function downloadBlob(blob, filename) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

const styles = {
  site: { minHeight: "100vh", direction: "rtl", fontFamily: "Arial,Tahoma,sans-serif" },
  header: { minHeight: 145, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 70px", borderBottom: "1px solid rgba(255,255,255,.12)", gap: 20 },
  nav: { display: "flex", gap: 25, alignItems: "center", flexWrap: "wrap", justifyContent: "center" },
  navLink: { color: "#fff", textDecoration: "none", fontWeight: 800, fontSize: 18 },
  brandWrap: { textAlign: "right" },
  logoImage: { height: 64, objectFit: "contain", display: "block", marginBottom: 6 },
  logoText: { fontSize: 48, fontWeight: 900, letterSpacing: 2 },
  logoSub: { fontWeight: 800 },
  goldButton: { border: 0, color: "#000", padding: "15px 28px", borderRadius: 15, fontSize: 17, fontWeight: 900, textDecoration: "none", cursor: "pointer", display: "inline-block" },
  outlineButton: { border: "1px solid rgba(255,255,255,.5)", color: "#fff", padding: "15px 28px", borderRadius: 15, fontSize: 17, fontWeight: 900, textDecoration: "none" },
  heroSection: { minHeight: "72vh", display: "grid", placeItems: "center", padding: 30, backgroundSize: "cover", backgroundPosition: "center" },
  heroBox: { width: "min(1000px, 94%)", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.16)", borderRadius: 28, padding: "70px 45px", textAlign: "center" },
  badge: { fontSize: 22, fontWeight: 900, marginBottom: 18 },
  heroTitle: { fontSize: 58, margin: "0 0 20px", lineHeight: 1.25 },
  heroSubtitle: { fontSize: 25, margin: "0 0 30px", opacity: .95 },
  contactRow: { display: "flex", gap: 16, justifyContent: "center", alignItems: "center", flexWrap: "wrap", margin: "24px 0" },
  pill: { color: "#fff", textDecoration: "none", border: "1px solid rgba(255,255,255,.22)", borderRadius: 45, padding: "14px 24px", fontWeight: 800 },
  heroButtons: { display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" },
  section: { padding: "60px 7%" },
  sectionTitle: { textAlign: "center", fontSize: 38, marginBottom: 30 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 },
  publicCard: { background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 20, padding: 28, textAlign: "center" },
  icon: { fontSize: 42 },
  stepNumber: { width: 48, height: 48, margin: "0 auto 12px", borderRadius: "50%", display: "grid", placeItems: "center", background: "#e5c05b", color: "#000", fontWeight: 900 },
  contactSection: { padding: "60px 7%", textAlign: "center" },
  socials: { display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginTop: 20 },
  whatsapp: { position: "fixed", left: 28, bottom: 28, width: 82, height: 82, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, textDecoration: "none", zIndex: 99999, boxShadow: "0 10px 28px rgba(0,0,0,.25)" },
  footer: { padding: 28, textAlign: "center", color: "#fff" },

  loginPage: { minHeight: "100vh", background: "#06264a", display: "grid", placeItems: "center", direction: "rtl", fontFamily: "Arial" },
  loginBox: { background: "#fff", padding: 40, borderRadius: 20, display: "grid", gap: 14, width: 390, textAlign: "center" },
  adminLayout: { minHeight: "100vh", background: "#f3f6fb", direction: "rtl", display: "grid", gridTemplateColumns: "290px 1fr", fontFamily: "Arial,Tahoma,sans-serif", color: "#111" },
  adminSidebar: { background: "#071d35", color: "#fff", padding: 24, display: "flex", flexDirection: "column", gap: 10, position: "sticky", top: 0, height: "100vh", overflowY: "auto" },
  adminLogo: { color: "#e5c05b", margin: "0 0 18px", fontSize: 30 },
  sideButton: { border: 0, borderRadius: 12, padding: "13px 14px", textAlign: "right", fontWeight: 900, cursor: "pointer", fontSize: 15 },
  adminLink: { color: "#fff", textDecoration: "none", padding: 13, borderRadius: 12, background: "rgba(255,255,255,.08)", fontWeight: 800 },
  logout: { background: "#dc2626", color: "#fff", border: 0, padding: 13, borderRadius: 12, fontWeight: 900, cursor: "pointer", marginTop: "auto" },
  adminMain: { padding: 34, overflow: "hidden" },
  adminTop: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, marginBottom: 24, flexWrap: "wrap" },
  adminTitle: { margin: 0, fontSize: 36 },
  muted: { color: "#64748b", margin: "8px 0 0" },
  topActions: { display: "flex", gap: 10, flexWrap: "wrap" },
  adminPrimary: { background: "#16a34a", color: "#fff", border: 0, borderRadius: 12, padding: "13px 18px", fontWeight: 900, cursor: "pointer" },
  adminSecondary: { background: "#041f3d", color: "#fff", border: 0, borderRadius: 12, padding: "13px 18px", fontWeight: 900, cursor: "pointer" },
  adminDanger: { background: "#dc2626", color: "#fff", border: 0, borderRadius: 12, padding: "13px 18px", fontWeight: 900, cursor: "pointer" },
  cards: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 },
  stat: { background: "#fff", borderRadius: 18, padding: 24, boxShadow: "0 8px 24px rgba(0,0,0,.06)" },
  panel: { background: "#fff", borderRadius: 20, padding: 26, boxShadow: "0 8px 24px rgba(0,0,0,.06)", marginBottom: 22 },
  panelHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 },
  label: { display: "grid", gap: 7, fontWeight: 800 },
  input: { width: "100%", padding: 14, border: "1px solid #d8dee9", borderRadius: 12, fontSize: 16 },
  textarea: { width: "100%", padding: 14, border: "1px solid #d8dee9", borderRadius: 12, fontSize: 16, minHeight: 110 },
  listItem: { border: "1px solid #e5e7eb", borderRadius: 16, padding: 16, display: "grid", gap: 12, marginBottom: 14, background: "#fafafa" },
  note: { background: "#fff7ed", border: "1px solid #fed7aa", color: "#9a3412", padding: 18, borderRadius: 14, lineHeight: 1.8 },
};
'''
Path('/mnt/data/App.jsx').write_text(code, encoding='utf-8')
print('/mnt/data/App.jsx')
