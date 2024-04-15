import React, { useState } from "react";
import "./App.scss";
import { RepoInput } from "./components/RepoInput/RepoInput";
import { Kanban } from "./components/Kanban/Kanban";
import { useSelector } from "react-redux";

export const App: React.FC = () => {
  const [error, setError] = useState(false);
  const userProjectUrl = useSelector(
    (state: { userUrl: string }) => state.userUrl
  );
  let userProfileURL;

  if (userProjectUrl) {
    userProfileURL = userProjectUrl.split("/")[3];
  }

  return (
    <div className="App">
      <div className="App__container">
        <div className="inputField">
          <RepoInput setError={setError} />
        </div>

        {error && <div className="dataError">Invalid URL entered!!!</div>}

        {userProfileURL && !error && (
          <a href={`https://github.com/${userProfileURL}`}>
            Visit my Page =={">"}
          </a>
        )}

        {!error && <Kanban />}
      </div>
    </div>
  );
};

export default App;
