const ColumnsLayout = () => {
    
    const items = [
      { id: 1, text: 'Card 1', color: 'bg-red-500' },
      { id: 2, text: 'Card 2', color: 'bg-blue-500' },
      { id: 3, text: 'Card 3', color: 'bg-green-500' },
      { id: 4, text: 'Card 4', color: 'bg-yellow-500' },
      { id: 5, text: 'Card 5', color: 'bg-purple-500' },
      { id: 6, text: 'Card 6', color: 'bg-pink-500' },
    ];
  
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="columns-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`${item.color} text-white p-4 rounded-lg mb-4 aspect-[3/2]`}
            >
              {item.text}
            </div>
          ))}
        </div>
         
        {/* <div className="columns-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`${item.color} text-white p-4 rounded-lg mb-4 aspect-[3/2]`}
            >
              {item.text}
            </div>
          ))}
        </div> */}

        {/* <div className="columns-6 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`${item.color} text-white p-4 rounded-lg mb-4 aspect-[3/2]`}
            >
              {item.text}
            </div>
          ))}
        </div> */}
      </div>
    );
  };
  
  export default ColumnsLayout;