import { useEffect, useState } from 'react';
import { IWorkout } from '@/types/workout-type';

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
        {workouts &&
          workouts.map((workout) => <p key={workout._id}>{workout.title}</p>)}
      </div>
    </div>
  );
}
