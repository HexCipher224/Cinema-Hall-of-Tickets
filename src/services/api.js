const BASE_URL = "http://localhost:5000/events";

export const fetchEvents = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createEvent = async (event) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  return res.json();
};

export const updateEvent = async (id, event) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  return res.json();
};

export const deleteEvent = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};
