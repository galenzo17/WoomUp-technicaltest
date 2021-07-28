import { Router } from "express";
import {
  getUsers,
  createUser,
  count,
  deleteUser,
  getUser,
  updateUser,
  getMatchesById,
  matchesCount,
  matchesTypesCountById,
} from "../controllers/user.controller";

const router = Router();

/**
 * @swagger
 components:
 *  schemas:
 *    MatchTypeCount:
 *      type: object
 *      properties:
 *        networkingcount:
 *          type: integer
 *        mentoriacount:
 *          type: integer
 *        internocount:
 *          type: integer
 *        mentoriainternacount:
 *          type: integer
 *    Match:
 *      type: object
 *      properties:
 *        matchtype:
 *          type: string
 *        usernamematch:
 *          type: string
 *    Enterprise:
 *      type: object
 *      properties:
 *        enterprise:
 *          type: string
 *    Role:
 *      type: object
 *      properties:
 *        role:
 *          type: string
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: the auto-generated id of user
 *        name:
 *          type: string
 *          description: the name of the user
 *        roles:
 *          type: object
 *          description: roles of the user
 *          items:
 *           $ref: '#/components/schemas/Role'
 *        enterprises:
 *          type: array
 *          description: a list of enterprises
 *          items:
 *           $ref: '#/components/schemas/Enterprise'
 *        matches:
 *          type: array
 *          description: a list of matches
 *          items:
 *           $ref: '#/components/schemas/Match'
 *    UserNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found user
 *      example:
 *        msg: User was not found
 *
 *  parameters:
 *    userId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the user id
 */

/**
 * @swagger
 * tags:
 *  - name: Users
 *    description: Users endpoints
 *  - name: Matchs
 *    description: Matchs endpoints
 */

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Returns a list of users
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: the list of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */

router.get("/users", getUsers);

/**
 * @swagger
 * /users/count:
 *  get:
 *    summary: Get a user by Id
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: the total number of users
 *        content:
 *          text/plain:
 *            schema:
 *              type: integer
 *              example: 15
 *
 */
router.get("/users/count", count);

/**
 * @swagger
 * /users:
 *  post:
 *    summary: create a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: the users was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: Some server error
 *
 */
router.post("/users", createUser);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    summary: get a user by Id
 *    tags: [Users]
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *    responses:
 *      200:
 *        description: The Found User
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/User'
 *      404:
 *        description: the user was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserNotFound'
 */
router.get("/users/:id", getUser);

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    summary: delete a user by id
 *    tags: [Users]
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *    responses:
 *      200:
 *        description: the user was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/User'
 *      404:
 *        description: the user was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserNotFound'
 *
 */
router.delete("/users/:id", deleteUser);

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update a user by id
 *    tags: [Users]
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The updated user 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/User'
 *      404:
 *        description: the user was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserNotFound'
 *
 */
router.put("/users/:id", updateUser);

/**
 * @swagger
 * /matchesbyid/{id}:
 *  get:
 *    summary: Matches from an user by id
 *    tags: [Matchs]
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *    responses:
 *      200:
 *        description: The list of matches
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Match'
 *      404:
 *        description: the matchs user was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserNotFound'
 *
 */
router.get("/matchesbyid/:id",getMatchesById);

/**
 * @swagger
 * /coutnbyid/{id}:
 *  get:
 *    summary: Get a user by Id
 *    tags: [Matchs]
 *    responses:
 *      200:
 *        description: the total number of matchs by id
 *        content:
 *          text/plain:
 *            schema:
 *              type: integer
 *              example: 15
 *
 */
router.get("/coutnbyid/:id",matchesCount);

/**
 * @swagger
 * /coutnbytype/{id}:
 *  get:
 *    summary: Matches from an user by id
 *    tags: [Matchs]
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *    responses:
 *      200:
 *        description: The list of matches
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/MatchTypeCount'
 *      404:
 *        description: the matchs user was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserNotFound'
 *
 */
router.get("/coutnbytype/:id",matchesTypesCountById);

export default router;
