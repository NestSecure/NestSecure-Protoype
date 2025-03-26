import { useState } from 'react';
import Navbar from '../Components/Navbar';

export default function Audit() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    { id: 'password', text: 'Do you use a password manager?' },
    { id: 'antivirus', text: 'Is your antivirus up to date?' },
    { id: 'training', text: 'Do staff complete security training?' },
  ];

  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const calculateScore = () => {
    const score = Object.values(answers).filter(Boolean).length;
    return Math.round((score / questions.length) * 100);
  };

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Cyber Risk Audit</h1>

        {!submitted ? (
          <form
            onSubmit={e => {
              e.preventDefault();
              setSubmitted(true);
              localStorage.setItem('riskScore', calculateScore());

            }}
            className="space-y-6"
          >
            {questions.map(q => (
              <div key={q.id}>
                <p className="font-medium">{q.text}</p>
                <label className="mr-4">
                  <input
                    type="radio"
                    name={q.id}
                    value="yes"
                    onChange={() => handleChange(q.id, true)}
                    required
                  />{' '}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={q.id}
                    value="no"
                    onChange={() => handleChange(q.id, false)}
                  />{' '}
                  No
                </label>
              </div>
            ))}

            <button
              type="submit"
              className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit Audit
            </button>
          </form>
        ) : (
          <div className="text-center mt-6">
            <h2 className="text-xl font-semibold mb-2">Your Cyber Risk Score:</h2>
            <div className="text-center mt-6">
              <h2 className="text-xl font-semibold mb-2">Your Cyber Risk Score:</h2>
              <p className="text-3xl font-bold">{calculateScore()}%</p>

              {/* Visual bar */}
              <div className="mt-4 w-full max-w-md mx-auto bg-gray-300 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-4 transition-all ${
                    calculateScore() >= 80
                      ? 'bg-green-500'
                      : calculateScore() >= 50
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${calculateScore()}%` }}
                />
              </div>

              {/* Score message */}
              <p className="mt-4 text-sm text-gray-700">
                {
                  calculateScore() >= 80
                    ? '✅ Excellent — You’re in a strong position.'
                    : calculateScore() >= 50
                    ? '⚠️ Moderate Risk — Some areas need attention.'
                    : '🚨 High Risk — Please review your cybersecurity measures.'
                }
              </p>
            </div>
            
            <p className="mt-4 text-sm text-gray-600">
              Based on your answers to 3 security questions.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
