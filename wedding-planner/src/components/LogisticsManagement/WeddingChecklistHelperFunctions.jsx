import WeddingChecklistAPI from "./WeddingChecklistAPI";

export const checkOffParentTask = (e, rowData, parentTasks, setParentTasks) => {
    const parentTasksCopy = JSON.parse(JSON.stringify(parentTasks));
    const taskId = rowData.weddingParentTaskId;
    const identifiedTask = parentTasksCopy.filter(
        (parentTask) => parentTask.weddingParentTaskId == taskId
    );
    identifiedTask[0].isDone = e.checked;

    identifiedTask[0].weddingSubtasks.forEach((subtask) => (subtask.isDone = e.checked));
    setParentTasks(parentTasksCopy);

    parentTasksCopy.forEach((parentTask) => {
        parentTask.weddingSubtasks.forEach((subtask) =>
            WeddingChecklistAPI.updateSubtask(subtask)
        );
        WeddingChecklistAPI.updateParentTask(parentTask);
    });
};

export const checkOffSubtask = (e, rowData, parentTasks, setParentTasks) => {
    const parentTasksCopy = JSON.parse(JSON.stringify(parentTasks));

    let identifiedParentTaskObject;
    let identifiedSubtaskObject;

    const subtaskId = rowData.weddingSubtaskId;
    console.log("logging isdonetemplatesubtask");
    console.log(subtaskId);
    // go thru every parent task until we find the parent task containing subtask
    //
    parentTasksCopy.some((parentTask) => {
        // current parentTaskId
        identifiedParentTaskObject = parentTask;
        return parentTask.weddingSubtasks.some((subtask) => {
            identifiedSubtaskObject = subtask;
            return subtask.weddingSubtaskId == subtaskId;
        });
    });
    console.log(identifiedSubtaskObject);

    identifiedSubtaskObject.isDone = e.checked;

    // check if every subtask of identifiedParentTaskObject is checked

    if (identifiedParentTaskObject.weddingSubtasks.every((subtask) => subtask.isDone)) {
        identifiedParentTaskObject.isDone = true;
    } else {
        identifiedParentTaskObject.isDone = false;
    }

    setParentTasks(parentTasksCopy);
    
    parentTasksCopy.forEach((parentTask) => {
        parentTask.weddingSubtasks.forEach((subtask) =>
            WeddingChecklistAPI.updateSubtask(subtask)
        );
        WeddingChecklistAPI.updateParentTask(parentTask);
    });
}