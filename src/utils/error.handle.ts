import { Response } from "express";

const handleHttp = (
  res: Response,
  error: string,
  status?: number,
  errorRaw?: any
) => {
  res.status(status || 500);
  res.send({ error });
};

export { handleHttp };
