use sui_rpc::Client;
use sui_rpc::proto::sui::rpc::v2::GetServiceInfoRequest;
use sui_rpc::proto::sui::rpc::v2::SubscribeEventsRequest;
use sui_rpc::proto::sui::rpc::v2::EventFilter;
use sui_rpc::proto::sui::rpc::v2::event_filter::Filter;
use futures_util::StreamExt;
use tokio::sync::mpsc::Sender;


pub async fn connect() -> Option<Client> {
    match Client::new("https://fullnode.mainnet.sui.io:443") {
        Ok(mut client) => {
            let mut ledger = client.ledger_client();
            match ledger.get_service_info(GetServiceInfoRequest::default()).await {
                Ok(response) => {
                    let info = response.into_inner();
                    println!("Connected to Sui chain: {:?}", info.chain);
                    println!("Current epoch: {:?}", info.epoch);
                }
                Err(e) => {
                    println!("Connection check failed: {}", e);
                    return None;
                }
            }
            Some(client)
        }
        Err(e) => {
            println!("Connection failed: {}", e);
            None
        }
    }
}


pub async fn subscribe_to_events(client: Client, tx: Sender<String>) {
    let mut subscription = client.subscription_client();

    let filter = EventFilter {
        filter: Some(Filter::Package(
            "0x2c8d603bc51326b8c13cef9dd07031a408a48dddb541963357661df5d3204809".to_string()
        )),
    };

    let request = SubscribeEventsRequest {
        filter: Some(filter),
    };

    match subscription.subscribe_events(request).await {
        Ok(response) => {
            let mut stream = response.into_inner();
            println!("Subscribed to DeepBook events");

            while let Some(result) = stream.next().await {
                match result {
                    Ok(event) => {
                        println!("Raw event received: {:?}", event.event_type);
                    }
                    Err(e) => {
                        println!("Stream error: {}", e);
                        break;
                    }
                }
            }
        }
        Err(e) => println!("Subscription failed: {}", e),
    }
}