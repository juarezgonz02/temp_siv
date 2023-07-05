import EventsPage from './pages/Events/eventsPage'
import ConfirmPurcharsePage from './pages/PaymentProcess/confirPurcharsePage'
import ProcesPaymentPage from './pages/PaymentProcess/procesPaymentPage'
import SuccessPaymentPage from './pages/PaymentProcess/SuccessPaymentPage'
import SelectLocalityPage from './pages/PaymentProcess/selectLocalityPage'
import EventDataCharticsPage from './pages/Data/DataAnalysis'
import EventsForAnalysisPage from './pages/Data/EventsForAnalysisPage'
import InformationEventPage from './pages/Events/informationEventPage'
import InformatioForEventPage from './pages/CreationEvents/InformatioForEventPage'
import NewEventPage from './pages/CreationEvents/NewEventPage'
import DateAndTiersPage from './pages/CreationEvents/dateAndTiersPage'
import PromotersAndValidatorsPage from './pages/CreationEvents/promotersAndValidatorsPage'
import SetTiersPage from './pages/CreationEvents/setTiersPage'
import SwitchEventState from './pages/CreationEvents/SwitchEventState'
import EventCreationPage from './pages/CreationEvents/EventCreationPage'
import ValidatorQR from './components/containers/validatorsTickets/validatorQR'
import InfoEventContentPage from './pages/validatorPages/infoEventContentPage'
import UserManagementPage from './pages/userManagementPage'
import EventsToValidatePage from './pages/validatorPages/eventsToValidatePage'
import GeneralSettingsPage from './pages/generalSettingsPage'
import { AccountMiddleware, AuthMiddleware, EventMiddleware, PaymentMiddleware, AnalysisMiddleware, CreationMiddleware } from './middleware'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/Public/LoginPage'
import SetPasswordPage from './pages/Public/SetPasswordPage'
import MyAccount from './pages/Customer/MyAccount'
import OrdersPage from './pages/Customer/OrdersPage'
import PastOrderPage from './pages/Customer/PastOrderPage'
import OrderDetailsPage from './pages/Customer/OrderDetailsPage'
import TransferTicketPage from './pages/Customer/TransferTicketPage'
import './App.css'
import SaveEvent from './components/containers/creationEvent/SaveEvent'
import NavigationContextProvider from './context/NavigationContext'


function App() {
  return (
    <>
    <NavigationContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthMiddleware />} >
            <Route index element={<Navigate to="event" />} />

            <Route path='login' element={<LoginPage />} />
            
            <Route path='setPassword'>
              <Route index element={<Navigate to="event" />} />
              <Route path=':request_id' element={<SetPasswordPage />} />
            </Route>

            <Route path='account' element={<AccountMiddleware />}>
              <Route index element={<MyAccount />} />
              <Route path='orders' element={<OrdersPage />} />
              <Route path='pastOrders' element={<PastOrderPage />} />
              <Route path='orders/:orderId' element={<OrderDetailsPage />} />
              <Route path='ticketTransfer/:transferHash' element={<TransferTicketPage />} />
            </Route>

            <Route path="analysis" element={<AnalysisMiddleware />}>
                <Route index element={<EventsForAnalysisPage />} />
                <Route path=":event_id" element={<EventDataCharticsPage />} />
            </Route>

              <Route path="eventmod" element={<CreationMiddleware />}>
                <Route index element={<EventCreationPage />} />
                <Route path="new" element={<NewEventPage />} />
                <Route path=":event_code/edit" >
                  <Route index element={<Navigate to="informationForEvent" />} />
                  <Route path="informationForEvent" element={<InformatioForEventPage />} />
                  <Route path="dateAndTiers" element={<DateAndTiersPage />} />
                  <Route path="tiers" element={<SetTiersPage />} />
                  <Route path="promotorsAndValidators" element={<PromotersAndValidatorsPage />} />
                  <Route path="switch" element={<SwitchEventState />} />
                  <Route path="save" element={<SaveEvent />} />
                </Route>
              </Route>

              <Route path="event" element={<EventMiddleware />}>
                <Route index element={<EventsPage />} />
                <Route path=":event_code/" element={<InformationEventPage />} />
                <Route path=":event_id/:location_id/" element={<PaymentMiddleware />}>
                  <Route index element={<Navigate to="select_locality" />} />
                  <Route path="select_locality" element={<SelectLocalityPage />} />
                  <Route path="confirming_purchase" element={<ConfirmPurcharsePage />} />
                  <Route path="payment" element={<ProcesPaymentPage />} />
                  <Route path="success" element={<SuccessPaymentPage />} />
                </Route>
              </Route>

              <Route path='validator' element={<EventMiddleware />}>
                <Route index element={<EventsToValidatePage />} />
                <Route path=':event_code/validatorQR/:id' element={<ValidatorQR />} />
                <Route path=':event_code/infoEventContent/:id' element={<InfoEventContentPage />} />
              </Route>

              <Route path="moderator">
                <Route index element={<Navigate to="users" />} />
                <Route path="users" element={<UserManagementPage />} />
              </Route>

              <Route path="admin">
                <Route index element={<GeneralSettingsPage />} />
              </Route>
          </Route>
        </Routes>
      </Router>
      </NavigationContextProvider>
    </>
  )
}

export default App

