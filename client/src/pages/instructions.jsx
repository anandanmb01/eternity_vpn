import React from "react";




/////////////////////////////////////////////////////////////////
function Windows(){
    return(
        <div>
  <div>
    <h1 id="title">
      Windows L2TP Client Setup					
    </h1>
  </div>
  <div id="sessionMsg"><div><ul /></div></div>				
  <div>
    <div id="page-top"><div id="pageToc"><div><h5>Table of contents</h5><div><ol style={{listStyleType: 'none', marginLeft: '0px', paddingLeft: '0px'}}><li><span>1.</span> <a href="#1._Initial_configurations_(only_once_at_the_first_time)" rel="internal">1. Initial configurations (only once at the first time)</a></li><li><span>2.</span> <a href="#2._Connect_to_the_VPN_Server" rel="internal">2. Connect to the VPN Server</a></li><li><span>3.</span> <a href="#3._Enjoy_VPN_communication" rel="internal">3. Enjoy VPN communication</a></li></ol></div></div></div><div id="topic"><div id="pageText"><p>Here is the instruction how to connect to your Eternity VPN by using L2TP/IPsec VPN Client which is built-in on Windows XP, 7, 8, 10, 11 RT, Server 2003, 2008 and 2012.</p>
          <p>On this instruction, we use Windows 7 screens. Windows XP and Windows 8 are similar, however there are a little number of changes.</p>
          <div id="section_1"><span id="1._Initial_configurations_(only_once_at_the_first_time)" /><h3>1. Initial configurations (only once at the first time)</h3>
            <p>Right-click the network icon on the bottom-right side of Windows screen, and click "Open Network and Sharing Center" .</p>
            <p style={{textAlign: 'center'}}><img alt="01.jpg" src="http://www.softether.org/@api/deki/files/365/=01.jpg" /></p>
            <p>&nbsp;</p>
            <p>Click "Set up a new connection or network" on the "Network Sharing Center" .</p>
            <p style={{textAlign: 'center'}}><a title="02.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/366/=02.jpg"><img alt="02.jpg" style={{width: '550px', height: '352px'}} src="http://www.softether.org/@api/deki/files/366/=02.jpg?size=webview" /></a></p>
            <p>&nbsp;</p>
            <p>Select "Connect to a workplace" .</p>
            <p style={{textAlign: 'center'}}><a title="03.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/367/=03.jpg"><img alt="03.jpg" style={{width: '550px', height: '401px'}} src="http://www.softether.org/@api/deki/files/367/=03.jpg?size=webview" /></a></p>
            <p>&nbsp;</p>
            <p>Select "Use my Internet connection (VPN)" .</p>
            <p style={{textAlign: 'center'}}><a title="04.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/368/=04.jpg"><img alt="04.jpg" style={{width: '550px', height: '401px'}} src="http://www.softether.org/@api/deki/files/368/=04.jpg?size=webview" /></a></p>
            <p>&nbsp;</p>
            <p>You have to input the destination SoftEther VPN Server's IP address or hostname here.</p>
            <p style={{textAlign: 'center'}}><a title="05.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/369/=05.jpg"><img alt="05.jpg" style={{width: '550px', height: '401px'}} src="http://www.softether.org/@api/deki/files/369/=05.jpg?size=webview" /></a></p>
            <p>&nbsp;</p>
            <p>Enter either hostname or IP address on the "Internet address" field on the configuration wizard.</p>
            <p style={{textAlign: 'center'}}><a title="06.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/370/=06.jpg"><img alt="06.jpg" style={{width: '550px', height: '401px'}} src="http://www.softether.org/@api/deki/files/370/=06.jpg?size=webview" /></a></p>
            <p>&nbsp;</p>
            <p>After you enter the "Internet address", check "Don't connect now; just set up so I can connect later" checkbox on the bottom of the screen surely.</p>
            <div>If the username and password prompting screen appears, input both username and password field. You should check "Remember this password" .</div>
            <div>When "The connection is ready to use" message appears, click the "Close" button. Do not click the "Connect now" button.</div>
            <div style={{textAlign: 'center'}}><a style={{textDecoration: 'underline'}} title="07.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/371/=07.jpg"><img alt="07.jpg" style={{width: '550px', height: '401px'}} src="http://www.softether.org/@api/deki/files/371/=07.jpg?size=webview" /></a></div>
            <div>&nbsp;</div>
            <p>Go to "Network and Sharing Center" and click "Change adapter settings" .</p>
            <p style={{textAlign: 'center'}}><a title="08.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/372/=08.jpg"><img alt="08.jpg" style={{width: '550px', height: '352px'}} src="http://www.softether.org/@api/deki/files/372/=08.jpg?size=webview" /></a></p>
            <p>&nbsp;</p>
            <p>The currently defined VPN connection settings are listed. Right click the icon you created in the previous step, and click "Properties" .</p>
            <p style={{textAlign: 'center'}}><a title="09.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/373/=09.jpg"><img alt="09.jpg" style={{width: '550px', height: '315px'}} src="http://www.softether.org/@api/deki/files/373/=09.jpg?size=webview" /></a></p>
            <p>&nbsp;</p>
            <p>On the Properties screen, switch to the "Security" tab. (In Windows XP, switch to the "Network" tab.) Choose "Layer 2 Tunneling Protocol with IPsec (L2TP/IPSec)" on the "Type of VPN" drop-down list.</p>
            <p style={{textAlign: 'center'}}><a title="10.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/374/=10.jpg"><img alt="10.jpg" style={{width: '274px', height: '350px'}} src="http://www.softether.org/@api/deki/files/374/=10.jpg?size=webview" /></a></p>
            <p>&nbsp;</p>
            <p>Next, click the "Advanced settings" button. (In Windows XP, click the "IPsec Settings" on the "Security" tab.)</p>
            <p>The following screen will appear. Click "Use preshared key for authentication" and input the pre-shared key on the "Key" field.</p>
            <p style={{textAlign: 'center'}}><a title="11.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/375/=11.jpg"><img alt="11.jpg" style={{width: '350px', height: '252px'}} src="http://www.softether.org/@api/deki/files/375/=11.jpg?size=webview" /></a></p>
            <p>&nbsp;</p>
            <p>After the above configuration finished, click the "OK" button twice to close the property screen of the VPN connection setting.</p>
            <p>&nbsp;</p>
          </div><div id="section_2"><span id="2._Connect_to_the_VPN_Server" /><h3>2. Connect to the VPN Server</h3>
            <div>Double-click the created VPN connection setting, the below screen will appear.</div>
            <div>"User name" and "Password" fields should be filled automatically if you enable password-saving options in previous steps. If not, input both "User name" and "Password" fields.</div>
            <p>Click the "Connect" button to start the VPN connecting attempts.</p>
            <p style={{textAlign: 'center'}}><a title="12.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/376/=12.jpg"><img alt="12.jpg" style={{width: '305px', height: '350px'}} src="http://www.softether.org/@api/deki/files/376/=12.jpg?size=webview" /></a></p>
            <p>&nbsp;</p>
            <p>While the VPN is trying to be established, the following screen displays statuses. If an error occurs, confirm your settings make sure that the type of VPN is "L2TP/IPsec" , and the pre-shared key is correctly specified.</p>
            <p style={{textAlign: 'center'}}><img alt="13.jpg" src="http://www.softether.org/@api/deki/files/377/=13.jpg" /></p>
            <p>&nbsp;</p>
            <p>If the VPN connection is successfully established, a VPN connection icon will be listed on the screen which appears when you click the network icon on the bottom-right of Windows screen. The status of the VPN connection icon should be "Connected" .</p>
            <p>By the way, you can initiate the VPN connection by simply clicking this VPN icon from now on.</p>
            <p style={{textAlign: 'center'}}><a title="14.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/378/=14.jpg"><img alt="14.jpg" style={{width: '229px', height: '350px'}} src="http://www.softether.org/@api/deki/files/378/=14.jpg?size=webview" /></a></p>
            <p>&nbsp;</p>
          </div><div id="section_3"><span id="3._Enjoy_VPN_communication" /><h3>3. Enjoy VPN communication</h3>
            <p>While VPN is established, all communications will be relayed via the VPN Server. You can access to any local servers and workstation on the destination network.</p>
          </div></div></div></div>					<div />
  </div>
</div>

    )
}

////////////////////////////////////////////////////////////////////////////////


function Mac(){
    return(
        <div>
  <div>
    <h1 id="title">
      Mac OS X L2TP Client Setup					
    </h1>
  </div>
  <div id="sessionMsg"><div><ul /></div></div>				
  <div>
    <div id="page-top"><div id="pageToc"><div><h5>Table of contents</h5><div><ol style={{listStyleType: 'none', marginLeft: '0px', paddingLeft: '0px'}}><li><span>1.</span> <a href="#1._Initial_configurations_(only_once_at_the_first_time)" rel="internal">1. Initial configurations (only once at the first time)</a></li><li><span>2.</span> <a href="#2._Start_a_VPN_connection" rel="internal">2. Start a VPN connection</a></li><li><span>3.</span> <a href="#3._Enjoy_VPN_communication" rel="internal">3. Enjoy VPN communication</a></li></ol></div></div></div><div id="topic"><div id="pageText"><p>Here is an instruction how to connect to a VPN Gate Public VPN Relay Server by using L2TP/IPsec VPN Client which is built-in on Mac OS X.</p>
          <p>On this instruction, every screen-shots are taken on Mac OS X Mountain Lion. Other versions of Mac OS X are similar to be configured, however there might be minor different on UIs.</p>
          <p>These screen-shots are in English version of Mac OS X. If you use other language, you can still configure it easily by referring the following instructions.</p>
          <p>&nbsp;</p>
          <div id="section_1"><span id="1._Initial_configurations_(only_once_at_the_first_time)" /><h3>1. Initial configurations (only once at the first time)</h3>
            <p>Click the network icon on the top-right side on the Mac screen. Click "Open Network Preferences..." in the menu.</p>
            <p style={{textAlign: 'center'}}><a title="01.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/379/=01.jpg"><img alt="01.jpg" style={{width: '350px', height: '321px'}} src="http://www.softether.org/@api/deki/files/379/=01.jpg?size=webview" /></a></p>
            <p>&nbsp;</p>
            <p>Click the "+" button on the network configuration screen.</p>
            <p style={{textAlign: 'center'}}><a title="02.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/380/=02.jpg"><img alt="02.jpg" style={{width: '550px', height: '477px'}} src="http://www.softether.org/@api/deki/files/380/=02.jpg?size=webview" /></a></p>
            <p>&nbsp;</p>
            <p>Select "VPN" as "Interface" , "L2TP over IPsec" as "VPN Type" and click the "Create" button.</p>
            <p style={{textAlign: 'center'}}><a title="03.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/381/=03.jpg"><img alt="03.jpg" style={{width: '550px', height: '438px'}} src="http://www.softether.org/@api/deki/files/381/=03.jpg?size=webview" /></a></p>
            <p>&nbsp;</p>
            <p>A new L2TP VPN configuration will be created, and the configuration screen will appear.</p>
            <p>&nbsp;</p>
            <p style={{textAlign: 'center'}}><a title="04.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/382/=04.jpg"><img alt="04.jpg" style={{width: '550px', height: '477px'}} src="http://www.softether.org/@api/deki/files/382/=04.jpg?size=webview" /></a></p>
            <p>On this screen, you have to specify either hostname or IP address of the destination SoftEther VPN Server.</p>
            <p>After you specified the "Server Address" , input the user-name on the "Account Name" field, which is the next to the "Server Address" field.</p>
            <p>Next, click the "Authentication Settings..." button.</p>
            <p style={{textAlign: 'center'}}><a title="05.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/383/=05.jpg"><img alt="05.jpg" style={{width: '550px', height: '477px'}} src="http://www.softether.org/@api/deki/files/383/=05.jpg?size=webview" /></a></p>
            <p>&nbsp;</p>
            <p>The authentication screen will appear. Input your password in the "Password" field. Specify the pre-shared key also on the "Shared Secret" field. After you input them, click the "OK" button.</p>
            <p>After return to the previous screen, check the "Show VPN status in menu bar" and click the "Advanced..." button.</p>
            <p style={{textAlign: 'center'}}><a title="06.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/384/=06.jpg"><img alt="06.jpg" style={{width: '550px', height: '477px'}} src="http://www.softether.org/@api/deki/files/384/=06.jpg?size=webview" /></a></p>
            <p>&nbsp;</p>
            <p>The advanced settings will be appeared. Check the "Send all traffic over VPN connection" and click the "OK" button.</p>
            <p>On the VPN connection settings screen, click the "Connect" button to start the VPN connection.</p>
            <p>&nbsp;</p>
          </div><div id="section_2"><span id="2._Start_a_VPN_connection" /><h3>2. Start a VPN connection</h3>
            <p>You can start a new VPN connection by clicking the "Connect" button at any time. You can also initiate a VPN connection by clicking the VPN icon on the menu bar.</p>
            <p>After the VPN connection will be established, the VPN connection setting screen will become as below as the "Status" will be "Connected" . Your private IP address on the VPN, and connect duration time will be displayed on the screen.</p>
            <p style={{textAlign: 'center'}}><a title="07.jpg" rel="internal" href="http://www.softether.org/@api/deki/files/385/=07.jpg"><img alt="07.jpg" style={{width: '550px', height: '477px'}} src="http://www.softether.org/@api/deki/files/385/=07.jpg?size=webview" /></a></p>
          </div><div id="section_3"><span id="3._Enjoy_VPN_communication" /><h3>3. Enjoy VPN communication</h3>
            <p>While VPN is established, all communications will be relayed via the VPN Server. You can access to any local servers and workstation on the destination network.</p>
          </div></div></div></div>					<div />
  </div>
</div>

    )
}


/////////////////////////////////////////////////////////////////////////
function Android(){
    return(
        <>
            Android instructions
        </>
    )
}

function Linux(){
    return(
        <>
            Linux Instruction
        </>
    )
}

/////////////////////////////////////////////////////////////////////////
function Ios(){
    return(
        <>
            Ios instruction
        </>
    )
}

/////////////////////////////////////////////////////////////////////////
export {Windows,Android,Mac,Linux,Ios};