export default function run(cs_img: Il2Cpp.Image, unity_json_serialize_img: Il2Cpp.Image) {
  // const GameInformation_class = cs_img.class("GameInformation")
  // const SongSelector_class = cs_img.class("SongSelector")
  //
  // // @ts-ignore
  // SongSelector_class.method("GameStart").implementation =
  //   function (songIndex: number, levelIndex: number) {
  //       this.method("GameStart").invoke(songIndex, levelIndex)
  //       const chart_store = GameInformation_class.field("chartStore").value as Il2Cpp.Object
  //       const now_chapter_info = this.field("_nowChapterInfo").value as Il2Cpp.Object
  //       const main = GameInformation_class.field("_main").value as Il2Cpp.Object
  //       const selector_song_item = (this.field("_songItems").value as Il2Cpp.Object).method("get_Item").invoke(songIndex) as Il2Cpp.Object
  //       // const level_start_info = selector_song_item.method("GetLevelStartInfo").invoke(levelIndex) as Il2Cpp.Object
  //       // const level_start_info = (main.method("GetSongInformation").invoke() as Il2Cpp.Object)
  //       const level_start_info = main.field("levelStartInfo").value as Il2Cpp.Object
  //       const chart_text_asset_ref = chart_store.method("Get").invoke(level_start_info.field("chartAddressableKey").value) as Il2Cpp.Object
  //       const chart_ue_text_asset = chart_text_asset_ref.field("obj").value as Il2Cpp.Object
  //       const chart_text = chart_ue_text_asset.method("get_text").invoke() as Il2Cpp.String
  //       // console.log(now_chapter_info.field("chapterCode").value)
  //
  //       File.writeAllText(Il2Cpp.application.dataPath + "/chart.json", chart_text.content as string)
  //   }

  // const Chart_class = cs_img.class("Chart")
  const JsonUtility_class = unity_json_serialize_img.class("UnityEngine.JsonUtility")
  const FromJson_method = JsonUtility_class.method("FromJson")
    .overload("System.String", "System.Type")
  //@ts-ignore
  FromJson_method.implementation =
    function (json: Il2Cpp.String, type: Il2Cpp.Object) {
      const type_name = type.method("get_FullName").invoke() as Il2Cpp.String
      if (type_name.content == "Chart")
        File.writeAllText(Il2Cpp.application.dataPath + "/chart_dump/chart.json", json.content as string)
      return FromJson_method.invoke(json, type)
    }
}

