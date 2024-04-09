import React, { useState } from "react";
import "./App.scss";
import { RepoInput } from "./components/RepoInput/RepoInput";
import { Octokit } from "@octokit/core";
import { Card } from "./type/card";
import { Section } from "./type/section";
import { Kanban } from "./components/Kanban/Kanban";

export const App: React.FC = () => {
  const [data, setData] = useState<Section[]>([]);
  const [error, setError] = useState(false);

  const token = new Octokit({
    auth: "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",
  });

  const handleRepoSubmit = async (owner: string, repo: string) => {
    token
      .request(`GET /repos/${owner}/${repo}/issues`, {
        owner: "OWNER",
        repo: "REPO",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
        state: "all",
      })
      .then((response) => {
        const data = response.data;

        const prepharedOpen = data.filter((card: Card) => card.state === "open"&& !card.assignee)
        const prepharedInProgress = data.filter((card: Card) => card.state === "open" && card.assignee)
        const prepharedClosed = data.filter((card: Card) => card.state === "closed")

        const sortData = [
          {id: '1', title: 'Open', cards: prepharedOpen}, 
          {id: '2', title: 'InProgress', cards: prepharedInProgress}, 
          {id: '3', title: 'Closed', cards: prepharedClosed}, 
        ]

        setData(sortData);
      })
      .catch((error) => {
        console.error("Помилка запиту до GitHub API:", error);
      });
  };

  console.log(data);

  return (
    <div className="App">
      <div className="App__container">

        <div className="input">
          <RepoInput onSubmit={handleRepoSubmit} setError={setError} />
          {error && <div className="input__error">Не вірний URL!!!</div>}
        </div>

        <Kanban data={data} setData={setData} />
      </div>
    </div>
  );
};

export default App;
