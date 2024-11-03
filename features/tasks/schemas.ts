import * as z from "zod";
import { TaskStatus } from "./components/types";

export const createTaskSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required",
  }),
  status: z.nativeEnum(TaskStatus, {required_error: "Status is required"}),
  workspaceId: z.string().min(1, {
    message: "WorkspaceId is required",
  }),
  projectId: z.string().min(1, {
    message: "ProjectId is required",
  }),
  assigneeId: z.string().min(1, {
    message: "AssigneeId is required",
  }),
  description: z.string().optional(),
  dueDate: z.coerce.date(),
});

export const getTaskSchema = z.object({
  status: z.nativeEnum(TaskStatus).nullish(),
  workspaceId: z.string(),
  projectId: z.string().nullish(),
  assigneeId: z.string().nullish(),
  search: z.string().nullish(),
  dueDate: z.string().nullish(),
});

export const bulkUpdate = z.object({
  tasks: z.array(z.object({
    $id: z.string(),
    status: z.nativeEnum(TaskStatus),
    position: z.number().int().positive().min(1000).max(1_000_000),
  }))
})

export const updateProjectSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be 2 or more characters",
    })
    .optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});
