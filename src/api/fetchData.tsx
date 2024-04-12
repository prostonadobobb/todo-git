import { Octokit } from "@octokit/core";
import { Card } from "../type/card";

const token = new Octokit({
  auth: "",
});

export const fetchIssues = async (owner: string, repo: string) => {
  try {
    const response = await token.request(`GET /repos/${owner}/${repo}/issues`, {
      owner: "OWNER",
      repo: "REPO",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      state: "all",
    });

    const data = response.data;
    const sortedData = getSortData(data);

    return sortedData;

  } catch (error) {
    console.error("Помилка запиту до GitHub API:", error);
    throw error;
  }
};

const getSortData = (data: Card[]) => {
  const prepharedOpen = data.filter((card: Card) => card.state === "open" && !card.assignee);
  const prepharedInProgress = data.filter((card: Card) => card.state === "open" && card.assignee)
    .map((item: Card) => ({ ...item, state: 'in progress' }));
  const prepharedClosed = data.filter((card: Card) => card.state === "closed");

  return [
    { id: '1', title: 'Open', cards: prepharedOpen },
    { id: '2', title: 'InProgress', cards: prepharedInProgress },
    { id: '3', title: 'Closed', cards: prepharedClosed },
  ];
};