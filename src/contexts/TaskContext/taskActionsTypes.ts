import type { TaskModel } from "../../models/TaskModel"

export enum TaskActionTypes {
    startTask = 'startTask',
    interruptTask = 'interruptTask',
    reset = 'reset',
    countDown = 'countDown',
    completeTask = 'completeTask'
}

export type TaskActionModel = |{
    type: TaskActionTypes.startTask;
    payload: TaskModel;
} | {
    type: TaskActionTypes.countDown;
    payload: {secondsRemaining: number};
} | {
    type: TaskActionTypes.interruptTask;
} | {
    type: TaskActionTypes.reset;
} | {
    type: TaskActionTypes.completeTask;
}