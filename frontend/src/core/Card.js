import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { addItem, updateItem, removeItem } from "./cardHelper";
import moment from "moment";
import ShowImage from "./ShowImage";

const Card = ({
  service,
  showViewServiceButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveServiceButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(service.count);

  const showViewButton = (showViewServiceButton) => {
    return (
      showViewServiceButton && (
        <Link to={`/service/${service._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 mr-2 card-btn-1">
            View Services
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(service, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2 card-btn-1"
        >
          Add to Checkout cart
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primarly badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primarly badge-pill">Out of Stock</span>
    );
  };

  const handleChange = (serviceId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(serviceId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group md-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(service._id)} />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = (showRemoveServiceButton) => {
    return (
      showRemoveButton && (
        <button
          onClick={() => {
            removeItem(service._id);
            setRun(!run);
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Service
        </button>
      )
    );
  };

  return (
    <div className="card">
      <div className="card-header card-header-1">{service.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={service} url="service" />
        <p className="card-p  mt-2">{service.description} </p>
        <p className="card-p black-10">₹ {service.fees}</p>
        <p className="card-p black-10">{service.city}</p>
        <p className="black-9">
          Category: {service.category && service.category.name}
        </p>
        <p className="black-8">
          Added {moment(service.createdAt).fromNow()}
        </p>
        {showStock(service.quantity)}
        <br />
        {showViewButton(showViewServiceButton)}
        {showAddToCartBtn(showAddToCartButton)}
        {showRemoveButton(showRemoveServiceButton)}
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
