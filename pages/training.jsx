import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';

export default function Training() {
  const trainingItems = [
    { id: 'phishing', text: 'How to spot a phishing email' },
    { id: 'passwords', text: 'Using secure passwords' },
    { id: 'wifi', text: 'Securing your Wi-Fi network' },
  ];

  const [completed, setCompleted] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('trainingProgress');
    if (saved) {
      setCompleted(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trainingProgress', JSON.stringify(completed));
  }, [completed]);

  const toggleItem = (id) => {
    setCompleted(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(completed).filter(Boolean).length;
  const total = trainingItems.length;
  const percent = Math.round((completedCount / total) * 100);

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Employee Training</h1>
        <p className="mb-6">Click to mark modules complete as your team finishes them:</p>

        <ul className="space-y-4">
          {trainingItems.map(item => (
            <li key={item.id} className="flex items-center">
              <input
                type="checkbox"
                className="mr-3 h-5 w-5"
                checked={!!completed[item.id]}
                onChange={() => toggleItem(item.id)}
              />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 text-center">
          <p className="text-lg font-semibold">Training Completion: {percent}%</p>
          <div className="w-full max-w-md mx-auto bg-gray-300 rounded-full h-4 mt-2">
            <div
              className="bg-green-600 h-4 rounded-full transition-all"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
