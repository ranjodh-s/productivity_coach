import API from './api';

export const getTodayPlan=()=> API.get("/ai/today");
export const regeneratePlan=()=> API.get("/ai/regenerate");