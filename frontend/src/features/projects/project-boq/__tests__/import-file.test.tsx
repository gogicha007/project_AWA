// frontend/src/components/projects/project-boq/components/ImportFile.test.tsx
// We recommend installing an extension to run jest tests.

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ImportFile } from '../components/import-data/ImportData';
import { processFile as mockedProcessFileImport } from '../utils/ProcessFile';

jest.mock('../utils/ProcessFile', () => ({
  processFile: jest.fn(),
}));

const mockedProcessFile = mockedProcessFileImport as unknown as jest.Mock;

describe('ImportFile component', () => {
  const onFileSelect = jest.fn();
  const onFileError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders file input and two buttons', () => {
    const { container } = render(
      <ImportFile onFileSelect={onFileSelect} onFileError={onFileError} />
    );

    const input = container.querySelector('input[type="file"]') as HTMLInputElement | null;
    expect(input).toBeTruthy();

    expect(screen.getByText('XLSX/CSV')).toBeTruthy();
    expect(screen.getByText('Clipboard')).toBeTruthy();
  });

  it('clicking XLSX/CSV button triggers file input click', () => {
    const { container } = render(
      <ImportFile onFileSelect={onFileSelect} onFileError={onFileError} />
    );
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const button = screen.getByText('XLSX/CSV');

    const clickSpy = jest.spyOn(input, 'click');
    fireEvent.click(button);
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('selecting a file calls processFile and onFileSelect on success', () => {
    const processed = { rows: [{ a: 1 }] };
    mockedProcessFile.mockImplementation((file: File, onSuccess: any, onError: any) => {
      onSuccess(processed);
    });

    const { container } = render(
      <ImportFile onFileSelect={onFileSelect} onFileError={onFileError} />
    );
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    const file = new File(['dummy'], 'test.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockedProcessFile).toHaveBeenCalled();
    expect(onFileSelect).toHaveBeenCalledWith(processed);
    expect(onFileError).toHaveBeenCalledWith(null);
  });

  it('selecting a file calls onFileError and onFileSelect(null) on error', () => {
    const errorMessage = 'invalid file';
    mockedProcessFile.mockImplementation((file: File, onSuccess: any, onError: any) => {
      onError(errorMessage);
    });

    const { container } = render(
      <ImportFile onFileSelect={onFileSelect} onFileError={onFileError} />
    );
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    const file = new File(['dummy'], 'test.csv', { type: 'text/csv' });
    fireEvent.change(input, { target: { files: [file] } });

    expect(mockedProcessFile).toHaveBeenCalled();
    expect(onFileError).toHaveBeenCalledWith(errorMessage);
    expect(onFileSelect).toHaveBeenCalledWith(null);
  });

  it('clicking Clipboard button logs message', () => {
    render(<ImportFile onFileSelect={onFileSelect} onFileError={onFileError} />);
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const clipButton = screen.getByText('Clipboard');
    fireEvent.click(clipButton);
    expect(consoleSpy).toHaveBeenCalledWith('on clipboard');
    consoleSpy.mockRestore();
  });
});