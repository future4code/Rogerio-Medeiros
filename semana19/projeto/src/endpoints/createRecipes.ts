import { Request, Response } from "express";
import { getTokenData } from "../services/authenticator";
import checkDataExisting from "../services/checkDataExisting";
import { dateGenerator } from "../services/formatDate";
import { idGenerator } from "../services/idGenerate";
import { recipeData } from "../types/recipeData";
import insertRecipeInTable from "../data/insertRecipeInTable";

export default async function createRecipes(
  req: Request,
  res: Response
): Promise<void> {
  res.statusCode = 400;
  try {
    const { title, description } = req.body;
    const { authorization } = req.headers;

    checkDataExisting(authorization as string, "authorization", res);
    checkDataExisting(title, "title", res);
    checkDataExisting(description, "description", res);

    const userId = getTokenData(authorization!);

    const recipe: recipeData = {
      id: idGenerator(),
      title: title,
      description: description,
      createdAt: dateGenerator(),
      creatorId: userId
    };

    await insertRecipeInTable(recipe);

    res.status(200).send("Recipe was created!");
  } catch (error) {
    res.send(error.sqlMessage || error.message);
  }
}
