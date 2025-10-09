import FileUploader from "@/components/controls/file-uplo/FileUploader";
export const ProjectBoq: React.FC<{ projectId: number }> = ({ projectId }) => {
  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="text-lg font-semibold">Bill of Quantities (BoQ) for Project ID: {projectId}</h2>
      <FileUploader />
    </div>
  );
};
