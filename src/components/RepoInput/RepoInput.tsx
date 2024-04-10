import React, { useState } from 'react';
import './RepoInput.scss';
import { Button, Form } from 'react-bootstrap';

interface RepoInputProps  {
  onSubmit: (url: string, repo: string) => void,
}

export const RepoInput: React.FC<RepoInputProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  
  const handleButtonClick = () => {
    const repoCustomer = url
      .replace('https://github.com/', '')
      .split('/')
      .filter(item => item !== '');

      const [owner, repo] = repoCustomer;
      onSubmit(owner, repo);
  };

  return (
    <div className="repoInput">
      <Form.Group className="repoInput__group">
        <Form.Control
          id="input"
          type="text"
          placeholder="Введіть URL репозиторію"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="repoInput__group--example">Example: https://github.com/prostonadobobb/digital-proj/</div>
      </Form.Group>
      <div className="button-group">
        <Button 
          className="btn btn-secondary" 
          style={{ whiteSpace: 'nowrap' }}
          onClick={handleButtonClick}>
            Load issues
          </Button>
      </div>
    </div>
  );
};