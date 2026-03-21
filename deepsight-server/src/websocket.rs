use futures_util::SinkExt;
use tokio::net::TcpListener;
use tokio_tungstenite::accept_async;
use tokio_tungstenite::tungstenite::Message;

pub async fn start_websocket_server() {
    let listener = TcpListener::bind("127.0.0.1:8080").await.unwrap();
    println!("WebSocket server listening on ws://127.0.0.1:8080");

    loop {
        let (stream, addr) = listener.accept().await.unwrap();
        println!("New client connected: {}", addr);

        tokio::spawn(async move {
            let mut ws_stream = accept_async(stream).await.unwrap();

            ws_stream
                .send(Message::Text("Connected to DeepSight".to_string().into()))
                .await
                .unwrap();
        });
    }
}