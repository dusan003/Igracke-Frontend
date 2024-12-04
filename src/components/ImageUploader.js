import React, { useState } from "react";

const ImageUploader = ({ onUpload, resetTrigger }) => {
  const [images, setImages] = useState([]); // Odabrane slike
  const [uploadedUrls, setUploadedUrls] = useState([]); // URL-ovi uspešno uploadovanih slika

  // Resetovanje stanja na signal iz parent komponente
  React.useEffect(() => {
    if (resetTrigger) {
      setImages([]);
      setUploadedUrls([]);
    }
  }, [resetTrigger]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files); // Sačuvaj slike za upload
  };

  const uploadImages = async () => {
    const urls = [];

    for (let image of images) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const response = await fetch("http://localhost:5001/api/product/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          urls.push(data.Url); // Dodaj URL uspešno uploadovane slike
        } else {
          alert(`Failed to upload image: ${image.name}`);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    if (urls.length > 0) {
      setUploadedUrls((prev) => [...prev, ...urls]); // Ažuriraj lokalne URL-ove
      onUpload(urls); // Prosledi URL-ove parent komponenti
      setImages([]); // Resetuj odabrane slike
    }

    alert(`Uploaded ${urls.length} image(s) successfully!`);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="button" onClick={uploadImages}>
        Upload Selected Images
      </button>

      <div>
        <h4>Uploaded Images:</h4>
        {uploadedUrls.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index + 1}`} width="100" />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
