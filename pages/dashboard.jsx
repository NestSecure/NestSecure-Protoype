import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';

export default function Dashboard() {
  const [score, setScore] = useState(null);

  useEffect(() => {
    const storedScore = localStorage.getItem('riskScore');
    if (storedScore) {
      setScore(storedScore);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">NestSecure Dashboard</h1>

        {score ? (
          <div className="mt-4">
            <p className="text-lg">Your latest Cyber Risk Score:</p>
            <p className="text-4xl font-bold text-blue-800">{score}%</p>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">
            No audit found. Please complete your <a href="/audit" className="text-blue-600 underline">Cyber Risk Audit</a> to view your score.
          </p>
        )}
      </div>
    </>
  );
}

