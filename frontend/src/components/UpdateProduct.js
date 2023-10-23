import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "./Header";
import blankimg from "../images/blankimg.png";
import "../css/AddProduct.css";

const UpdateProduct = () => {
  const [formData, setFormData] = useState({
    product_title: "",
    description: "",
    price: "",
    tagId: [],
    user_id: "",
    isAvailable: true,
    image: [],
  });

  let image_ids = [];
  const images = new FormData();

  const fileInput = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files.length > 5) {
      e.target.value = "";
      alert("Only 5 images accepted.");
      return;
    }

    setFormData({
      ...formData,
      image: files,
    });
  };

  const handleSubmit = async () => {
    const files = fileInput.current.files;

    for (let i = 0; i < files.length; i++) {
      images.append("image", files[i]);
    }

    try {
      await axios
        .post("http://localhost:8000/product/upload_images/", images, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          image_ids = response.data.image_id;
        });
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      const product = {
        "product_title": formData.product_title,
        "description": formData.description,
        "price": formData.price,
        "is_available": formData.isAvailable,
        "tags_id": formData.tagId,
        "images_id": image_ids,
        "user_id": "65327386a23a8ce9dbade6ab"
      };

      console.log("product is :", product);

      const response = await axios.post(
        "http://localhost:8000/product/add_product",
        product,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [slideIndex, setSlideIndex] = useState(1);

  const plusSlides = (n) => {
    showSlides(slideIndex + n);
  };

  const currentSlide = (n) => {
    showSlides(n);
  };

  const showSlides = (n) => {
    setSlideIndex(n);
  };

  const slidesRef = useRef([]);
  const dotsRef = useRef([]);

  useEffect(() => {
    const slides = slidesRef.current;
    const dots = dotsRef.current;

    if (slideIndex > slides.length) {
      setSlideIndex(1);
    }
    if (slideIndex < 1) {
      setSlideIndex(slides.length);
    }

    slides.forEach((slide, i) => {
      slide.style.display = i === slideIndex - 1 ? "block" : "none";
    });

    dots.forEach((dot, i) => {
      dot.className =
        i === slideIndex - 1
          ? dot.className + " active"
          : dot.className.replace(" active", "");
    });
  }, [slideIndex]);

  return (
    <div className="add-product">
      <Header />
      <div className="add-product-container">
        <form className="add-product-form" onSubmit={handleSubmit}>
          <span className="add-product-heading">Update product details</span>
          <input
            className="add-product-input"
            name="product_title"
            type="text"
            placeholder="Enter product title"
            value={formData.product_title}
            onChange={handleInputChange}
          />
          <input
            className="add-product-input"
            name="description"
            type="text"
            placeholder="Enter product description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <input
            className="add-product-input"
            name="price"
            type="text"
            placeholder="Enter product price"
            value={formData.price}
            onChange={handleInputChange}
          />
          <input
            className="add-product-input"
            name="tag"
            type="text"
            placeholder="Enter product tag"
            value={formData.tag}
            onChange={handleInputChange}
          />
          <input
            className="add-product-input"
            ref={fileInput}
            name="files"
            alt="product-img"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            multiple
          />
          <div>
            <input
              type="checkbox"
              name="isAvailable"
              value={formData.isAvailable}
              onChange={handleInputChange}
            />
          </div>
          <div style={{width:'60%'}}><input type="checkbox" name="isAvailable" value={formData.isAvailable} onChange={handleInputChange}/> Product is in stock ?</div>
          <button className="add-product-button" type="submit">
            Update
          </button>
        </form>
        <div className="add-product-img-div">
          <div
            className="mySlides fade"
            ref={(el) => (slidesRef.current[0] = el)}
          >
            <div className="myslide-div">
              <img
                src={
                  formData.image.length === 0
                    ? blankimg
                    : URL.createObjectURL(formData.image[0])
                }
                alt="prod-img"
                className="add-prod-img"
              />
            </div>
          </div>

          {formData.image.length > 1 ? (
            <div
              className="mySlides fade"
              ref={(el) => (slidesRef.current[1] = el)}
            >
              <div className="myslide-div">
                <img
                  src={URL.createObjectURL(formData.image[1])}
                  alt="prod-img"
                  className="add-prod-img"
                />
              </div>
            </div>
          ) : null}

          {formData.image.length > 2 ? (
            <div
              className="mySlides fade"
              ref={(el) => (slidesRef.current[2] = el)}
            >
              <div className="myslide-div">
                <img
                  src={URL.createObjectURL(formData.image[2])}
                  alt="prod-img"
                  className="add-prod-img"
                />
              </div>
            </div>
          ) : null}

          {formData.image.length > 3 ? (
            <div
              className="mySlides fade"
              ref={(el) => (slidesRef.current[3] = el)}
            >
              <div className="myslide-div">
                <img
                  src={URL.createObjectURL(formData.image[3])}
                  alt="prod-img"
                  className="add-prod-img"
                />
              </div>
            </div>
          ) : null}

          {formData.image.length > 4 ? (
            <div
              className="mySlides fade"
              ref={(el) => (slidesRef.current[4] = el)}
            >
              <div className="myslide-div">
                <img
                  src={URL.createObjectURL(formData.image[4])}
                  alt="prod-img"
                  className="add-prod-img"
                />
              </div>
            </div>
          ) : null}

          {formData.image.length > 1 ? (
            <>
              <button className="prev" onClick={() => plusSlides(-1)}>
                &#10094;
              </button>
              <button className="next" onClick={() => plusSlides(1)}>
                &#10095;
              </button>
            </>
          ) : null}

          <br />

          <div style={{ textAlign: "center" }}>
            {formData.image.length > 1 ? (
              <span
                className="dot"
                onClick={() => currentSlide(1)}
                ref={(el) => (dotsRef.current[0] = el)}
              ></span>
            ) : null}
            {formData.image.length > 1 ? (
              <span
                className="dot"
                onClick={() => currentSlide(2)}
                ref={(el) => (dotsRef.current[1] = el)}
              ></span>
            ) : null}
            {formData.image.length > 2 ? (
              <span
                className="dot"
                onClick={() => currentSlide(3)}
                ref={(el) => (dotsRef.current[2] = el)}
              ></span>
            ) : null}
            {formData.image.length > 3 ? (
              <span
                className="dot"
                onClick={() => currentSlide(4)}
                ref={(el) => (dotsRef.current[3] = el)}
              ></span>
            ) : null}
            {formData.image.length > 4 ? (
              <span
                className="dot"
                onClick={() => currentSlide(5)}
                ref={(el) => (dotsRef.current[4] = el)}
              ></span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
