import { ImportFile } from './components/ImportFile';

export const ProjectBoq: React.FC<{ projectId: number }> = ({ projectId }) => {
  const processFile = (file: File) => {

    if (file.name.slice(-4).toString() === '.csv') {
      console.log('this is csv file');
    }

    if (
      file.name.slice(-5).toString() === '.xlsx' ||
      file.name.slice(-4).toString() === '.xls'
    ) {
      console.log('this is excel file');
    }

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
