import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import ApiService from "../utils/ApiService";

function Dashboard() {
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

  return (
    <div className="container-fluid">
      <div className="topbar">
        <TopBar />
      </div>

      <div className="dashboard-container">
        {book.map((e) => {
          return (
            <Card className="card-comp" key={e.id}>
              <Card.Header as="h3" style={{textAlign:"center"}}>{e.title}</Card.Header>
              <Card.Body>
                <Card.Title>Author: {e.author}</Card.Title>
                <Card.Text>ISBN Num: {e.isbn}</Card.Text>
                <Card.Text>Published Date: {e.pub_date}</Card.Text>
                <Button
                  variant="outline-warning"
                  onClick={() => navigate(`/authorinfo/${e.id}`)}
                >
                  About Author
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
