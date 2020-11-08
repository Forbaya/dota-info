import React from 'react'

interface IProps {
    column: string
    property: string
    sort: any
}

export const TableHeader = ({column, property, sort}: IProps) => (
    <th>
        <button onClick={sort(property)}>
            {column}
        </button>
    </th>
)
