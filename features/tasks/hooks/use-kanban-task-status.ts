import { parseAsString, parseAsStringEnum, useQueryState } from "nuqs";
import { TaskStatus } from "../components/types";

export const useKanbanTaskStatus = () => {
  const [taskStatus, setTaskStatus] = useQueryState(
    "kanban-task-status",
    parseAsStringEnum(Object.values(TaskStatus)),
  );

  const open = (status: TaskStatus) => setTaskStatus(status);
  const close = () => setTaskStatus(null);

  return {
    taskStatus,
    open,
    close,
    setTaskStatus,
  };
};
