import React, { useState } from 'react'

export default function SkillsExchangeForm() {
  const [formData, setFormData] = useState({
    offeredSkill: '',
    wantedSkill: '',
    message: ''
  })



  const handleSubmit = () => {
    console.log('Form submitted:', formData)
    // Add your submission logic here
    alert('Skills exchange request submitted!')
  }

  const handleSkillChange = (value, type) => {
    setFormData(prev => ({
      ...prev,
      [type]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Skills Exchange
        </h2>
        
        <div className="space-y-6">
          {/* Offered Skill Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose one of your offered skills
            </label>
            <input
              type="text"
              value={formData.offeredSkill}
              onChange={(e) => handleSkillChange(e.target.value, 'offeredSkill')}
              placeholder="Enter your skill"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Wanted Skill Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose one of their wanted skills
            </label>
            <input
              type="text"
              value={formData.wantedSkill}
              onChange={(e) => handleSkillChange(e.target.value, 'wantedSkill')}
              placeholder="Enter wanted skill"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Tell them about your skills exchange proposal..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}