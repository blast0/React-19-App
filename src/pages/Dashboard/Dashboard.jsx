// import { Link, Outlet } from "react-router-dom"


// const Dashboard = () => {
//   return (
//     <div>
//     <h1>Dashboard</h1>
//     <nav>
//       <Link to="/dashboard/profile">Profile</Link> |{' '}
//       <Link to="/dashboard/settings">Settings</Link>
//     </nav>
//     <Outlet /> {/* Renders nested child routes */}
//   </div>
//   )
// }

// export default Dashboard

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Download, ImageIcon } from "lucide-react";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUnsplash = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.unsplash.com/photos/random?count=10&client_id=YOUR_UNSPLASH_ACCESS_KEY`);
      const data = await res.json();
      setImages((prev) => [...data.map((img) => img.urls.small), ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPexels = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.pexels.com/v1/curated?per_page=10`, {
        headers: {
          Authorization: "YOUR_PEXELS_API_KEY",
        },
      });
      const data = await res.json();
      setImages((prev) => [...data.photos.map((p) => p.src.medium), ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...urls, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-10 bg-white shadow-sm px-6 py-4 flex items-center gap-4">
        <button onClick={fetchUnsplash} className="px-4 py-2 bg-slate-900 text-white rounded-xl flex items-center gap-2">
          <ImageIcon size={18} /> Unsplash
        </button>
        <button onClick={fetchPexels} className="px-4 py-2 bg-slate-900 text-white rounded-xl flex items-center gap-2">
          <ImageIcon size={18} /> Pexels
        </button>

        <label className="px-4 py-2 bg-slate-900 text-white rounded-xl flex items-center gap-2 cursor-pointer">
          <Plus size={18} /> Upload
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
        </label>
      </nav>

      {/* GALLERY */}
      {loading && <p className="text-center py-6">Loading images...</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        {images.map((src, idx) => (
          <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <img src={src} alt="gallery" className="w-full h-48 object-cover rounded-xl shadow" />
            <a href={src} download className="block text-sm text-center mt-1 underline">Download</a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
