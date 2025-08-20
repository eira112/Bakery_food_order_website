const ItemRow = (props) => {
  return (
    <>
      {props.items &&
        props.items.map((item, index) => {
          return (
            <tr key={index} className="border-b last:border-none hover:bg-gray-50 transition">
              <td className="px-4 py-2 text-gray-900 font-medium">{item.productName}</td>

              <td className="px-4 py-2">
                <div className="w-16 h-16 overflow-hidden rounded-md">
                  <img
                    src={item.productImage ? item.productImage: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop" } 
                    alt={item.productName}
                    className="product-image"
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "12px",
                      objectFit: "cover",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                    }}
                  />
                </div>
              </td>

              <td className="px-4 py-2 text-gray-600 truncate max-w-xs">{item.description}</td>

              <td className="px-4 py-2">
                <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm font-medium">
                  {item.category}
                </span>
              </td>

              <td className="px-4 py-2 text-gray-900 font-semibold">Rs. {item.price}</td>

              <td className="px-4 py-2 flex gap-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition">
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
    </>
  );
};

export default ItemRow;
