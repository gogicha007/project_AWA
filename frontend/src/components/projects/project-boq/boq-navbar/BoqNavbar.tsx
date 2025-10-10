const navbarItems = [{ label: 'BoQ preparation', path: '/projects/[projectId]/boq' }];

export const BoqNavbar = () => {
  return (
    <ul>
      {navbarItems.map((item, idx) => (
        <li
          key={idx}
          className="mb-2 cursor-pointer text-gray-700 hover:text-blue-600"
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};
