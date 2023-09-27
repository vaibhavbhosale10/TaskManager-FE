import React, { useEffect, useState } from "react";
import taskServices from "../services/task-services";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Swal from "sweetalert2";
import "./data.css";
import { successToast, errorToast } from "../toasts/toasts";

function DataFetch() {
  const [color, setColor] = useState("");

  const changeView = (e) => {
    setColor((e.target.style.color = "black"));
    setColor((e.target.style.backgroundColor = "white"));
    setColor((e.target.style.borderColor = "black"));
  };

  const revertChange = (e) => {
    setColor((e.target.style.color = "white"));
    setColor((e.target.style.backgroundColor = "black"));
    setColor((e.target.style.borderColor = "gold"));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(),
  });

  const [task, setTask] = useState({
    taskName: "",
    taskDescription: "",
    dueDate: new Date(),
    priority: "High",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    reset();
    e.preventDefault();

    taskServices
      .createTask(task)
      .then((response) => {
        console.log(response);
        const message = response.data.message || "task created ...";
        Swal.fire("Task Created!", "saved in database!", "success");
      })
      .catch((err) => {
        console.log(err);
        const message =
          err?.response?.data.message ||
          "Could not create task, please try again!";
        Swal.fire(
          "Could not create task",
          "Check your internet connection",
          "error"
        );
      });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [taskdata, setTaskData] = useState([]);

  const fetchTask = async () => {
    try {
      const response = await taskServices.fetchAllTask();
      if (typeof response.data === "object") {
        setTaskData(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("API response data is not an object:", response.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchTask();
  });

  const loadTask = async () => {
    const response = await taskServices.fetchAllTask();
    if (response.data) setTask(response?.data?.data);
  };

  const deleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        taskServices
          .deleteTask(id)
          .then((response) => {
            console.log("Response from Contact: ", response);
            Swal.fire("Deleted!", "The Contact has been deleted.", "success");
            loadTask();
          })
          .catch((err) => {
            console.error(err);

            Swal.fire(
              "Not Deleted!",
              "The Appointment has not been deleted.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div className="navbar">
        <div className="add-task-form">
          <input type="text" placeholder="Search tasks" />
          <Button onClick={handleShow}>Add task</Button>
          <Button onClick={fetchTask}>Refresh Task List</Button>
        </div>
      </div>

      <div className="task-list">
        {taskdata.map((task, index) => {
          return (
            <div className="task-list">
              <div key={index} className="task-card">
                <h3>{task.taskName}</h3>
                <p>{task.taskDescription}</p>
                <p>Priority: {task.priority}</p>
                <p>Due date:{new Date(task.dueDate).toLocaleString()}</p>
                <div className="button-container">
                  <button className="complete-button">Complete</button>
                  <button
                    className="delete-button"
                    onClick={() => deleteTask(task?._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontSize: "30px",
              color: "orange",
              fontFamily: "Delicious Handrawn,cursive",
            }}
          >
            Create Your Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="POST" onSubmit={onSubmit}>
            <Form.Group>
              <Form.Control
                style={{
                  border: "none",
                  backgroundColor: "#faf5ee",
                  fontSize: "16px",
                  marginBottom: 15,
                }}
                required
                size="lg"
                placeholder="Task Name"
                type="text"
                {...register("taskName")}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                style={{
                  border: "none",
                  backgroundColor: "#faf5ee",
                  fontSize: "16px",
                  marginBottom: 15,
                }}
                required
                size="lg"
                placeholder="Task Description"
                type="text"
                {...register("taskDescription")}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                style={{
                  border: "none",
                  backgroundColor: "#faf5ee",
                  fontSize: "16px",
                  marginBottom: 15,
                }}
                required
                size="lg"
                placeholder="Due Date"
                type="date"
                {...register("dueDate")}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Priority</Form.Label>
              <Form.Select
                name="priority"
                {...register("priority")}
                onChange={handleChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Form.Select>
            </Form.Group>{" "}
            <Modal.Footer>
              <Button
                onClick={onSubmit}
                onMouseOver={changeView}
                onMouseLeave={revertChange}
                onChange={handleChange}
                type="submit"
                style={{
                  marginTop: 5,
                  color: "white",
                  backgroundColor: "black",
                  border: "1px solid gold",
                  padding: 5,
                }}
              >
                Create Task
              </Button>
              <Button
                onClick={handleClose}
                onMouseOver={changeView}
                onMouseLeave={revertChange}
                style={{
                  marginTop: 5,
                  color: "white",
                  backgroundColor: "black",
                  border: "1px solid gold",
                  padding: 5,
                  marginLeft: 5,
                }}
                variant="secondary"
              >
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DataFetch;
