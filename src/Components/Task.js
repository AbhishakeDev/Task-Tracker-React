import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text}
                <FaTimes style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(task.id)}//this is done in order to send some content to the function which was recieved as a prop
                />
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
