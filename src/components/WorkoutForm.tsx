
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { WorkoutFormData, ExerciseType } from '../types/workout';
import { Form, Field, FormElement, FieldWrapper } from '@progress/kendo-react-form';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { Button } from '@progress/kendo-react-buttons';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { TextArea } from '@progress/kendo-react-inputs';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

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

  const handleChange = (e: any, fieldName: string) => {
    setFormData({ ...formData, [fieldName]: e.value });
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

  const handleSubmit = () => {
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
    <Dialog title="Log New Workout" onClose={onCancel} width={600}>
      <Form
        onSubmit={handleSubmit}
        initialValues={formData}
        render={(formRenderProps) => (
          <FormElement>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FieldWrapper label="Exercise Name">
                  <Field
                    name="exerciseName"
                    component={Input}
                    value={formData.exerciseName}
                    onChange={(e) => handleChange(e, 'exerciseName')}
                    placeholder="e.g. Push-ups"
                    required
                  />
                </FieldWrapper>
                
                <FieldWrapper label="Exercise Type">
                  <Field
                    name="exerciseType"
                    component={DropDownList}
                    data={exerciseTypes}
                    value={formData.exerciseType}
                    onChange={handleTypeChange}
                  />
                </FieldWrapper>
                
                <FieldWrapper label="Date">
                  <Field
                    name="date"
                    component={DatePicker}
                    value={new Date(formData.date)}
                    onChange={handleDateChange}
                    format="MMMM d, yyyy"
                  />
                </FieldWrapper>
                
                <FieldWrapper label={formData.exerciseType === 'Cardio' ? 'Repetitions (e.g. 1 for one session)' : 'Repetitions'}>
                  <Field
                    name="reps"
                    component={NumericTextBox}
                    value={formData.reps}
                    onChange={(e) => handleChange(e, 'reps')}
                    min={0}
                    placeholder="e.g. 12"
                  />
                </FieldWrapper>
                
                {formData.exerciseType === 'Strength' && (
                  <>
                    <FieldWrapper label="Sets">
                      <Field
                        name="sets"
                        component={NumericTextBox}
                        value={formData.sets || 0}
                        onChange={(e) => handleChange(e, 'sets')}
                        min={0}
                        placeholder="e.g. 3"
                      />
                    </FieldWrapper>
                    
                    <FieldWrapper label="Weight (kg)">
                      <Field
                        name="weight"
                        component={NumericTextBox}
                        value={formData.weight || 0}
                        onChange={(e) => handleChange(e, 'weight')}
                        min={0}
                        step={0.5}
                        placeholder="e.g. 50"
                      />
                    </FieldWrapper>
                  </>
                )}
                
                {(formData.exerciseType === 'Cardio' || formData.exerciseType === 'Flexibility') && (
                  <FieldWrapper label="Duration (minutes)">
                    <Field
                      name="duration"
                      component={NumericTextBox}
                      value={formData.duration || 0}
                      onChange={(e) => handleChange(e, 'duration')}
                      min={0}
                      placeholder="e.g. 30"
                    />
                  </FieldWrapper>
                )}
              </div>
              
              <FieldWrapper label="Notes">
                <Field
                  name="notes"
                  component={TextArea}
                  value={formData.notes || ''}
                  onChange={(e) => handleChange(e, 'notes')}
                  placeholder="Add any additional information here..."
                  rows={3}
                />
              </FieldWrapper>
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
          </FormElement>
        )}
      />
    </Dialog>
  );
};

export default WorkoutForm;
