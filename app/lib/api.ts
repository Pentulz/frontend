import type { FetchError } from "ofetch";

export type ValidationError = FetchError<{
  detail: [
    {
      type: string | "missing";
      msg: string;
      loc: string[];
    },
  ];
}>;

export type ClientError = FetchError<{
  errors: [
    {
      status: string | "400";
      title: string;
      detail: string;
    },
  ];
}>;

export type SuccessResponse<T, type = string> = {
  data: {
    type: type;
    id: string;
    attributes: T;
  };
};
