let students = [
  { id: 1, name: "Vaishnavi", age: 20, course: "CSE" },
  { id: 2, name: "Sruthi", age: 15, course: "BIOTECH" },
];

export const getAllStudents = (req, res) => {
  res.json(students);
};

export const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "student not found" });
  }

  res.json(student);
};

export const createStudent = (req, res) => {
  const { name, age, course } = req.body;

  const newStudent = {
    id: students.length + 1,
    name,
    age,
    course,
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
};

export const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age, course } = req.body;

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "student not found" });
  }

  student.name = name || student.name;
  student.age = age || student.age;
  student.course = course || student.course;

  res.json(student);
};

export const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "student not found" });
  }

  const deleted = students.splice(index, 1);
  res.json(deleted[0]);
};