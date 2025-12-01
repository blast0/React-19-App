export default function   CardGallery({ onSelect }) {
  const jsonFiles = import.meta.glob("/src/data/cards/*.json", { eager: true });
  const images = import.meta.glob("/src/data/cards/images/*.{png,jpg,jpeg,svg}");

  const imageMap = {};
  for (const path in images) {
    const name = path.split("/").pop().split(".")[0];
    imageMap[name] = new URL(path, import.meta.url).href;
  }

  const cards = Object.keys(jsonFiles).map((key) => {
    const data = jsonFiles[key];
    const name = key.split("/").pop().split(".")[0];

    return {
      id: name,
      ...data,             // spread JSON content
      image: imageMap[name] || null,
    };
  });

  return (
    <div className="">
      {cards.map((card) => (
        <div key={card.id} className="border rounded-xl shadow p-4">
          {card.image && (
            <img src={card.image} alt={card.title} className="w-full h-40 min-w-[300px] object-cover rounded" />
          )}

          <h2 className="text-lg font-semibold mt-2">{card.title}</h2>
          <p className="text-gray-500 text-sm">{card.description}</p>

          <button
            onClick={() => onSelect(card)}   // pass JSON + image + id
            className="mt-3 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition"
          >
            OK
          </button>
        </div>
      ))}
    </div>
  );
}
