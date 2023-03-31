import HeartyNavbar from '../HeartyNavbar/HeartyNavbar'

export default function FrontPage() {
  // note that HeartyNavbar has an id specified in its component jsx file
  return (
    <div id="appContainer">
      <HeartyNavbar />
      <div id="bodyContainer">
        <div className="bodyTextColumn">
          <p>foobar</p>
        </div>
      </div>

      <div id="footer">
        <h2> some text</h2>
      </div>
    </div>
  )
}
