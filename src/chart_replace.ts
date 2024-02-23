export default function run(cs_img: Il2Cpp.Image, ue_cor_img: Il2Cpp.Image) {
  const TextAsset_class = ue_cor_img.class("UnityEngine.TextAsset")
  TextAsset_class.method("get_text").implementation =
    function () {
      try {
        const chart = File.readAllText(Il2Cpp.application.dataPath + "/chart_inject/chart.json")
        return Il2Cpp.string(chart)
      } catch {
        return this.method("get_text").invoke()
      }
    }
}
