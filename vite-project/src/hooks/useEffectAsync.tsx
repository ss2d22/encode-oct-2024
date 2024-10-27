import { useEffect, useRef } from "react";
import lodash from "lodash";

export const useEffectAsync = (
    func: () => Promise<any>,
    dependencies: any[]
) => {
    let tasks = useRef<{ func: typeof func }[]>([]);
    const runWaitingTasks = () => {
        if (tasks.current.length) {
            tasks.current[0].func().then(() => {
                let tasksCopy = lodash.cloneDeep(tasks.current);
                tasksCopy.splice(0, 1);
                tasks.current = tasksCopy;
                runWaitingTasks();
            });
        }
    };
    useEffect(() => {
        tasks.current.push({ func });
        if (tasks.current.length === 1) {
            runWaitingTasks();
        }
    }, dependencies);
};
