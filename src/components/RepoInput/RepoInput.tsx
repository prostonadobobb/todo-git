import React, { useState } from 'react';
import './RepoInput.scss';
import { Button, Form } from 'react-bootstrap';

interface RepoInputProps  {
  onSubmit: (url: string, repo: string) => void,
  setError: (error: boolean) => void,
}

export const RepoInput: React.FC<RepoInputProps> = ({ onSubmit, setError }) => {
  const [url, setUrl] = useState('');
  
  const handleButtonClick = () => {
    setError(false);
    const repoCustomer = url
      .replace('https://github.com/', '')
      .split('/')
      .filter(item => item !== '');

    if (repoCustomer.length === 2) {
      const [owner, repo] = repoCustomer;
      onSubmit(owner, repo);
    } else {
      setError(true);
    }
  };

  return (
    <div className="input__container">
      <Form.Group className="input">
      <Form.Label htmlFor="input" className="input__label">https://github.com/riktar/jkanban</Form.Label>
        <Form.Control
          id="input"
          type="text"
          placeholder="Введіть URL репозиторію"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Form.Label htmlFor="input" className="input__label">https://github.com/prostonadobobb/digital-proj</Form.Label>
        
      </Form.Group>
      <div className="button-group">
        <Button variant="primary" onClick={handleButtonClick}>Завантажити</Button>
      </div>
    </div>
  );
};