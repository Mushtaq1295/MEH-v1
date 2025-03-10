const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dv8h7yjv2",
  api_key: "763998877178254",
  api_secret: "pC7K4YMFWkFx6PcnaKpUfPWhgWY",
});

// Cloudinary folder name
const cloudinaryFolder = "public-v1";

// Local folder path containing images
const folderPath = "./public-v1"; // Change this to your images folder

// Allowed image extensions
const validExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

// Cloudinary Base URL
const cloudinaryBaseUrl = "https://res.cloudinary.com/dv8h7yjv2/image/upload";

/**
 * Function to delete all existing images in the Cloudinary folder
 */
const deleteOldImages = async () => {
  try {
    console.log(`Deleting all images in Cloudinary folder: ${cloudinaryFolder}`);

    const { resources } = await cloudinary.api.resources({
      type: "upload",
      prefix: cloudinaryFolder, // Fetch all images from the folder
    });

    if (resources.length === 0) {
      console.log("No previous images found in Cloudinary.");
      return;
    }

    const publicIds = resources.map((file) => file.public_id);
    await cloudinary.api.delete_resources(publicIds);
    
    console.log("All previous images deleted successfully.");
  } catch (error) {
    console.error("Error deleting old images:", error);
  }
};

/**
 * Function to get all image files recursively from the local folder
 */
const getImageFiles = (dir) => {
  let filesList = [];

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // If it's a folder, recurse into it
      filesList = filesList.concat(getImageFiles(filePath));
    } else if (validExtensions.includes(path.extname(file).toLowerCase())) {
      // If it's an image file, add to list
      filesList.push(filePath);
    }
  }
  return filesList;
};

/**
 * Function to upload images and return clean URLs
 */
const uploadImages = async () => {
  try {
    await deleteOldImages(); // Delete previous content before uploading

    const imageFiles = getImageFiles(folderPath);

    if (imageFiles.length === 0) {
      console.log("No images found to upload.");
      return;
    }

    const uploadedUrls = [];

    for (const filePath of imageFiles) {
      const fileName = path.basename(filePath, path.extname(filePath)); // Extract filename without extension
      const fileExtension = path.extname(filePath); // Get file extension

      console.log(`Uploading: ${filePath}`);

      await cloudinary.uploader.upload(filePath, {
        folder: cloudinaryFolder,
        public_id: fileName, // Set custom public_id as the filename
        overwrite: true, // Avoid duplicate uploads
      });

      // Construct clean URL without version ID
      const cleanUrl = `${cloudinaryBaseUrl}/${cloudinaryFolder}/${fileName}${fileExtension}`;
      uploadedUrls.push(cleanUrl);

      console.log(`Uploaded: ${cleanUrl}`);
    }

    // Save the clean URLs to a JSON file
    fs.writeFileSync("uploaded_urls.json", JSON.stringify(uploadedUrls, null, 2));
    console.log("✅ All URLs saved to uploaded_urls.json");

  } catch (error) {
    console.error("Error reading folder or uploading files:", error);
  }
};

// Start the upload process
uploadImages();
