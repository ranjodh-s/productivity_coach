import API from './api';

export const saveSchedule = (schedule) =>
  API.post("/schedule", {
    schedule,
  });

export const getSchedule = () =>
  API.get("/schedule");

export const deleteSchedule = (id) =>
  API.delete(`/schedule/${id}`);