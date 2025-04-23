import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const[ students,setStudent] =useState([])
  const [formdata,setFormdata] =useState({name:'', rollno:''})
  const [edit,setEdit] =useState(null);

  const fetchstudents =async()=>{
    const response =await axios.get("http://localhost:5000/students");
    setStudent(response.data);
  }
  const handlerSubmit=(e)=>{
    setFormdata({...formdata,[e.target.name] :e.target.value});
  }

  const handleadd=async()=>{
    if(edit){
      await axios.put(`http://localhost:5000/students/${edit}`, formdata);
      setEdit(null);
    }else{
      await axios.post("http://localhost:5000/students", formdata);
    }
    setFormdata({name:"",rollno:""});
    fetchstudents();
  }

  const handleEdit= (student)=>{
    setFormdata({name: student.name, rollno: student.rollno});
    setEdit(student.id);
  };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    fetchstudents();
  }

  useEffect(() => {
    fetchstudents();
  },[]);

  return (
    <div style={{padding:"30px"}}>
      <h2> Student Crud task</h2>
      <input type="text" name='name' placeholder='Enter name' onChange={handlerSubmit} value={formdata.name} />
      <input type="text" name='rollno' placeholder='Enter roll number' onChange={handlerSubmit} value={formdata.rollno} />
      <button onClick={handleadd}>{edit ?"update Student" : 'Add Student'}</button>

      
      <hr />

      {students.map((student) => (
        <div key={student.id}>
          <b>{student.name}</b> (Roll No: {student.rollno})
          <button onClick={() => handleEdit(student)}>Edit</button>
          <button onClick={() => handleDelete(student.id)}>Delete</button>
        </div>
          ))}
    </div>
  )
}

export default App

