import API from "./api";

export const register = (user)=>

API.post("/auth/register",user);

export const login = (user)=>

API.post("/auth/login",user);