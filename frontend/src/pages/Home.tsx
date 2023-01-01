import { useEffect, useState } from 'react';
import WorkoutList from '@/components/workout/WorkoutList';
import styles from '@/styles/pages/Home.module.css';
import WorkoutForm from '@/components/workout/WorkoutForm';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { getAllWorkouts } from '@/store/workoutsSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const workouts = useAppSelector((state) => state.workouts.workouts);
  const { idToken } = useAppSelector((state) => state.user)

  useEffect(() => {
    dispatch(getAllWorkouts(idToken));
  }, [dispatch]);

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
