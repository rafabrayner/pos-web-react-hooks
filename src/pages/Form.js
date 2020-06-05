import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useFormik } from "formik"
import * as Yup from "yup";
import axios from "axios";
import { toast } from 'react-toastify';

const url = "https://node-todo-dev.herokuapp.com/api/todos";

export default () => {
  const [description, setDescription] = useState("");

  const todoSchema = Yup.object({
    description: Yup.string().required("A descrição precisa ser informada!"),
  });

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: todoSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(url, values);
        if(res.status === 201) {
          toast("TODO criado com sucesso!")
        }
      } catch (error) {
        console.log("Erro: ", error);
      }
      
    }
  })
  return <div>
   <Container>
        <Form>
          <h3>Add TODO</h3>
          <Row>
            <Col md="4">
              <Form.Group controlId="description">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  name="description"
                />
                <span>{formik.errors.description}</span>
              </Form.Group>
            </Col>
          </Row>
          <Button onClick={formik.handleSubmit}>Create</Button>
        </Form>
      </Container>
  </div>
}