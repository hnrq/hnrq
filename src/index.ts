import nipplejs from "nipplejs";

const joystick = nipplejs.create({
  multitouch: false,
  mode: "dynamic",
});
const canvas = document.getElementById("webgl") as HTMLCanvasElement;
