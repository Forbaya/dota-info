import React, { useEffect, useState } from 'react'
import heroService, {IHero} from "./heroService";

const HeroTable = () => {
    const [heroes, setHeroes] = useState<IHero[]>([])

    useEffect(() => {
        heroService
            .getHeroes()
            .then(h => setHeroes(h))
    }, [])

    return (
        <table>
            <thead>
                <tr>
                    <th>Hero</th>
                    <th>Base health</th>
                    <th>Base health regen</th>
                    <th>Base mana</th>
                    <th>Base mana regen</th>
                    <th>Base armor</th>
                    <th>Base mr</th>
                    <th>Damage min</th>
                    <th>Damage max</th>
                    <th>Base str</th>
                    <th>Base agi</th>
                    <th>Base int</th>
                    <th>Str gain</th>
                    <th>Agi gain</th>
                    <th>Attack range</th>
                    <th>Projectile speed</th>
                    <th>Attack rate</th>
                    <th>Movement speed</th>
                    <th>Turn rate</th>
                </tr>
            </thead>
            <tbody>
                {heroes.map((hero, index) =>
                    <tr key={index}>
                        <td>{hero.localized_name}</td>
                        <td>{hero.base_health}</td>
                        <td>{hero.base_health_regen}</td>
                        <td>{hero.base_mana}</td>
                        <td>{hero.base_mana_regen}</td>
                        <td>{hero.base_armor}</td>
                        <td>{hero.base_mr}</td>
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
