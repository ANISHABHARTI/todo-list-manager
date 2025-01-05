import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTask } from '../redux/taskSlice';

const EditTaskPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskToEdit = tasks.find((task) => task.id === parseInt(id));

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setCompleted(taskToEdit.completed);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      id: parseInt(id),
      title,
      description,
      completed,
    };
    dispatch(updateTask(updatedTask));
    navigate('/');
  };

  if (!taskToEdit) {
    return <p>Task not found!</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Task</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Completed
      </label>
      <button type="submit">Update Task</button>
    </form>
  );
};

export default EditTaskPage;