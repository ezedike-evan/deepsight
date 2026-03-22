mod types;
mod deepbook;
mod websocket;

use tokio::spawn;
use tokio::join;
use tokio::time::{sleep, Duration};
use tokio::sync::mpsc::channel;
use websocket::start_websocket_server;


#[tokio::main]
async fn main() {
    println!("DeepSight server starting...");
    let (tx, rx) = channel::<String>(100);

    let handle1 = spawn(async move{
        loop {
        match deepbook::connect().await {
            Some(client) => {
                println!("Connection established, starting event subscription...");
                deepbook::subscribe_to_events(client, tx.clone()).await;
                println!("Subscription ended, reconnecting in 5 seconds...");
            }
            None => {
                println!("Connection failed, retrying in 5 seconds...");
            }
        }
        sleep(Duration::from_secs(5)).await;
        }
    });

    let handle2 = spawn(async {
        start_websocket_server(rx).await;
    });

    let _ = join!(handle1, handle2);
}