// src/components/GoogleAuth.jsx
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

export default function GoogleAuth() {
  const [user, setUser] = useState(null);

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return user ? (
    <div className="text-center">
      <h2>Welcome, {user.displayName}</h2>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded mt-2">Logout</button>
    </div>
  ) : (
    <button onClick={login} className="bg-blue-600 text-white px-4 py-2 rounded">Sign in with Google</button>
  );
}
