mod types;

use tokio;
use types::TradeEvent;


#[tokio::main]
async fn main() {
    println!("DeepSight server starting...");

    let handle1 = tokio::spawn(async {
        loop {
            let event = TradeEvent{
                price: 3.8246,
                quantity: 1000.00,
                is_buyer_aggressor: true,
                timestamp: 0,
                pool_id: String::from("pool1")
            };
            println!("New trade event: {:?}", event);
            tokio::time::sleep(tokio::time::Duration::from_secs(2)).await;
        }
    });

    let handle2 = tokio::spawn(async {
        loop {
            println!("Serving WebSocket clients...");
            tokio::time::sleep(tokio::time::Duration::from_secs(3)).await;
        }
    });

    let _ = tokio::join!(handle1, handle2);
}