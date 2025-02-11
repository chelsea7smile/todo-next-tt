export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user?: boolean;
}

export interface TodoItemProps {
  todo: Todo;
  isUserTask: boolean;
  editingId: number | null;
  editingValue: string;
  onToggle: (id: number, isUserTask: boolean) => void;
  onDelete: (id: number, isUserTask: boolean) => void;
  onStartEditing: (id: number, currentTitle: string) => void;
  onCommitEditing: () => void;
  onEditChange: (value: string) => void;
  onEditKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}