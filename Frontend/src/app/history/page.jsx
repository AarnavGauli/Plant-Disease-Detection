'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { ScanSearch, X, LogOut } from 'lucide-react'
import Cookies from 'js-cookie'

export default function HistoryPage() {
  const [history, setHistory] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = Cookies.get("token");
        const res = await api.get('/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(res.data.history.reverse())
      } catch (err) {
        console.error('Failed to load history.')
      }
    }
    fetchHistory()
  }, [])

  const handleLogout = () => {
    Cookies.remove('token')
    router.push('/')
  }

  return (
    <div className="w-full space-y-6">
      {/* Top Buttons */}
      <div className="flex justify-between items-center">
        {/* <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm bg-red-100 hover:bg-red-200 text-red-700 font-medium px-4 py-2 rounded-lg transition"
        >
          <LogOut size={16} />
          Logout
        </button> */}

        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition"
        >
          <ScanSearch size={16} />
          Go to Prediction
        </button>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-indigo-700">
        Prediction History
      </h1>

      {/* Scrollable Grid with 3 columns */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto pr-2">
        {history.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedItem(item)}
            className="cursor-pointer bg-white p-4 rounded-xl shadow border hover:shadow-md transition"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_API_BASE}${item.image_url}`}
              alt="History leaf"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-3 text-gray-800 break-words">
              {item.predicted_class.replaceAll('_', ' ')}
            </h3>
            <p className="text-sm">Confidence: {item.confidence.toFixed(2)}</p>
            <p className="text-sm text-gray-600">{item.suggestion}</p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(item.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Modal full width centered */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 space-y-4 relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-green-700">Prediction Details</h2>
            <img
              src={`${process.env.NEXT_PUBLIC_API_BASE}${selectedItem.image_url}`}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg border"
            />
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Class:</span> {selectedItem.predicted_class.replaceAll('_', ' ')}</p>
              <p><span className="font-semibold">Confidence:</span> {selectedItem.confidence.toFixed(2)}</p>
              <p><span className="font-semibold">Suggestion:</span> {selectedItem.suggestion}</p>
              <p className="text-gray-500">
                <span className="font-semibold">Time:</span> {new Date(selectedItem.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
