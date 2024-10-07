function Example() {
  const socket = new WebSocket("ws://localhost:5096/api/WebSocket");

  socket.onopen = () => {
    console.log("WebSocket bağlantısı açıldı!");
    socket.send("Merhaba Sunucu!");
  };

  socket.onmessage = (event) => {
    console.log("Sunucudan gelen mesaj:", event.data);
  };

  socket.onclose = () => {
    console.log("WebSocket bağlantısı kapandı.");
  };

  // @ts-ignore
  const sendMessage = (message) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.log("WebSocket bağlantısı açık değil!");
    }
  };

  return (
    <div>
      <h1>WebSocket ile Bağlanılıyor...</h1>
      <button
        onClick={() => sendMessage("Yeni bir mesaj göndermek istiyorum!")}
      >
        Mesaj Gönder
      </button>
    </div>
  );
}

export default Example;
