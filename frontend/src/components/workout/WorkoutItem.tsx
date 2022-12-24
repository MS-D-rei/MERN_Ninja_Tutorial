interface WorkoutItemProps {
  title: string;
  reps: number;
  load: number;
  createdAt: string;
}

export default function WorkoutItem({
  title,
  reps,
  load,
  createdAt,
}: WorkoutItemProps) {
  return (
    <li className="workout-detail">
      <h4>{title}</h4>
      <p>Load(kg): {load}</p>
      <p>Reps: {reps}</p>
      <p>{createdAt}</p>
    </li>
  );
}
