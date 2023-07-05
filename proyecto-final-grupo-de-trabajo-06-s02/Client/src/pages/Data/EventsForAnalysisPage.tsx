import Events from '../../components/containers/events'

const EventsForAnalysisPage = () => {
  
  const actions = [
    {
      text: "Ver gráficos",
      color: "geekblue",
      navigation: ""  
    }
  ]

  return (
    <div>
      <Events url={"http://api.sivtickets.fun/analysis/events"} actions={actions}></Events>
    </div>
  )
}


export default EventsForAnalysisPage