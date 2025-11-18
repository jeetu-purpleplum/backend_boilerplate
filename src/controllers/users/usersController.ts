import { Request, Response, Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../../services/users/usersService";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserSchema } from "../../schemas/userSchema";
// import { CreateUserSchema } from "../../validations/users/users.validation";


const userController: Router = Router();


userController.get("/", async(req: Request, res: Response) => {
    const users = await getAllUsers();
    res.json({ status: "success", data: users });
  }
);

userController.get("/:id", async(req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ status: "success", data: user });
  }
);

userController.post("/", validateRequest(createUserSchema), async (req: Request, res: Response) => {
    // const parsedData = CreateUserSchema.parse(req.body);
    const user = await createUser(req.body);
    res.status(201).json({ status: "success", data: user });
  }
);


userController.put("/:id", async(req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await updateUser(id, req.body);
    res.json({ status: "success", data: updated });
  }
);

userController.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteUser(id);
    res.status(204).send();
  }
);


export default userController;
