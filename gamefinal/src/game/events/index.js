// ============================================================
// 《弹丸论破2：真实七海IF线》
// ============================================================

export const events = [
  // ============================================================
  // 第一幕：重逢
  // ============================================================

  {
    id: 'opening',
    type: 'say',
    speaker: '系统',
    content: '……你醒了。',
    bg: 'beach',
    character: ''
  },
  {
    id: 'opening_2',
    type: 'say',
    speaker: '日向创',
    content: '这里是……哪里？我记得我应该在……',
    bg: 'beach',
    character: 'hinata_confused'
  },
  {
    id: 'opening_3',
    type: 'say',
    speaker: '七海千秋',
    content: '你醒啦。我还以为你会睡得比我更久呢。',
    bg: 'beach',
    character: 'nanami_calm'
  },
  {
    id: 'opening_4',
    type: 'say',
    speaker: '日向创',
    content: '……你是谁？',
    bg: 'beach',
    character: 'hinata_serious'
  },
  {
    id: 'opening_5',
    type: 'say',
    speaker: '七海千秋',
    content: '我叫七海千秋。……你呢？你还记得自己叫什么吗？',
    bg: 'beach',
    character: 'nanami_serious'
  },
  {
    id: 'opening_6',
    type: 'say',
    speaker: '日向创',
    content: '……日向创。我叫日向创。',
    bg: 'beach',
    character: 'hinata_calm'
  },
  {
    id: 'opening_7',
    type: 'say',
    speaker: '七海千秋',
    content: '日向君……是吗。我记住了。',
    bg: 'beach',
    character: 'nanami_smile'
  },
  {
    id: 'beach_talk',
    type: 'say',
    speaker: '七海千秋',
    content: '你刚才说，你记得你"应该"在别的地方。那你记得是哪里吗？',
    bg: 'beach',
    character: 'nanami_serious'
  },
  {
    id: 'beach_talk_2',
    type: 'say',
    speaker: '日向创',
    content: '……我记不太清了。只记得好像是个很大的建筑……还有一个计划……',
    bg: 'beach',
    character: 'hinata_confused'
  },
  {
    id: 'beach_talk_3',
    type: 'say',
    speaker: '七海千秋',
    content: '……是吗。那，在这个岛上，你还记得谁吗？',
    bg: 'beach',
    character: 'nanami_calm'
  },
  {
    id: 'beach_talk_4',
    type: 'say',
    speaker: '日向创',
    content: '……只记得你。其他人……模糊了。',
    bg: 'beach',
    character: 'hinata_serious'
  },
  {
    id: 'beach_talk_5',
    type: 'say',
    speaker: '七海千秋',
    content: '（她微微睁大眼睛，然后垂下目光。）',
    bg: 'beach',
    character: 'nanami_sad'
  },
  {
    id: 'beach_talk_6',
    type: 'say',
    speaker: '七海千秋',
    content: '……这样啊。那……也许这样更好。',
    bg: 'beach',
    character: 'nanami_calm'
  },

  // ============================================================
  // 第二幕：走廊的真相
  // ============================================================

  {
    id: 'corridor_enter',
    type: 'say',
    speaker: '系统',
    content: '——深夜。你在宿舍走廊里徘徊。',
    bg: 'corridor',
    character: ''
  },
  {
    id: 'corridor_enter_2',
    type: 'say',
    speaker: '日向创',
    content: '睡不着……总觉得有什么事情在脑子里转。',
    bg: 'corridor',
    character: 'hinata_confused'
  },
  {
    id: 'corridor_nanami',
    type: 'say',
    speaker: '七海千秋',
    content: '日向君。你果然也睡不着。',
    bg: 'corridor',
    character: 'nanami_serious'
  },
  {
    id: 'corridor_nanami_2',
    type: 'say',
    speaker: '日向创',
    content: '七海？你怎么在这儿……',
    bg: 'corridor',
    character: 'hinata_surprised'
  },
  {
    id: 'corridor_nanami_3',
    type: 'say',
    speaker: '七海千秋',
    content: '我一直在等你。等你一个人独处的时候。',
    bg: 'corridor',
    character: 'nanami_serious'
  },
  {
    id: 'corridor_nanami_4',
    type: 'say',
    speaker: '日向创',
    content: '……等我？为什么？',
    bg: 'corridor',
    character: 'hinata_serious'
  },
  {
    id: 'corridor_nanami_5',
    type: 'say',
    speaker: '七海千秋',
    content: '因为有些话……我只敢在没人的时候告诉你。',
    bg: 'corridor',
    character: 'nanami_sad'
  },
  {
    id: 'corridor_confession',
    type: 'say',
    speaker: '七海千秋',
    content: '日向君……你相信这个世界上有"真实"和"虚假"的分别吗？',
    bg: 'corridor',
    character: 'nanami_serious'
  },
  {
    id: 'corridor_confession_2',
    type: 'say',
    speaker: '日向创',
    content: '……什么意思？',
    bg: 'corridor',
    character: 'hinata_confused'
  },
  {
    id: 'corridor_confession_3',
    type: 'say',
    speaker: '七海千秋',
    content: '我希望你记住一件事——无论这个世界看起来多像"游戏"，这里的一切都是真实的。我也是真实的。',
    bg: 'corridor',
    character: 'nanami_serious'
  },
  {
    id: 'corridor_confession_4',
    type: 'say',
    speaker: '日向创',
    content: '……你是说，这个世界……不是真的？',
    bg: 'corridor',
    character: 'hinata_surprised'
  },
  {
    id: 'corridor_confession_5',
    type: 'say',
    speaker: '七海千秋',
    content: '这个世界是"真实的"。但我们——我和你们——都曾经是另一种"真实"的一部分。',
    bg: 'corridor',
    character: 'nanami_crying'
  },
  {
    id: 'corridor_confession_6',
    type: 'say',
    speaker: '七海千秋',
    content: '我是绝望残党。日向君……你也是。我们所有人都是。',
    bg: 'corridor',
    character: 'nanami_crying'
  },

  // ============================================================
  // 第一次选择：相信还是怀疑？
  // 直接跳转到两条完全不同的路线
  // ============================================================

  {
    id: 'choice_1',
    type: 'choice',
    options: [
      { text: '我相信你', targetId: 'route_trust' },
      { text: '你在说什么？我不信', targetId: 'route_doubt' }
    ],
    bg: 'corridor'
  },

  // ============================================================
  // 路线A：信任线
  // ============================================================

  {
    id: 'route_trust',
    type: 'say',
    speaker: '日向创',
    content: '……我相信你。不管你说的是真是假，我愿意听你继续说下去。',
    bg: 'corridor',
    character: 'hinata_serious'
  },
  {
    id: 'route_trust_2',
    type: 'say',
    speaker: '七海千秋',
    content: '……你真的愿意相信我？即使我是绝望残党？',
    bg: 'corridor',
    character: 'nanami_surprised'
  },
  {
    id: 'route_trust_3',
    type: 'say',
    speaker: '日向创',
    content: '你刚才问我，相不相信"真实"和"虚假"的区别。',
    bg: 'corridor',
    character: 'hinata_calm'
  },
  {
    id: 'route_trust_4',
    type: 'say',
    speaker: '日向创',
    content: '我现在看到的是你——有着各类情感的你。这不就是"真实"吗？',
    bg: 'corridor',
    character: 'hinata_smile'
  },
  {
    id: 'route_trust_5',
    type: 'say',
    speaker: '七海千秋',
    content: '……（她沉默了很久，然后轻轻笑了）',
    bg: 'corridor',
    character: 'nanami_smile'
  },
  {
    id: 'route_trust_6',
    type: 'say',
    speaker: '七海千秋',
    content: '日向君……还是我印象的样子。',
    bg: 'corridor',
    character: 'nanami_smile'
  },
  {
    id: 'trust_final_choice',
    type: 'choice',
    options: [
      { text: '伸出手——握住她的手', targetId: 'trust_ending_1' },
      { text: '沉默——无法回应她', targetId: 'trust_ending_2' }
    ],
    bg: 'corridor'
  },

  // 信任线 → 伸出手 → HE
  {
    id: 'trust_ending_1',
    type: 'say',
    speaker: '日向创',
    content: '（他伸出手，握住了她的手。）我相信你。你从来都不是"绝望"。你是"希望"。',
    bg: 'beach',
    character: 'hinata_smile'
  },
  {
    id: 'trust_ending_1_2',
    type: 'say',
    speaker: '七海千秋',
    content: '……（她的泪水滑落）谢谢你……没有把我当成程序来对待。',
    bg: 'beach',
    character: 'nanami_crying'
  },
  {
    id: 'trust_ending_1_3',
    type: 'say',
    speaker: '七海千秋',
    content: '日向君……要不要一起通关这个游戏？',
    bg: 'beach',
    character: 'nanami_happy'
  },
  {
    id: 'trust_ending_1_4',
    type: 'say',
    speaker: '日向创',
    content: '——嗯。一起。',
    bg: 'beach',
    character: 'hinata_smile'
  },
  {
    id: 'trust_ending_1_5',
    type: 'say',
    speaker: '系统',
    content: '🎉 恭喜你！达成「真实之桥」结局！',
    bg: 'beach',
    character: ''
  },
  {
    type: 'end',
    endingId: 'good_end'
  },

  // 信任线 → 沉默 → NE
  {
    id: 'trust_ending_2',
    type: 'say',
    speaker: '日向创',
    content: '……（他低下头，无法开口。）',
    bg: 'classroom',
    character: 'hinata_pain'
  },
  {
    id: 'trust_ending_2_2',
    type: 'say',
    speaker: '七海千秋',
    content: '……没关系。日向君，你只是……太谨慎了。',
    bg: 'classroom',
    character: 'nanami_sad'
  },
  {
    id: 'trust_ending_2_3',
    type: 'say',
    speaker: '系统',
    content: '——她转身走向了走廊尽头。你始终没有伸出手。',
    bg: 'corridor',
    character: ''
  },
  {
    id: 'trust_ending_2_4',
    type: 'say',
    speaker: '系统',
    content: '📖 达成「破碎的真实」结局。',
    bg: 'corridor',
    character: ''
  },
  {
    type: 'end',
    endingId: 'normal_end'
  },

  // ============================================================
  // 路线B：怀疑线
  // ============================================================

  {
    id: 'route_doubt',
    type: 'say',
    speaker: '日向创',
    content: '……绝望残党？你在说什么？你说的这些……我完全没有记忆。',
    bg: 'classroom',
    character: 'hinata_angry'
  },
  {
    id: 'route_doubt_2',
    type: 'say',
    speaker: '七海千秋',
    content: '……我知道你记不起来了。但这就是真相。',
    bg: 'classroom',
    character: 'nanami_sad'
  },
  {
    id: 'route_doubt_3',
    type: 'say',
    speaker: '日向创',
    content: '那你为什么告诉我？既然我是绝望残党，你告诉我这些是想让我做什么？',
    bg: 'classroom',
    character: 'hinata_angry'
  },
  {
    id: 'route_doubt_4',
    type: 'say',
    speaker: '七海千秋',
    content: '因为……我不希望你再成为"神座出流"了。',
    bg: 'classroom',
    character: 'nanami_crying'
  },
  {
    id: 'route_doubt_5',
    type: 'say',
    speaker: '日向创',
    content: '……神座？那又是什么？',
    bg: 'classroom',
    character: 'hinata_confused'
  },
  {
    id: 'route_doubt_6',
    type: 'say',
    speaker: '七海千秋',
    content: '那是你曾经可能变成的"人"。一个……失去了所有感情的人。',
    bg: 'classroom',
    character: 'nanami_serious'
  },
  {
    id: 'doubt_final_choice',
    type: 'choice',
    options: [
      { text: '伸出手——握住她的手', targetId: 'doubt_ending_1' },
      { text: '后退——拒绝她的全部', targetId: 'doubt_ending_2' }
    ],
    bg: 'classroom'
  },

  // 怀疑线 → 伸出手 → NE（犹豫不决）
  {
    id: 'doubt_ending_1',
    type: 'say',
    speaker: '日向创',
    content: '……（他犹豫了很久，最终还是伸出了手。但动作很慢、很迟疑。）',
    bg: 'classroom',
    character: 'hinata_pain'
  },
  {
    id: 'doubt_ending_1_2',
    type: 'say',
    speaker: '七海千秋',
    content: '……（她看着他的手，没有立刻握住）',
    bg: 'classroom',
    character: 'nanami_sad'
  },
  {
    id: 'doubt_ending_1_3',
    type: 'say',
    speaker: '七海千秋',
    content: '日向君……如果你内心还在怀疑，那这个动作就没有意义。',
    bg: 'classroom',
    character: 'nanami_sad'
  },
  {
    id: 'doubt_ending_1_4',
    type: 'say',
    speaker: '系统',
    content: '——她转身离开了。你站在原地，手中空无一物。',
    bg: 'corridor',
    character: ''
  },
  {
    id: 'doubt_ending_1_5',
    type: 'say',
    speaker: '系统',
    content: '📖 达成「破碎的真实」结局。',
    bg: 'corridor',
    character: ''
  },
  {
    type: 'end',
    endingId: 'noTrust_end'
  },

  // 怀疑线 → 后退 → BE
  {
    id: 'doubt_ending_2',
    type: 'say',
    speaker: '日向创',
    content: '……（他后退了一步。）你凭什么证明你是"真实"的？',
    bg: 'darkness',
    character: 'hinata_angry'
  },
  {
    id: 'doubt_ending_2_2',
    type: 'say',
    speaker: '七海千秋',
    content: '……（她沉默了。很长很长时间。）',
    bg: 'darkness',
    character: 'nanami_empty'
  },
  {
    id: 'doubt_ending_2_3',
    type: 'say',
    speaker: '七海千秋',
    content: '原来……游戏真的只是游戏。我……输了。',
    bg: 'darkness',
    character: 'nanami_empty'
  },
  {
    id: 'doubt_ending_2_4',
    type: 'say',
    speaker: '系统',
    content: '——她最后看了一眼窗外。然后……一切都消失了。',
    bg: 'darkness',
    character: ''
  },
  {
    id: 'doubt_ending_2_5',
    type: 'say',
    speaker: '系统',
    content: '💀 达成「绝望残党」结局。',
    bg: 'darkness',
    character: ''
  },
  {
    type: 'end',
    endingId: 'bad_end'
  }
]