import { useEffect, useState } from 'react';
import { IWorkout } from '@/types/workout-type';
import WorkoutList from '@/components/workout/WorkoutList';
import styles from '@/styles/Home.module.css'
import WorkoutForm from '@/components/workout/WorkoutForm';

export default function Home() {
  const [workouts, setWorkouts] = useState<IWorkout[]>();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts');
      const data = await response.json();
      if (response.ok) {
        setWorkouts(data);
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <div className={styles.home}>
      <div className="workout">
        <h2>All Workouts</h2>
        {workouts && <WorkoutList workouts={workouts} />}
      </div>
      <WorkoutForm />
    </div>
  );
}
