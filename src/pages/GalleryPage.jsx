import { useEffect } from "react";
import BeforeAfterGallery from "../components/BeforeAfterGallery.jsx";

export default function GalleryPage() {
  useEffect(() => {
    document.title = "Before & After Gallery | Threads Beauty Bar & Spa — Dublin, CA";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "See real before & after results from Threads Beauty Bar & Spa in Dublin, CA — threading, waxing, facials, and hair services.");
  }, []);

  return <BeforeAfterGallery />;
}
