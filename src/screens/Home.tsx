import { useState, useEffect } from "react";
import Menu from "../components/utils/Menu";
import LogAccess from "../components/utils/LogAccess";

interface Satellite {
  id: number;
  name: string;
  isDeleted: boolean;
  task: string;
  createdAt: string;
  updatedAt: string;
}

function Home() {
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(null);
  const [count, setCount] = useState(0); // Sayaç durumu
  const [started, setStarted] = useState(false); // Sayaç başlatıldı mı?
  const [buttonText, setButtonText] = useState("Start"); // Buton yazısı

  const handleClick = () => {
    setStarted(true); // Sayaç başlatılıyor
    setButtonText("Starting..."); // Buton yazısı değişiyor
  };

  useEffect(() => {
    if (started) {
      const timer = setTimeout(() => {
        if (count < 1000) {
          setCount(count + 1);
        }
      }, 10); // Hız ayarı
      return () => clearTimeout(timer);
    }
  }, [count, started]);

  // API'den uydu verilerini çekme işlemi
  useEffect(() => {
    const fetchSatellites = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await fetch("http://localhost:5096/api/Grand/All", {
          headers: {
            method: "GET",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Token'ı burada ekleyin
          },
        });

        // HTTP isteği başarılıysa, verileri al
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Satellite[] = await response.json();
        console.log("Satellite data:", data);
        setSatellites(data); // API'den gelen veriyi state'e kaydet
      } catch (error) {
        console.error("Failed to fetch satellite data", error);
      }
    };

    fetchSatellites();
  }, []);

  const handleSatelliteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const satellite = satellites.find((sat) => sat.id === parseInt(selectedId));
    setSelectedSatellite(satellite || null); // Seçilen uyduyu state'e kaydet
  };

  // Tarihleri daha okunabilir bir formata dönüştüren fonksiyon
  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="screen">
      <Menu />
      <div className="home_body">
        <div className="home_item">
          <div className="grand_info">
            <div className="title">
              <h3>Satellite Info</h3>
              <select name="" id="" onChange={handleSatelliteChange}>
                <option value="">Select Satellite</option>
                {satellites.map((satellite) => (
                  <option key={satellite.id} value={satellite.id}>
                    {satellite.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="body">
              {selectedSatellite ? (
                <ul>
                  <li>Id: {selectedSatellite.id}</li>
                  <li>Name: {selectedSatellite.name}</li>
                  <li>Create Date: {formatDate(selectedSatellite.createdAt)}</li>
                  <li>Update Date: {formatDate(selectedSatellite.updatedAt)}</li>
                </ul>
              ) : (
                <p>Please select a satellite</p>
              )}
            </div>
          </div>
          <div className="grand_task">
            <div className="title">
              <h3>Task:</h3>
            </div>
            <div className="body">
              {selectedSatellite ? (
                <ul>
                  <li>{selectedSatellite.task}</li>
                </ul>
              ) : (
                <p>No task selected</p>
              )}
            </div>
          </div>
        </div>
        <div className="home_item">
          <div className="counter">
            <div className="counter_item">
              <div className={`count ${started ? "count_visible" : ""}`}>
                {count} <small className="metre">m</small>
              </div>
              <div className={`start_button ${started ? "button_active" : ""}`}>
                <button onClick={handleClick}>{buttonText}</button>
              </div>
            </div>
          </div>
        </div>
        <LogAccess />
      </div>
    </div>
  );
}

export default Home;
