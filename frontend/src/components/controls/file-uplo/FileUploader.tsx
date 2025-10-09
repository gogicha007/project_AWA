import { useState } from "react";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {file && <div>{file.name}</div>}
    </div>
  );
}
