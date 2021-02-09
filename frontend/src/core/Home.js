import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import {getServices} from "./apiCore";
import Card from "./Card";
import Search from "./Search"

const Home = () => {
  const [servicesBySell, setServicesBySell] = useState([]);
  const [servicesByArrival, setServicesByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadServicesBySell = () => {
    getServices("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setServicesBySell(data);
      }
    });
  };

  const loadServicesByArrival = () => {
    getServices("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setServicesByArrival([...data]);
      }
    });
  };

  useEffect(() => {
    loadServicesByArrival();
    loadServicesBySell();
  }, []);

  return (
    <Layout
      title="Welcome to GYMnoxious"
      display="center"
      description="If you want to be a hit in life, you gotta be fit and fine"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4 gym">New Gyms</h2>
            <div className="row">
                {servicesByArrival.map((service, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card service={service} />
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Best Gyms</h2>
            <div className="row">
                {servicesBySell.map((service, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card service={service} />
                    </div>
                ))}
            </div>
    </Layout>
  );
};

export default Home;
