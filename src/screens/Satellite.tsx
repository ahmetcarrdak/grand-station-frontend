import Menu from "../components/utils/Menu";
import TableComponent from "../components/utils/Table";

function Satellite() {
  interface NoteRow {
    id: number;
    name: string;  // API'den gelen "name" alanı küçük harfle başlamalı
    task: string;  // API'den gelen "task" alanı
    createdAt: string;  // API'den gelen "createdAt" alanı
  }

  const noteColumns = [
    { name: "ID", selector: (row: NoteRow) => row.id, sortable: true },
    { name: "Name", selector: (row: NoteRow) => row.name, sortable: true }, // "Name" yerine "name" kullanıldı
    { name: "Created At", selector: (row: NoteRow) => row.createdAt, sortable: true }, // "date" yerine "createdAt" kullanıldı
    { name: "Task", selector: (row: NoteRow) => row.task, sortable: true }, // "Task" için doğru alan
  ];

  return (
    <>
      <div className="screen">
        <Menu />
        <div className="body">
          <div className="title_container">
            <h2>Satellite List</h2>
          </div>
          <div className="table_container">
            <TableComponent
              tableName="Notes"
              columns={noteColumns}
              apiUrl="Grand"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Satellite;
