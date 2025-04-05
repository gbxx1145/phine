import "frida-il2cpp-bridge"
import autoplay from "./autoplay"
import chart_dump from "./chart_dump";
import chart_replace from "./chart_replace";
import fool from "./fool";

Il2Cpp.perform(() => {
  const cs_img = Il2Cpp.domain.assembly("Assembly-CSharp").image
  const unity_cor_img = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image
  const unity_json_serialize_img = Il2Cpp.domain.assembly("UnityEngine.JSONSerializeModule").image
  fool(cs_img)
  autoplay(cs_img, unity_cor_img)
  chart_dump(cs_img, unity_json_serialize_img)
  chart_replace(cs_img, unity_cor_img)
}, "main")
