function TaskCount({ tasks }) {
    return (
        <div className="card shadow-sm text-center">
            <div className="card-body">
                <h5 className="card-title text-info fw-bold">Total Tasks</h5>
                <p className="display-6 fw-semibold">{tasks.length}</p>
            </div>
        </div>

    )
}

export default TaskCount;