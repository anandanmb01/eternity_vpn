const VPNCMD = require("vpncmd");

//--------------------------vpncmd-----------------------------------------//
const vpncmd = new VPNCMD({
  bin: "vpnclient/vpncmd",
  address: process.env.IP,
  port: process.env.PORT,
  password: process.env.VPN_MASTER_HUB_PASS,
  hub: process.env.MASTER_HUB,
});

const India__eternity_hub = new VPNCMD({
  bin: "vpnclient/vpncmd",
  address: process.env.IP,
  port: process.env.PORT,
  password: process.env.VPN_HUB_PASS,
  hub: "eternity_hub",
});
const India__eternity_hub_01 = new VPNCMD({
  bin: "vpnclient/vpncmd",
  address: process.env.IP,
  port: process.env.PORT,
  password: process.env.VPN_HUB_PASS,
  hub: "eternity_hub_01",
});

const India__eternity_hub_02 = new VPNCMD({
  bin: "vpnclient/vpncmd",
  address: process.env.IP,
  port: process.env.PORT,
  password: process.env.VPN_HUB_PASS,
  hub: "eternity_hub_02",
});

const India__eternity_hub_03 = new VPNCMD({
  bin: "vpnclient/vpncmd",
  address: process.env.IP,
  port: process.env.PORT,
  password: process.env.VPN_HUB_PASS,
  hub: "eternity_hub_03",
});

const India__eternity_hub_04 = new VPNCMD({
  bin: "vpnclient/vpncmd",
  address: process.env.IP,
  port: process.env.PORT,
  password: process.env.VPN_HUB_PASS,
  hub: "eternity_hub_04",
});

const India__eternity_hub_05 = new VPNCMD({
  bin: "vpnclient/vpncmd",
  address: process.env.IP,
  port: process.env.PORT,
  password: process.env.VPN_HUB_PASS,
  hub: "eternity_hub_05",
});

const Qatar__eternity_hub = new VPNCMD({
  bin: "vpnclient/vpncmd",
  address: process.env.QATAR_IP,
  port: process.env.PORT,
  password: process.env.VPN_HUB_PASS,
  hub: "q_eternity_hub",
});

const Qatar__eternity_hub_01 = new VPNCMD({
  bin: "vpnclient/vpncmd",
  address: process.env.QATAR_IP,
  port: process.env.PORT,
  password: process.env.VPN_HUB_PASS,
  hub: "q_eternity_hub_01",
});

const Qatar__eternity_hub_02 = new VPNCMD({
  bin: "vpnclient/vpncmd",
  address: process.env.QATAR_IP,
  port: process.env.PORT,
  password: process.env.VPN_HUB_PASS,
  hub: "q_eternity_hub_02",
});

const Qatar__eternity_hub_03 = new VPNCMD({
  bin: "vpnclient/vpncmd",
  address: process.env.QATAR_IP,
  port: process.env.PORT,
  password: process.env.VPN_HUB_PASS,
  hub: "q_eternity_hub_03",
});

module.exports = {
  vpncmd,
  India__eternity_hub,
  India__eternity_hub_01,
  India__eternity_hub_02,
  India__eternity_hub_03,
  India__eternity_hub_04,
  India__eternity_hub_05,
  Qatar__eternity_hub,
  Qatar__eternity_hub_01,
  Qatar__eternity_hub_02,
  Qatar__eternity_hub_03,
};
//-----------------------vpncmd_end----------------------------------------//
