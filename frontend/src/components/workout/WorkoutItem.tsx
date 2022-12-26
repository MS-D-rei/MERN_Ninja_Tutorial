import { useAppDispatch } from '@/hooks/workoutsHook';
import { getAllWorkouts } from '@/store/workoutsSlice';
import styles from '@/styles/components/workout/WorkoutItem.module.css';
import { IWorkout } from '@/types/workout-type';
import { HiOutlineTrash } from 'react-icons/hi';
import { IconContext } from 'react-icons';

interface WorkoutItemProps {
  id: string;
  title: string;
  reps: number;
  load: number;
  createdAt: string;
}

export default function WorkoutItem({
  id,
  title,
  reps,
  load,
  createdAt,
}: WorkoutItemProps) {
  const dispatch = useAppDispatch();

  const deleteWorkoutHandler = async (id: string) => {
    const response = await fetch(`http://localhost:4000/api/workouts/${id}`, {
      method: 'DELETE',
    });
    const data: IWorkout = await response.json();
    if (!response.ok) {
      console.log(data);
      return;
    }
    console.log(data);
    dispatch(getAllWorkouts());
  };

  return (
    <li className={styles.workoutDetails}>
      <h4>{title}</h4>
      <p>Load(kg): {load}</p>
      <p>Reps: {reps}</p>
      <p>{createdAt}</p>
      <span onClick={() => deleteWorkoutHandler(id)}>
        <IconContext.Provider value={{ size: '1.5rem' }}>
          <HiOutlineTrash />
        </IconContext.Provider>
      </span>
    </li>
  );
}
