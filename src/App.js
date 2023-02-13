import React, { useRef, useState } from "react";
import "./App.css";

import apiClient from "./http-common";

function App() {
  const get_id = useRef(null);

  const user_name = useRef(null);
  const user_email = useRef(null);
  const user_address = useRef(null);
  const user_country = useRef(null);
  const user_password = useRef(null);
  const user_phone = useRef(null);
  const user_area = useRef(null);

  const [getResult, setGetResult] = useState(null);
  const [postResult, setPostResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  async function getAllData() {
    try {
      const res = await apiClient.get("/areas");

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setGetResult(fortmatResponse(result));
    } catch (err) {
      setGetResult(fortmatResponse(err.response?.data || err));
    }
  }

  async function getDataById() {
    const id = get_id.current.value;

    if (id) {
      try {
        const res = await apiClient.get(`/areas/${id}`);

        const result = {
          data: res.data,
          status: res.status,
          statusText: res.statusText,
          headers: res.headers,
        };

        setGetResult(fortmatResponse(result));
      } catch (err) {
        setGetResult(fortmatResponse(err.response?.data || err));
      }
    }
  }

  async function postData() {
    const postData = {
      email: user_email.current.value,
      name: user_name.current.value,
      phone: user_phone.current.value,
      address: user_address.current.value,
      password: user_password.current.value,
      country_code: user_country.current.value,
      area_id: user_area.current.value,
    };

    try {
      const res = await apiClient.post("/client/register", postData);

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setPostResult(fortmatResponse(result));
    } catch (err) {
      setPostResult(fortmatResponse(err.response?.data || err));
    }
  }

  const clearGetOutput = () => {
    setGetResult(null);
  };

  const clearPostOutput = () => {
    setPostResult(null);
  };

  return (
    <div id="app" className="container my-3">
      <h3>Testing WeCode API</h3>

      <div className="card mt-3">
        <div className="card-header">Get Areas</div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-primary" onClick={getAllData}>Get All</button>

            <input type="text" ref={get_id} className="form-control ml-2" placeholder="Id" />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={getDataById}>Get by Id</button>
            </div>

            <button className="btn btn-sm btn-warning ml-2" onClick={clearGetOutput}>Clear</button>
          </div>   
          
          { getResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{getResult}</pre></div> }
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">Register</div>
        <div className="card-body">
          <div className="form-group">
            <input type="text" className="form-control" ref={user_name} placeholder="Name" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={user_email} placeholder="Email" />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" ref={user_password} placeholder="Password" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={user_phone} placeholder="Phone" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={user_address} placeholder="Address" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={user_country} placeholder="Country Code" />
          </div>
          <div className="form-group">
            <input type="number" className="form-control" ref={user_area} placeholder="Area ID" />
          </div>
          <button className="btn btn-sm btn-primary" onClick={postData}>Register</button>
          <button className="btn btn-sm btn-warning ml-2" onClick={clearPostOutput}>Clear</button>

          { postResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{postResult}</pre></div> }
        </div>
      </div>
    </div>
  );
}

export default App;
