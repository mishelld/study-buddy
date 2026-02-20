import { TextInput, Select, Group, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

import { useForm } from "@mantine/form";

export default function TaskForm({
  initialValues,
  onSubmit,
  onCancel,
  submitText,
}) {
  const form = useForm({
    initialValues: initialValues,
    validate: {
      taskName: (value) =>
        value.trim() === "" ? "Task name is required" : null,
      priority: (value) => (value === "" ? "Priority is required" : null),
      dueDate: (value) => (value === null ? "Due date is required" : null),
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        label="Task Name"
        placeholder="Enter task name"
        mb="sm"
        {...form.getInputProps("taskName")}
      />
      <Select
        label="Priority"
        placeholder="Select priority"
        data={["Low", "Medium", "High"]}
        mb="sm"
        {...form.getInputProps("priority")}
      />
      <DatePickerInput
        label="Due Date"
        placeholder="dd/mm/yyyy"
        mb="sm"
        {...form.getInputProps("dueDate")}
      />

      <Group position="right" mt="md">
        <Button variant="default" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" color="black">
          {submitText}
        </Button>
      </Group>
    </form>
  );
}
