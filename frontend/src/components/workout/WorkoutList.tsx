import { IWorkout } from '@/types/workout-type';
import WorkoutItem from './WorkoutItem';

interface WorkoutListProps {
  workouts: IWorkout[];
}

export default function WorkoutList({ workouts }: WorkoutListProps) {
  return (
    <ul>
      {workouts.map((workout) => (
        <WorkoutItem
          key={workout._id}
          title={workout.title}
          reps={workout.reps}
          load={workout.load}
          createdAt={workout.createdAt}
        />
      ))}
    </ul>
  );
}
