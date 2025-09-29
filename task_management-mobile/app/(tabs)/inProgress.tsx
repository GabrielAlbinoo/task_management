import Tasklist from "@/components/TaskList";
import { TaskStatus } from "@/services/task";
import React from "react";

export default function InProgress() {
  return <Tasklist taskStatus={TaskStatus.IN_PROGRESS} />;
}
