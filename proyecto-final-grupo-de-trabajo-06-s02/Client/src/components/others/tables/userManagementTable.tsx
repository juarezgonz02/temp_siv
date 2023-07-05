import React from 'react'
import { Table, Tag, Space, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: React.Key;
    email: string;
    permissions: Array<string>;
    addpermissions: Array<string>;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Correo',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Permisos',
        dataIndex: 'permissions',
        key: 'permissions',
        render: (permissions: Array<string>) => (
            <>
                {permissions.map((permission: string) => {
                    let color = 'green';
                    if (permission === 'Promotor') {
                        color = 'geekblue';
                    } else if (permission === 'Admin') {
                        color = 'volcano';
                    }
                    return (
                        <Tag closable color={color} key={permission}>
                            {permission}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Agregar permisos',
        key: 'addpermissions',
        dataIndex: 'addpermissions',
        render: (addpermissions: Array<string>) => (
            <>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            defaultValue={[]}
                            optionLabelProp="label"
                        >
                            <Select.Option value="Validadador" label="Validadador">
                                <div className="demo-option-label-item">
                                    Validadador
                                </div>
                            </Select.Option>
                            <Select.Option value="Promotor" label="Promotor">
                                <div className="demo-option-label-item">
                                    Promotor
                                </div>
                            </Select.Option>
                            <Select.Option value="User" label="User">
                                <div className="demo-option-label-item">
                                    User
                                </div>
                            </Select.Option>
                        </Select>
            </>
        ),
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
        email: 'prueba@gmail.com',
        permissions: ['Admin', 'Promotor'],
        addpermissions: ['Admin', 'Promotor', 'User'],
    },
];


const UserManagementTable = () => {
    return (
            <Table
                title={() => 'Lista de usuarios'}
                pagination={false}
                scroll={{ x: 240 }}
                size='small'
                columns={columns}
                dataSource={data}
            />
    )
}

export default UserManagementTable
