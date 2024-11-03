"use client";

import { Separator } from "@/components/ui/separator";
import { Edit } from "lucide-react";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { Task } from "./types";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateTask } from "@/features/tasks/api/use-update-task";

interface TaskOverviewProps {
  task: Task;
}

export const TaskDescription = ({ task }: TaskOverviewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.description);

  const toggleEdit = () => setIsEditing((curr) => !curr);

  const { mutate, isPending } = useUpdateTask();

  const onSubmit = () => {
    mutate(
      { json: { description: value }, param: { taskId: task.$id } },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted dark:bg-[#0a0a0a] rounded-lg p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Description</h1>
          <button onClick={toggleEdit} className="flex items-center">
            {isEditing ? (
              <>
                <MdClose className="h-5 w-5 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </>
            )}
          </button>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col gap-y-4">
          {!isEditing && (
            <p className="mt-2">
              {task.description || (
                <span className="text-muted-foreground">
                  No description set
                </span>
              )}
            </p>
          )}
          {isEditing && (
            <div className="flex flex-col items-center gap-x-2">
              <Textarea
                disabled={isPending}
                placeholder="c.g 'Task description'"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button
                className="flex mt-3 ml-auto"
                onClick={onSubmit}
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex items-center">
                    <div className="loader"></div>
                    <p className="text-white">Loading</p>
                  </div>
                ) : (
                  <>
                    <p>Save</p>
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
