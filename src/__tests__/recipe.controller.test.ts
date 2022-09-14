import { Recipe } from "./../types/recipe.type";
import * as service from "../services/recipe.service";
import * as controller from "../controllers/recipe.controller";
import App from "../app";
import { recipeSchema } from "../validation-schemas/recipe.schema";

App.Instance.getApp();
App.Instance.startMongoDB();
describe("Testing recipe controllers", () => {
  test("should find all recipes by user", async () => {
    const req: {} = {
      params: {
        id: "631b6e2e1556960ae0c5905e",
      },
    };

    const req2: {} = {
      params: {
        id: "631b6e2e1556960ae0c5905et",
      },
    };

    const res: any = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
      send: jest.fn((obj: {}) => {}),
    };
    const next = jest.fn();

    const spy = jest.spyOn(service, "findAllRecipesByUser");
    await controller.findAllRecipes(req as any, res, next);
    await controller.findAllRecipes(req2 as any, res, next);

    expect(spy).toHaveBeenCalled();
  });

  test("should create a recipes by user", async () => {
    const req: { body: Recipe } = {
      body: {
        title: "test",
        description: "test",
        duration: 2,
        user: { _id: "631b6e2e1556960ae0c5905et", username: "", password: "" },
      },
    };

    const req2: { body: Recipe } = {
      body: {
        title: "test",
        description: "test",
        duration: 2,
        user: { _id: "631b6e2e1556960ae0c5905e", username: "", password: "" },
      },
    };

    const res: any = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
      send: jest.fn((obj: {}) => {}),
    };
    const next = jest.fn();

    const spy = jest.spyOn(service, "insertRecipe");
    await controller.createRecipe(req as any, res, next);
    await controller.createRecipe(req2 as any, res, next);

    recipeSchema.validate = jest.fn().mockImplementation(() => {
      return { error: true };
    });

    await controller.createRecipe(req as any, res, next);

    expect(spy).toHaveBeenCalled();
  });
});
