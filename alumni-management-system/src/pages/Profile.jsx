import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Profile() {
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    passingYear: "",
    job: "",
    specialization: ""
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert("Please sign in to access your profile.");
        navigate("/");
        return;
      }

      const userRef = doc(db, "alumni", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          name: data.name || "",
          email: data.email || "",
          passingYear: data.passingYear || "",
          job: data.job || "",
          specialization: data.specialization || ""
        });
      }

      setLoading(false);
    });

    return () => unsubscribe(); // Clean up
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "alumni", user.uid);

    // Use setDoc with merge: true to update only changed fields
    await setDoc(
      userRef,
      {
        name: formData.name,
        passingYear: formData.passingYear,
        job: formData.job,
        specialization: formData.specialization
      },
      { merge: true } // ✅ Keeps old data if not changed
    );

    alert("Profile updated!");
    navigate("/dashboard");
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <>
    <Navbar/>
    <div className="flex flex-col min-h-screen">
      <form
        onSubmit={handleSave}
        className="max-w-md mx-auto mt-8 space-y-4 p-4 bg-white shadow rounded"
      >
        <h2 className="text-xl font-bold text-center">Update Your Info</h2>
        {["name","passingYear", "job", "specialization"].map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            className="w-full px-3 py-2 border rounded"
          />
        ))}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Save
        </button>
      </form>
    </div>
    <Footer/>
    </>
  );
}
