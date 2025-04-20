import { Request } from "express";

export type SortOrder = 'asc' | 'desc';
export type CustomRequest = Request & { token?: string, authorId?: string };