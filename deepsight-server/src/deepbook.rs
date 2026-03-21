use sui_rpc::Client;
use sui_rpc::proto::sui::rpc::v2::GetServiceInfoRequest;

pub async fn connect() {
    match Client::new("https://fullnode.mainnet.sui.io:443") {
        Ok(mut client) => {
            println!("Connected to Sui mainnet");
            let mut ledger = client.ledger_client();
            match ledger.get_service_info(GetServiceInfoRequest::default()).await {
                Ok(response) => {
                    let info = response.into_inner();
                    println!("Chain: {:?}", info.chain);
                    println!("Epoch: {:?}", info.epoch);
                    println!("Checkpoint height: {:?}", info.checkpoint_height);
                }
                Err(e) => println!("Request failed: {}", e),
            }
        }
        Err(e) => println!("Connection failed: {}", e),
    }
}