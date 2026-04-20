import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchStudents = async () => {
    const res = await api.get("/students");
    setStudents(res.data);
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleCreate = async (data) => {
    await api.post("/students", data);
    fetchStudents();
  };

  const handleUpdate = async (id, data) => {
    await api.put(`/students/${id}`, data);
    setEditing(null);
    fetchStudents();
  };

  const handleDelete = async (id) => {
    await api.delete(`/students/${id}`);
    fetchStudents();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Students</h4>
        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
      </div>

      <div className="card p-3 mb-4 shadow-sm">
        <h6 className="mb-3">{editing ? "Edit Student" : "Add New Student"}</h6>
        <StudentForm
          onSubmit={editing ? (d) => handleUpdate(editing.id, d) : handleCreate}
          initial={editing}
          onCancel={() => setEditing(null)}
        />
      </div>

      <StudentTable students={students} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
}