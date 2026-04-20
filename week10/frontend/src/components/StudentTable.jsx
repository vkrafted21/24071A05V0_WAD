export default function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0)
    return <p className="text-muted">No students found.</p>;

  return (
    <div className="table-responsive shadow-sm">
      <table className="table table-bordered table-hover table-striped align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td><span className="badge bg-primary">{s.course}</span></td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(s)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(s.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}