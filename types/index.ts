export type Todo = {
  _id?: string;
  title: string;
  status: string;
  completed?: boolean;
};

export type Error = {
  message: string;
  status: number;
};

export type mongoUrl = string;

export type Params = {
  params: {
    id: string;
  };
};

export type formValue = {
  title: string;
};

export type updateTodoProps = {
  title?: string;
  status: string;
  completed?: boolean;
};
