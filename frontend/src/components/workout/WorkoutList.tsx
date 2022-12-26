import { IWorkout } from '@/types/workout-type';
import WorkoutItem from './WorkoutItem';
import styles from '@/styles/components/workout/WorkoutList.module.css'

interface WorkoutListProps {
  workouts: IWorkout[];
}

export default function WorkoutList({ workouts }: WorkoutListProps) {
  return (
    <ul className={styles.workoutList}>
      {workouts.map((workout) => (
        <WorkoutItem
          key={workout._id}
          id={workout._id}
          title={workout.title}
          reps={workout.reps}
          load={workout.load}
          createdAt={workout.createdAt}
        />
      ))}
    </ul>
  );
}
