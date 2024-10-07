import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../assets/css/setting.css";
import { CiSaveDown1 } from "react-icons/ci";
import { FcDeleteDatabase } from "react-icons/fc";
import { IoAdd } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";

interface TableComponentProps {
  tableName: string;
  columns: any[];
  apiUrl: string; // Kontrolör adı
}

const TableComponent: React.FC<TableComponentProps> = ({
  tableName,
  columns,
  apiUrl, // Kontrolör adı
}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const baseApiUrl = "http://localhost:5096/api";

  // Fetch verilerini al
  const fetchData = async () => {
    setLoading(true);
    try {
      // Kontrolör adını kullanarak tam URL oluştur
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseApiUrl}/${apiUrl}/All`,
        {
          headers: {
            method: "GET",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Token'ı burada ekleyin
          },
        }
      );
      if (!response.ok) {
        throw new Error("Veri alınamadı");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // WebSocket bağlantısını başlat
  const initWebSocket = () => {
    const socket = new WebSocket("ws://localhost:5096/api/WebSocket"); // WebSocket URL
    socket.onopen = () => {
      console.log("WebSocket bağlantısı açıldı");
    };
    
    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data); // Gelen veriyi çöz
      console.log("Gelen veri:", newData);
      setData((prevData) => [...prevData, newData]); // Yeni veriyi mevcut verilere ekle
    };
    
    socket.onclose = () => {
      console.log("WebSocket bağlantısı kapandı");
    };

    return socket;
  };

  useEffect(() => {
    fetchData(); // Bileşen yüklendiğinde verileri al

    const socket = initWebSocket(); // WebSocket bağlantısını başlat

    // Bileşen kaldırıldığında WebSocket bağlantısını kapat
    return () => {
      socket.close();
    };
  }, [apiUrl, baseApiUrl]); // apiUrl ve baseApiUrl bağımlılıkları

  // PDF indirme fonksiyonu
  const downloadPdf = () => {
    const doc = new jsPDF() as any;
    doc.text(`${tableName}`, 20, 10);
    doc.autoTable({
      head: [columns.map((col) => col.name)],
      body: data.map((row) => columns.map((col) => col.selector(row))),
    });
    doc.save(`${tableName}.pdf`);
  };

  // Filtreleme fonksiyonu
  const filteredData = () => {
    return data.filter((row) => {
      return (
        row.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.city?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  return (
    <div className="data_table_container">
      <div className="head_inputs">
        <div className="table_head_left">
          {/* CSV Export */}
          <CSVLink
            data={data}
            filename={`${tableName}.csv`}
            style={{ textDecoration: "none" }}
          >
            <button className="table_head_button">
              <CiSaveDown1 /> CSV
            </button>
          </CSVLink>

          {/* PDF Export */}
          <button onClick={downloadPdf} className="table_head_button">
            <CiSaveDown1 /> PDF
          </button>

          {/* Delete All Row */}
          <button className="table_head_button">
            <FcDeleteDatabase /> All
          </button>

          {/* Add Data */}
          <button className="table_head_button">
            <IoAdd /> Add
          </button>

          {/* Edit Button */}
          <button className="table_head_button">
            <LuPencilLine /> Edit
          </button>

          {/* View Button */}
          <button className="table_head_button">
            <FaRegEye /> View
          </button>
        </div>

        <div className="table_head_right">
          <input
            type="search"
            placeholder="Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="table_filter_serach_input"
          />
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={filteredData()}
        pagination
        persistTableHead
        progressPending={loading} // Yüklenme durumu
        customStyles={style}
        noDataComponent="Veri Bulunamadı"
        selectableRows // Checkbox eklemek için
        selectableRowsHighlight // Seçilen satırları vurgulamak için
        onSelectedRowsChange={({ selectedRows }) => {
          console.log("Seçilen Satırlar:", selectedRows);
        }}
      />
    </div>
  );
};

// Stil ayarları
const style = {
  rows: {
    style: {
      minHeight: "72px",
      backgroundColor: "#111d4a",
      color: "#e6e6e9",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#111d4a",
      color: "#e6e6e9",
    },
  },
  cells: {
    style: {
      padding: "12px",
      backgroundColor: "#111d4a",
    },
  },
  pagination: {
    style: {
      backgroundColor: "#111d4a",
      color: "#66666e",
      fontWeight: "bold",
    },
    pageButtonsStyle: {
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      padding: "8px",
      margin: "0 5px",
      cursor: "pointer",
      color: "#66666e",
    },
  },
};

export default TableComponent;
