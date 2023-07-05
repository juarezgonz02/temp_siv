import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Table, Space, Modal, TimePicker, DatePicker, Form, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CreationContext } from '../../../utils/CreationContext';
import { useForm } from 'antd/es/form/Form';

export interface DataType {
    key: React.Key;
    date: string;
    hour: string;
    duration: string;
}

const TableProcessingPayment = () => {

    const [data, updateData] = useState<DataType[]>([]);
    
    const [dates, updateDates] = useContext(CreationContext).dates
    
    const [info] = useContext(CreationContext).info

    const [modalOpen, setModalOpen] = useState(false);
    
    const [key, setKey] = useState("");
    
    const [form] = useForm()

    useEffect(() => {
        updateData(dates.map((date) => {
            const d = {
                key: new Date(date).getTime().toString(),
                date: new Date(date).toLocaleDateString(),
                hour: new Date(date).toLocaleTimeString(),
                duration: info.duration.toString()
            }

            return d
        }))
    }, [dates])

    const saveData = (e) => {

        const date = e.date.$d

        const fechaFormateada = date.toISOString().split('T')[0];

        const hour = e.hour.$d.toLocaleTimeString()

        const newDate = new Date(`${fechaFormateada}T${hour}`).toISOString()

        updateDates(dates.map(dt => {

            console.log(new Date(dt).getTime().toString());

            if (new Date(dt).getTime().toString() == key) {
                return newDate
            } else {
                return dt
            }
        }))

        form.resetFields()
        setModalOpen(false)
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Hora',
            dataIndex: 'hour',
            key: 'hour',
        },
        {
            title: 'Duracion',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record): ReactNode => {

                return <>
                    <Button onClick={() => { setModalOpen(true); setKey(record.key.toString()) }}>
                        Edit
                    </Button>
                </>
            }

        },
    ];
    return (
        <>
            <Table
                pagination={false}
                scroll={{ y: 240 }}
                size='middle'
                columns={columns}
                dataSource={data}
            />
            <Modal
                title="Edita la hora"
                centered
                destroyOnClose={true}
                open={modalOpen}
                onOk={(e) => {
                    e.preventDefault()
                }}
                onCancel={() => setModalOpen(false)}
            >

                <Space >
                    <Form form = {form} onFinish={(e) => { saveData(e) }}>
                        <Form.Item name="date" label="Fecha" rules={[{ required: true }]}>
                            <DatePicker />
                        </Form.Item>
                        <Form.Item name="hour" label="Hora" rules={[{ required: true }]}>
                            <TimePicker format={"HH:mm a"} />
                        </Form.Item>
                        <Form.Item name="duration" label="Duracion" rules={[{ required: true }]}>
                            <TimePicker format={"HH"} />
                        </Form.Item>
                        <Button htmlType='submit'> Save </Button>
                    </Form>
                </Space>
            </Modal>
        </>
    );
};

export default TableProcessingPayment;
