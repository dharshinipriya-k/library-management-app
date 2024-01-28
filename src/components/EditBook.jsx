import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiService from "../utils/ApiService";

function EditBook() {
  let params = useParams();
  let [initialValues, setValues] = useState({
    title: "",
    author: "",
    isbn: "",
    pub_date: "",
  });

  let navigate = useNavigate();

  const getBookData = async () => {
    let { id } = params;
    try {
      let res = await ApiService.get(`/books/${id}`);
      if (res.status === 200) {
        setValues({
          title: res.data.title,
          author: res.data.author,
          isbn: res.data.isbn,
          pub_date: res.data.pub_date,
        });
      }
    } catch (error) {
      console.log("Error fetching data!");
    }
  };

  let formik = useFormik({
    initialValues: initialValues,

    validationSchema: Yup.object({
      title: Yup.string().required("Title is required!"),
      author: Yup.string().required("DOB is required!"),
      isbn: Yup.string()
        .matches(/^\d{13}$/)
        .required("ISBN number required!"),
      pub_date: Yup.string().required("Published Date required!"),
    }),

    enableReinitialize: true,

    onSubmit: async (values) => {
      let { id } = params;
      values.id = id;
      try {
        let res = await ApiService.put(`/books/${id}`, values);
        if (res.status === 200) {
          navigate("/books");
        }
      } catch (error) {
        console.log("Error in uploading data");
      }
    },
  });

  useEffect(() => {
    getBookData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="topbar">
        <TopBar />
      </div>
      <div className="create-book-container">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label as="h6">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book title"
              id="title"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title ? (
              <div style={{ color: "red" }}>{formik.errors.title}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label as="h6">Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Author name"
              id="author"
              name="author"
              onChange={formik.handleChange}
              value={formik.values.author}
              onBlur={formik.handleBlur}
            />
            {formik.touched.author && formik.errors.author ? (
              <div style={{ color: "red" }}>{formik.errors.author}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label as="h6">ISBN Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="ISBN"
              id="isbn"
              name="isbn"
              onChange={formik.handleChange}
              value={formik.values.isbn}
              onBlur={formik.handleBlur}
            />
            {formik.touched.isbn && formik.errors.isbn ? (
              <div style={{ color: "red" }}>{formik.errors.isbn}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label as="h6">Published Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="dd-mm-yyyy"
              id="pub_date"
              name="pub_date"
              onChange={formik.handleChange}
              value={formik.values.pub_date}
              onBlur={formik.handleBlur}
            />
            {formik.touched.pub_date && formik.errors.pub_date ? (
              <div style={{ color: "red" }}>{formik.errors.pub_date}</div>
            ) : null}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditBook;
