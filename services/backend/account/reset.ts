import { IncomingMessage, ServerResponse } from "http";

// This could be a DB query.

export default (_: IncomingMessage, res: ServerResponse) => {

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("Account reset... TODO")
};
