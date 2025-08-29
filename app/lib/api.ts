export type ValidationError = {
  detail: [
    {
      type: string | "missing";
      msg: string;
      loc: string[];
    },
  ];
};

export type ClientError = {
  error: {
    status: string | "400";
    title: string;
    detail: string;
  };
};

export type SuccessResponse<T, type = string> = {
  data: {
    type: type;
    id: string;
    attributes: T;
  };
};
