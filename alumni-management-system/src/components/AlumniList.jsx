import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function AlumniList() {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    const fetchAlumni = async () => {
      const querySnapshot = await getDocs(collection(db, "alumni"));
      setAlumni(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchAlumni();
  }, []);

  return (
  <div className="max-w-2xl mx-auto mt-8 space-y-4">
    {alumni
      .filter(alum => alum.role === "alumni")
      .map(alum => (
        <div key={alum.id} className="border p-4 rounded shadow">
          <h3 className="text-lg font-bold">{alum.name}</h3>
          <p>Email: {alum.email}</p>
          <p>Passing Year: {alum.passingYear || "—"}</p>
          <p>Job: {alum.currentPosition || "Not provided"}</p>
          <p>Specialization: {alum.specialization || "Not provided"}</p>
        </div>
      ))}
  </div>
);
}
