import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Save } from '../TiersView/utils/saveSeats';

interface DataType {
    key: React.Key;
    ticket: string;
    price: number;
    tier: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Tier',
        dataIndex: 'tier',
        key: 'tier',
    },
    {
        title: 'Precio',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Ticket',
        dataIndex: 'ticket',
        key: 'ticket',
    },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
        disabled: record.ticket === 'Disabled User', // Column configuration not to be checked
        name: record.ticket,
    }),
};

const TableProcessingPayment: React.FC = () => {
    const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');

    const [data, setData] = useState<DataType[]>([]);
    const [total, setTotal] = useState(0)
    useEffect(() => {
        const actual: Save = JSON.parse(sessionStorage.getItem("seatSelected") || "")
        console.log(actual);

        let subtotal = 0

        let tickets = []
        actual.seats.forEach((seat) => {

            seat.selected.forEach((selection) => {

                tickets.push({
                    "key": seat.tier_id + Math.random(),
                    "tier": seat.tier_name,
                    "price": seat.price,
                    "ticket": selection,
                })

                
            })
            
            subtotal += seat.price * seat.selected.length

            
        });
        
        console.log(tickets)
        console.log(subtotal)
        
        setTotal(subtotal)
        setData(tickets)
    }, [])

    return (
        <div className='carrito'>
            <Table
                pagination={false}
                scroll={{ y: 240 }}
                size='middle'
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
            <h3>{"Subtotal $" + total}</h3>
        </div>
    );
};

export default TableProcessingPayment;