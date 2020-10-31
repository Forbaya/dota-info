use std::collections::HashMap;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct Hero {
    id: i32,
    name: String,
    localized_name: String,
    primary_attr: String,
    attack_type: String,
    roles: Vec<String>,
    img: String,
    icon: String,
    base_health: f32,
    base_health_regen: Option<f32>,
    base_mana: i32,
    base_mana_regen: f32,
    base_armor: f32,
    base_mr: i32,
    base_attack_min: i32,
    base_attack_max: i32,
    base_str: i32,
    base_agi: i32,
    base_int: i32,
    str_gain: f32,
    agi_gain: f32,
    int_gain: f32,
    attack_range: i32,
    projectile_speed: i32,
    attack_rate: f32,
    move_speed: i32,
    turn_rate: f32,
    cm_enabled: bool,
    legs: i32
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let url = format!("https://api.opendota.com/api/constants/heroes");
    let res = reqwest::get(&url)
        .await?;

    let json = res.json::<HashMap<String, Hero>>().await?;
    println!("{:#?}", json);

   Ok(())
}
