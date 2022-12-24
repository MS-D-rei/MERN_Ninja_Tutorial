import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = fetch('http://localhost:4000/api/workouts')
    }
  }, [])
  return (
    <div className="Home">
      <h2>Home</h2>
    </div>
  );
}
