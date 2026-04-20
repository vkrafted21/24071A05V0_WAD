function TaskList({ tasks, handleDeleteTasks, handleUpdateTasks }) {
    return (
        <div className=" mt-5">
            <p className="fs-1 text-center text-info mb-4 fw-bold">Task List</p>
            <table className="table table-hover table-bordered align-middle text-center shadow-sm">
                <thead className="table-info">
                    <tr>
                        <th>Task ID</th>
                        <th>Task</th>
                        <th>Deadline</th>
                        <th>Delete Task</th>
                        <th>Update Task</th>

                    </tr>
                </thead>
                <tbody>
                    {tasks.map((taskObj) => (
                        <tr key={taskObj.id}>
                            <td >{taskObj.id}</td>
                            <td>{taskObj.Task}</td>
                            <td>{taskObj.Deadline}</td>

                            <td>
                                <button className="btn btn-info" onClick={() => handleDeleteTasks(taskObj.id)}>X</button>
                            </td>
                            <td>
                                <button className="btn btn-info" onClick={() => handleUpdateTasks(taskObj)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;
