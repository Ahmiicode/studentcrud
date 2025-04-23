import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [students, setStudent] = useState([]);
  const [formdata, setFormdata] = useState({ name: '', rollno: '' });
  const [edit, setEdit] = useState(null);

  const fetchstudents = async () => {
    const response = await axios.get("http://localhost:5000/students");
    setStudent(response.data);
  };

  const handlerSubmit = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleadd = async () => {
    if (edit) {
      await axios.put(`http://localhost:5000/students/${edit}`, formdata);
      setEdit(null);
    } else {
      await axios.post("http://localhost:5000/students", formdata);
    }
    setFormdata({ name: "", rollno: "" });
    fetchstudents();
  };

  const handleEdit = (student) => {
    setFormdata({ name: student.name, rollno: student.rollno });
    setEdit(student.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    fetchstudents();
  };

  useEffect(() => {
    fetchstudents();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-center mb-6">Student CRUD Task</h2>
      
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handlerSubmit}
          value={formdata.name}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="rollno"
          placeholder="Enter roll number"
          onChange={handlerSubmit}
          value={formdata.rollno}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleadd}
          className="w-full bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition"
        >
          {edit ? "Update Student" : "Add Student"}
        </button>
      </div>

      <hr className="my-6" />

      <div className="max-w-4xl mx-auto space-y-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div>
              <b className="text-lg">{student.name}</b>
              <p className="text-sm text-gray-600">(Roll No: {student.rollno})</p>
            </div>
            <div className="space-x-3">
              <button
                onClick={() => handleEdit(student)}
                className="text-black-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(student.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
