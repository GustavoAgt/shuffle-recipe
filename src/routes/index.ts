import { Router } from "express";
import { readdirSync } from "fs";

class ConfigRouter {
  private PATH_ROUTER = `${__dirname}`;
  private router = Router();

  private cleanFileName = (fileName: string) => {
    const file = fileName.split(".").shift();
    return file;
  };

  public autoConfig(sufix?: string): Router {
    readdirSync(this.PATH_ROUTER).filter((fileName) => {
      const cleanName = this.cleanFileName(fileName);
      if (cleanName !== "index") {
        import(`./${cleanName}.${sufix}`).then((moduleRouter) =>
          this.router.use(`/${cleanName}`, moduleRouter?.router)
        );
      }
    });

    return this.router;
  }
}

export { ConfigRouter };
