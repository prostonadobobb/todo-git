import { useState } from 'react';
import './RepoInput.scss';

export const RepoInput = () => {
  const [url, setUrl] = useState('')

  return (
    <div className="repo">
      <input 
        type="text"
        placeholder="Введіть URL репозиторію"
        className="repo__input" 
        value={url}
      />
    </div>
  );
};