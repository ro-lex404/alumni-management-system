import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const JobOpenings = () => {
  const [jobs, setJobs] = useState([]);
  const [isAlumni, setIsAlumni] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
  });

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "alumni", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsAlumni(userData.role === 'alumni');
        }
      }
    });

    fetchJobs();

    return () => unsubscribe();
  }, []);

  const fetchJobs = async () => {
    const jobsCollection = collection(db, 'jobOpportunities');
    const jobSnapshot = await getDocs(jobsCollection);
    const jobList = jobSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setJobs(jobList);
  };

  const handleAddJob = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user || !isAlumni) {
      alert("Only alumni can post jobs!");
      return;
    }
  
    const { title, description, company, location } = newJob;
  
    if (!title || !description || !company || !location) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      const userRef = doc(db, "alumni", user.uid);
      const userDoc = await getDoc(userRef);
  
      let name = "";
      let email = user.email || "";
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        name = userData.name || user.displayName || "";
      }
  
      await addDoc(collection(db, 'jobOpportunities'), {
        title,
        description,
        company,
        location,
        postedBy: user.uid,
        postedByName: name,
        postedByEmail: email,
        timestamp: new Date()
      });
  
      console.log("Job added successfully!");
      setNewJob({ title: '', description: '', company: '', location: '' });
      fetchJobs();
    } catch (err) {
      console.error("Failed to add job:", err);
      alert("Something went wrong. Check the console.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Job Openings</h1>

        {isAlumni && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Add Job Opportunity</h2>
            <input
              type="text"
              placeholder="Job Title"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Company"
              value={newJob.company}
              onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Location"
              value={newJob.location}
              onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={handleAddJob}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Job
            </button>
          </div>
        )}

        <h2 className="text-xl font-semibold">Available Jobs</h2>
        <ul className="list-disc pl-5">
          {jobs.map(job => (
            <li key={job.id} className="mb-4 p-4 border rounded bg-white shadow">
              <h3 className="font-bold text-xl">{job.title}</h3>
              <p className="mt-1">{job.description}</p>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>

              {job.postedByName && (
                <p><strong>Posted by:</strong> {job.postedByName}</p>
              )}
              
              {job.timestamp && job.timestamp.seconds && (
                <p><strong>Posted on:</strong> {new Date(job.timestamp.seconds * 1000).toLocaleDateString()}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default JobOpenings;
