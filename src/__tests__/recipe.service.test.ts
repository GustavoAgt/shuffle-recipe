import RecipeModel from "../models/recipe.model";
import { findAllRecipesByUser, insertRecipe } from "../services/recipe.service";
import { User } from "../types/user.type";
import { Recipe } from "../types/recipe.type";

describe("Testing recipe.serice.ts", () => {
  const mockRecipe: Recipe = {
    title: "Cow fish, grilled",
    description: "good fish for dinner",
    cookingDuration: 427777,
    user: { username: "Gustav", password: "Eiffel" },
  };

  const mockUser: Partial<User> = {
    _id: "mockid",
  };

  test("should insert a recipe", async () => {
    expect.assertions(2);

    RecipeModel.create = jest.fn().mockImplementation(() => {
      return {
        title: "Cow fish, grilled",
      };
    });

    const response = await insertRecipe(mockRecipe);

    expect(response).not.toBeNull();
    expect((response as any).title).toEqual(mockRecipe.title);
  });

  test("should find all the recipes by user id a recipe", async () => {
    RecipeModel.find = jest
      .fn()
      .mockReturnValue({ populate: jest.fn().mockReturnValue([]) });
    expect.assertions(2);

    const response = await findAllRecipesByUser(mockUser);

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(Array);
  });
});
