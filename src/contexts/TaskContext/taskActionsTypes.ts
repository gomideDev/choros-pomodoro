import type { TaskModel } from "../../models/TaskModel"

export enum TaskActionTypes {
    startTask = 'startTask',
    interruptTask = 'interruptTask',
    reset = 'reset'
}

export type TaskActionModel = |{
    type: TaskActionTypes.startTask;
    payload: TaskModel;
} | {
    type: TaskActionTypes.interruptTask;
} | {
    type: TaskActionTypes.reset;
}