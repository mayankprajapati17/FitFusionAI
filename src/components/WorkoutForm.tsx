
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { WorkoutFormData, ExerciseType } from '../types/workout';
import { DatePicker } from '@progress/kendo-react-dateinputs';

interface WorkoutFormProps {
  onSubmit: (data: WorkoutFormData) => void;
  onCancel: () => void;
  isOpen: boolean;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit, onCancel, isOpen }) => {
  const [formData, setFormData] = useState<WorkoutFormData>({
    exerciseName: '',
    exerciseType: 'Strength',
    date: new Date().toISOString().split('T')[0],
    reps: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'reps' || name === 'sets' || name === 'weight' || name === 'duration') {
      setFormData({ ...formData, [name]: parseFloat(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDateChange = (e: any) => {
    if (e.value) {
      const date = new Date(e.value);
      setFormData({
        ...formData,
        date: date.toISOString().split('T')[0]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      exerciseName: '',
      exerciseType: 'Strength',
      date: new Date().toISOString().split('T')[0],
      reps: 0,
    });
  };

  const handleClear = () => {
    setFormData({
      exerciseName: '',
      exerciseType: 'Strength',
      date: new Date().toISOString().split('T')[0],
      reps: 0,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg mx-auto animate-scale-in">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-xl font-medium">Log New Workout</h2>
            <button 
              onClick={onCancel} 
              className="text-slate-400 hover:text-slate-600 rounded-full p-1 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Exercise Name</label>
                <input
                  type="text"
                  name="exerciseName"
                  value={formData.exerciseName}
                  onChange={handleChange}
                  placeholder="e.g. Push-ups"
                  required
                  className="elegant-input w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Exercise Type</label>
                <select
                  name="exerciseType"
                  value={formData.exerciseType}
                  onChange={handleChange}
                  className="elegant-input w-full"
                >
                  <option value="Strength">Strength</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Flexibility">Flexibility</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Date</label>
                <DatePicker
                  value={new Date(formData.date)}
                  onChange={handleDateChange}
                  format="MMMM d, yyyy"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  {formData.exerciseType === 'Cardio' ? 'Repetitions (e.g. 1 for one session)' : 'Repetitions'}
                </label>
                <input
                  type="number"
                  name="reps"
                  value={formData.reps || ''}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g. 12"
                  className="elegant-input w-full"
                />
              </div>
              
              {formData.exerciseType === 'Strength' && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Sets</label>
                    <input
                      type="number"
                      name="sets"
                      value={formData.sets || ''}
                      onChange={handleChange}
                      min="0"
                      placeholder="e.g. 3"
                      className="elegant-input w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight || ''}
                      onChange={handleChange}
                      min="0"
                      step="0.5"
                      placeholder="e.g. 50"
                      className="elegant-input w-full"
                    />
                  </div>
                </>
              )}
              
              {(formData.exerciseType === 'Cardio' || formData.exerciseType === 'Flexibility') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Duration (minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration || ''}
                    onChange={handleChange}
                    min="0"
                    placeholder="e.g. 30"
                    className="elegant-input w-full"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Notes</label>
              <textarea
                name="notes"
                value={formData.notes || ''}
                onChange={handleChange}
                placeholder="Add any additional information here..."
                rows={3}
                className="elegant-input w-full"
              />
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={handleClear}
                className="elegant-secondary-button"
              >
                Clear
              </button>
              <button
                type="submit"
                className="elegant-primary-button"
              >
                Save Workout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkoutForm;
