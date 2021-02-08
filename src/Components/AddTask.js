import { useState } from "react";

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault()//doesnt submit data to any default page on submit everytime

        //easy validation
        if (!text) {
            alert("Please add text")
            return
        }

        //sending data to onAdd function in app.js
        onAdd({ text, day, reminder })

        //resets after submission
        setText('')
        setDay('')
        setReminder(false)
    }


    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text" placeholder="Add Task" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Day And Time</label>
                <input type="text" placeholder="Add Day and Time" value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>
            <input className="btn btn-block" type="submit" value="Save Task" />
        </form>
    );
};

export default AddTask;
