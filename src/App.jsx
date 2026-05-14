import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Eye, EyeOff, Type, Mic, MicOff, RotateCcw, ChevronLeft, ChevronRight, CheckCircle, AlertCircle, X, Settings } from 'lucide-react';

// --- CONTENT LIBRARY ---
const PRESETS = [
  {
    id: 'songbie',
    title: '送別（王維）',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `山中相送罷，\n日暮掩柴扉。\n春草明年綠，\n王孫歸不歸。`
  },
  {
    id: 'jianke',
    title: '劍客（賈島）',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `十年磨一劍，\n霜刃未曾試。\n今日把示君，\n誰有不平事？`
  },
  {
    id: 'youziyin',
    title: '遊子吟 (孟郊)',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `慈母手中線，遊子身上衣。\n臨行密密縫，意恐遲遲歸。\n誰言寸草心，報得三春暉。`
  },
  {
    id: 'dengjinling',
    title: '登金陵鳳凰台 (李白)',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `鳳凰臺上鳳凰遊，鳳去臺空江自流。\n吳宮花草埋幽徑，晉代衣冠成古丘。\n三山半落青天外，二水中分白鷺洲。\n總為浮雲能蔽日，長安不見使人愁。`
  },
  {
    id: 'jinlingjiu',
    title: '金陵酒肆留別 (李白)',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `風吹柳花滿店香，吳姬壓酒勸客嘗。\n金陵子弟來相送，欲行不行各盡觴。\n請君試問東流水，別意與之誰短長。`
  },
  {
    id: 'loushimei',
    title: '陋室銘 (劉禹錫)',
    category: 'Classical',
    type: 'strict',
    lang: 'zh',
    content: `山不在高，有仙則名。水不在深，有龍則靈。斯是陋室，惟吾德馨。苔痕上階綠，草色入簾青。談笑有鴻儒，往來無白丁。可以調素琴，閱金經。無絲竹之亂耳，無案牘之勞形。南陽諸葛廬，西蜀子雲亭。孔子云：何陋之有？`
  },
  {
    id: 'pipaxing',
    title: '琵琶行 (白居易) (擷取)',
    category: 'Classical',
    type: 'strict',
    lang: 'zh',
    content: `潯陽江頭夜送客，楓葉荻花秋瑟瑟。\n主人下馬客在船，舉酒欲飲無管弦。\n醉不成歡慘將別，別時茫茫江浸月。\n忽聞水上琵琶聲，主人忘歸客不發。\n尋聲暗問彈者誰？琵琶聲停欲語遲。\n移船相近邀相見，添酒回燈重開宴。\n千呼萬喚始出來，猶抱琵琶半遮面。\n轉軸撥弦三兩聲，未成曲調先有情。\n弦弦掩抑聲聲思，似訴平生不得志。\n低眉信手續續彈，說盡心中無限事。\n輕攏慢捻抹復挑，初為霓裳後六么。\n大弦嘈嘈如急雨，小弦切切如私語。\n嘈嘈切切錯雜彈，大珠小珠落玉盤。\n間關鶯語花底滑，幽咽泉流冰下難。\n冰泉冷澀弦凝絕，凝絕不通聲暫歇。\n別有幽愁暗恨生，此時無聲勝有聲。\n銀瓶乍破水漿迸，鐵騎突出刀槍鳴。\n曲終收撥當心畫，四弦一聲如裂帛。\n東船西舫悄無言，唯見江心秋月白。\n沉吟放撥插弦中，整頓衣裳起斂容。\n自言本是京城女，家在蝦蟆陵下住。\n十三學得琵琶成，名屬教坊第一部。\n曲罷曾教善才服，妝成每被秋娘妒。\n五陵年少爭纏頭，一曲紅綃不知數。\n鈿頭銀篦擊節碎，血色羅裙翻酒污。\n今年歡笑復明年，秋月春風等閒度。\n弟走從軍阿姨死，暮去朝來顏色故。\n門前冷落鞍馬稀，老大嫁作商人婦。\n商人重利輕別離，前月浮梁買茶去。\n去來江口守空船，繞船月明江水寒。\n夜深忽夢少年事，夢啼妝淚紅闌乾。\n我聞琵琶已嘆息，又聞此語重唧唧。\n同是天涯淪落人，相逢何必曾相識！\n我從去年辭帝京，謫居臥病潯陽城。\n潯陽地僻無音樂，終歲不聞絲竹聲。\n住近湓江地低濕，黃蘆苦竹繞宅生。\n其間旦暮聞何物？杜鵑啼血猿哀鳴。\n春江花朝秋月夜，往往取酒還獨傾。\n豈無山歌與村笛？嘔啞嘲哳難為聽。\n今夜聞君琵琶語，如聽仙樂耳暫明。\n莫辭更坐彈一曲，為君翻作琵琶行。\n感我此言良久立，卻坐促弦弦轉急。\n淒淒不似向前聲，滿座重聞皆掩泣。\n座中泣下誰最多？江州司馬青衫濕。\n`
  },
  {
    id: 'ershi',
    title: '兒時記趣 (沈復) (擷取)',
    category: 'Classical',
    type: 'strict',
    lang: 'zh',
    content: `又常於土牆凹凸處、花臺小草叢雜處，蹲其身，使與臺齊；定神細視，以叢草為林，蟲蟻為獸；以土礫凸者為丘，凹者為壑，神遊其中，怡然自得。一日，見二蟲鬥草間，觀之，興正濃，忽有龐然大物，拔山倒樹而來，蓋一癩蝦蟆也。舌一吐而二蟲盡為所吞。余年幼，方出神，不覺呀然驚恐。神定，捉蝦蟆，鞭數十，驅之別院。`
  },
  {
    id: 'taohuayuanji',
    title: '桃花源記 (陶淵明) (擷取)',
    category: 'Classical',
    type: 'strict',
    lang: 'zh',
    content: `村中聞有此人，咸來問訊。自云：「先世避秦時亂，率妻子邑人來此絕境，不復出焉；遂與外人間隔。」問「今是何世？」乃不知有漢，無論魏、晉！此人一一為具言所聞，皆歎惋。餘人各復延至其家，皆出酒食。停數日，辭去。此中人語云：「不足為外人道也。」既出，得其船，便扶向路，處處誌之。及郡下，詣太守，說如此。太守即遣人隨其往，尋向所誌，遂迷不復得路。南陽劉子驥，高尚士也，聞之，欣然規往，未果，尋病終。後遂無問津者。`
  },
  {
    id: '114achinesel7',
    title: '跟著公共藝術去旅行 (擷取)',
    category: 'Prose',
    type: 'strict',
    lang: 'zh',
    content: `在前往梅花鹿園區的路上，佇立著一隻散發冷冽金屬光澤，全身布滿花朵的公鹿。像樹枝般昂揚的鹿角，融入在樹林中，搭配著色彩繽紛的花苞，看起來花團錦簇。`
  },
  {
    id: 'guogurenzhuang',
    title: '過故人莊 (孟浩然)',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `故人具雞黍，邀我至田家。\n綠樹村邊合，青山郭外斜。\n開軒面場圃，把酒話桑麻。\n待到重陽日，還來就菊花。`
  },
  {
    id: '114achinesel11',
    title: '走一段海岸 (擷取)',
    category: 'Prose',
    type: 'strict',
    lang: 'zh',
    content: `不管激昂澎湃或文雅婉約，不同海岸的拍岸濤聲，聽起來有時是帶著愉悅節奏的奔騰，有時聽起來叨叨絮絮，像是在抱怨或泣訴。`
  },
  {
    id: '114bchinesel1',
    title: '遊走在世界的市場裡（擷取）',
    category: 'Prose',
    type: 'strict',
    lang: 'zh',
    content: `湖光山色、名勝古蹟，固然引人入勝，但是再美的風景、再令人讚嘆的歷史建築，都不能像早晨的市場那樣，給我那麼真實可及、活生生的生活感。\n\n成熟豔紅的番茄，不會擺在紅通通的辣椒旁邊，得讓明黃的節瓜花或翠綠的青椒和番茄比鄰，方可彼此襯托，相得益彰。`
  },
  {
    id: 'shengshengman',
    title: '聲聲慢 (李清照)',
    category: 'Classical',
    type: 'strict',
    lang: 'zh',
    content: `尋尋覓覓，冷冷清清，悽悽慘慘戚戚。\n乍暖還寒時候，最難將息。\n三杯兩盞淡酒，怎敵他晚來風急？\n雁過也，正傷心，卻是舊時相識。\n滿地黃花堆積，憔悴損，如今有誰堪摘？\n守著窗兒，獨自怎生得黑？\n梧桐更兼細雨，到黃昏，點點滴滴。\n這次第，怎一個愁字了得？`
  },
  {
    id: 'shuidiaogetou',
    title: '水調歌頭 (蘇軾)',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `明月幾時有，把酒問青天，\n不知天上宮闕，今夕是何年。\n我欲乘風歸去，又恐瓊樓玉宇，高處不勝寒；\n起舞弄清影，何似在人間。\n轉朱閣，低綺戶，照無眠；\n不應有恨，何事長向別時圓？\n人有悲歡離合，月有陰晴圓缺，此事古難全；\n但願人長久，千里共嬋娟。`
  },
  {
    id: 'shanjuqiumin',
    title: '山居秋暝（王維）',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `空山新雨後，天氣晚來秋。\n明月松間照，清泉石上流。\n竹喧歸浣女，蓮動下漁舟。\n隨意春芳歇，王孫自可留。`
  },
  {
    id: 'chunwang',
    title: '春望（杜甫）',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `國破山河在，城春草木深。\n感時花濺淚，恨別鳥驚心。\n烽火連三月，家書抵萬金。\n白頭搔更短，渾欲不勝簪。`
  },
  {
    id: 'fudeguyuancaosongbie',
    title: '賦得古原草送別（白居易）',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `離離原上草，一歲一枯榮。\n野火烧不盡，春風吹又生。\n遠芳侵古道，晴翠接荒城。\n又送王孫去，萋萋滿別情。`
  },
  {
    id: 'wanglushanpubu',
    title: '望廬山瀑布（李白）',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `日照香爐生紫煙，\n遙看瀑布掛前川。\n飛流直下三千尺，\n疑是銀河落九天。`
  },
  {
    id: 'zengbie',
    title: '贈別（杜牧）',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `多情卻似總無情，\n惟覺樽前笑不成。\n蠟燭有心還惜別，\n替人垂淚到天明。`
  },
  {
    id: 'qingpingdiao',
    title: '清平調（李白）',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `雲想衣裳花想容，\n春風拂檻露華濃。\n若非群玉山頭見，\n會向瑤台月下逢。`
  },
  {
    id: 'zhuzhici',
    title: '竹枝詞（劉禹錫）',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `楊柳青青江水平，\n聞郎江上唱歌聲。\n東邊日出西邊雨，\n道是無晴卻有晴。`
  },
  {
    id: 'shuxiang',
    title: '蜀相（杜甫）',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `丞相祠堂何處尋，錦官城外柏森森。\n映階碧草自春色，隔葉黃鸝空好音。\n三顧頻煩天下計，兩朝開濟老臣心。\n出師未捷身先死，長使英雄淚滿襟。`
  },
  {
    id: 'wutilishangyin',
    title: '無題（李商隱）',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `相見時難別亦難，東風無力百花殘。\n春蠶到死絲方盡，蠟炬成灰淚始乾。\n曉鏡但愁雲鬢改，夜吟應覺月光寒。\n蓬山此去無多路，青鳥殷勤為探看。`
  },
  {
    id: 'duhanjiang',
    title: '渡漢江（宋之問）',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `嶺外音書斷，\n經冬復立春。\n近鄉情更怯，\n不敢問來人。`
  },
  {
    id: 'zhongnanbieye',
    title: '終南別業（王維）',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `中歲頗好道，晚家南山陲。\n興來每獨往，勝事空自知。\n行到水窮處，坐看雲起時。\n偶爾值林叟，談笑無還期。`
  },
  {
    id: 'langtaoshajiuquhuanghewanlisha',
    title: '浪淘沙 - 九曲黃河萬里沙（劉禹錫）',
    category: 'Poetry',
    type: 'strict',
    lang: 'zh',
    content: `九曲黃河萬里沙，\n浪淘風簸自天涯。\n如今直上銀河去，\n同到牽牛織女家。`
  },
  {
    id: 'shengyuyouhuansiyuanle',
    title: '生於憂患死於安樂 (孟子)',
    category: 'Classical',
    type: 'strict',
    lang: 'zh',
    content: `孟子曰：「\n舜發於畎畝之中，傅說舉於版築之間，膠鬲舉於魚鹽之中，管夷吾舉於士，孫叔敖舉於海，百里奚舉於市。故天將降大任於斯人也，必先苦其心志，勞其筋骨，餓其體膚，空乏其身，行拂亂其所為，所以動心忍性，曾益其所不能。\n人恆過，然後能改；困於心，衡於慮，而後作；徵於色，發於聲，而後喻。入則無法家拂士，出則無敵國外患者，國恆亡。然後知生於憂患，而死於安樂也。\n」`
  },
  {
    id: 'youmengyingxuan',
    title: '幽夢影 (張潮) (擷取)',
    category: 'Classical',
    type: 'strict',
    lang: 'zh',
    content: `人非聖賢，安能無所不知？\n止知其一，惟恐不止其一，復求知其二者，上也；\n止知其一，因人言始知有其二者，次也；\n止知其一，人言有其二而莫之信者，又其次也；\n止知其一，惡人言有其二者，斯下之下矣。\n\n有工夫讀書，謂之福；有力量濟人，謂之福；\n有學問著述，謂之福；無是非到耳，謂之福；\n有多聞、直、諒之友，謂之福。\n\n人莫樂於閒，非無所事事之謂也。\n閒則能讀書，閒則能游名勝，\n閒則能交益友，閒則能飲酒，閒則能著書。\n天下之樂，孰大於是？\n\n凡事不宜刻，若讀書則不可不刻；\n凡事不宜貪，若買書則不可不貪；\n凡事不宜痴，若行善則不可不痴。`
  },
  {
    id: 'mlk_dream',
    title: 'I Have a Dream (Martin Luther King Jr.) (Excerpt)',
    category: 'Speech',
    type: 'fuzzy',
    lang: 'en',
    content: `I say to you today, my friends, so even though we face the difficulties of today and tomorrow, I still have a dream. It is a dream deeply rooted in the American dream. I have a dream that one day this nation will rise up and live out the true meaning of its creed: "We hold these truths to be self-evident: that all men are created equal." I have a dream that one day on the red hills of Georgia the sons of former slaves and the sons of former slave owners will be able to sit down together at the table of brotherhood. I have a dream that one day even the state of Mississippi, a state sweltering with the heat of injustice, sweltering with the heat of oppression, will be transformed into an oasis of freedom and justice. I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character. I have a dream today. I have a dream that one day, down in Alabama, with its vicious racists, with its governor having his lips dripping with the words of interposition and nullification; one day right there in Alabama, little black boys and black girls will be able to join hands with little white boys and white girls as sisters and brothers. I have a dream today. I have a dream that one day every valley shall be exalted, every hill and mountain shall be made low, the rough places will be made plain, and the crooked places will be made straight, and the glory of the Lord shall be revealed, and all flesh shall see it together."`
  },
  {
    id: 'steve_jobs',
    title: 'Stanford Commencement Speech (Steve Jobs) (Excerpt)',
    category: 'Speech',
    type: 'fuzzy',
    lang: 'en',
    content: `Of course, it was impossible to connect the dots looking forward when I was in college, but it was very, very clear looking backwards 10 years later. Again, you can't connect the dots looking forward. You can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future. You have to trust in something, your gut, destiny, life, karma, whatever, because believing that the dots will connect down the road will give you the confidence to follow your heart, even when it leads you off the well-worn path, and that will make all the difference. `
  }
];

const App = () => {
  const defaultPreset = PRESETS[0];
  
  const [text, setText] = useState(defaultPreset.content);
  const [title, setTitle] = useState(defaultPreset.title);
  const [presetType, setPresetType] = useState(defaultPreset.type); 
  const [presetCategory, setPresetCategory] = useState(defaultPreset.category); 
  const [mode, setMode] = useState('study'); // study, blur, initials, type
  const [blurLevel, setBlurLevel] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null); 
  const [showSidebar, setShowSidebar] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  
  // STT Ref
  const recognitionRef = useRef(null);

  // --- TOKENIZATION & TEXT PROCESSING ---
  useEffect(() => {
    const processText = () => {
      const isChinese = (char) => /[\u4e00-\u9fa5]/.test(char);
      const lines = text.split('\n');
      let processedTokens = [];

      lines.forEach((line) => {
        let buffer = '';
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          // Chinese or Punctuation -> separate tokens
          if (isChinese(char) || /[，。！？：；、「」『』,.!?;:"'()\-]/.test(char)) {
            if (buffer) {
              processedTokens.push({ type: 'word', content: buffer, id: Math.random() });
              buffer = '';
            }
            const isPunct = /[，。！？：；、「」『』,.!?;:"'()\-]/.test(char);
            processedTokens.push({ 
              type: isPunct ? 'punct' : 'char', 
              content: char, 
              id: Math.random() 
            });
          } else if (char === ' ') {
            if (buffer) {
              processedTokens.push({ type: 'word', content: buffer, id: Math.random() });
              buffer = '';
            }
            processedTokens.push({ type: 'space', content: ' ', id: Math.random() });
          } else {
            buffer += char;
          }
        }
        if (buffer) {
          processedTokens.push({ type: 'word', content: buffer, id: Math.random() });
        }
        processedTokens.push({ type: 'newline', content: '\n', id: Math.random() });
      });
      // Remove trailing newline if present (from the process loop)
      if (processedTokens.length > 0 && processedTokens[processedTokens.length - 1].type === 'newline') {
        processedTokens.pop();
      }
      return processedTokens;
    };
    setTokens(processText());
    setFeedback(null);
  }, [text]);

  // --- SPEECH RECOGNITION SETUP ---
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      const hasChinese = /[\u4e00-\u9fa5]/.test(text);
      recognitionRef.current.lang = hasChinese ? 'zh-TW' : 'en-US';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          finalTranscript += event.results[i][0].transcript;
        }
        setUserInput(finalTranscript); 
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
         if (isListening) setIsListening(false);
      };
    }
  }, [text, isListening]); 

  const toggleListening = () => {
    if (!recognitionRef.current) {
      // Use custom alert box instead of window.alert()
      setFeedback({ type: 'error', score: 0, msg: "Speech recognition is not supported in this browser. Try Chrome or Safari." });
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      const hasChinese = /[\u4e00-\u9fa5]/.test(text);
      recognitionRef.current.lang = hasChinese ? 'zh-TW' : 'en-US';
      
      recognitionRef.current.start();
      setIsListening(true);
      setFeedback(null);
    }
  };

  // --- VISIBILITY LOGIC ---
  const getVisibility = (token, index) => {
    if (token.type === 'newline') return 'visible';
    if (mode === 'study') return 'visible';

    // Initials Mode logic
    if (mode === 'initials') {
       if (token.type === 'space' || token.type === 'punct') return 'visible';
       
       if (token.type === 'word') return 'initial'; 
       
       if (token.type === 'char') {
          let i = index - 1;
          while(i >= 0 && tokens[i].type === 'space') i--;
          if (i < 0 || tokens[i].type === 'newline' || tokens[i].type === 'punct') return 'visible';
          return 'hidden';
       }
       return 'visible';
    }

    // Blur Mode logic
    if (mode === 'blur') {
      if (blurLevel === 0) return 'visible';
      if (token.type === 'punct') {
          return blurLevel > 90 ? 'hidden' : 'visible';
      }
      if (token.type === 'space') return 'visible';

      const seed = (index * 7 + token.content.length * 13 + blurLevel * 23) % 100;
      return seed < blurLevel ? 'hidden' : 'visible';
    }
    return 'visible';
  };

  // --- COMPARISON ALGORITHM ---
  const calculateMatch = () => {
    const clean = (str) => str.replace(/[^\w\u4e00-\u9fa5]/g, '').toLowerCase();
    const rawTarget = text;
    const rawInput = userInput;

    // 1. Strict Match (Poems / Classical)
    if (presetType === 'strict') {
      const targetChars = clean(rawTarget);
      const inputChars = clean(rawInput);
      
      const maxLength = Math.max(targetChars.length, inputChars.length);
      const minLength = Math.min(targetChars.length, inputChars.length);
      
      let matchCount = 0;
      for (let i = 0; i < minLength; i++) {
        if (targetChars[i] === inputChars[i]) {
          matchCount++;
        }
      }
      
      const score = Math.round((matchCount / maxLength) * 100);

      if (score === 100) {
        setFeedback({ type: 'success', score, msg: "Perfect Recall! (100% character match)" });
      } else if (score >= 90) {
        setFeedback({ type: 'warning', score, msg: "Excellent! Almost perfect, check for slight errors." });
      } else {
        setFeedback({ type: 'error', score, msg: `Score: ${score}%. Try again for better character accuracy.` });
      }
      return;
    }

    // 2. Fuzzy Match (Speeches)
    const targetWords = rawTarget.toLowerCase().match(/\b[\w']+\b/g) || [];
    const inputWords = rawInput.toLowerCase().match(/\b[\w']+\b/g) || [];

    if (targetWords.length === 0) {
      setFeedback({ type: 'error', score: 0, msg: "The target text contains no recognizable words for fuzzy matching." });
      return;
    }

    let hits = 0;
    let inputIndex = 0;
    
    // We use a sequential match to preserve some order
    targetWords.forEach(word => {
      const foundAt = inputWords.indexOf(word, inputIndex);
      if (foundAt !== -1) {
        hits++;
        inputIndex = foundAt + 1; 
      }
    });

    const score = Math.round((hits / targetWords.length) * 100);

    if (score === 100) {
      setFeedback({ type: 'success', score, msg: "Perfect Accuracy! (100% word match)" });
    } else if (score >= 80) {
      setFeedback({ type: 'success', score, msg: "Excellent! You got the main points and structure." });
    } else if (score >= 50) {
      setFeedback({ type: 'warning', score, msg: "Getting there. Try to recall more details." });
    } else {
      setFeedback({ type: 'error', score, msg: "Low word match accuracy. Try reading it again." });
    }
  };

  const loadPreset = (p) => {
    setText(p.content);
    setTitle(p.title);
    setPresetType(p.type);
    setPresetCategory(p.category);
    setIsCustom(false);
    setMode('study');
    setBlurLevel(0);
    setUserInput('');
    setFeedback(null);
    if (window.innerWidth < 768) setShowSidebar(false);
  };
  
  const handleCustomTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    setTitle("Custom Text");
    setIsCustom(true);
  };

  const allCategories = [...new Set(PRESETS.map(p => p.category)), 'Custom'];
  const isLearningMode = mode === 'blur' || mode === 'initials';
  const isTestingMode = mode === 'type';
  
  // Sidebar blur logic: Blur the library when in any mode designed to test memory (blur, initials, type)
  const isSidebarBlurred = isTestingMode || isLearningMode;


  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <div className={`
        ${showSidebar ? 'w-full md:w-72' : 'w-0 hidden'} 
        bg-white border-r border-slate-200 flex-shrink-0 flex flex-col overflow-hidden transition-all duration-300 relative
      `}>
        
        {isSidebarBlurred && (
          <div className="absolute inset-0 bg-slate-100/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center text-slate-500">
            <EyeOff size={48} className="mb-4 text-slate-300" />
            <p className="font-medium">Library hidden to test memory.</p>
            <p className="text-xs mt-2">Switch to "Read" mode to access library.</p>
          </div>
        )}

        <div className="p-5 border-b border-slate-200 bg-slate-50">
          <h1 className="font-bold text-xl text-slate-700 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            MemorizeFlow
          </h1>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          {/* Preset List */}
          <div className="mb-6">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Preset Content</h3>
             {allCategories.filter(c => c !== 'Custom').map(category => (
                <div key={category} className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-600 mb-1 border-b border-slate-100 pb-1">{category}</h4>
                    <div className="space-y-1">
                        {PRESETS.filter(p => p.category === category).map(p => (
                            <button 
                                key={p.id}
                                onClick={() => loadPreset(p)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all truncate ${title === p.title ? 'bg-indigo-50 text-indigo-700 font-medium' : 'hover:bg-slate-50 text-slate-600'}`}
                            >
                                {p.title}
                            </button>
                        ))}
                    </div>
                </div>
             ))}
          </div>

          {/* Custom Input */}
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Custom Input</h3>
          
          <div className="space-y-2 mb-3">
              <select
                value={presetType}
                onChange={(e) => setPresetType(e.target.value)}
                disabled={!isCustom}
                className={`w-full p-2 text-sm border rounded-lg bg-white ${isCustom ? 'border-indigo-300' : 'border-slate-200 bg-slate-50 text-slate-400'}`}
              >
                  <option value="fuzzy">Fuzzy Match (Speeches/Prose)</option>
                  <option value="strict">Strict Match (Poems/Classical/Prose)</option>
              </select>
              <select
                value={presetCategory}
                onChange={(e) => setPresetCategory(e.target.value)}
                disabled={!isCustom}
                className={`w-full p-2 text-sm border rounded-lg bg-white ${isCustom ? 'border-indigo-300' : 'border-slate-200 bg-slate-50 text-slate-400'}`}
              >
                  {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
          </div>

          <textarea
            className="w-full h-32 p-3 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all"
            placeholder="Paste custom text here..."
            value={text}
            onChange={handleCustomTextChange}
          />
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Navbar */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm z-20">
          <div className="flex items-center gap-4">
             <button 
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 hover:bg-slate-100 rounded-md text-slate-500 transition-colors"
            >
              {showSidebar ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
            <span className="font-semibold text-slate-700 truncate max-w-[150px] sm:max-w-md">
              {title}
            </span>
            <span className="text-xs font-medium text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full hidden sm:inline-block">
                {presetCategory} - {presetType === 'strict' ? 'Strict' : 'Fuzzy'}
            </span>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-lg">
            {[
              { id: 'study', icon: BookOpen, label: 'Read' },
              { id: 'blur', icon: EyeOff, label: 'Blur' },
              { id: 'initials', icon: Type, label: 'Initials' },
              { id: 'type', icon: CheckCircle, label: 'Test' },
            ].map((m) => (
              <button 
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 transition-all ${mode === m.id ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <m.icon size={16} />
                <span className="hidden sm:inline">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Canvas */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8 flex justify-center">
          <div className="max-w-3xl w-full bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-12 min-h-[60vh] relative">
            
            {isTestingMode ? (
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-slate-500">
                    Type or speak the text from memory. **{presetType === 'fuzzy' ? 'Fuzzy Match' : 'Strict Match'}** enabled.
                  </p>
                  <button
                    onClick={toggleListening}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {isListening ? <><Mic size={14} /> Listening...</> : <><MicOff size={14} /> Enable Mic</>}
                  </button>
                </div>

                <textarea
                  className="w-full flex-1 p-4 text-lg font-serif leading-relaxed border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none resize-none bg-slate-50"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Start typing or use the microphone..."
                  spellCheck={false}
                />

                {/* Feedback Area */}
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                  <button 
                    onClick={calculateMatch}
                    className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm shadow-indigo-200 transition-all active:scale-95"
                  >
                    Check Result
                  </button>
                  
                  <button 
                    onClick={() => { setUserInput(''); setFeedback(null); }}
                    className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm"
                  >
                    <RotateCcw size={14} /> Clear
                  </button>

                  {feedback && (
                    <div className={`flex-1 w-full p-3 rounded-lg border flex items-center gap-3 ${
                      feedback.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                      feedback.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                      'bg-red-50 border-red-200 text-red-800'
                    }`}>
                      {feedback.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                      <div>
                        <span className="font-bold text-lg mr-2">{feedback.score}%</span>
                        <span className="text-sm">{feedback.msg}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Reading / Learning Mode
              // Added overflow-y-auto here to ensure text scroll capability
              <div className="h-full overflow-y-auto">
                  <div className={`text-xl md:text-2xl font-serif leading-loose text-slate-800 whitespace-pre-wrap transition-opacity duration-300 ${mode === 'blur' && blurLevel > 90 ? 'select-none' : ''}`}>
                    {tokens.map((token, idx) => {
                      if (token.type === 'newline') return <br key={token.id} />;
                      if (token.type === 'space') return <span key={token.id}> </span>;
                      
                      const visibility = getVisibility(token, idx);
                      
                      // Initial Letter Rendering
                      if (visibility === 'initial' && token.type === 'word') {
                        return (
                          <span key={token.id} className="inline-block mx-0.5 text-indigo-900/50 border-b border-slate-200">
                              <span className="font-bold text-indigo-700">{token.content[0]}</span>
                              <span className="opacity-0">{token.content.slice(1)}</span>
                          </span>
                        );
                      }

                      return (
                        <span 
                          key={token.id} 
                          className={`
                            transition-all duration-700 inline-block
                            ${token.type === 'char' ? '' : 'mx-0.5'}
                            ${visibility === 'hidden' ? 'text-transparent bg-slate-200 rounded-sm px-[1px]' : ''}
                            ${visibility === 'visible' && token.type === 'punct' ? 'text-slate-400' : ''}
                          `}
                          style={{ 
                            filter: visibility === 'hidden' && mode === 'blur' ? `blur(${Math.max(0, blurLevel / 15)}px)` : 'none'
                          }}
                        >
                          {token.content}
                        </span>
                      );
                    })}
                  </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Controls for Blur */}
        {mode === 'blur' && (
          <div className="bg-white border-t border-slate-200 p-6 flex flex-col justify-center shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-20">
            <div className="flex items-center justify-between mb-3 max-w-3xl mx-auto w-full">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Retention Challenge</span>
              <span className="text-sm font-bold text-indigo-600">{blurLevel}% Vanished</span>
            </div>
            <div className="max-w-3xl mx-auto w-full relative">
                <div className="absolute top-1/2 left-0 w-full h-2 bg-slate-100 rounded-full -z-10"></div>
                <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={blurLevel}
                onChange={(e) => setBlurLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-transparent appearance-none cursor-pointer accent-indigo-600 z-10"
                />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;