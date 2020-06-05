import React, { useState, useEffect } from "react";
import { Container, Table, Button, Row } from "react-bootstrap";
import axios from "axios";
import * as moment from "moment"

const url = "https://node-todo-dev.herokuapp.com/api/todos";

export default (props) => {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    findTodos();
  }, []);

  async function findTodos() {
    try {
      const res = await axios.get(url);
      setTodos(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  function mapTodos(todos) {
    return todos.map(
      todo => (
        <tr key={todo._id}>
          <td>{todo.description}</td>
          <td>{moment(todo.createdAt).format("DD/MM/YYYY")}</td>
          <td>{todo.done ? "Sim" : "Não"}</td>
        </tr>
      )
    )
  }

  return (
    <>
      <Container>
        <Row>
          <h3>TODOs</h3>
          <Button variant="primary">Create</Button>
        </Row>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Data de Criação</th>
              <th>Concluído</th>
            </tr>
          </thead>
          <tbody>
            {mapTodos(todos)}
          </tbody>
        </Table>

      </Container>
    </>
  );
}