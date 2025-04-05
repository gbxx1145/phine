export default function run(cs_img: Il2Cpp.Image, unity_cor_img: Il2Cpp.Image) {

  const Vector3_class = unity_cor_img.class("UnityEngine.Vector3")
  const Object_class = unity_cor_img.class("UnityEngine.Object")

  const ClickControl_class = cs_img.class("ClickControl")
  const DragControl_class = cs_img.class("DragControl")
  const FlickControl_class = cs_img.class("FlickControl")
  const HoldControl_class = cs_img.class("HoldControl")
  const SEPlayer_class = cs_img.class("SEPlayer")

  const enum HIT_SOUND {
    TAP = 7,
    DRAG,
    FLICK,
  }
  const JUDGE_TIME = 0.0

  const judge_note_new = (sound_id: HIT_SOUND) =>
    function (this: Il2Cpp.ValueType) {
      if (this.field("isJudged").value)
        return true

      const seplayer_play = SEPlayer_class.field("PlayHitFx").value as Il2Cpp.Object
      const play_sound = seplayer_play.method("Invoke").invoke
      const note_info = this.field("noteInfor").value as Il2Cpp.Object
      const pr_cr = this.field("progressControl").value as Il2Cpp.Object
      const sc_cr = this.field("scoreControl").value as Il2Cpp.Object
      const judge_time =
        (note_info.field("realTime").value as number)
        - (pr_cr.field("nowTime").value as number)

      if (judge_time > JUDGE_TIME)
        return false

      this.field("isJudged").value = true
      const transform = this.method("get_transform")
        .invoke() as Il2Cpp.Object

      const v3 = Vector3_class.field("zeroVector").value as Il2Cpp.Object
      v3.field("x").value = note_info.field("positionX").value as number
      transform.method("set_localPosition").invoke(v3)

      const vec3_judgeline = transform.method("get_position")
        .invoke() as Il2Cpp.Object
      sc_cr.method("Perfect").invoke(
        note_info,
        judge_time,
        vec3_judgeline,
        false
      )
      play_sound(sound_id)
      return true
    }

  //tap
  //@ts-ignore
  ClickControl_class.method("Judge").implementation = judge_note_new(HIT_SOUND.TAP)
  //drag
  //@ts-ignore
  DragControl_class.method("Judge").implementation = judge_note_new(HIT_SOUND.DRAG)

  //flick
  //@ts-ignore
  FlickControl_class.method("Judge").implementation = judge_note_new(HIT_SOUND.FLICK)

  //hold
  // @ts-ignore
  HoldControl_class.method("Judge").implementation =
    function (this: Il2Cpp.ValueType) {
      const seplayer_play = SEPlayer_class.field("PlayHitFx").value as Il2Cpp.Object
      const play_sound = seplayer_play.method("Invoke").invoke
      const note_info = this.field("noteInfor").value as Il2Cpp.Object
      const pr_cr = this.field("progressControl").value as Il2Cpp.Object
      const sc_cr = this.field("scoreControl").value as Il2Cpp.Object
      const judge_time =
        (note_info.field("realTime").value as number)
        - (pr_cr.field("nowTime").value as number)
      const hold_time = judge_time
        + (note_info.field("holdTime").value as number)
      if (judge_time <= JUDGE_TIME && !this.field("isJudged").value) {
        this.field("isPerfect").value = true
        this.field("isJudged").value = true
        this.field("judged").value = true
        this.field("judgeOver").value = true
        this.field("_judgeTime").value = judge_time
        const perfect_go = Object_class.method("Instantiate")
          .overload("UnityEngine.Object")
          .invoke(this.field("perfect").value) as Il2Cpp.Object
        const p_transform = perfect_go.method("get_transform").invoke() as Il2Cpp.Object
        const v3 = Vector3_class.field("zeroVector").value as Il2Cpp.Object
        const _cache = (this.field("scale").value as number) * 1.35
        v3.field("x").value = _cache
        v3.field("y").value = _cache
        v3.field("z").value = 1.0
        p_transform.method("set_localScale").invoke(v3)
        const transform = this.method("get_transform")
          .invoke() as Il2Cpp.Object
        const _v3 = transform.method("get_position").invoke() as Il2Cpp.Object
        p_transform.method("set_position").invoke(_v3)
        play_sound(HIT_SOUND.TAP)
        return false
      }
      if (hold_time <= 0) {
        this.field("judgeOver").value = true
        const transform = this.method("get_transform")
          .invoke() as Il2Cpp.Object
        const v3 = Vector3_class.field("zeroVector").value as Il2Cpp.Object
        v3.field("x").value = note_info.field("positionX").value as number
        transform.method("set_localPosition").invoke(v3)

        const vec3_judgeline = transform.method("get_position")
          .invoke() as Il2Cpp.Object
        sc_cr.method("Perfect").invoke(
          note_info,
          judge_time,
          vec3_judgeline,
          true
        )
        return true
      }
      return false
    }

  const AUTOPLAY = Il2Cpp.string("AUTOPLAY")

  const ScoreControl_class = cs_img.class("ScoreControl")
  ScoreControl_class.method("Update").implementation =
    function () {
      this.method("Update").invoke()
      if (this.field("_combo").value as number >= 3)
        (this.field("comboText").value as Il2Cpp.Object).method("set_text").invoke(AUTOPLAY)
    }

  const SettleAccountsControl_class = cs_img.class("SettleAccountsControl")
  //@ts-ignore
  SettleAccountsControl_class.method("GetCollection").implementation =
    function (this: Il2Cpp.ValueType) {
      const _r = this.method("GetCollection").invoke();
      const best = this.field("best").value as Il2Cpp.Object
      best.method("set_text").invoke(AUTOPLAY)
      return _r
    }

  const GameInformation_class = cs_img.class("GameInformation")
  GameInformation_class.method("SetSongRecord").implementation =
    function () { }
}
