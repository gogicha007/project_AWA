// file uploader to backend
import { useState } from 'react';
import axios from 'axios';
import { useTranslations } from 'next-intl';

type Props = {
  accept?: string[];
  disabled?: boolean;
  httpPath?: string;
  multiple?: boolean;
  maxFileSizeMB?: number;
};

type UploadStatus = 'idle' | 'uploading' | 'error' | 'success';

export default function FileUploader({
  accept,
  httpPath,
  disabled = false,
  multiple = false,
  maxFileSizeMB = 5,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const tFU = useTranslations('FileUploader');

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      if (event.target.files[0].size > maxFileSizeMB * 1024 * 1024) {
        alert(
          tFU('file_too_large', { size: maxFileSizeMB }) ||
            `File size must be less than ${maxFileSizeMB} MB`
        );
        return;
      }
      setFile(event.target.files[0]);
    }
  }

  async function handleFileUpload() {
    if (!file) return;

    setStatus('uploading');
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    console.log(formData.get('file'));

    try {
      const response = await axios.post(
        httpPath || 'https://httpbin.org/post',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total || 0;
            const current = progressEvent.loaded || 0;
            setUploadProgress(Math.round((current / total) * 100));
          },
        }
      );
      if (response.status !== 200) throw new Error('Upload failed');
      setStatus('success');
      setUploadProgress(100);
    } catch {
      setStatus('error');
      setUploadProgress(0);
    }
  }

  function handleRemoveFile() {
    setFile(null);
    setStatus('idle');
    setUploadProgress(0);
  }

  return (
    <div
      className="inline-flex flex-col items-start gap-2 rounded bg-gray-50"
      style={{ padding: '5px' }}
    >
      <label
        htmlFor="file-input"
        className="text-md block font-medium whitespace-nowrap text-gray-700"
      >
        {multiple ? tFU('select_files') : tFU('select_file')}
      </label>
      <input
        id="file-input"
        type="file"
        accept={accept?.join(',')}
        disabled={disabled || status === 'uploading'}
        multiple={multiple}
        className="text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
        onChange={handleFileChange}
      />
      {file && (
        <div className="text-sm">
          <div className="flex items-center gap-2 rounded bg-gray-50 p-2">
            <p>
              {tFU('file_name')}: {file.name}
            </p>
            <p>
              {tFU('file_size')}: {(file.size / 1024).toFixed(2)} KB
            </p>
            <button
              type="button"
              onClick={() => handleRemoveFile()}
              className="ml-2 rounded bg-transparent text-red-600 hover:bg-red-200"
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {status === 'uploading' && (
        <div className="min-w-64 space-y-2">
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            {tFU('uploading')}: {uploadProgress}%
          </p>
        </div>
      )}

      {file && status !== 'uploading' && (
        <button
          className="rounded bg-blue-500 text-white hover:bg-blue-600"
          style={{ padding: '2px 6px' }}
          onClick={handleFileUpload}
        >
          {tFU('upload')}
        </button>
      )}

      {status === 'success' && (
        <p className="mt-2 text-sm text-green-600">{tFU('success')}</p>
      )}

      {status === 'error' && (
        <p className="mt-2 text-sm text-red-600">{tFU('error')}</p>
      )}
    </div>
  );
}
