import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
/////////////////////////////////////////////////////////////////
function Windows(){
  return (
<div>
  <style dangerouslySetInnerHTML={{__html: "\n    h1 {\n      font-size: 20px;\n      font-weight: bold;\n      text-align: center;\n      margin-top: 30px;\n    }\n    p {\n      font-size: 16px;\n      text-align: justify;\n      margin: 20px;\n    }\n    .step {\n      font-size: 16px;\n      margin-left: 40px;\n    }\n    .step-number {\n      font-weight: bold;\n    }\n  " }} />
  <h1>Eternity VPN for Windows</h1>
  <p>Follow these steps to set up an L2TP VPN profile on Windows 10:</p>
  <p className="step">
    <span className="step-number">1.</span> Click the Windows Start button and go to "Settings."
  </p>
  <p className="step">
    <span className="step-number">2.</span> Select "Network &amp; Internet."
  </p>
  <p className="step">
    <span className="step-number">3.</span> Click on "VPN."
  </p>
  <p className="step">
    <span className="step-number">4.</span> Click the "Add a VPN connection" option.
  </p>
  <p className="step">
    <span className="step-number">5.</span> Under "VPN provider," select "Windows (built-in)."
  </p>
  <p className="step">
    <span className="step-number">6.</span> Enter a descriptive name for the connection in the "Connection name" field.
  </p>
  <p className="step">
    <span className="step-number">7.</span> In the "Server name or address" field, enter the server address provided by EternityVPN.
  </p>
  <p className="step">
    <span className="step-number">8.</span> Choose "L2TP/IPsec with pre-shared key" as the "VPN type."
  </p>
  <p className="step">
    <span className="step-number">9.</span> Enter the pre-shared key provided by EternityVPN in the "Pre-shared key" field.
  </p>
  <p className="step">
    <span className="step-number">10.</span> Click "Save" to create the VPN profile.
  </p>
  <p>The new VPN connection should now appear in the VPN settings. To connect to the EternityVPN server, simply click on the connection name and enter your username and password when prompted. Alternatively you can use softether client software</p>
</div>

  );
}

////////////////////////////////////////////////////////////////////////////////


function Mac(){
    return(
<div>
  <style dangerouslySetInnerHTML={{__html: "\n    h1 {\n      font-size: 20px;\n      font-weight: bold;\n      text-align: center;\n      margin-top: 30px;\n    }\n    p {\n      font-size: 16px;\n      text-align: justify;\n      margin: 20px;\n    }\n    .step {\n      font-size: 16px;\n      margin-left: 40px;\n    }\n    .step-number {\n      font-weight: bold;\n    }\n  " }} />
  <h1>Eternity VPN for Mac</h1>
  <p>Follow these steps to set up an L2TP VPN profile on a Mac OS device:</p>
  <p className="step">
    <span className="step-number">1.</span> Click on the Apple menu and select "System Preferences."
  </p>
  <p className="step">
    <span className="step-number">2.</span> Click on "Network."
  </p>
  <p className="step">
    <span className="step-number">3.</span> Click the "+" button in the bottom left corner to add a new network connection.
  </p>
  <p className="step">
    <span className="step-number">4.</span> Select "VPN" as the interface type.
  </p>
  <p className="step">
    <span className="step-number">5.</span> Choose "L2TP over IPSec" as the VPN Type.
  </p>
  <p className="step">
    <span className="step-number">6.</span> Enter a descriptive name for the connection in the "Service Name" field.
  </p>
  <p className="step">
    <span className="step-number">7.</span> In the "Server Address" field, enter the server address provided by EternityVPN.
  </p>
  <p className="step">
    <span className="step-number">8.</span> Enter your username and password in the appropriate fields.
  </p>
  <p className="step">
    <span className="step-number">9.</span> Enter the pre-shared key provided by EternityVPN in the "Shared Secret" field.
  </p>
  <p className="step">
    <span className="step-number">10.</span> Click "Apply" to save the VPN profile.
  </p>
  <p>The new VPN connection should now appear in the Network settings. To connect to the EternityVPN server, simply click on the connection name and enter your username and password when prompted. Alternatively you can use softether client software</p>
</div>


    )
}


/////////////////////////////////////////////////////////////////////////


function Linux(){
    return(
      <div className="col-lg vpn-usr-disp vpn-usr-guide shadow">
      
      
      <Tabs
      defaultActiveKey="L2TP"
      id="uncontrolled-tab-example"
      className="mb-3"
      >
          <Tab eventKey="L2TP" title="L2TP">
              <div style={{overflowY:"scroll",height:"650px"}}>
              <div>
  <style dangerouslySetInnerHTML={{__html: "\n    h1 {\n      font-size: 20px;\n      font-weight: bold;\n      text-align: center;\n      margin-top: 30px;\n    }\n    p {\n      font-size: 16px;\n      text-align: justify;\n      margin: 20px;\n    }\n    .step {\n      font-size: 16px;\n      margin-left: 40px;\n    }\n    .step-number {\n      font-weight: bold;\n    }\n  " }} />
  <h1>Eternity VPN - L2tp method</h1>
  <p>Follow these steps to set up an L2TP VPN profile on a Linux device:</p>
  <p className="step">
    <span className="step-number">1.</span> Open the Terminal.
  </p>
  <p className="step">
    <span className="step-number">2.</span> Run the following command to install the necessary packages: 
    <code>sudo apt-get install network-manager-l2tp network-manager-l2tp-gnome</code>
  </p>
  <p className="step">
    <span className="step-number">3.</span> Click the network icon in the top right corner of the screen and select "VPN Connections."
  </p>
  <p className="step">
    <span className="step-number">4.</span> Choose "Configure VPN."
  </p>
  <p className="step">
    <span className="step-number">5.</span> Click the "+" button to add a new VPN connection.
  </p>
  <p className="step">
    <span className="step-number">6.</span> Select "L2TP over IPsec" as the VPN type.
  </p>
  <p className="step">
    <span className="step-number">7.</span> Enter a descriptive name for the connection in the "Connection name" field.
  </p>
  <p className="step">
    <span className="step-number">8.</span> In the "Gateway" field, enter the server address provided by EternityVPN.
  </p>
  <p className="step">
    <span className="step-number">9.</span> Enter your username and password in the appropriate fields.
  </p>
  <p className="step">
    <span className="step-number">10.</span> Enter the pre-shared key provided by EternityVPN in the "PSK" field.
  </p>
  <p className="step">
    <span className="step-number">11.</span> Click "Add" to save the VPN profile.
  </p>
  <p>The new VPN connection should now appear in the VPN connections list. To connect to the EternityVPN server, simply click on the connection name and enter your username and password when prompted.</p>
</div>

              </div>
          </Tab>
          <Tab eventKey="openvpn" title="openvpn">
              <div style={{overflowY:"scroll",height:"650px"}}>
              <div>
  <style dangerouslySetInnerHTML={{__html: "\n    h1 {\n      font-size: 20px;\n      font-weight: bold;\n      text-align: center;\n      margin-top: 30px;\n    }\n    p {\n      font-size: 16px;\n      text-align: justify;\n      margin: 20px;\n    }\n    .step {\n      font-size: 16px;\n      margin-left: 40px;\n    }\n    .step-number {\n      font-weight: bold;\n    }\n  " }} />
  <h1>Eternity VPN - OpenVPN Method</h1>
  <p>Follow these steps to set up an OpenVPN profile on a Linux device:</p>
  <p className="step">
    <span className="step-number">1.</span> Open the Terminal.
  </p>
  <p className="step">
    <span className="step-number">2.</span> Run the following command to install the necessary packages:
    <code>sudo apt-get install openvpn network-manager-openvpn network-manager-openvpn-gnome</code>
  </p>
  <p className="step">
    <span className="step-number">3.</span> Click the network icon in the top right corner of the screen and select "VPN Connections."
  </p>
  <p className="step">
    <span className="step-number">4.</span> Choose "Configure VPN."
  </p>
  <p className="step">
    <span className="step-number">5.</span> Click the "+" button to add a new VPN connection.
  </p>
  <p className="step">
    <span className="step-number">6.</span> Select "OpenVPN" as the VPN type.
  </p>
  <p className="step">
    <span className="step-number">7.</span> Enter a descriptive name for the connection in the "Connection name" field.
  </p>
  <p className="step">
    <span className="step-number">8.</span> Enter the server address provided by EternityVPN in the "Gateway" field.
  </p>
  <p className="step">
    <span className="step-number">9.</span> Enter your username and password in the appropriate fields.
  </p>
  <p className="step">
    <span className="step-number">10.</span> Download the OpenVPN profile file from EternityVPN and save it to your local machine.
  </p>
  <p className="step">
    <span className="step-number">11.</span> In the "User certificate" field, select the OpenVPN profile file you just downloaded.
  </p>
  <p className="step">
    <span className="step-number">12.</span> Click "Add" to save the VPN profile.
  </p>
  <p>The new VPN connection should now appear in the VPN connections list. To connect to the EternityVPN server, simply click on the connection name and enter your username and password when prompted.</p>
</div>

              </div>
          </Tab>
      </Tabs>
</div>
    )
}

/////////////////////////////////////////////////////////////////////////
function Android(){
  return(
<div>
  <style dangerouslySetInnerHTML={{__html: "\n    h1 {\n      font-size: 20px;\n      font-weight: bold;\n      text-align: center;\n      margin-top: 30px;\n    }\n    p {\n      font-size: 16px;\n      text-align: justify;\n      margin: 20px;\n    }\n    .step {\n      font-size: 16px;\n      margin-left: 40px;\n    }\n    .step-number {\n      font-weight: bold;\n    }\n  " }} />
  <h1>Eternity VPN for Android</h1>
  <p>Follow these steps to set up an L2TP VPN profile on an Android device:</p>
  <p className="step">
    <span className="step-number">1.</span> Go to the "Settings" app.
  </p>
  <p className="step">
    <span className="step-number">2.</span> Tap on "Network &amp; internet."
  </p>
  <p className="step">
    <span className="step-number">3.</span> Tap on "VPN."
  </p>
  <p className="step">
    <span className="step-number">4.</span> Tap on the "+" icon to add a new VPN profile.
  </p>
  <p className="step">
    <span className="step-number">5.</span> Choose "L2TP/IPSec PSK" as the type of VPN.
  </p>
  <p className="step">
    <span className="step-number">6.</span> Enter a name for the VPN profile in the "Name" field.
  </p>
  <p className="step">
    <span className="step-number">7.</span> In the "Server address" field, enter the server address provided by EternityVPN.
  </p>
  <p className="step">
    <span className="step-number">8.</span> Enter your username and password in the appropriate fields.
  </p>
  <p className="step">
    <span className="step-number">9.</span> Enter the pre-shared key provided by EternityVPN in the "IPSec pre-shared key" field.
  </p>
  <p className="step">
    <span className="step-number">10.</span> Tap "Save" to create the VPN profile.
  </p>
  <p>The new VPN connection should now appear in the VPN settings. To connect to the EternityVPN server, simply tap on the connection name and enter your username and password when prompted.</p>
</div>

  )
}
/////////////////////////////////////////////////////////////////////////

function Ios(){
    return(
<div>
  <style dangerouslySetInnerHTML={{__html: "\n    h1 {\n      font-size: 20px;\n      font-weight: bold;\n      text-align: center;\n      margin-top: 30px;\n    }\n    p {\n      font-size: 16px;\n      text-align: justify;\n      margin: 20px;\n    }\n    .step {\n      font-size: 16px;\n      margin-left: 40px;\n    }\n    .step-number {\n      font-weight: bold;\n    }\n  " }} />
  <h1>Eternity VPN for Ios</h1>
  <p>Follow these steps to set up an L2TP VPN profile on an iOS device:</p>
  <p className="step">
    <span className="step-number">1.</span> Go to the "Settings" app.
  </p>
  <p className="step">
    <span className="step-number">2.</span> Tap on "General."
  </p>
  <p className="step">
    <span className="step-number">3.</span> Tap on "VPN."
  </p>
  <p className="step">
    <span className="step-number">4.</span> Tap on "Add VPN Configuration."
  </p>
  <p className="step">
    <span className="step-number">5.</span> Choose "L2TP" as the type of VPN.
  </p>
  <p className="step">
    <span className="step-number">6.</span> Enter a description for the VPN profile in the "Description" field.
  </p>
  <p className="step">
    <span className="step-number">7.</span> In the "Server" field, enter the server address provided by EternityVPN.
  </p>
  <p className="step">
    <span className="step-number">8.</span> Enter your username and password in the appropriate fields.
  </p>
  <p className="step">
    <span className="step-number">9.</span> Enter the pre-shared key provided by EternityVPN in the "Secret" field.
  </p>
  <p className="step">
    <span className="step-number">10.</span> Tap "Done" to create the VPN profile.
  </p>
  <p>The new VPN connection should now appear in the VPN settings. To connect to the EternityVPN server, simply tap on the connection name and enter your username and password when prompted.</p>
</div>

    )
}

/////////////////////////////////////////////////////////////////////////
export {Windows,Android,Mac,Linux,Ios};