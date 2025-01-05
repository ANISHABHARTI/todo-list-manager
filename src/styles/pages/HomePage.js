import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/taskSlice';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div>
      <h1>To-Do List</h1>
      {loading ? <p>Loading...</p> : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
              <Link to={`/edit/${task.id}`}>Edit</Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/add">Add Task</Link>
    </div>
  );
};

export default HomePage;