import React, { useState } from "react";
import axios from "axios";
import Select from 'react-select';
import Header from "./Header";
import "../css/AddBundle.css";

const AddBundle = () => {
  const [formData, setFormData] = useState({
    bundle_title: "",
    description: "",
    price: "",
    tagId: ["653621e0a4aacd9aab0dedec"],
    user_id: "65361f19c189df24b882d041",
    products: [],
  });

  let tagTiltles = [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bundle = {
      bundle_title: formData.bundle_title,
      description: formData.description,
      price: formData.price,
      tag_ids: formData.tagId,
      product_ids: [
        "65361fb3c189df24b882d04a",
        "653627d5c08fd901b3709e00",
        "65368dd12b5d670ad2e79765",
      ],
      user_id: formData.user_id,
      created_at: "2023-10-23T15:32:59.181Z",
      updated_at: "2023-10-23T15:32:59.181Z",
    };

    console.log("bundle is ", bundle);

    try {
      const response = await axios.post(
        "http://localhost:8000/bundle/add_bundle",
        bundle,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="add-bundle">
      <Header />
      <div className="add-bundle-container">
        <form className="add-bundle-form" onSubmit={handleSubmit}>
          <span className="add-bundle-heading">
            Unleash Your Imagination: Create the Perfect Product Bundle!
          </span>
          <input
            className="add-bundle-input"
            name="bundle_title"
            type="text"
            placeholder="Enter bundle title"
            value={formData.bundle_title}
            onChange={handleInputChange}
          />
          <input
            className="add-bundle-input"
            name="description"
            type="text"
            placeholder="Enter bundle description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <input
            className="add-bundle-input"
            name="price"
            type="text"
            placeholder="Enter bundle price"
            value={formData.price}
            onChange={handleInputChange}
          />
          <div style={{ width: "100%" }}>
            <input
              className="add-bundle-input"
              name="tag"
              type="text"
              placeholder="Enter bundle tag"
              value={formData.tag}
              onChange={handleInputChange}
            />
            <Select options={tagTiltles}/>
          </div>
          <button className="add-bundle-button" type="submit">
            Create Bundle
          </button>
        </form>
        <div className="add-bundle-img-div">
          <input
            style={{ width: "80%", marginTop: "20px" }}
            className="add-bundle-input"
            type="text"
            name="products"
            placeholder="Select products for bundle"
            value={formData.products}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AddBundle;
