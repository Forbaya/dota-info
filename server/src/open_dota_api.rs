use std::collections::HashMap;
use crate::hero::Hero;

pub async fn get_heroes() -> Result<HashMap<String, Hero>, Box<dyn std::error::Error>> {
    let url = format!("https://api.opendota.com/api/constants/heroes");
    let res = reqwest::get(&url).await?;
    let json = res.json::<HashMap<String, Hero>>().await?;

    Ok(json)
}
