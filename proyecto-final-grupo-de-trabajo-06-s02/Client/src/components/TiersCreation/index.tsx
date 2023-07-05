/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ReactNode, useContext, useEffect, useState } from 'react'
import './snap.css';
import MapView from "./views/MapView"
import { DataCreationContext } from './DataCreationContext'
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Tag, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { AuthContext } from '../../utils/AuthContext';
import { CreationContext } from '../../utils/CreationContext';



const TiersCreation = ({ location_id, numbered_selector }: ({ location_id: string, numbered_selector:boolean })) => {

  
  const { blockIdState, blockJsonDataState, canvasSizeState, totalTiersState, mapUrlState } = useContext(DataCreationContext)
  const [blockID, setBlockId] = blockIdState
  const [totalTiersCount, setTotalData] = totalTiersState
  const { setCanvasSize } = canvasSizeState
  const { setMapUrl } = mapUrlState
  const { blockJsonData } = blockJsonDataState
  const [form] = useForm()
  const nav = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [listOfTiers, setListOfTiers] = useContext(CreationContext).listOfTiers

  useEffect(() => {

    setMapUrl("map_" + location_id);

    listOfTiers.clear()

    if (window.screen.width <= 1024) {
      setCanvasSize({ canvas_h: window.screen.height * 0.50, canvas_w: window.screen.width - 36 })
    } else {
      setCanvasSize({ canvas_h: window.screen.height * 0.50, canvas_w: window.screen.width * 0.65 })
    }

  }, [location_id])

  useEffect(() => {
    setTotalData(blockJsonData.length)
  }, [blockJsonData])

  const success = () => {
    messageApi.open({
      type: 'success',
      duration: 1,
      content: 'Guardado',
      onClose: () => { nav("../dateAndTiers") }
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'No se pudo guardar',
    });
  };

  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'Faltan tiers por definir',
    });
  };

  const sendTiers = () => {
    if (listOfTiers.size == totalTiersCount) {
      success();
    } else {
      warning();
    }
  }

  const saveTier = (e: any) => {

    const blockData = blockJsonData.find(block => {
      return block.name == blockID
    })


    listOfTiers.set(blockData!.blockId, {
      name: e.tier_name,
      block_name: blockData!.name,
      no_numered: e.tier_no_numered,
      price: e.tier_price,
    })

    setBlockId("");
    setListOfTiers(listOfTiers)
    setModalOpen(false)

  }

  const cancelTiers = () => {
    nav("../dateAndTiers")
  }

  useEffect(() => {
    if (blockID != "") {
      form.resetFields()
      setModalOpen(true)
    }
  }, [blockID])

  const deleteTier = (blockId: string) => {
    listOfTiers.delete(blockId)
  }

  const mapTiers = () => {

    const tags: ReactNode[] = []

    listOfTiers.forEach((value, key) => {
      tags.push(
        <Tag style={{fontSize: 16}}  closable onClose={() => { deleteTier(key) }}>
          {`[${value.block_name}] - ${value.name}  $${value.price}`}
        </Tag>
      )
    })

    return tags
  }

  return (
    <div className="tiersView">

      {
        contextHolder
      }

      <div className='mapViewContainer'>

        <Space className='tierTags' wrap>
          {
            mapTiers()
          }
        </Space>
        <MapView location_id={location_id} />

        <Modal
          title="Edita la localidad"
          centered
          open={modalOpen}
          onOk={() => { form.submit();       console.log(listOfTiers);            setModalOpen(false) }}
          onCancel={() => { form.resetFields(); console.log(listOfTiers);    setBlockId(""); setModalOpen(false) }}
        >

          <Form form={form} onFinish={saveTier}>
            <Space direction='vertical'>
              <Form.Item name={"tier_name"}>
                <Input value={listOfTiers.get(blockID)?.name} placeholder='Pon un nombre' />
              </Form.Item>
              <Form.Item name={"tier_price"}>
                <InputNumber
                  value={listOfTiers.get(blockID)?.price || 0}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                  precision={2}
                  min={0}
                />
              </Form.Item>

              <Form.Item name={"tier_no_numered"}>
                <Select
                  value={listOfTiers.get(blockID)?.no_numered}
                  placeholder="Selecciona el tipo de localidad"
                  style={{ width: 120 }}
                  options={[
                    { value: true, label: 'Numerado', disabled: numbered_selector },
                    { value: false, label: 'No Numerado' },
                  ]}
                />
              </Form.Item>
            </Space>
          </Form>

        </Modal>

        <div className='buttonsMapView'>

          <Space size={16}>
            <Popconfirm
              title="Salir"
              description="¿Desea salir sin guardar?"
              onConfirm={cancelTiers}
              okText="Sí"
              cancelText="No"
            >
              <Button danger>Cancelar</Button>
            </Popconfirm>
            <Button onClick={sendTiers}> Confirmar </Button>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default TiersCreation;
