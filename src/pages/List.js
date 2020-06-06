import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Table, Button, Row } from "react-bootstrap";
import axios from "axios";
import * as moment from "moment"
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';

const url = "https://node-todo-dev.herokuapp.com/api/todos";


export default (props) => {

  const history = useHistory();
  const MySwal = withReactContent(Swal);
  const [todos, setTodos] = useState([])

  useEffect(() => {
    findTodos();
  }, []);

  function goToCreate() {
    history.push("/create");
  }

  async function findTodos() {
    try {
      const res = await axios.get(url);
      setTodos(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRemove(id) {
    try {
      const shouldDelete = await MySwal.fire({
        title: "Você tem certeza?",
        text: "Uma vez deletado, você não poderá recuperar este TODO.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d9534f",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
      });
      if(shouldDelete.value) {
        /*const res = await axios.delete(`${url}/${id}`);
        console.log(res)
        if(res.status === 201) {
          toast("TODO removido com sucesso!")
        }*/
      }
      
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
          <td><Button variant="danger" onClick={handleRemove}>Delete</Button></td>
        </tr>
      )
    )
  }

  return (
    <>
      <Container>
        <Row>
          <h3>TODOs</h3>
          <Button onClick={goToCreate} variant="primary">Create</Button>
        </Row>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Data de Criação</th>
              <th>Concluído</th>
              <th>Ação</th>
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