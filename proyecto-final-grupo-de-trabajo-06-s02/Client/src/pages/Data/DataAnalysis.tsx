import { useState, useEffect, useRef } from 'react'
import DataChart from './DataCharts';
import { ChartType } from "chart.js"
import Banner from '../../components/global/banner';
import '../../styles/graph.css'
import NavigationMovil from '../../components/global/navigationMovil';

interface dataStruct {
  sold_ticket: number;
  tickets_validated: number;
  entrance_data: {
    group: number;
    solo: number;
  }
  validate_hours: ({
    hour: string,
    count: number
  })[]
}

export interface confgType {
  type: ChartType
  name: string
  label: string[],
  backgroundColor: string[],
  id: string
}

const DataChartsView = () => {

  const [totalAsistants, setTAD] = useState(0)
  const [soldTickets, setSTD] = useState<number[]>([0])

  const STDConfg: confgType = {
    type: "pie",
    name: "Total de asistentes VS tickets comprados",
    label: ["Tickets validados/Asistentes", "Tickets sin validar"],
    backgroundColor: ["#9D53F2", "#3290ED"],
    id: "STD"
  }

  const [entranceData, setED] = useState<number[]>([0])

  const EDConfg: confgType = {
    type: 'bar',
    name: '',
    label: ["En grupo", "Individual"],
    backgroundColor: ['#A0048E', '#C35293'],
    id: "ED"
  }

  const [validateHours, setVHD] = useState<number[]>([])

  const [VHDConfg, setVHDConfg] = useState<confgType>({
    type: 'line',
    name: 'Horas en que se validan los tickets',
    label: [],
    backgroundColor: ['rgb(255, 99, 132)'],
    id: "VHD"
  })

  const processData = ({ tickets_validated, sold_ticket, validate_hours, entrance_data }: dataStruct) => {

    setTAD(tickets_validated);
    setSTD([sold_ticket, sold_ticket - tickets_validated]);

    const { group, solo } = entrance_data
    setED([group, solo])

    const VHDlabel = validate_hours.map(({ hour }) => hour)
    const VHD = validate_hours.map(({ count }) => count)

    setVHD(VHD)

    VHDConfg.label = VHDlabel

    setVHDConfg(VHDConfg)
  }

  const getChartData = async () => {
    try {
      const protocol = window.location.protocol
      const host = window.location.host
      const path = "analysis_get_dummy_data.json"

      const response = await fetch(`${protocol}//${host}/${path}`);

      const data = await response.json();


      processData(data);

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getChartData();
  }, [])


  /*
  */

  return (
    <div className="container">
      <div className='navigationMovil'>
        <NavigationMovil></NavigationMovil>
      </div>
      <Banner text="Estadisticas del evento"></Banner>

      <div className='chart text-chart'>
        <span>Boletos vendidos en total: {totalAsistants}</span>
      </div>

      <div className='chartsContainer'>
        <DataChart config={EDConfg} data={entranceData} />
        <DataChart config={STDConfg} data={soldTickets} />
        <DataChart config={VHDConfg} data={validateHours} />
      </div>
    </div>
  )
}

export default DataChartsView