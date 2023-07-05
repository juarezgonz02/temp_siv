import '../../styles/userManagement.css'
import Banner from '../global/banner'
import UserManagementForm from '../global/forms/userManagementForm'
import NavBar from '../global/navBar'
import NavigationMovil from '../global/navigationMovil'



const UserManagement = () => {
  return (
    <div className='userManagement'>
        <NavBar showNavigationWeb={true} showTitle={true}></NavBar>
        <div className='navigationMovil'>
          <NavigationMovil></NavigationMovil>
        </div>
        <Banner text={"Gestion de usuarios"}></Banner>
        <div className='container-userManagement'>
        <UserManagementForm></UserManagementForm>
        </div>
    </div>
  )
}

export default UserManagement
