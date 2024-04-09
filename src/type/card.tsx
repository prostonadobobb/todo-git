export type Card = {
  id: string,
  number: number;
  state: string;
  created_at: string;
  user: { type: string };
  comments: number;
  assignee: string | null;
  status: string,
}