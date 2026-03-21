mod types;
mod websocket;

use serde_json::to_string;
use tokio::spawn;
use tokio::time::{sleep, Duration};
use tokio::join;
use tokio::sync::mpsc::channel;
use types::TradeEvent;
use websocket::start_websocket_server;


#[tokio::main]
async fn main() {
    println!("DeepSight server starting...");
    let (tx, rx) = channel::<String>(100);

    let handle1 = spawn(async move{
        loop {
            let event = TradeEvent{
                price: 3.8246,
                quantity: 1000.00,
                is_buyer_aggressor: true,
                timestamp: 0,
                pool_id: String::from("pool1")
            };
            println!("New trade event: {:?}", event);
            let json = to_string(&event).unwrap();
            println!("Serialized JSON: {}", json);
            if tx.send(json).await.is_err(){
                println!("WebSocket server disconnected, skipping event generation");
            };
            sleep(Duration::from_secs(2)).await;
        }
    });

    let handle2 = spawn(async {
        start_websocket_server(rx).await;
    });

    let _ = join!(handle1, handle2);
}