
export type TodoItemType = {
    id: number;
    description: string;
    title: string;
    updated_at: string;
    created_at: string;
    author: number;
    done: boolean;
}

export const todoItemsMock: TodoItemType[] = [
    {
      id: 9,
      description: "Fourth description",
      title: "Fourth title",
      updated_at: "2023-11-15T17:42:55.107203Z",
      created_at: "2023-11-15T17:42:55.107194Z",
      author: 1,
      done: false
    },
    {
      id: 6,
      description: "Second description edited",
      title: "Second title edited",
      updated_at: "2023-11-15T17:14:28.088753Z",
      created_at: "2023-11-15T17:06:00.425931Z",
      author: 1,
      done: false
    },
    {
      id: 8,
      description: "Third description",
      title: "Third title",
      updated_at: "2023-11-15T17:13:36.086236Z",
      created_at: "2023-11-15T17:13:36.086229Z",
      author: 1,
      done: false
    },
    {
      id: 7,
      description: "First description",
      title: "First title",
      updated_at: "2023-11-15T17:11:49.832162Z",
      created_at: "2023-11-15T17:11:49.832155Z",
      author: 1,
      done: false
    }
  ]