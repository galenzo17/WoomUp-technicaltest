import { Handler } from "express";
import { nanoid } from "nanoid";
import { getConnection } from "../db";





export const getMatchesByTypeCount: Handler =(req , res)=>{
  const count= getConnection().get("users").value();

}

export const getUsers: Handler = (req, res) => {
  const data = getConnection().get("users").value();
  return res.json(data);
};

export const createUser: Handler = (req, res) => {
  const { name, roles,enterprises } = req.body;

  const newUsers = { name, roles, enterprises,  id: nanoid() };

  try {
    getConnection().get("users").push(newUsers).write();
    res.json(newUsers);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUser: Handler = (req, res) => {
  const userFound = getConnection()
    .get("users")
    .find({ id: req.params.id })
    .value();

  if (!userFound) return res.status(404).json({ msg: "User was not found" });

  res.json(userFound);
};

export const count: Handler = (req, res) => {
  const usersLength = getConnection().get("users").value().length;
  res.json(usersLength);
};

export const deleteUser: Handler = (req, res) => {
  const userFound = getConnection()
    .get("users")
    .find({ id: req.params.id })
    .value();

  if (!userFound) {
    return res.status(404).json({ msg: "User was not found" });
  }

  const deletedUser= getConnection()
    .get("users")
    .remove({ id: req.params.id })
    .write();

  res.json(deletedUser);
};

export const updateUser: Handler = (req, res) => {
  try {
    const userFound = getConnection()
      .get("users")
      .find({ id: req.params.id })
      .value();

    if (!userFound) {
      return res.status(404).json({ msg: "User was not found" });
    }

    const updatedUser = getConnection()
      .get("users")
      .find({ id: req.params.id })
      .assign(req.body)
      .write();

    res.json(updatedUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};
