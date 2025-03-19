
import React from 'react';
import { Workout, ExerciseType } from '@/types/workout';
import { Grid, GridColumn, GridSortChangeEvent } from '@progress/kendo-react-grid';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { MoreVertical } from 'lucide-react';
import { Button } from '@progress/kendo-react-buttons';
import { Badge } from '@progress/kendo-react-indicators';

interface WorkoutTableProps {
  workouts: Workout[];
  onSortChange: (column: keyof Workout) => void;
  sortColumn: keyof Workout;
  sortDirection: 'asc' | 'desc';
}

const WorkoutTable: React.FC<WorkoutTableProps> = ({ 
  workouts, 
  onSortChange,
  sortColumn,
  sortDirection 
}) => {
  
  const getTypeColor = (type: ExerciseType) => {
    switch (type) {
      case 'Cardio': return 'info';
      case 'Strength': return 'warning';
      case 'Flexibility': return 'success';
      default: return 'default';
    }
  };

  const formatDate = (props: any) => {
    const date = new Date(props.dataItem.date);
    return (
      <td>
        {new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }).format(date)}
      </td>
    );
  };

  const typeCell = (props: any) => {
    return (
      <td>
        <Badge themeColor={getTypeColor(props.dataItem.exerciseType)} text={props.dataItem.exerciseType} />
      </td>
    );
  };

  const repsCell = (props: any) => {
    const { dataItem } = props;
    return (
      <td>
        {dataItem.exerciseType === 'Strength' && dataItem.sets 
          ? `${dataItem.reps} × ${dataItem.sets}` 
          : dataItem.reps}
      </td>
    );
  };

  const detailsCell = (props: any) => {
    const { dataItem } = props;
    return (
      <td>
        {dataItem.weight && `${dataItem.weight}kg`}
        {dataItem.duration && `${dataItem.duration} min`}
        {dataItem.notes && dataItem.notes.length > 25
          ? `${dataItem.notes.substring(0, 25)}...`
          : dataItem.notes}
      </td>
    );
  };

  const actionsCell = () => {
    return (
      <td className="text-right">
        <Button icon={<MoreVertical />} look="flat" />
      </td>
    );
  };

  const handleSortChange = (e: GridSortChangeEvent) => {
    if (e.sort && e.sort.length > 0) {
      const column = e.sort[0].field as keyof Workout;
      onSortChange(column);
    }
  };

  const sort: Array<SortDescriptor> = [
    {
      field: sortColumn,
      dir: sortDirection
    }
  ];

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-elegant animate-fade-up">
      <Grid
        data={orderBy(workouts, sort)}
        sortable={{
          allowUnsort: false,
          mode: 'single'
        }}
        sort={sort}
        onSortChange={handleSortChange}
        style={{ height: 'auto' }}
      >
        <GridColumn field="date" title="Date" cell={formatDate} />
        <GridColumn field="exerciseName" title="Exercise" />
        <GridColumn field="exerciseType" title="Type" cell={typeCell} />
        <GridColumn field="reps" title="Reps/Sets" cell={repsCell} />
        <GridColumn field="details" title="Details" cell={detailsCell} />
        <GridColumn field="actions" title="" cell={actionsCell} width="70px" />
      </Grid>
    </div>
  );
};

export default WorkoutTable;
