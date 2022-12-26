import styles from '@/styles/WorkoutListError.module.css'

interface WorkoutListErrorProps {
  error: string[]
}

export default function WorkoutListError({error}: WorkoutListErrorProps) {
  return (
    <ul className={styles.errorList}>
      {error.map((err) => (
        <li>
          {err}
        </li>
      ))}
    </ul>
  )
}