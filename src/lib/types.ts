export type ServerResponse<Data> = SuccessResponse<Data> | FailResponse;

export type SuccessResponse<Data> = {
  data: Data;
  isSuccess: true;
  error: null;
  message: string;
};

export type FailResponse = {
  data: null;
  isSuccess: false;
  error: Error;
  message: string;
};
