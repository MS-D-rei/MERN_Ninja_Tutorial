import { useEffect, useState } from 'react';
import { IWorkout } from '@/types/workout-type';
import WorkoutList from '@/components/workout/WorkoutList';

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
    <div className="home">
      <div className="workout">
        <h2>Home</h2>
        {workouts && <WorkoutList workouts={workouts} />}
      </div>
    </div>
  );
}
