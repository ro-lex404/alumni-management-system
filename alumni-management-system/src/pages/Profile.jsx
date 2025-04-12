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
    role: "",
    currentPosition: "",
    specialization: ""
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert("Please sign in to access your profile.");
        navigate("/");//Not signed in case
        return;
      }

      const userRef = doc(db, "alumni", user.uid);//To identify each user using uid provided by Firestore
      const docSnap = await getDoc(userRef);

      //Autofill form after entering details once
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          name: data.name || "",
          email: data.email || "",
          passingYear: data.passingYear || "",
          role: data.role || "",
          currentPosition: data.currentPosition || "",
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
  
    // Check if role is selected
    if (!formData.role) {
      alert("Please select your role (Student or Alumni) before saving.");
      return;
    }
  
    const userRef = doc(db, "alumni", user.uid);
  
    await setDoc(
      userRef,
      {
        name: formData.name,
        passingYear: formData.passingYear,
        role: formData.role,
        currentPosition: formData.currentPosition,
        specialization: formData.specialization
      },
      { merge: true }
    );
  
    alert("Profile updated!");
    navigate("/dashboard");
  };
  

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  return (
    <>
    <Navbar/>
    {/*Form to check whether student or alumni*/}
        <div className="flex flex-col min-h-screen">
          {formData.role === "" && (//If role not entered already
          <div className="mb-4">
            <label className="block mb-2 font-medium">Are you a student or an alumni?</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>
        )}
      {/*Form to update details if necessary */}
      <form
        onSubmit={handleSave}
        className="max-w-md mx-auto mt-8 space-y-4 p-4 bg-white shadow rounded"
      >
        <h2 className="text-xl font-bold text-center">Update Your Info</h2>
        {["name","passingYear", "currentPosition", "specialization"].map((field) => (
          <input
          key={field}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          placeholder={field[0].toUpperCase() + field.slice(1)}
          className="w-full px-3 py-2 border rounded"
          disabled={formData.role === "student" && field !== "name"} // students can't edit other fields
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
