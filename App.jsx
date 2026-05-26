import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { doc, getDoc, setDoc, collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const defaultData = {
  companyName: "NEFERTARI",
  arabicName: "نفرتاري للتنظيفات والضيافة",
  phone: "72081178",
  whatsapp: "97472081178",
  email: "neferclean@gmail.com",
  heroTitle: "جاهزون لخدمتك",
  heroText: "للطلب أو الاستفسار تواصل معنا الآن.",
  services: "خادمات للمبيت شهرياً\nتنظيف منزلي\nخدمات ضيافة"
};

function Website() {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, "settings", "website"));
      if (snap.exists()) setData({ ...defaultData, ...snap.data() });
      else await setDoc(doc(db, "settings", "website"), defaultData);
    }
    load();
  }, []);

  async function sendOrder() {
    await addDoc(collection(db, "orders"), {
      name: "طلب جديد من الموقع",
      phone: data.phone,
      status: "جديد",
      createdAt: serverTimestamp()
    });
    window.open(`https://wa.me/${data.whatsapp}`, "_blank");
  }

  return (
    <div className="site">
      <header>
        <div><h1>{data.companyName}</h1><p>{data.arabicName}</p></div>
        <nav><a>الرئيسية</a><a>خدماتنا</a><a>تواصل معنا</a><Link to="/admin">لوحة التحكم</Link></nav>
        <button onClick={sendOrder}>طلب خدمة</button>
      </header>
      <main className="hero">
        <div className="box">
          <span>تواصل معنا</span>
          <h2>{data.heroTitle}</h2>
          <p>{data.heroText}</p>
          <div className="contact"><b>📞 {data.phone}</b><b>✉ {data.email}</b></div>
          <button onClick={sendOrder}>اطلب الخدمة الآن</button>
        </div>
      </main>
      <a className="whatsapp" href={`https://wa.me/${data.whatsapp}`} target="_blank">💬</a>
      <footer>© 2026 {data.arabicName}</footer>
    </div>
  );
}

function Admin() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [data, setData] = useState(defaultData);
  const [orders, setOrders] = useState([]);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, "settings", "website"));
      if (snap.exists()) setData({ ...defaultData, ...snap.data() });
      const q = await getDocs(collection(db, "orders"));
      setOrders(q.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    if (user) load();
  }, [user]);

  async function doLogin(e) {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, login.email, login.password);
  }

  async function save() {
    await setDoc(doc(db, "settings", "website"), data);
    alert("تم حفظ التعديلات بنجاح");
  }

  if (!user) return (
    <div className="admin-login">
      <form onSubmit={doLogin}>
        <h2>تسجيل دخول لوحة التحكم</h2>
        <input placeholder="Email" onChange={e=>setLogin({...login,email:e.target.value})}/>
        <input placeholder="Password" type="password" onChange={e=>setLogin({...login,password:e.target.value})}/>
        <button>دخول</button>
      </form>
    </div>
  );

  return (
    <div className="admin">
      <aside><h2>نفرتاري</h2><a>الرئيسية</a><a>إعدادات الموقع</a><a>الطلبات</a><button onClick={()=>signOut(auth)}>خروج</button></aside>
      <section>
        <h1>لوحة التحكم</h1>
        <div className="cards"><div>الطلبات <b>{orders.length}</b></div><div>الهاتف <b>{data.phone}</b></div><div>واتساب <b>{data.whatsapp}</b></div></div>
        <div className="panel">
          <h2>تعديل بيانات الموقع</h2>
          <label>اسم الشركة الإنجليزي</label><input value={data.companyName} onChange={e=>setData({...data,companyName:e.target.value})}/>
          <label>اسم الشركة العربي</label><input value={data.arabicName} onChange={e=>setData({...data,arabicName:e.target.value})}/>
          <label>الهاتف</label><input value={data.phone} onChange={e=>setData({...data,phone:e.target.value})}/>
          <label>واتساب</label><input value={data.whatsapp} onChange={e=>setData({...data,whatsapp:e.target.value})}/>
          <label>الإيميل</label><input value={data.email} onChange={e=>setData({...data,email:e.target.value})}/>
          <label>العنوان الرئيسي</label><input value={data.heroTitle} onChange={e=>setData({...data,heroTitle:e.target.value})}/>
          <label>النص</label><textarea value={data.heroText} onChange={e=>setData({...data,heroText:e.target.value})}/>
          <button onClick={save}>حفظ التعديلات</button>
        </div>
        <div className="panel"><h2>الطلبات</h2>{orders.map(o => <p key={o.id}>#{o.id.slice(0,6)} - {o.name} - {o.status}</p>)}</div>
      </section>
    </div>
  );
}

export default function App() {
  return <BrowserRouter><Routes><Route path="/" element={<Website />} /><Route path="/admin" element={<Admin />} /></Routes></BrowserRouter>;
}