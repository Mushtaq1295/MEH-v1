import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEngines } from "../../contexts/EnginesContext";
import { useHistoryContext } from "../../contexts/HistoryContext";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import api from "../../api";

const EngineCheckoutForm = () => {
  const navigate = useNavigate();
  const { refreshHistory } = useHistoryContext();
  const { isAuthenticated } = useAuth();
  const { id } = useParams();
  const { engines, setEngines } = useEngines();
  const engine = engines.find((item) => item._id === id);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    quantity: 1,
    exchange: "",
    category: "",
    name: "",
    engineBrand: "",
    imageFile: null,
    model: "",
    payMode: "",
    total: "",
  });

  const handleIncrement = () => {
    setFormData({ ...formData, quantity: formData.quantity + 1 });
  };

  const handleDecrement = () => {
    if (formData.quantity > 1) {
      setFormData({ ...formData, quantity: formData.quantity - 1 });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (!/^[0-9-]*$/.test(input)) return;
    setFormData({ ...formData, phone: input });
    if (input.length === 12 && !phonePattern.test(input)) {
      setError("Invalid format! Use 123-456-7890");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please log in to checkout");
      navigate("/login");
      return;
    }
    if (!engine) {
      toast.error("Engine data is not available!");
      return;
    }
    const availableQuantity = engine.available || 0;
    if (availableQuantity < formData.quantity) {
      toast.warning(`Insufficient stock. Only ${availableQuantity} available`);
      return;
    }
    try {
      const payload = {
        title: engine.title,
        image_url_main: engine.image_url,
        customer_name: formData.customerName,
        phone_number: formData.phone,
        available: formData.quantity,
        exchange: formData.exchange === "yes",
        category: formData.exchange === "yes" ? formData.category : undefined,
        engine_brand:
          formData.category === "Engines" ? formData.engineBrand : undefined,
        image_url: formData.imageFile ? "uploaded_image_url_here" : undefined,
        model:
          formData.category === "Engines" ? Number(formData.model) : undefined,
        item_name:
          formData.category === "Accessories" ? formData.name : undefined,
        pay_mode: formData.payMode,
        price: Number(formData.total),
      };
      const response = await api.post(`/engines/${id}`, payload);
      if (response.data.success) {
        toast.success("Engine checkout successful!");
        setEngines((prevEngines) =>
          prevEngines.map((engine) =>
            engine._id === id ? response.data.engine : engine
          )
        );
        navigate(-1);
        refreshHistory();
      }
    } catch (error) {
      const message = error.response?.data?.message || "Checkout failed";
      toast.error(message);
      console.error("Checkout error:", error);
    }
  };

  return (
    <section className="min-h-screen bg-blue-600 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-3 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Checkout
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="customerName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Customer Name :
                </label>
                <input
                  type="text"
                  name="customerName"
                  id="customerName"
                  required
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 19 18"
                    >
                      <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="123-456-7890"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>
              <div className="mt-4">
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Choose quantity:
                </label>
                <div className="flex items-center max-w-[8rem]">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-2 focus:outline-none"
                  >
                    <svg
                      className="w-3 h-3 text-gray-900 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    id="quantity"
                    value={formData.quantity}
                    readOnly
                    className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-2 focus:outline-none"
                  >
                    <svg
                      className="w-3 h-3 text-gray-900 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Exchange?
                </p>
                <div className="flex items-center mb-4">
                  <input
                    id="exchange-yes"
                    type="radio"
                    name="exchange"
                    value="yes"
                    checked={formData.exchange === "yes"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                  <label
                    htmlFor="exchange-yes"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="exchange-no"
                    type="radio"
                    name="exchange"
                    value="no"
                    checked={formData.exchange === "no"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                    required
                  />
                  <label
                    htmlFor="exchange-no"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    No
                  </label>
                </div>
              </div>
              {formData.exchange === "yes" && (
                <>
                  <div className="mt-4">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category:
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    >
                      <option value="">Select Category</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Engines">Engines</option>
                    </select>
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name :
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  {formData.category === "Engines" && (
                    <div className="mt-4">
                      <label
                        htmlFor="engineBrand"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select Engine Brand:
                      </label>
                      <select
                        id="engineBrand"
                        name="engineBrand"
                        value={formData.engineBrand}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      >
                        <option value="">Select Brand</option>
                        <option value="Ashok Leyland Hino">
                          Ashok Leyland Hino
                        </option>
                        <option value="Ashok Leyland">Ashok Leyland</option>
                        <option value="Tata Cummins">Tata Cummins</option>
                        <option value="Tata TCIC">Tata TCIC</option>
                        <option value="Bharat Benz">Bharat Benz</option>
                        <option value="Mahindra">Mahindra</option>
                        <option value="Eicher">Eicher</option>
                        <option value="MAN">MAN</option>
                      </select>
                      <div className="mt-4">
                        <label
                          htmlFor="imageFile"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Upload Image / Capture:
                        </label>
                        <input
                          type="file"
                          name="imageFile"
                          id="imageFile"
                          accept="image/*"
                          capture="environment"
                          onChange={handleInputChange}
                          required
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="model"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Model (year):
                        </label>
                        <input
                          type="number"
                          name="model"
                          id="model"
                          required
                          value={formData.model}
                          onChange={handleInputChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
              <div className="mt-4">
                <label
                  htmlFor="payMode"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Pay Mode:
                </label>
                <select
                  id="payMode"
                  name="payMode"
                  value={formData.payMode}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                >
                  <option value="">Select Mode</option>
                  <option value="Cash">Cash</option>
                  <option value="Phone Pay">Phone Pay</option>
                  <option value="Google Pay">Google Pay</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="mt-3">
                <label
                  htmlFor="total"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Total (in ₹):
                </label>
                <input
                  type="number"
                  name="total"
                  id="total"
                  required
                  value={formData.total}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-xl text-base px-6 py-3 text-center shadow-lg transform hover:scale-105 cursor-pointer"
              >
                Checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineCheckoutForm;
