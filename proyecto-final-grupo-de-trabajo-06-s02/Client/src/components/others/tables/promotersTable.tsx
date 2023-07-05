import React from 'react';
import { Table, Space, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: React.Key;
    email: string;
}

const PromotersTable = ({label, data}:({label:string, data:DataType[]})) => {

    const columns: ColumnsType<DataType> = [
        {
            title: 'Correo',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => { 
                        data.splice( data.indexOf(record), 1)
                     }}> Borrar </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table
                title={() => label}
                pagination={false}
                scroll={{ y: 240 }}
                size='small'
                columns={columns}
                dataSource={data}
            />
        </div>
    );
};

export default PromotersTable;
