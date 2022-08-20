import { faker } from "@faker-js/faker";

const columns = [
  { key: "id", label: "Id" },
  { key: "name", label: "Name" },
  { key: "lastName", label: "Last name" },
];
const fakeData = Array.from({ length: 10 }).map(() => ({
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  lastName: faker.name.lastName(),
}));

export const Table = () => {
  return (
    <table>
      <thead className="bg-red-100">
        <tr>
          {columns.map((c) => (
            <th className="text-center">{c.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {fakeData.map((fd) => (
          <tr>
            <td>{fd.id}</td>
            <td>{fd.name}</td>
            <td>{fd.lastName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
