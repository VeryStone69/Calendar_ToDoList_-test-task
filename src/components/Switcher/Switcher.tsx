import React, {useState} from 'react';
import s from "./Switcher.module.css"

type PropsType = {
    callback: (checked: boolean) => void;
}
export const Switcher = (props: PropsType) => {
    const [checkSwitch, setCheckSwitch] = useState(false)
    console.log("WeeklyTasks IS RENDERING")
    const handleChangeSwitch = () => {
        setCheckSwitch(prevState => !prevState)
        props.callback(checkSwitch)
    }

    return (
        <div>
            <label className={s.switch}>
                <input type="checkbox" checked={checkSwitch} onChange={handleChangeSwitch}/>
                <span className={s.slider}></span>
            </label>
        </div>
    );
};
