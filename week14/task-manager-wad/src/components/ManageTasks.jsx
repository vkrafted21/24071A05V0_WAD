import AddTask from "./AddTask"
import TaskCount from "./TaskCount"
import TaskList from "./TaskList"
import { useState, useEffect } from "react"
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

function ManageTasks() {
    let { register, handleSubmit, setValue } = useForm();
    // state
    const [tasks, setTask] = useState([]);
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);

    // functions to modify state
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCreateTasks = async (newTask) => {
        try {
            let res = await fetch("http://localhost:3000/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });

            if (res.ok) {
                setError("");
                let createdTask = await res.json();
                setTask([...tasks, createdTask]);
            } else {
                setError(`Error: ${res.status} ${res.statusText}`);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // delete (to implement later)
    const handleDeleteTasks = async (id) => {
        try {
            let res = await fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" });
            if (res.ok) {
                // Refresh tasks after deletion
                handleReadTasks();
            } else {
                setError(`Error: ${res.status} ${res.statusText}`);
            }
        } catch (err) {
            setError(err.message);
        }
    };


    // update (to implement later)
    const handleUpdateTasks = (taskObjToEdit) => {
        handleShow()
        setValue("id", taskObjToEdit.id)//name used by register
        setValue("Task", taskObjToEdit.Task)
        setValue("Deadline", taskObjToEdit.Deadline)

    };

    // read
    const handleReadTasks = async () => {
        try {
            let res = await fetch("http://localhost:3000/tasks");
            if (res.ok) {
                let data = await res.json();
                setTask(data);
            } else {
                setError(`Error: ${res.status} ${res.statusText}`);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // load tasks on mount
    useEffect(() => {
        handleReadTasks();
    }, []);

    const saveModifiedTask = async (modifiedTaskObj) => {
        handleClose()
        try {
            let res = await fetch(`http://localhost:3000/tasks/${modifiedTaskObj.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(modifiedTaskObj),
            });

            if (res.ok) {
                handleReadTasks();
            } else {
                setError(`Error: ${res.status} ${res.statusText}`);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="container">

            <div className="row align-items-center mb-4">
                <div className="col-md-7">
                    <AddTask handleCreateTasks={handleCreateTasks} />
                </div>
                <div className="col-md-5 ">
                    <TaskCount tasks={tasks} />
                </div>
            </div>

            <TaskList
                tasks={tasks}
                handleDeleteTasks={handleDeleteTasks}
                handleUpdateTasks={handleUpdateTasks}
            />

            {/*modal to update*/}

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header className="bg-info" closeButton>
                    <Modal.Title className="w-100 text-white text-center fs-4 fw-bold">
                        Update Task
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={handleSubmit(saveModifiedTask)}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Task ID</label>
                            <input
                                disabled
                                type="text"
                                {...register("id")}
                                className="form-control mb-3"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Task</label>
                            <input
                                type="text"
                                {...register("Task", { required: true })}
                                placeholder="Enter your task"
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Deadline</label>
                            <input
                                type="date"
                                {...register("Deadline", { required: true })}
                                className="form-control"
                            />
                        </div>

                        <button
                            className="btn btn-info w-100 fw-semibold"
                            type="submit"
                        >
                            Save
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
            {error.length !== 0 && <p className="text-danger text-center">{error}</p>}
        </div>
    );
}

export default ManageTasks;
