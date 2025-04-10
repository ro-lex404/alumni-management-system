import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Profile() {
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate(); // ✅ Hook to navigate programmatically

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "alumni", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const userRef = doc(db, "alumni", auth.currentUser.uid);
    await updateDoc(userRef, formData);
    alert("Profile updated!");

    navigate("/dashboard");
  };

  if (!formData) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <>
    <div className="flex flex-col min-h-screen">
    <form onSubmit={handleSave} className="max-w-md mx-auto mt-8 space-y-4 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold text-center">Your Profile</h2>
      {["passingYear", "job", "specialization"].map((field) => (
        <input
          key={field}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          placeholder={field[0].toUpperCase() + field.slice(1)}
          className="w-full px-3 py-2 border rounded"
        />
      ))}
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">Save</button>
    </form>
    </div>
    </>
  );
}
