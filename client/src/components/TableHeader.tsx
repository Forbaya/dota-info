import React from 'react'
import {IHero} from "../services/heroService";

interface IProps {
    column: string
    property: keyof IHero
    sortBy(property: keyof IHero): () => void
}

export const TableHeader = ({column, property, sortBy}: IProps) => (
    <th>
        <button onClick={sortBy(property)}>
            {column}
        </button>
    </th>
)
