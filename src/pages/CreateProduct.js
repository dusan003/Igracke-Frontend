import React, { useState } from "react";
import ImageUploader from "../components/ImageUploader.js";

const CreateProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrls: [],
  });

  const [resetUploader, setResetUploader] = useState(false); // Signal za resetovanje ImageUploader-a

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = (urls) => {
    setProduct((prevState) => ({
      ...prevState,
      imageUrls: [...prevState.imageUrls, ...urls],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Product data being sent:", product);

    if (product.imageUrls.length === 0) {
      alert("Please upload at least one image before creating the product.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert("Product created successfully!");

        // Reset forme i stanja
        setProduct({ name: "", description: "", price: "", imageUrls: [] });
        setResetUploader((prev) => !prev); // Signal za reset ImageUploader-a
      } else {
        alert("Error creating product.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create product.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleInputChange}
        />
      </div>
      <ImageUploader onUpload={handleImageUpload} resetTrigger={resetUploader} />
      <div>
        <h4>Selected Images:</h4>
        {product.imageUrls.map((url, index) => (
          <p key={index}>{url}</p>
        ))}
      </div>
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProductForm;
