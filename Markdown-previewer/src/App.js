import { useState, useEffect } from "react";
import { marked } from "marked";
import "./App.css";

function App() {
  const defaultText = `# Markdown Previewer
## Subheading
[GitHub](https://github.com)
\`inline code\`

\`\`\`
code block
\`\`\`

- List item

> Blockquote

![Image](https://via.placeholder.com/100)

**Bold text**
`;

  const [text, setText] = useState(defaultText);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    marked.setOptions({
      breaks: true,
    });
  }, []);

  return (
    <div className="App">
      <textarea
        id="editor"
        value={text}
        onChange={handleChange}
        placeholder="Enter Markdown here..."
      />
      <div
        id="preview"
        dangerouslySetInnerHTML={{ __html: marked(text) }} // Ensure this line is exactly like this
      ></div>
    </div>
  );
}

export default App;
