import { ImportFile } from './components/ImportFile';

export const ProjectBoq: React.FC<{ projectId: number }> = ({ projectId }) => {
  const processFile = (file: File) => {
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ];

    if (!validTypes.includes(file.type)) {
      alert('Please select a valid XLSX or CSV file.');
      return;
    }
    console.log('Selected file:', file);
  };
  return (
    <div className="flex flex-col items-start gap-4 p-6">
      <h2 className="text-lg font-semibold">
        Bill of Quantities (BoQ) for Project ID: {projectId}
      </h2>
      <ImportFile onFileSelect={processFile} />
    </div>
  );
};
