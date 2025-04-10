import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function AlumniForm() {
  const [formData, setFormData] = useState({
    name: "",
    passingYear: "",
    job: "",
    specialization: "",
    email: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "alumni"), formData);
      console.log("Document written with ID: ", docRef.id);
      alert("Alumni added!");

      setFormData({
        name: "",
        passingYear: "",
        job: "",
        specialization: "",
        email: ""
      });

    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 shadow rounded bg-white space-y-4">
      {["name", "email", "passingYear", "job", "specialization"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field[0].toUpperCase() + field.slice(1)}
          onChange={handleChange}
          value={formData[field]}
          className="w-full px-3 py-2 border rounded"
        />
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}
