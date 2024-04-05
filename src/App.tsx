import React, { useState } from "react";
import "./App.scss";
import { RepoInput } from "./components/RepoInput";
// import { Octokit } from "@octokit/core";

export const App: React.FC = () => {
  const [issues, setIssues] = useState<any[]>([]);
  const [error, setError] = useState(false);

  // const token = new Octokit({
  //   auth: "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",
  // });

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
        setIssues(data);
      })
      .catch((error) => {
        console.error("Помилка запиту до GitHub API:", error);
      });
  };

  console.log(issues);

  const prepharedTodo = issues.filter((issue) => issue.state === "open");
  const preharedInProgress = issues.filter((issue) => issue.state && issue.assignee)
  const preharedClosed = issues.filter((issue) => issue.state === "closed")

  console.log(prepharedTodo);

  function calculateDateDifferent(dateCreated: string) {
    const createdAt = new Date(dateCreated);
    const currentDate = new Date();

    const differenceInMilliseconds =
      currentDate.getTime() - createdAt.getTime();
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 3600 * 24)
    );

    return differenceInDays;
  }

  return (
    <div className="App">
      <div className="App__container">
        <div className="input">
          <RepoInput onSubmit={handleRepoSubmit} setError={setError} />
          {error && <div className="input__error">Не вірний URL!!!</div>}
        </div>

        <div className="table">
          <div className="table__column">
            <div className="table__column--title">ToDo</div>

            {prepharedTodo.map((todo) => (
              <div className="card">
                <div className="card__row">
                  <div className="card__number">{todo.number}</div>
                  <div className="card__status">{todo.state}</div>
                  <div className="card_update">
                    {`${calculateDateDifferent(todo.created_at)} days ago`}
                  </div>
                </div>

                <div className="card__row">
                  <div className="card__type">{todo.user.type}</div>
                  <span>|</span>
                  <div className="card__comments">{`Comments: ${todo.comments}`}</div>
                </div>
              </div>
            ))}

          </div>

          <div className="table__column">
            <div className="table__column--title">In Progress</div>

            {preharedInProgress.map((todo) => (
              <div className="card">
                <div className="card__row">
                  <div className="card__number">{todo.number}</div>
                  <div className="card__status">{todo.state}</div>
                  <div className="card_update">
                    {`${calculateDateDifferent(todo.created_at)} days ago`}
                  </div>
                </div>

                <div className="card__row">
                  <div className="card__type">{todo.user.type}</div>
                  <span>|</span>
                  <div className="card__comments">{`Comments: ${todo.comments}`}</div>
                </div>
              </div>
            ))}

          </div>

          <div className="table__column">
            <div className="table__column--title">Done</div>

            {preharedClosed.map((todo) => (
              <div className="card">
                <div className="card__row">
                  <div className="card__number">{todo.number}</div>
                  <div className="card__status">{todo.state}</div>
                  <div className="card_update">
                    {`${calculateDateDifferent(todo.created_at)} days ago`}
                  </div>
                </div>

                <div className="card__row">
                  <div className="card__type">{todo.user.type}</div>
                  <span>|</span>
                  <div className="card__comments">{`Comments: ${todo.comments}`}</div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
