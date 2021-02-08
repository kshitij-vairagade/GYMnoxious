import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createService, getCategories } from "./apiAdmin";

const AddService = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    fees: "",
    categories: "",
    category: [],
    quantity: "",
    city: "",
    sold: "",
    photo: "",
    loading: false,
    error: "",
    createdService: "",
    redirectToProfile: false,
    formData: "",
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    fees,
    categories,
    category,
    quantity,
    city,
    sold,
    photo,
    loading,
    error,
    createdService,
    redirectToProfile,
    formData,
  } = values;

  // load categories & set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createService(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          fees: "",
          quantity: "",
          loading: false,
          createdService: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Fees</label>
        <input
          onChange={handleChange("fees")}
          type="text"
          className="form-control"
          value={fees}
        />
      </div>

      {/* <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Please select</option>
          {category &&
            category.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div> */}

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">City</label>{" "}
        <input
          onChange={handleChange("city")}
          type="text"
          className="form-control"
          value={city}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Sold</label>
        <input
          onChange={handleChange("sold")}
          type="number"
          className="form-control"
          value={sold}
        />
      </div>

      <button className="btn btn-outline-primary">Create Service</button>
    </form>
  );

  // const goBack = () => (
  //   <div className="mt-5">
  //     <Link to="/admin/dashboard" className="text-warning">
  //       Back to Dashboard
  //     </Link>
  //   </div>
  // );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdService ? "" : "none" }}
    >
      <h2>{`${createdService}`} is created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Layout
      title="Add a new service"
      description={`G'day ${user.name}, ready to add a new service?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {/* {goBack()} */}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddService;