use actix_web::{get, App, HttpServer, Responder, HttpResponse};
use std::collections::HashMap;
use serde::Deserialize;
use std::fmt;

#[derive(Clone, Debug, Deserialize)]
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

impl fmt::Display for Hero {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.localized_name)
    }
}

#[get("/")]
async fn index() -> impl Responder {
    let hero_map = get_heroes_map().await.unwrap();
    let hero_list = hero_map.values().cloned().collect::<Vec<Hero>>();
    let mut hero_names = "".to_string();

    for hero in hero_list {
        hero_names.push_str(&*hero.to_string());
        hero_names.push_str("\n");
    }

    HttpResponse::Ok().body(hero_names)
}

async fn get_heroes_map() -> Result<HashMap<String, Hero>, Box<dyn std::error::Error>> {
    let url = format!("https://api.opendota.com/api/constants/heroes");
    let res = reqwest::get(&url)
        .await?;

    let json = res.json::<HashMap<String, Hero>>().await?;

    Ok(json)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(index))
        .bind("127.0.0.1:8080")?
        .run()
        .await
}
