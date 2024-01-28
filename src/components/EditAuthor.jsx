import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiService from "../utils/ApiService";

function EditAuthor() {
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
      let res = await ApiService.get(`/author/${id}`);
      if (res.status === 200) {
        setValues({
          name: res.data.name,
          dob: res.data.dob,
          bio: res.data.bio,
        });
      }
    } catch (error) {
      console.log("Error fetching data!");
    }
  };

  let formik = useFormik({
    initialValues: initialValues,

    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Name cannot exceed 20 characters")
        .min(3, "Name should be atleast 3 chars")
        .required("Name is required!"),
      dob: Yup.string().required("DOB is required"),
      bio: Yup.string()
        .max(150, "bio should not exceed 50 characters ")
        .min(10, "Min 10 characters required")
        .required("Bio field required!"),
    }),

    enableReinitialize: true,

    onSubmit: async (values) => {
      let { id } = params;
      values.id = id;
      try {
        let res = await ApiService.put(`/author/${id}`, values);
        if (res.status === 200) {
          navigate("/author");
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
            <Form.Label as="h6">Author Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div style={{ color: "red" }}>{formik.errors.name}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label as="h6">Date Of Birth</Form.Label>
            <Form.Control
              type="text"
              placeholder="dd-mm-yyyy"
              id="dob"
              name="dob"
              onChange={formik.handleChange}
              value={formik.values.dob}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dob && formik.errors.dob ? (
              <div style={{ color: "red" }}>{formik.errors.dob}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label as="h6">Short Bio</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Bio about author"
              id="bio"
              name="bio"
              onChange={formik.handleChange}
              value={formik.values.bio}
              onBlur={formik.handleBlur}
            />
            {formik.touched.bio && formik.errors.bio ? (
              <div style={{ color: "red" }}>{formik.errors.bio}</div>
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

export default EditAuthor;
