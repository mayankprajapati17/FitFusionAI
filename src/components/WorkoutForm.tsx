import { Button } from '@progress/kendo-react-buttons';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input, NumericTextBox, TextArea } from '@progress/kendo-react-inputs';
import { FloatingLabel } from '@progress/kendo-react-labels';
import React, { useState } from 'react';
import { ExerciseType, WorkoutFormData } from '../types/workout';

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
    sets: 0,
    weight: 0,
    duration: 0,
    notes: '',
  });

  const exerciseTypes: ExerciseType[] = ['Strength', 'Cardio', 'Flexibility'];

  const handleChange = (fieldName: keyof WorkoutFormData, value: string | number | undefined) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleDateChange = (e: { value: Date | null }) => {
    if (e.value) {
      const date = new Date(e.value);
      setFormData((prev) => ({
        ...prev,
        date: date.toISOString().split('T')[0],
      }));
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      exerciseName: '',
      exerciseType: 'Strength',
      date: new Date().toISOString().split('T')[0],
      reps: 0,
      sets: 0,
      weight: 0,
      duration: 0,
      notes: '',
    });
  };

  const handleClear = () => {
    setFormData({
      exerciseName: '',
      exerciseType: 'Strength',
      date: new Date().toISOString().split('T')[0],
      reps: 0,
      sets: 0,
      weight: 0,
      duration: 0,
      notes: '',
    });
  };

  if (!isOpen) return null;

  return (
    <Dialog title="Log New Workout" onClose={onCancel} width={600}>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FloatingLabel
              label="Exercise Name"
              editorId="exerciseName"
              editorValue={formData.exerciseName}
            >
              <Input
                id="exerciseName"
                value={formData.exerciseName}
                onChange={(e) => handleChange('exerciseName', e.value)}
                placeholder="e.g. Push-ups"
                required
              />
            </FloatingLabel>
          </div>

          <div>
            <FloatingLabel
              label="Exercise Type"
              editorId="exerciseType"
              editorValue={formData.exerciseType}
            >
              <DropDownList
                id="exerciseType"
                data={exerciseTypes}
                value={formData.exerciseType}
                onChange={(e) => handleChange('exerciseType', e.value)}
              />
            </FloatingLabel>
          </div>

          <div>
            <FloatingLabel
              label="Date"
              editorId="date"
              editorValue={formData.date}
            >
              <DatePicker
                id="date"
                value={new Date(formData.date)}
                onChange={handleDateChange}
                format="MMMM d, yyyy"
              />
            </FloatingLabel>
          </div>

          <div>
            <FloatingLabel
              label="Repetitions"
              editorId="reps"
              editorValue={formData.reps.toString()}
            >
              <NumericTextBox
                id="reps"
                value={formData.reps}
                onChange={(e) => handleChange('reps', e.value ?? 0)}
                min={0}
                placeholder="e.g. 12"
              />
            </FloatingLabel>
          </div>

          <div>
            <FloatingLabel
              label="Sets"
              editorId="sets"
              editorValue={formData.sets.toString()}
            >
              <NumericTextBox
                id="sets"
                value={formData.sets}
                onChange={(e) => handleChange('sets', e.value ?? 0)}
                min={0}
                placeholder="e.g. 3"
              />
            </FloatingLabel>
          </div>

          <div>
            <FloatingLabel
              label="Weight (kg)"
              editorId="weight"
              editorValue={formData.weight.toString()}
            >
              <NumericTextBox
                id="weight"
                value={formData.weight}
                onChange={(e) => handleChange('weight', e.value ?? 0)}
                min={0}
                step={0.5}
                placeholder="e.g. 50"
              />
            </FloatingLabel>
          </div>
        </div>

        <div>
          <FloatingLabel
            label="Notes"
            editorId="notes"
            editorValue={formData.notes || ''}
          >
            <TextArea
              id="notes"
              value={formData.notes || ''}
              onChange={(e) => handleChange('notes', e.value)}
              placeholder="Add any additional information here..."
              rows={3}
            />
          </FloatingLabel>
        </div>
      </div>

      <DialogActionsBar>
        <Button
          className="k-button k-button-md k-button-solid k-button-solid-base"
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button
          className="k-button k-button-md k-button-solid k-button-solid-primary"
          onClick={handleSubmit}
        >
          Save Workout
        </Button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default WorkoutForm;