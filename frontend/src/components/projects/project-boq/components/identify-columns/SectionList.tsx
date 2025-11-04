type PropsSectonList = {
  tVar: (key: string) => string;
};
const SectionList = ({ tVar }: PropsSectonList) => {
  const sectionFields = [
    'sectionCode',
    'sectionName',
    'sectionType',
    'totalAmount',
  ];

  return (
    <div className="flex min-w-30 flex-col gap-3 rounded-lg bg-[var(--background-card)] p-4 shadow-sm">
      <p className="text-lg font-semibold text-[var(--primary-600)]">
        {tVar(`sections.title`)}
      </p>
      <ul className="flex flex-col gap-2">
        {sectionFields.map((field) => (
          <li
            value={field}
            key={field}
            id={field}
            className="rounded bg-[var(--primary-50)] px-3 py-2 text-sm font-medium text-[var(--primary-700)] transition-colors hover:bg-[var(--primary-100)]"
          >
            {tVar(`sections.field.${field}`)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionList;
