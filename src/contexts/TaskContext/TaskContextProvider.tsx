import {  useEffect, useReducer } from "react"
import { TaskContext } from "./TaskContext"
import { initialTaskState } from "./initialTaskState"
import { taskReducer } from "./taskReducer"
import { TimerWorkerManager } from "../../workers/TimerWorkerManager"
import { TaskActionTypes } from "./taskActionsTypes"

type TaskContextProviderProps = {
    children: React.ReactNode
}

export function TaskContextProvider({children}: TaskContextProviderProps){
    const [state, dispatch] = useReducer(taskReducer, initialTaskState)

    const worker = TimerWorkerManager.getInstance()

    worker.onMessage(e => {
        const countDownSeconds = e.data
        console.log(countDownSeconds)
        if(countDownSeconds <= 0){
            console.log("Completed task")
            worker.terminate()
            dispatch({
                type: TaskActionTypes.completeTask
            })
        }else{
            dispatch({
                type: TaskActionTypes.countDown,
                payload: {secondsRemaining: countDownSeconds}
            })
        }
        
    })

    useEffect(()=>{
        console.log(state)
        if(!state.activeTask){
            console.log("Worker terminado por falta de activeTask")
            worker.terminate()
        }
        worker.postMessage(state)
    }, [state, worker])
    
    return (
        <TaskContext.Provider value={{state, dispatch}}>
            {children}
        </TaskContext.Provider>
    )
}