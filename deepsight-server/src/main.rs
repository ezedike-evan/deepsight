mod types;
mod deepbook;
mod websocket;

use tokio::spawn;
use tokio::join;
use tokio::sync::mpsc::channel;
use websocket::start_websocket_server;


#[tokio::main]
async fn main() {
    println!("DeepSight server starting...");
    let (_tx, rx) = channel::<String>(100);

    let handle1 = spawn(async move{
        loop {
            deepbook::connect().await;
            tokio::time::sleep(tokio::time::Duration::from_secs(10)).await;
        }
    });

    let handle2 = spawn(async {
        start_websocket_server(rx).await;
    });

    let _ = join!(handle1, handle2);
}