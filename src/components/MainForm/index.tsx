import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";

export function MainForm() {
    return (
        <form className="form" action="">
            <div className="formRow">
                <DefaultInput 
                    label="teste" 
                    id="inpt" 
                    type="text" 
                    placeholder="Digite algo"
                />
            </div>

                <div className="formRow">
                <p>Lorem ipsum dolor sit amet.</p>
            </div>

            <div className="formRow">
                <Cycles/>
            </div>

            <div className="formRow">
                <DefaultButton color="green" icon={<PlayCircleIcon/>}/>
            </div>
        </form>
    )
}   