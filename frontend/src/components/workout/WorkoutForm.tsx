import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '@/hooks/storeHook';
import { getAllWorkouts } from '@/store/workoutsSlice';
import styles from '@/styles/components/workout/WorkoutForm.module.css';
import WorkoutListError from '@/components/workout/WorkoutListError';

export default function WorkoutForm() {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();

  // console.log('WorkForm is rendered');

  // set each state
  const titleInputChangeHander = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const loadInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLoad(event.target.value);
  };

  const repsInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setReps(event.target.value);
  };

  // submit handle
  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newWorkout = {
      title,
      load,
      reps,
    };
    console.log(newWorkout);
    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWorkout),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    }

    if (response.ok) {
      setError(null);
      setTitle('');
      setLoad('');
      setReps('');
      dispatch(getAllWorkouts());
    }
    console.log(data);
  };

  return (
    <form onSubmit={submitHandler}>
      <h3>Add a New Workout</h3>
      <div className={styles.formControl}>
        <label htmlFor="title">Exersize Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={titleInputChangeHander}
        />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="load">Load (kg):</label>
        <input
          type="text"
          id="load"
          value={load}
          onChange={loadInputChangeHandler}
        />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="reps">Reps:</label>
        <input
          type="number"
          id="reps"
          value={reps}
          onChange={repsInputChangeHandler}
        />
      </div>
      <div className={styles.formActions}>
        <button type="submit">Add Workout</button>
      </div>
      {error && <WorkoutListError error={error} />}
    </form>
  );
}
