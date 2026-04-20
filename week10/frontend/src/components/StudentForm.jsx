import { useState, useEffect } from "react";

export default function StudentForm({ onSubmit, initial, onCancel }) {
  const [form, setForm] = useState({ name: "", age: "", course: "" });

  useEffect(() => {
    if (initial) setForm({ name: initial.name, age: initial.age, course: initial.course });
    else setForm({ name: "", age: "", course: "" });
  }, [initial]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="row g-2 align-items-end">
      <div className="col-md-3">
        <label className="form-label mb-1">Name</label>
        <input
          name="name"
          className="form-control form-control-sm"
          value={form.name}
          onChange={change}
          placeholder="Name"
        />
      </div>
      <div className="col-md-2">
        <label className="form-label mb-1">Age</label>
        <input
          name="age"
          type="number"
          className="form-control form-control-sm"
          value={form.age}
          onChange={change}
          placeholder="Age"
        />
      </div>
      <div className="col-md-3">
        <label className="form-label mb-1">Course</label>
        <input
          name="course"
          className="form-control form-control-sm"
          value={form.course}
          onChange={change}
          placeholder="Course"
        />
      </div>
      <div className="col-md-4 d-flex gap-2">
        <button className="btn btn-success btn-sm" onClick={() => onSubmit(form)}>
          {initial ? "Update" : "Add Student"}
        </button>
        {initial && (
          <button className="btn btn-secondary btn-sm" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}