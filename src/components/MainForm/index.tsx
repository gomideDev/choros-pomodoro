import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActionsTypes";
import { Tips } from "../Tips";

export function MainForm() {
    const {state, dispatch} = useTaskContext()
    const taskNameInput = useRef<HTMLInputElement>(null)

    const nextCycle = getNextCycle(state.currentCycle)
    const nextCycleType = getNextCycleType(nextCycle)


    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        if(!taskNameInput.current) return;

        const taskName = taskNameInput.current.value.trim()

        if(!taskName){
            alert('Digite o nome da tarefa')
            return;
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType
        };

        dispatch({type: TaskActionTypes.startTask, payload: newTask})
    }

    function handleInterruptTask(){
        dispatch({type: TaskActionTypes.interruptTask})
    }


    return (
        <form onSubmit={handleCreateNewTask} className="form" action="">
            <div className="formRow">
                <DefaultInput 
                    label="teste" 
                    id="inpt" 
                    type="text" 
                    placeholder="Digite algo"
                    ref={taskNameInput}
                    disabled = {!!state.activeTask}
                />
            </div>

            <div className="formRow">
                <Tips state={state} nextCycleType={nextCycleType}/>
            </div>

            {state.currentCycle  >0 && (
                <div className="formRow">
                <Cycles/>
                </div>
            )}
            

            <div className="formRow">
                {!state.activeTask ? (
                    <DefaultButton key="btnCreate" aria-label="Iniciar nova tarefa" type="submit" title="Iniciar nova tarefa" color="green" icon={<PlayCircleIcon/>}/>
                ): (
                    <DefaultButton key="btnInterrupt" aria-label="Interromper tarefa" onClick={handleInterruptTask} type="button" title="Interromper tarefa" color="red" icon={<StopCircleIcon/>}/>
                )}
                
            </div>
        </form>
    )
}   