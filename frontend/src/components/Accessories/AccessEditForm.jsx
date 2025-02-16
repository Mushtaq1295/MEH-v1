import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAccessories } from "../../contexts/AccessoriesContext";
import axios from "axios";


const EditForm = () => {
  const {id} = useParams();
  const {accessories, setselectedAccessory} = useAccessories();
  const navigate = useNavigate();
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const selectedAccessory = accessories.find(accessory => accessory._id === id);

  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    price: "",
    available: "",
  });

  useEffect(() =>{
    if(selectedAccessory){
      setFormData({
        title: selectedAccessory.title || "",
        image_url: selectedAccessory.image_url || "",
        price: selectedAccessory.price || "",
        available: selectedAccessory.available || "",
      });
    }
  },[selectedAccessory]);

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.put(`${backend_url}/accessories/${id}`,formData);
    }catch(error){
      console.error("Error updating Accessory:", error);
    }
  }


  return (
    <>
      <section className="min-h-screen bg-blue-600 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-3 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Edit Item
            </h1>
            <form 
              className="space-y-4" 
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Title :
                </label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Image_url :
                </label>
                <input
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Price Range (in  ₹) :
                </label>
                <input 
                  type="number" 
                  name="price" 
                  value={formData.price}
                  onChange={handleChange}
                  required 
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Count (Available) :
                </label>
                <input 
                  type="number" 
                  name="count" 
                  value={formData.available}
                  onChange={handleChange}
                  required 
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              
              <button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-xl text-base px-6 py-3 text-center shadow-lg transform hover:scale-105 cursor-pointer"
            >
              Update
            </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );

}


export default EditForm
