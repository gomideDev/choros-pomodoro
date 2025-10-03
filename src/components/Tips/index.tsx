import type { TaskModel } from "../../models/TaskModel";
import type { TaskStateModel } from "../../models/TaskStateModel";

type TipsProps = {
    state: TaskStateModel,
    nextCycleType: TaskModel["type"]

}

export function Tips({state, nextCycleType}: TipsProps){

    const tipsForWhenActiveTask = {
        workTime: <span>Foque por {state.config.workTime}min</span>,
        shortBreakTime: <span>Descanse por {state.config.shortBreakTime}min</span>,
        longBreakTime: <span>Descanso longo de {state.config.longBreakTime}min</span>
    }

    const tipsForWhenNoActiveTask = {
        workTime: <span>Próximo ciclo é de {state.config.workTime}min</span>,
        shortBreakTime: <span>Próximo ciclo é de {state.config.shortBreakTime}min</span>,
        longBreakTime: <span>Próximo ciclo é de descanso longo</span>
    }

    return (
        <>
            {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
            {!state.activeTask && tipsForWhenNoActiveTask[nextCycleType]}
        </>
    );
}