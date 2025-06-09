import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";

// Import images
const images = import.meta.glob('/public/1/*.{webp,gif,jpg}', { eager: true });
const images2 = import.meta.glob('/public/2/*.{webp,gif}', { eager: true });

const GalleryPage = () => {
  const [thumbSize, setThumbSize] = useState(125);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage, setImagesPerPage] = useState(1); // Will be calculated

  const allImages = [...Object.values(images), ...Object.values(images2)];

  // Calculate how many thumbnails fit in the viewport
  const calculateImagesPerPage = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const gap = 4; // Tailwind's `gap-1` = 0.25rem = 4px
    const rows = Math.floor((screenHeight - 140) / (thumbSize + gap)); // 140px reserved for UI
    const cols = Math.floor((screenWidth) / (thumbSize + gap)); // 20px side padding

    return Math.max(1, rows * cols); // Always at least 1
  };

  // Recalculate on thumbSize change or resize
  useEffect(() => {
    const handleResize = () => setImagesPerPage(calculateImagesPerPage());
    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [thumbSize]);

  const totalPages = Math.ceil(allImages.length / imagesPerPage);

  const paginatedImages = allImages.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  const imageElements = paginatedImages.map((image, index) => {
    const isFirstSet = index + (currentPage - 1) * imagesPerPage < Object.values(images).length;
    return (
      <div
        key={index}
        style={{
          position: "relative",
          height: thumbSize,
          width: thumbSize,
          background: isFirstSet ? "green" : "red",
        }}
      >
        <img
          src={image.default}
          alt={`Image ${index + 1}`}
          className="w-full h-full object-cover border"
          loading="lazy"
        />
        <span className={`flex justify-center items-center opacity-45 absolute h-[20px] w-[20px] right-1 top-1 text-xs bg-white rounded-full ${isFirstSet ? 'text-emerald-700' : 'text-orange-500'}`}>
          {(currentPage - 1) * imagesPerPage + index + 1}
        </span>
      </div>
    );
  });

  return (
    <>
      <div className="flex justify-between items-center mt-1 mx-2">
        <span>
          Total: {allImages.length} | Page: {currentPage}/{totalPages}
        </span>
        <div className="flex gap-2 items-center">
          Thumb Size:
          <Slider
            min={125}
            max={250}
            step={1}
            unit={"px"}
            value={[thumbSize]}
            className="w-[300px]"
            onValueChange={(value) => setThumbSize(value[0])}
          />
        </div>
      </div>

      <div className="galleryPage_v2 flex overflow-hidden mr-1">
        <div className="galleryWrapper justify-center flex flex-wrap gap-1 w-full">
          {imageElements}
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-1">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default GalleryPage;
