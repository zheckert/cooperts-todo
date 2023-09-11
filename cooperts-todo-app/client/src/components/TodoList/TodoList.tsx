import { del, get, HttpError, post, put, Request, toHttpTask } from "ajaxian";
import Decoder, {
  array,
  boolean,
  field,
  number,
  string,
  succeed,
} from "jsonous";
import * as React from "react";
import CustomError from "../Error";
import "./TodoList.css";
interface TodoListItem {
  id: number;
  title: string;
  done: boolean;
  userId: number;
}

interface Props {}

interface State {
  newTask: string;
  data: TodoListItem[];
  error: HttpError;
}

class TodoList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { newTask: "", data: [], error: undefined };
  }
  todoListItemDecoder: Decoder<TodoListItem> = succeed({})
    .assign("id", field("id", number))
    .assign("title", field("title", string))
    .assign("done", field("done", boolean))
    .assign("userId", field("user_id", number));

  todoListItemsDecoder: Decoder<TodoListItem[]> = array(
    this.todoListItemDecoder
  );

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = () => {
    const req = get("/api/version1/todo_items").withDecoder(
      this.todoListItemsDecoder.toJsonFn()
    );

    toHttpTask(req).fork(
      (e) => this.setState((prev) => ({ ...prev, error: e })),
      (data) => this.setState((prev) => ({ ...prev, data: data }))
    );
  };

  onClick = () => {
    const postReq = post("/api/version1/todo_items").withData({
      title: this.state.newTask,
      done: false,
    });
    toHttpTask(postReq).fork(
      (e) => this.setState((prev) => ({ ...prev, error: e })),
      (data) => this.fetchTasks()
    );
  };

  onChangeTitle = (e) => this.setState({ newTask: e.target.value });

  onChangeDone = (id) => {
    const task = this.state.data.find((task) => task.id == id);

    const putReq = put(`/api/version1/todo_items/${id}`).withData({
      done: !task.done,
    });

    toHttpTask(putReq).fork(
      (e) => this.setState((prev) => ({ ...prev, error: e })),
      (data) => this.fetchTasks()
    );
  };

  onDelete = (id) => {
    const task = this.state.data.find((task) => task.id == id);
    const delReq = del(`/api/version1/todo_items/${id}`);

    toHttpTask(delReq).fork(
      (e) => this.setState((prev) => ({ ...prev, error: e })),
      (data) => this.fetchTasks()
    );
  };

  render() {
    return (
      <div className="main-container">
        <h1 className="top-heading">To-Do List</h1>
        <CustomError error={this.state.error} />
        <form>
          <div className="task-container">
            <input
              placeholder="What do you need to do?"
              className="new-task"
              value={this.state.newTask}
              onChange={this.onChangeTitle}
            />
            <button className="add-button" onClick={this.onClick}>
              Add
            </button>
          </div>
          <div className="wrap-items">
            <div className="list-items">
              {this.state.data.map(({ id, title, done }) => (
                <div className="item" key={id}>
                  <input
                    className="item-checkbox"
                    type="checkbox"
                    checked={done}
                    onChange={() => this.onChangeDone(id)}
                  />
                  <div className="item-title">{title}</div>
                  <div
                    className="remove-item-button"
                    onClick={() => this.onDelete(id)}
                  >
                    X
                  </div>
                </div>
              ))}{" "}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default TodoList;
