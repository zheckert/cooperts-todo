import { get, HttpError, Request, toHttpTask } from "ajaxian";
import Decoder, {
  array,
  boolean,
  field,
  number,
  string,
  succeed,
} from "jsonous";
import * as React from "react";
import CustomError from "./Error";
interface TodoListItem {
  id: number;
  title: string;
  description: string;
  done: boolean;
  userId: number;
}

interface Props {}

interface State {
  data: TodoListItem[];
  error: HttpError;
}

class TodoList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { data: [], error: undefined };
  }
  todoListItemDecoder: Decoder<TodoListItem> = succeed({})
    .assign("id", field("id", number))
    .assign("title", field("title", string))
    .assign("description", field("description", string))
    .assign("done", field("done", boolean))
    .assign("userId", field("user_id", number));

  todoListItemsDecoder: Decoder<TodoListItem[]> = array(
    this.todoListItemDecoder
  );

  componentDidMount() {
    const req = get("/api/version1/todo_items").withDecoder(
      this.todoListItemsDecoder.toJsonFn()
    );

    toHttpTask(req).fork(
      (e) => this.setState((prev) => ({ ...prev, error: e })),
      (data) => this.setState((prev) => ({ ...prev, data: data }))
    );
  }

  render() {
    return (
      <div>
        <h1>ToDo List</h1>
        <CustomError error={this.state.error} />
        {this.state.data.map(({ id, title, description, done, userId }) => (
          <div
            style={{ display: "flex", justifyContent: "space-around" }}
            key={id}
          >
            <div>{title}</div>
            <div>{description}</div>
            <div>{done.toString()}</div>
            <div>{userId}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default TodoList;
