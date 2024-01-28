import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import Table from "react-bootstrap/Table";
import ApiService from "../utils/ApiService";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function BookRecords() {
  let [book, setBook] = useState([]);

  let navigate = useNavigate();

  const getData = async () => {
    try {
      let res = await ApiService.get("/books");
      if (res.status === 200) {
        setBook(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      let res = await ApiService.delete(`/books/${id}`);
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
              <th>TITLE</th>
              <th>AUTHOR</th>
              <th>ISBN NUM</th>
              <th>PUBLISHED DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {book.map((e) => {
              return (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.title}</td>
                  <td>{e.author}</td>
                  <td>{e.isbn}</td>
                  <td>{e.pub_date}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      onClick={() => navigate(`/edit-book/${e.id}`)}
                    >
                      Edit Record
                    </Button>
                    {/* &nbsp;  */}
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

export default BookRecords;
