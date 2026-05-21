export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const token = localStorage.getItem("royal_admin_token");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Erro ao comunicar com a API.");
  }

  if (response.status === 204) return null;
  return response.json();
}

export const api = {
  login: (payload) => request("/login", { method: "POST", body: JSON.stringify(payload) }),
  services: () => request("/services"),
  createService: (payload) => request("/services", { method: "POST", body: JSON.stringify(payload) }),
  updateService: (id, payload) => request(`/services/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteService: (id) => request(`/services/${id}`, { method: "DELETE" }),
  barbers: () => request("/barbers"),
  createBarber: (payload) => request("/barbers", { method: "POST", body: JSON.stringify(payload) }),
  updateBarber: (id, payload) => request(`/barbers/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  appointments: () => request("/appointments"),
  createAppointment: (payload) => request("/appointments", { method: "POST", body: JSON.stringify(payload) }),
  deleteAppointment: (id) => request(`/appointments/${id}`, { method: "DELETE" })
};
