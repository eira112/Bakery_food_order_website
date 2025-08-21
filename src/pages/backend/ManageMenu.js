import { useEffect, useState } from "react";
import { deleteItem, getAllItem } from "../../services/item";
import ItemRow from "../../components/backend/ItemRow";
import { toast } from "react-toastify";
import { NavLink } from "react-router";

const ManageMenu = () => {
  const [items, setItem] = useState([]);



  useEffect(() => {
    getAllItem().then((response) => {
      if (response.data.length > 0) {
        setItem(response.data);
      }
    });
  }, []);

    const handleDelete=(id)=>{
    deleteItem(id).then((response)=>{
      toast.success("Item deleted successfully");
      getAllItem().then((response)=>{
        setItem(response.data);
      })
    })
  }

  return (
    <main className="flex-1 min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 md:mb-0">
          Manage Menu
        </h1>
        <NavLink to={'/admin/manageMenu/addProduct'}><button className="px-4 py-2 bg-yellow-800 text-white rounded-lg hover:bg-yellow-900 transition" >
          Add Product
        </button></NavLink>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">Name</th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">Image</th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">Description</th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">Category</th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">Price</th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <ItemRow items={items} onDelete={handleDelete} />
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ManageMenu;
