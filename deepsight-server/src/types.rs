use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct TradeEvent {
    pub price: f64,
    pub quantity: f64,
    pub is_buyer_aggressor: bool,
    pub timestamp: u64,
    pub pool_id: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct OrderBookLevel {
    pub price: f64,
    pub quantity: f64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct OrderBookSnapshot {
    pub bids: Vec<OrderBookLevel>,
    pub asks: Vec<OrderBookLevel>,
    pub timestamp: u64,
}   