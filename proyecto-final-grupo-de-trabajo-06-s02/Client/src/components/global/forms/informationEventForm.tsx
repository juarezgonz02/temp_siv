/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Switch, Upload, Button, UploadFile, Modal, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './styles/informationEventForm.css'
import { useContext, useEffect, useState } from 'react';
import { CreationContext } from '../../../utils/CreationContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RcFile } from 'antd/es/upload';
import { AuthContext } from '../../../utils/AuthContext';
import type { UploadRequestOption } from 'rc-upload/lib/interface';

interface Category{
    categoryId: string
    name: string
}

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const { TextArea } = Input;

const InformationEventForm = () => {
    const [form] = Form.useForm();

    const [info, setInfo] = useContext(CreationContext).info
    const [actual, changeActual] = useContext(CreationContext).step
    const [imgUrl, setImgUrl] = useContext(CreationContext).img
    const [token] = useContext(AuthContext).token

    const [previewOpen, setPreviewOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const { event_code } = useParams()
    const nav = useNavigate()

    useEffect(() => {

        (async () => {
            const data:Category[] = await(await fetch("http://api.sivtickets.fun:80/events/creation/categories/",{
                headers: {
                    "Authorization": "Bearer " + token
                }
            })).json()

            setCategories(data)
        })()

        if (imgUrl != "") {
            setFileList([{
                uid: '-1',
                name: `banner_${event_code}`,
                status: 'done',
                url: imgUrl
            }])
        }
    }, [])


    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };
    const req = info.title == ""

    const fields: FieldData[] = [
        {
            name: "titleEvent",
            value: info.title
        },
        {
            name: "description",
            value: info.description
        }, {
            name: "category",
            value: info.category
        },
        {
            name: "managment",
            value: info.manager
        }, {
            name: "status",
            value: info.state
        }
    ]

    const saveData = (e: any) => {

        console.log(e)

        const changedData = {
            title: e.titleEvent || info.title,
            description: e.description || info.description,
            category: e.category || info.category,
            manager: e.managment || info.manager,
            img: e.img,
            state: false,
            duration: info.duration
        }

        setInfo(changedData)

        changeActual(actual + 1)
        nav("../dateAndTiers")
    }

    const handleFileChange = (info) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const imageDataURL = e.target.result;
            localStorage.setItem('uploadedImage', imageDataURL!.toString());
        };


        setFileList(info.fileList);
    };

    /**
     *   const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

     */


    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    }

    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

    const handleCancel = () => setPreviewOpen(false);

    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const sendPicture = async ({ onSuccess, file }: UploadRequestOption) => {

        try {
            const base64 = await getBase64(file)
            const req = await fetch(`http://api.sivtickets.fun:80/events/creation/img/set/${event_code}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },

                body: JSON.stringify({

                    image: base64,
                    name: `banner_${event_code}`
                })
            })

            const res = await req.json()

            if (req.ok) {

                setImgUrl(res.url)
                
                if(onSuccess != undefined){
                    onSuccess("ok")
                }

            } else {
                console.log(res)
            }

        } catch (e) {
            console.log(e)
        }
    }

    const handleCategoriesChange = (value: string) => {
        console.log(`selected ${value}`);
      };
      
    

    return (
        <div className='informationForEvent-container'>
            <Form form={form} fields={fields} name="validateOnly" layout="vertical" onFinish={(e) => { e.preventDefault; saveData(e) }} autoComplete="off" className='form-informationForEvent'>                <Form.Item name="titleEvent" label="Titulo del evento" rules={[{ required: req }]}>
                <Input />
            </Form.Item>
                <Form.Item name="description" label="Descripcion del evento" rules={[{ required: req }]}>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item name="category" label="Categoria" rules={[{ required: true }]}>
                    <Select
                        placeholder="Seleccion una categoria"
                        style={{ width: 120 }}
                        onChange={handleCategoriesChange}
                        options={categories.map(ct => {
                            return {
                                "value": ct.categoryId,
                                "label": ct.name 
                            }
                        })}
                    />                
                </Form.Item>

                <Form.Item name="img" label="Imagen del evento" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: false }]}>
                    {<Upload
                        listType='picture-card'
                        fileList={fileList}
                        maxCount={1}
                        customRequest={sendPicture}
                        onPreview={handlePreview}
                        beforeUpload={(file, fileList) => {
                            setFileList(fileList)
                            handleFileChange(file)
                            return true;
                        }}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                    }

                    <Modal open={previewOpen} title={previewTitle} footer={null}
                        onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </Form.Item>

                <div className='btn-informationForEvent'>
                    <Link to="../..">
                        <Button className='btn'>Volver</Button>
                    </Link>
                    <Button className='btn' htmlType='submit' >Confirmar</Button>
                </div>
            </Form>
        </div>
    );
};

export default InformationEventForm;