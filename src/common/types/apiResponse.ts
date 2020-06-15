type APIResponse = {
  error?: {
    errorMsg: string;
    error: "InvalidParameter" | "InternalError" | "InvalidRequest" | "NotFound";
  };
  response?: {
    responseMsg: string;
    data: any;
  };
};

export default APIResponse;
