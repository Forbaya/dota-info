mod hero;
mod open_dota_api;

use actix_cors::Cors;
use actix_web::{get, App, HttpServer};
use actix_web::web::Json;
use std::io::Error;
use crate::hero::Hero;
use crate::open_dota_api::get_heroes;

#[get("/api/heroes")]
async fn heroes() -> Result<Json<Vec<Hero>>, Error> {
    let mut heroes = get_heroes()
        .await
        .unwrap()
        .values()
        .cloned()
        .collect::<Vec<Hero>>();

    heroes.sort();

    Ok(Json(heroes))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::permissive();

        App::new()
            .wrap(cors)
            .service(heroes)
    })
    .bind("127.0.0.1:8080")?
        .run()
        .await;

    Ok(())
}
