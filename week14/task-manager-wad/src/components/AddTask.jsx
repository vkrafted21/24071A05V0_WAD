import { useForm } from "react-hook-form"

function AddTask({ handleCreateTasks }) {
    const { register, handleSubmit } = useForm()
    return (
        <div className=" mt-5">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-info text-white text-center fs-4 fw-bold">
                            Add New Task
                        </div>
                        <div className="card-body">
                            <form className="p-3" onSubmit={handleSubmit(handleCreateTasks)}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Task
                                    </label>
                                    <input
                                        type="text"
                                        id="taskInput"
                                        {...register("Task")}
                                        placeholder="Enter your task"
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Deadline
                                    </label>
                                    <input
                                        type="date"
                                        id="deadlineInput"
                                        {...register("Deadline")}
                                        className="form-control"
                                    />
                                </div>

                                <button type="submit" className="btn btn-info w-100 fw-semibold">
                                    Add Task
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddTask;