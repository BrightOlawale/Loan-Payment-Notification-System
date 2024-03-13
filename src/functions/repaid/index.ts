import schema from "@functions/schema";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "loan-repaid",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
