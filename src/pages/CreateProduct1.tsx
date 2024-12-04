import React, { useState } from "react";
import { CreateNewProduct } from "../services/productService.tsx";
import "../assets/CreateProduct.css";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";


export const CreateProduct = () => {
    const [name, setName] = useState<string>("");
    const [id, setId] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [isPosting, setIsPosting] = useState<boolean>(false);

    const handlePost = async () => {
      if (!name.trim() || !description.trim() || (price != null && price <= 0)) {
          alert("Unesite validne vrednosti za ime, opis i cenu!");
          return;
      }
     

        setIsPosting(true);

        try{
          const uploadedImageUrls = await Promise.all(
            selectedImages.map(async (image) => {
              const formData = new FormData();
              formData.append("image", image);
      
              const response = await fetch("http://localhost:5001/api/product/upload", {
                method: "POST",
                body: formData,
              });
      
              if (!response.ok) throw new Error("Image upload failed");
              const data = await response.json();
              return data.url; // URL koji je server vratio
            })
          );

            await CreateNewProduct({
                "id" : id,
                "name" : name,
                "description": description,
                "price": price,
                "imageUrls": uploadedImageUrls,
            });

            alert("Product created successfully!");
            setId(0);
            setDescription("");
            setName("");
            setPrice(0);
            setSelectedImages([]);
            setPreviewImages([]);
        }
        catch (error) {
            console.error("Error creating product:", error);
            if (error instanceof Error) {
            alert(error.message);
            }
        } finally {
            setIsPosting(false);
        }

    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setSelectedImages((prev) => [...prev, ...fileArray]);
            const previews = fileArray.map((file) =>
                URL.createObjectURL(file)
            );
            setPreviewImages((prev) => [...prev, ...previews]);
        }
    };

    return (
      <Box sx={{ maxWidth: 600, margin: "20px auto", padding: 3, border: "1px solid #ccc", borderRadius: 2, backgroundColor: "#f9f9f9" }}>
        <Typography variant="h5" textAlign="center" marginBottom={3}>
          New Product
        </Typography>
  
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ marginBottom: 2 }}
          disabled={isPosting}
        />
  
        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ marginBottom: 2 }}
          disabled={isPosting}
        />
  
        <TextField
          label="Price"
          type="number"
          variant="outlined"
          fullWidth
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
          sx={{ marginBottom: 2 }}
          disabled={isPosting}
        />
  
        <Button variant="outlined" component="label" sx={{ marginBottom: 2 }}>
          Upload Images
          <input type="file" hidden multiple accept="image/*" onChange={handleImageChange} disabled={isPosting} />
        </Button>
  
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", marginBottom: 2 }}>
          {previewImages.map((preview, index) => (
            <Box key={index} sx={{ width: 100, height: 100, overflow: "hidden", borderRadius: 1, border: "1px solid #ddd" }}>
              <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Box>
          ))}
        </Box>
  
        <Divider sx={{ marginY: 2 }} />
  
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePost}
          disabled={isPosting}
        >
          {isPosting ? "Posting..." : "Post Product"}
        </Button>
      </Box>
    );
};