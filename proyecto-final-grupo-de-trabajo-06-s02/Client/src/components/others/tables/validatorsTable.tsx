import React from 'react'
import { Table, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'


interface DataType {
    key: React.Key;
    email: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Correo',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="middle">
                <a>Delete</a>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        email: 'prueba@gmail.com'
    },
];

const ValidatorsTable = () => {
  return (
    <div>
      <Table
                title={() => 'Validadores definidos'}
                pagination={false}
                scroll={{ y: 240 }}
                size='small'
                columns={columns}
                dataSource={data}
            />
    </div>
  )
}

export default ValidatorsTable
