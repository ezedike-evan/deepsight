use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct OrderFilled {
    pub pool_id: String,
    pub price: String,
    pub base_quantity: String,
    pub quote_quantity: String,
    pub taker_is_bid: bool,
    pub taker_fee: String,
    pub maker_fee: String,
    pub timestamp: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct OrderPlaced {
    pub pool_id: String,
    pub price: String,
    pub placed_quantity: String,
    pub is_bid: bool,
    pub order_id: String,
    pub balance_manager_id: String,
    pub expire_timestamp: String,
    pub timestamp: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct OrderCanceled {
    pub pool_id: String,
    pub price: String,
    pub order_id: String,
    pub is_bid: bool,
    pub base_asset_quantity_canceled: String,
    pub original_quantity: String,
    pub balance_manager_id: String,
    pub timestamp: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum DeepBookEvent {
    Filled(OrderFilled),
    Placed(OrderPlaced),
    Canceled(OrderCanceled),
}