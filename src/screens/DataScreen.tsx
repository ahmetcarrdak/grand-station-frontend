import Menu from "../components/utils/Menu";
import TableComponent from "../components/utils/Table";

function DataScreen() {
  interface NoteRow {
    id: number;
    note: string;
    date: string;
  }
  
  const noteColumns = [
    { name: "ID", selector: (row: NoteRow) => row.id, sortable: true },
    { name: "Note", selector: (row: NoteRow) => row.note, sortable: true },
    { name: "Date", selector: (row: NoteRow) => row.date, sortable: true }
  ];
  return (
    <>
      <div className="screen">
        <Menu />
        <div className="body">
          <div className="title_container">
            <h2>Data List</h2>
          </div>
          <div className="table_container">
            <TableComponent
              tableName="Notes"
              columns={noteColumns}
              apiUrl="/api/notes"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DataScreen;
