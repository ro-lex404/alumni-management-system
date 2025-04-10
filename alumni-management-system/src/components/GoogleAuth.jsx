import { useEffect, useState } from "react";
import { auth, provider, db } from "../firebaseConfig";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function GoogleAuth() {
  const [user, setUser] = useState(null);

  // Persist login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;

      const userRef = doc(db, "alumni", googleUser.uid);
      const snapshot = await getDoc(userRef);

      if (!snapshot.exists()) {
        await setDoc(userRef, {
          name: googleUser.displayName,
          email: googleUser.email,
          photoURL: googleUser.photoURL,
          passingYear: "",
          job: "",
          specialization: ""
        });
      }

    } catch (err) {
      console.error("Google Sign-In Error:", err);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return user ? (
    <div className="text-right">
      <img src={user.photoURL} className="inline w-10 h-10 rounded-full mr-2" alt="user" />
      <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
    </div>
  ) : (
    <button onClick={login} className="bg-blue-600 text-white px-4 py-2 rounded">Sign in with Google</button>
  );
}
