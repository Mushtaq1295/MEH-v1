import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEngines } from "../../contexts/EnginesContext";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import api from "../../api";

const EngineEditForm = () => {
  const { id } = useParams();
  const { engines, setEngines } = useEngines();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const selectedEngine = engines.find((engine) => engine._id === id);

  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    category: "",
    price: "",
    available: "",
    model: "",
    from: "",
  });

  useEffect(() => {
    if (selectedEngine) {
      setFormData({
        title: selectedEngine.title || "",
        image_url: selectedEngine.image_url || "",
        category: selectedEngine.category || "",
        price: selectedEngine.price || "",
        available: selectedEngine.available || "",
        model: selectedEngine.model || "",
        from: selectedEngine.from || "",
      });
    }
  }, [selectedEngine]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || user.role !== "admin") {
      toast.error("Access denied: Admins only");
      navigate("/login");
      return;
    }
    try {
      const response = await api.put(`/engines/${id}`, formData);
      setEngines((prevEngines) =>
        prevEngines.map((engine) =>
          engine._id === id ? response.data.updatedEngine : engine
        )
      );
      toast.success(response.data.message);
      navigate(-1);
    } catch (error) {
      const message = error.response?.data?.message || "Error updating engine";
      toast.error(message);
      console.error("Error updating engine:", error);
    }
  };

  return (
    <section className="min-h-screen bg-blue-600 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-3 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Edit Engine Details
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Category:
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {["TATA", "ASHOK LEYLAND", "BHARAT BENZ", "EICHER"].map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Price (₹):
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Available:
                </label>
                <input
                  type="number"
                  name="available"
                  value={formData.available}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Model:
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  From:
                </label>
                <input
                  type="text"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 ease-in-out font-semibold rounded-xl text-base px-6 py-3 text-center shadow-lg transform hover:scale-105 cursor-pointer"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineEditForm;
