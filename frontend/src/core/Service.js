import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

const Service = (props) => {
  const [service, setService] = useState({});
  const [relatedService, setRelatedService] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleService = (serviceId) => {
    read(serviceId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setService(data);
        // fetch related services
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedService(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const serviceId = props.match.params.serviceId;
    loadSingleService(serviceId);
  }, [props]);

  return (
    <Layout
      title={service && service.name}
      description={
        service && service.description && service.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {service && service.description && (
            <Card service={service} showViewServiceButton={false} />
          )}
        </div>

        <div className="col-4">
          <h4>Related services</h4>
          {relatedService.map((p, i) => (
            <div className="mb-3" key={i}>
              <Card service={p} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Service;
