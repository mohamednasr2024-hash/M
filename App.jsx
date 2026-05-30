import React, { useState } from "react";

const ADMIN_EMAIL = "admin@nefertari.com";
const ADMIN_PASSWORD = "123456";

const defaultData = {
  companyName: "NEFERTARI",
  arabicName: "نفرتاري للتنظيفات والضيافة",
  phone: "72081178",
  whatsapp: "97472081178",
  email: "neferclean@gmail.com",
  heroTitle: "جاهزون لخدمتك",
  heroText: "للطلب أو الاستفسار تواصل معنا الآن.",
};

export default function App() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("nefertariData")) || defaultData
  );

  const [login, setLogin] = useState({ email: "", password: "" });
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("adminLogged") === "yes"
  );

  function saveData() {
    localStorage.setItem("nefertariData", JSON.stringify(data));
    alert("تم حفظ التعديلات بنجاح");
  }

  function loginAdmin(e) {
    e.preventDefault();
    if (login.email === ADMIN_EMAIL && login.password === ADMIN_PASSWORD) {
      localStorage.setItem("adminLogged", "yes");
      setIsLogged(true);
    } else {
      alert("بيانات الدخول غير صحيحة");
    }
  }

  if (window.location.pathname === "/admin") {
    if (!isLogged) {
      return (
        <div style={styles.loginPage}>
          <form onSubmit={loginAdmin} style={styles.loginBox}>
            <h2>تسجيل دخول لوحة التحكم</h2>
            <input
              placeholder="Email"
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
              style={styles.input}
            />
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              style={styles.input}
            />
            <button style={styles.goldBtn}>دخول</button>
          </form>
        </div>
      );
    }

    return (
      <div style={styles.adminPage}>
        <h1>لوحة تحكم نفرتاري</h1>

        <label>اسم الشركة</label>
        <input style={styles.input} value={data.companyName}
          onChange={(e) => setData({ ...data, companyName: e.target.value })} />

        <label>اسم الشركة بالعربي</label>
        <input style={styles.input} value={data.arabicName}
          onChange={(e) => setData({ ...data, arabicName: e.target.value })} />

        <label>رقم الهاتف</label>
        <input style={styles.input} value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })} />

        <label>رقم واتساب</label>
        <input style={styles.input} value={data.whatsapp}
          onChange={(e) => setData({ ...data, whatsapp: e.target.value })} />

        <label>الإيميل</label>
        <input style={styles.input} value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })} />

        <label>العنوان الرئيسي</label>
        <input style={styles.input} value={data.heroTitle}
          onChange={(e) => setData({ ...data, heroTitle: e.target.value })} />

        <label>النص</label>
        <textarea style={styles.textarea} value={data.heroText}
          onChange={(e) => setData({ ...data, heroText: e.target.value })} />

        <button onClick={saveData} style={styles.saveBtn}>حفظ التعديلات</button>

        <a href="/" style={styles.previewBtn}>عرض الموقع</a>
      </div>
    );
  }

  return (
    <div style={styles.site}>
      <header style={styles.header}>
        <button style={styles.goldBtn}>طلب خدمة</button>

        <nav style={styles.nav}>
          <a href="/" style={styles.link}>الرئيسية</a>
          <a href="#" style={styles.link}>خدماتنا</a>
          <a href="#" style={styles.link}>تواصل معنا</a>
          <a href="/admin" style={styles.link}>لوحة التحكم</a>
        </nav>

        <div>
          <h1 style={styles.logo}>{data.companyName}</h1>
          <p style={styles.subLogo}>{data.arabicName}</p>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h3 style={styles.goldText}>تواصل معنا</h3>
          <h1 style={styles.heroTitle}>{data.heroTitle}</h1>
          <p style={styles.heroText}>{data.heroText}</p>

          <div style={styles.contact}>
            <span>{data.email} ✉</span>
            <span>{data.phone} 📞</span>
          </div>

          <a href={`https://wa.me/${data.whatsapp}`} target="_blank" style={styles.goldBtn}>
            اطلب الخدمة الآن
          </a>
        </div>
      </main>

      <a href={`https://wa.me/${data.whatsapp}`} target="_blank" style={styles.whatsapp}>
        💬
      </a>

      <footer style={styles.footer}>© 2026 {data.arabicName}</footer>
    </div>
  );
}

const styles = {
  site: {
    minHeight: "100vh",
    background: "#06264a",
    color: "white",
    direction: "rtl",
    fontFamily: "Arial",
  },
  header: {
    background: "#041f3d",
    padding: "35px 70px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { color: "#e5c05b", fontSize: 48, margin: 0 },
  subLogo: { color: "#e5c05b", margin: 0 },
  nav: { display: "flex", gap: 35 },
  link: { color: "white", textDecoration: "none", fontSize: 20 },
  goldBtn: {
    background: "#e5c05b",
    color: "#000",
    padding: "16px 35px",
    borderRadius: 15,
    border: 0,
    fontWeight: "bold",
    fontSize: 18,
    textDecoration: "none",
    cursor: "pointer",
  },
  main: {
    minHeight: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "60%",
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.15)",
    borderRadius: 28,
    padding: 70,
    textAlign: "center",
  },
  goldText: { color: "#e5c05b", fontSize: 26 },
  heroTitle: { fontSize: 60 },
  heroText: { fontSize: 26 },
  contact: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    margin: "30px 0",
  },
  whatsapp: {
    position: "fixed",
    left: 25,
    bottom: 25,
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "#25D366",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 40,
    textDecoration: "none",
  },
  footer: {
    background: "#03182e",
    textAlign: "center",
    padding: 25,
  },
  loginPage: {
    minHeight: "100vh",
    background: "#06264a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    direction: "rtl",
    fontFamily: "Arial",
  },
  loginBox: {
    background: "white",
    padding: 40,
    borderRadius: 20,
    display: "grid",
    gap: 15,
    width: 380,
    textAlign: "center",
  },
  adminPage: {
    direction: "rtl",
    fontFamily: "Arial",
    padding: 40,
    background: "#f4f6fa",
    minHeight: "100vh",
    display: "grid",
    gap: 12,
  },
  input: {
    padding: 15,
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 16,
  },
  textarea: {
    padding: 15,
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 16,
    minHeight: 100,
  },
  saveBtn: {
    background: "#16a34a",
    color: "white",
    padding: 16,
    borderRadius: 12,
    border: 0,
    fontWeight: "bold",
    cursor: "pointer",
  },
  previewBtn: {
    background: "#041f3d",
    color: "white",
    textAlign: "center",
    padding: 16,
    borderRadius: 12,
    textDecoration: "none",
  },
};
