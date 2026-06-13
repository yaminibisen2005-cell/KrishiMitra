import api from "./api";

export interface HelplineTicket {
  id: string;
  farmerName: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'Needs Response' | 'Resolved';
  adminReply?: string;
}

export const getTickets = async (): Promise<HelplineTicket[]> => {
  const response = await api.get("/api/tickets");
  return response.data;
};

export const replyToTicket = async (id: string, adminReply: string) => {
  const response = await api.put(`/api/tickets/${id}/reply`, { adminReply });
  return response.data;
};