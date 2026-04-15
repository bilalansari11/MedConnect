import React, { useState } from 'react';

function checkSymptoms(input: string): string {
  const symptom = input.toLowerCase().trim();
  if (symptom.includes('fever')) return 'You may have a fever. Stay hydrated, rest well, and consider taking a paracetamol. Consult a doctor if it persists beyond 3 days.';
  if (symptom.includes('headache')) return 'Headaches can be caused by dehydration, stress, or migraine. Drink water, rest in a quiet dark room. See a doctor if severe or persistent.';
  if (symptom.includes('cough')) return 'A cough may indicate a cold, allergy, or respiratory infection. Stay hydrated and avoid irritants. Consult a doctor if you have difficulty breathing.';
  if (symptom.includes('cold') || symptom.includes('runny nose')) return 'Common cold symptoms. Rest, drink warm fluids, and use a saline nasal spray. Should resolve in 7-10 days.';
  if (symptom.includes('stomach') || symptom.includes('nausea') || symptom.includes('vomiting')) return 'Stomach issues may relate to food poisoning or gastritis. Avoid solid food, stay hydrated. See a doctor if vomiting persists.';
  if (symptom.includes('fatigue') || symptom.includes('tired')) return 'Fatigue can be from lack of sleep, poor diet, or underlying illness. Ensure 7-8 hours of sleep and a balanced diet.';
  if (symptom.includes('chest pain')) return '⚠️ Chest pain can be serious. Please seek immediate medical attention or call emergency services.';
  if (symptom.includes('back pain')) return 'Back pain often results from muscle strain. Rest, gentle stretching, and over-the-counter pain relief can help. See a doctor if severe.';
  return `For "${input}": Please consult a qualified doctor for personalized medical advice. Do not self-diagnose.`;
}

const SymptomChecker = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleCheck = async () => {
    const advice = checkSymptoms(input);
    setResult(advice);

    try {
      await fetch('/api/symptoms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptom: input,
          advice: advice,
          userId: "YAHAN_USER_ID_AYEGA" // Agar authentication hai toh user ki ID pass karein
        }),
      });
      console.log("Data saved to DB!");
    } catch (error) {
      console.error("Failed to save:", error);
    }
    // ----------------------------------------
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 transition-all duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">Smart Symptom Checker</h3>
          <p className="text-slate-500 text-sm">Quickly check health advice based on your symptoms</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Try typing 'fever' or 'headache'..."
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
        <button 
          onClick={handleCheck}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          Check Now
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start space-x-3">
            <div className="mt-1 text-blue-600 font-bold">💡</div>
            <p className="text-blue-800 leading-relaxed">{result}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;