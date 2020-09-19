extern crate select;
use select::document::Document;
use select::predicate::{Attr};
use std::collections::HashMap;

#[derive(Debug)]
struct Hero {
    name: String,
    strength: String,
    agility: String,
    intelligence: String
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let heroes = vec![
        "Abaddon",
        "Oracle"
    ];

    let mut hero_data = HashMap::new();

    for hero in heroes {
        let url = format!("https://dota2.gamepedia.com/{}", hero);
        let data = get_data(&*url).await;

        hero_data.insert(
            hero,
            data
        );
    }

    for (hero_name, data) in hero_data {
        let hero = create_hero(String::from(hero_name), data);

        println!("{:#?}", hero);
    }


    Ok(())
}

fn create_hero(name: String, hero_data: Vec<String>) -> Hero {
    let strength = String::from(
        hero_data[1]
            .split("+")
            .nth(0)
            .expect("Could not get the strength data")
            .trim()
    );

    let agility = String::from(
        hero_data[2]
            .split("+")
            .nth(0)
            .expect("Could not get the agility data")
            .trim()
    );

    let intelligence = String::from(
        hero_data[3]
            .split("+")
            .nth(0)
            .expect("Could not get the intelligence data")
            .trim()
    );

    Hero {
        name,
        strength,
        agility,
        intelligence
    }
}

async fn get_data(url: &str) -> Vec<String> {
    let res = reqwest::get(url)
        .await
        .expect("Could not get a response");

    let body = res
        .text()
        .await
        .expect("Could not get the body");

    let document = Document::from(&body[..]);

    let node = document
        .find(Attr("class", "infobox"))
        .next()
        .expect("Could not get the node");

    let text = node.text();

    let rows: Vec<&str> = text
        .split("\n")
        .collect();

    let filtered_rows: Vec<&str> = rows
        .iter()
        .filter(|row| !row.is_empty())
        .cloned()
        .collect();

    filtered_rows
        .into_iter()
        .map(|s| s.to_string())
        .collect()
}