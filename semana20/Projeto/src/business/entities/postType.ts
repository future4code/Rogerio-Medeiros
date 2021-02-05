import { type } from "os";

export enum POST_TYPES {
  NORMAL = "normal",
  EVENT = "event",
}

export type Post = {
  id: string;
  photo: string;
  description: string;
  type: POST_TYPES;
  createdAt: Date;
  authorId: string;
};

export type InputCreatePostBusiness = {
  photo: string;
  description: string;
  type: string;
  token: string;
};
