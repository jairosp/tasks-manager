import React, { useState, useEffect } from 'react'
import uniqid from 'uniqid'

const TaskManager = () => {

    const [ tasks, setTasks ] = useState([])
    const [ doneTasks, setDoneTasks] = useState([])
    const [ title, setTitle ] = useState('')
    const [ desc, setDesc ] = useState('')
    const [ errorMsg, setErrorMsg ] = useState(null)

    useEffect(() => {
        
    }, [])

    const addNewTask = (ev) => {
        ev.preventDefault()
        if(!title.trim()){
            setErrorMsg('Title cannot be empty!')
            return
        }
        const newTask = {
            id: uniqid(),
            title: title,
            description: desc
        }
        setTasks([...tasks, newTask])
        setTitle('')
        setDesc('')
    }

    const markAsDone = (item) => {
        const { id } = item
        const newTaskArray = tasks.filter(item => item.id !== id)
        setTasks(newTaskArray)
        setDoneTasks([...doneTasks, item])
    }


    return (
        <div className='container'>
            <div className='row'>
                <div className="col" style={{minWidth:'300px'}}>
                    <form onSubmit={(e) => {addNewTask(e)}} className='form-group d-grid gap-2 card p-3 mt-3'>
                        <h2>Create new task</h2>
                        <label htmlFor="Title">Title</label>
                        <input 
                            onChange={(e) => {setTitle(e.target.value)}}
                            className='form-control' 
                            type="text" 
                            id='Title'
                            value={title}
                        />
                        <label htmlFor="Description">Description</label>
                        <textarea 
                            style={{maxHeight: '100px'}}
                            onChange={(e) => {setDesc(e.target.value)}}
                            className='form-control' 
                            type="text" 
                            rows='3' 
                            id='Description'
                            value={desc}
                        />
                        <input type="submit" className='btn btn-primary' value='Add new task'/>
                        {
                        errorMsg ? (
                            <div className='alert alert-danger'>
                                {errorMsg}
                            </div>
                        ): (<span></span>)
                        }
                    </form>
                    
                </div>
                <div className="col" style={{minWidth:'300px'}}>
                    <section className='card d-grid gap-2 p-3 mt-3'>
                        <h2 className='mb-5'>To do { tasks.length !== 0 ? (<span>({tasks.length})</span>) : (<span></span>)}</h2>
                        <ul className='list-group'>
                            {
                                tasks.length !== 0 ? (
                                    tasks.map(item => 
                                        <li key={item.id} className='list-group-item d-flex justify-content-between align-items-start'>
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{item.title}</div>
                                                {item.description}
                                            </div>
                                            <button onClick={() => {markAsDone(item)}} className='btn btn-primary badge me-2'>Finish!</button>
                                            {/* <button className='btn btn-info badge me-2'>Edit task</button> */}
                                        </li>    
                                    )
                                )
                                    :
                                (
                                    <div className='alert alert-info'>
                                        No tasks left, add one or take a rest.
                                    </div>
                                )
                            }
                        </ul>
                    </section>
                </div>
                <div className="col" style={{minWidth:'300px'}}>
                    <section className='card d-grid gap-2 p-3 mt-3'>
                        <h2 className='mb-5'>Done!</h2>
                        <ul className='list-group'>
                            {
                                doneTasks.length !== 0 ? 
                                (
                                    doneTasks.map( item => 
                                        <li className='list-group-item disabled' key={item.title}> 
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{item.title}</div>
                                                {item.description}
                                            </div>
                                        </li>    
                                    )
                                )
                                :
                                (
                                    <div className='alert alert-info'>
                                        You haven't done any task yet!
                                    </div>
                                )
                            }
                        </ul>
                    </section>
                </div>
            </div>

            </div>
    )
}

export default TaskManager
