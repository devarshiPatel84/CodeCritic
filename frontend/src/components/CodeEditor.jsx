import React from 'react';
import { Editor } from '@monaco-editor/react'; 
import '../styles/CodeEditor.css';

const CodeEditor = ({ code, setCode, language, setLanguage }) => {

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C/C++' }, 
    { value: 'go', label: 'Go' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'json', label: 'JSON' },
    { value: 'rust', label: 'Rust' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'swift', label: 'Swift' },
    { value: 'php', label: 'PHP' },
    { value: 'sql', label: 'SQL' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'shell', label: 'Bash/Shell Script' } 
  ];

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const editorOptions = {
    minimap: { enabled: false }, // Disable minimap (code overview on the right)
    lineNumbers: 'on',           // Show line numbers
    wordWrap: 'on',              // Wrap long lines
    scrollBeyondLastLine: false, // Don't allow scrolling past the last line
    automaticLayout: true,       // Auto-resize the editor
    fontSize: 14,                // Set font size
    tabSize: 2,                  // Set tab size
  };

  const editorTheme = 'hc-black';

  return (
    <div className="code-editor-container">
      <div className="editor-header">
        <label htmlFor="language-select" className="language-select-label">Language:</label>
        <select
          id="language-select"
          value={language}
          onChange={handleLanguageChange}
          className="language-select"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
      <div className="monaco-editor-wrapper">
        <Editor
          height="100%" 
          language={language} 
          theme={editorTheme}
          value={code}
          onChange={handleEditorChange}
          options={editorOptions}
        />
      </div>
    </div>
  );
};

export default CodeEditor;