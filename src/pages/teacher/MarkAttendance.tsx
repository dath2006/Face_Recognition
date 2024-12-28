import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { Camera } from 'lucide-react';

const MarkAttendance = () => {
  const webcamRef = useRef<Webcam>(null);
  const [capturing, setCapturing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const capture = async () => {
    setCapturing(true);
    setResult(null);
    
    try {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (!imageSrc) return;

      const response = await axios.post('/api/teacher/mark-attendance', {
        image: imageSrc,
      });

      setResult(response.data.message);
    } catch (error) {
      setResult('Failed to process attendance');
    } finally {
      setCapturing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Mark Attendance</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-lg"
            />
          </div>
          <button
            onClick={capture}
            disabled={capturing}
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Camera className="w-5 h-5 mr-2" />
            {capturing ? 'Processing...' : 'Capture and Mark Attendance'}
          </button>
          {result && (
            <div className={`mt-4 p-4 rounded-md ${
              result.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {result}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MarkAttendance;