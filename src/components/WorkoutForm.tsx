
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { WorkoutFormData, ExerciseType } from '../types/workout';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { Button } from '@progress/kendo-react-buttons';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { TextArea } from '@progress/kendo-react-inputs';

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

  const exerciseTypes: ExerciseType[] = ['Strength', 'Cardio', 'Flexibility'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'reps' || name === 'sets' || name === 'weight' || name === 'duration') {
      setFormData({ ...formData, [name]: parseFloat(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNumericChange = (e: any, fieldName: string) => {
    if (e.value !== null && e.value !== undefined) {
      setFormData({ ...formData, [fieldName]: e.value });
    } else {
      setFormData({ ...formData, [fieldName]: 0 });
    }
  };

  const handleTypeChange = (e: any) => {
    setFormData({ ...formData, exerciseType: e.value });
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

  const handleTextChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.value });
  };

  const handleNotesChange = (e: any) => {
    setFormData({ ...formData, notes: e.value });
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
                <Input
                  name="exerciseName"
                  value={formData.exerciseName}
                  onChange={handleTextChange}
                  placeholder="e.g. Push-ups"
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Exercise Type</label>
                <DropDownList
                  data={exerciseTypes}
                  value={formData.exerciseType}
                  onChange={handleTypeChange}
                  className="w-full"
                />
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
                <NumericTextBox
                  name="reps"
                  value={formData.reps}
                  onChange={(e) => handleNumericChange(e, 'reps')}
                  min={0}
                  placeholder="e.g. 12"
                  className="w-full"
                />
              </div>
              
              {formData.exerciseType === 'Strength' && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Sets</label>
                    <NumericTextBox
                      name="sets"
                      value={formData.sets || 0}
                      onChange={(e) => handleNumericChange(e, 'sets')}
                      min={0}
                      placeholder="e.g. 3"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Weight (kg)</label>
                    <NumericTextBox
                      name="weight"
                      value={formData.weight || 0}
                      onChange={(e) => handleNumericChange(e, 'weight')}
                      min={0}
                      step={0.5}
                      placeholder="e.g. 50"
                      className="w-full"
                    />
                  </div>
                </>
              )}
              
              {(formData.exerciseType === 'Cardio' || formData.exerciseType === 'Flexibility') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Duration (minutes)</label>
                  <NumericTextBox
                    name="duration"
                    value={formData.duration || 0}
                    onChange={(e) => handleNumericChange(e, 'duration')}
                    min={0}
                    placeholder="e.g. 30"
                    className="w-full"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Notes</label>
              <TextArea
                name="notes"
                value={formData.notes || ''}
                onChange={handleNotesChange}
                placeholder="Add any additional information here..."
                rows={3}
                className="w-full"
              />
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                onClick={handleClear}
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              >
                Clear
              </Button>
              <Button
                type="submit"
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
              >
                Save Workout
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkoutForm;
