import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import ApiService from "../utils/ApiService";

function AuthorRecords() {
  let [author, setAuthor] = useState([]);
  let navigate = useNavigate();

  const getData = async () => {
    try {
      let res = await ApiService.get("/author");
      if (res.status === 200) {
        setAuthor(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      let res = await ApiService.delete(`/author/${id}`);
      if (res.status === 200) {
        getData();
      }
    } catch (error) {}
  };

  return (
    <div className="container-fluid">
      <div className="topbar">
        <TopBar />
      </div>

      <div className="book-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>DOB</th>
              <th >BIO </th>
              <th>ACTIONS </th>
            </tr>
          </thead>
          <tbody>
            {author.map((e) => {
              return (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td >{e.dob}</td>
                  <td className="overflow-row">{e.bio}</td>

                  <td>
                    <Button
                      variant="outline-primary"
                      onClick={() => navigate(`/edit-author/${e.id}`)}
                    >
                      Edit Info
                    </Button>
                    &nbsp; &nbsp; &nbsp;
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete Record
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AuthorRecords;
