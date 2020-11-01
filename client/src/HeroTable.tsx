import React, { useEffect, useState } from 'react'
import heroService, {IHero} from "./heroService";
import './HeroTable.css'

const HeroTable = () => {
    const [heroes, setHeroes] = useState<IHero[]>([])

    useEffect(() => {
        heroService
            .getHeroes()
            .then(heroes => setHeroes(heroes))
    }, [])

    return (
        <table>
            <thead>
                <tr>
                    <th>Hero</th>
                    <th>Attr</th>
                    <th>HP</th>
                    <th>HP/s</th>
                    <th>MP</th>
                    <th>MP/s</th>
                    <th>Armor</th>
                    <th>Dmg (min)</th>
                    <th>Dmg (max)</th>
                    <th>Str</th>
                    <th>Agi</th>
                    <th>Int</th>
                    <th>Str+</th>
                    <th>Agi+</th>
                    <th>Int+</th>
                    <th>AR</th>
                    <th>PS</th>
                    <th>BAT</th>
                    <th>MS</th>
                    <th>TR</th>
                </tr>
            </thead>
            <tbody>
                {heroes.map((hero, index) =>
                    <tr key={index}>
                        <td>{hero.localized_name}</td>
                        <td>{hero.primary_attr}</td>
                        <td>{hero.base_health}</td>
                        <td>{hero.base_health_regen}</td>
                        <td>{hero.base_mana}</td>
                        <td>{hero.base_mana_regen}</td>
                        <td>{hero.base_armor}</td>
                        <td>{hero.base_attack_min}</td>
                        <td>{hero.base_attack_max}</td>
                        <td>{hero.base_str}</td>
                        <td>{hero.base_agi}</td>
                        <td>{hero.base_int}</td>
                        <td>{hero.str_gain}</td>
                        <td>{hero.agi_gain}</td>
                        <td>{hero.int_gain}</td>
                        <td>{hero.attack_range}</td>
                        <td>{hero.projectile_speed}</td>
                        <td>{hero.attack_rate}</td>
                        <td>{hero.move_speed}</td>
                        <td>{hero.turn_rate}</td>
                    </tr>)
                }
            </tbody>
        </table>
    )
}

export default HeroTable
