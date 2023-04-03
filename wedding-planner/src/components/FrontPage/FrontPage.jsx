import {useContext} from "react"
import { LoginTokenContext } from '../../context/LoginTokenContext'
import HeartyNavbar from '../HeartyNavbar/HeartyNavbar'

export default function FrontPage() {
  // note that HeartyNavbar has an id specified in its component jsx file
  const [token, setToken] = useContext(LoginTokenContext);
  
  return (
    <div id="appContainer">
      <HeartyNavbar />
      <div id="bodyContainer">
        <div className="bodyTextColumn">
          <p>foobar</p>
          <p>current user is {token.username}</p>
        </div>
      </div>

      <div id="footer">
        <h2> some text</h2>
      </div>
    </div>
  )
}
