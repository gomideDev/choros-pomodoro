import type { TaskStateModel } from "../../models/TaskStateModel";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";
import { getNextCycle } from "../../utils/getNextCycle";
import { TaskActionTypes, type TaskActionModel } from "./taskActionsTypes";

export function taskReducer(state: TaskStateModel, action: TaskActionModel): TaskStateModel{
    switch (action.type){
        case TaskActionTypes.startTask: {
            if(!action.payload) return state

            const newTask = action.payload
            const nextCycle = getNextCycle(state.currentCycle)
            const secondsRemaing = newTask.duration * 60;

            return {
                ...state,
                activeTask: newTask,
                currentCycle: nextCycle,
                secondsRemaing,
                formattedSecondsRemaning: formatSecondsToMinutes(secondsRemaing),
                tasks: [...state.tasks, newTask]

            }
        }
        case TaskActionTypes.interruptTask: {
            return {
                ...state,
                activeTask: null,
                secondsRemaing: 0,
                formattedSecondsRemaning: '00:00',
                   tasks: state.tasks.map((task)=>{
                    if(task.id === state.activeTask?.id){
                        return {
                            ...task,
                            interruptDate: Date.now()
                        }
                    }
                    return task;
                })
            }
        }
        case TaskActionTypes.reset: 
            return state
    }
    return state
}