import React, {useEffect, useMemo, useState} from 'react'
import heroService, {IHero} from "../services/heroService";
import '../css/HeroTable.css'
import {TableHeader} from "./TableHeader";
import {getProperty} from "../utilities/objectUtility";

enum EOrder {
    ASC,
    DESC
}

interface ISort {
    property: keyof IHero
    order: EOrder
}

const HeroTable = () => {
    const [heroes, setHeroes] = useState<IHero[]>([])
    const [sort, setSort] = useState<ISort>({
        property: 'localized_name' as keyof IHero,
        order: EOrder.ASC,
    })

    useEffect(() => {
        heroService
            .getHeroes()
            .then(heroes => setHeroes(heroes))
    }, [])

    const sortedHeroes = useMemo((): IHero[] => {
        return [...heroes].sort((a: IHero, b: IHero) => {
            const aProperty = getProperty(a, sort.property)
            const bProperty = getProperty(b, sort.property)

            if (aProperty === bProperty)
                return 0

            return aProperty < bProperty
                ? sort.order === EOrder.ASC ? -1 : 1
                : sort.order === EOrder.ASC ? 1: -1
        })
    }, [heroes, sort])

    const sorter = (key: keyof IHero) => () => {
        let order = sort.property === key && sort.order === EOrder.ASC
            ? EOrder.DESC
            : EOrder.ASC

        setSort({ property: key, order })
    }

    return (
        <table>
            <thead>
                <tr>
                    <TableHeader column={"Hero"} property={"localized_name"} sort={sorter}/>
                    <TableHeader column={"Attr"} property={"primary_attr"} sort={sorter}/>
                    <TableHeader column={"HP"} property={"base_health"} sort={sorter}/>
                    <TableHeader column={"HP/s"} property={"base_health_regen"} sort={sorter}/>
                    <TableHeader column={"MP"} property={"base_mana"} sort={sorter}/>
                    <TableHeader column={"MP/s"} property={"base_mana_regen"} sort={sorter}/>
                    <TableHeader column={"Armor"} property={"base_armor"} sort={sorter}/>
                    <TableHeader column={"Dmg (min)"} property={"base_attack_min"} sort={sorter}/>
                    <TableHeader column={"Dmg (max)"} property={"base_attack_max"} sort={sorter}/>
                    <TableHeader column={"Str"} property={"base_str"} sort={sorter}/>
                    <TableHeader column={"Agi"} property={"base_agi"} sort={sorter}/>
                    <TableHeader column={"Int"} property={"base_int"} sort={sorter}/>
                    <TableHeader column={"Str+"} property={"str_gain"} sort={sorter}/>
                    <TableHeader column={"Agi+"} property={"agi_gain"} sort={sorter}/>
                    <TableHeader column={"Int+"} property={"int_gain"} sort={sorter}/>
                    <TableHeader column={"AR"} property={"attack_range"} sort={sorter}/>
                    <TableHeader column={"PS"} property={"projectile_speed"} sort={sorter}/>
                    <TableHeader column={"BAT"} property={"attack_rate"} sort={sorter}/>
                    <TableHeader column={"MS"} property={"move_speed"} sort={sorter}/>
                    <TableHeader column={"TR"} property={"turn_rate"} sort={sorter}/>
                </tr>
            </thead>
            <tbody>
                {sortedHeroes.map((hero) =>
                    <tr key={hero.id}>
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
