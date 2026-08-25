import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ChartBar,
  Check,
  ClockCounterClockwise,
  List,
  LockKey,
  X,
} from '@phosphor-icons/react'
import SmokeVeil from './components/SmokeVeil'

const navItems = [
  { label: '产品', href: '#product' },
  { label: '记录', href: '#record' },
  { label: '隐私', href: '#privacy' },
  { label: '常见问题', href: '#questions' },
]

function Brand() {
  return (
    <a href="#top" className="group flex items-center gap-3" aria-label="返回 Stopmoke 首页">
      <img
        src="/images/stopmoke-icon.png"
        alt=""
        className="size-8 rounded-[7px] border border-white/10"
      />
      <span className="text-[15px] font-semibold tracking-[0.08em] text-stone-100">STOPMOKE</span>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [open])

  return (
    <header className="absolute inset-x-0 top-0 z-20 border-b border-white/10">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 md:px-10 xl:px-14">
        <Brand />
        <nav className="hidden items-center gap-8 md:flex" aria-label="主导航">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-stone-400 transition-colors duration-300 hover:text-stone-100"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#availability"
          className="hidden items-center gap-2 border border-white/20 px-4 py-2 text-sm text-stone-100 transition-all duration-300 hover:border-white/40 hover:bg-white/5 active:scale-[0.98] md:flex"
        >
          上架进度
          <ArrowRight size={16} weight="regular" />
        </a>
        <button
          type="button"
          className="grid size-10 place-items-center border border-white/15 text-stone-100 transition-colors hover:bg-white/5 active:scale-[0.98] md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? '关闭导航' : '打开导航'}
        >
          {open ? <X size={20} /> : <List size={20} />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="border-t border-white/10 bg-[#151515]/95 px-5 py-5 backdrop-blur-xl md:hidden"
          aria-label="移动端导航"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-white/10 py-4 text-sm text-stone-200 last:border-0"
            >
              {item.label}
              <ArrowRight size={16} />
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

function PhoneShot({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div className={`phone-shell ${className}`}>
      <img src={src} alt={alt} className="block h-auto w-full" />
    </div>
  )
}

function Hero() {
  return (
    <section id="top" className="hero relative isolate overflow-hidden bg-[#151515] text-stone-100">
      <div className="smoke-field pointer-events-none absolute inset-0" aria-hidden="true">
        <SmokeVeil />
      </div>
      <Header />
      <div className="relative z-10 mx-auto grid min-h-[760px] max-w-[1400px] grid-cols-1 items-center px-5 pb-12 pt-32 md:min-h-[820px] md:grid-cols-[1.05fr_0.95fr] md:px-10 md:pb-16 md:pt-28 xl:px-14">
        <div className="relative z-10 max-w-[680px] self-center">
          <p className="reveal-item mb-7 flex items-center gap-3 text-xs font-medium tracking-[0.16em] text-stone-400 uppercase">
            <span className="h-px w-8 bg-[#d86d39]" />
            戒烟与减量记录
          </p>
          <h1 className="reveal-item max-w-[13ch] text-[clamp(3rem,7vw,6.6rem)] leading-[0.95] font-[520] text-balance">
            把每一次忍住，<span className="text-stone-500">留得更久。</span>
          </h1>
          <p className="reveal-item mt-8 max-w-[34rem] text-base leading-8 text-stone-400 md:text-lg">
            Stopmoke 记录你与烟的每一次对抗，把坚持的时间、少花的钱和真实趋势，放在同一块屏幕上。
          </p>
          <div className="reveal-item mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#product"
              className="inline-flex h-12 items-center gap-3 bg-stone-100 px-5 text-sm font-medium text-[#171717] transition-all duration-300 hover:bg-white active:translate-y-px"
            >
              看看它怎么工作
              <ArrowDown size={17} />
            </a>
            <span className="text-xs tracking-[0.06em] text-stone-500">iOS 优先 · 上架准备中</span>
          </div>
        </div>

        <div className="hero-visual relative mt-12 min-h-[500px] md:mt-0 md:min-h-[700px]">
          <div className="hero-rule absolute top-[12%] right-[4%] h-px w-[66%] bg-white/15" />
          <div className="absolute top-[15%] right-[2%] hidden text-right md:block">
            <p className="font-mono text-[10px] tracking-[0.14em] text-stone-500">SINCE LAST SMOKE</p>
            <p className="mt-2 font-mono text-xs text-stone-300">03 : 46 : 35</p>
          </div>
          <PhoneShot
            src="/images/home.png"
            alt="Stopmoke 主屏显示距上次抽烟时间、累计坚持和少花金额"
            className="hero-phone absolute top-[5%] left-1/2 w-[262px] md:top-[12%] md:left-[48%] md:w-[330px] xl:w-[360px]"
          />
          <div className="absolute right-[4%] bottom-[8%] hidden w-32 border-t border-[#d86d39]/70 pt-3 md:block">
            <p className="text-xs leading-5 text-stone-500">今天先少一根，时间就会继续走。</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Manifesto() {
  return (
    <section id="product" className="bg-[#efede8] text-[#1c1b19]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 py-24 md:grid-cols-[0.8fr_1.2fr] md:px-10 md:py-36 xl:px-14">
        <p className="section-kicker">01 / 产品立场</p>
        <div>
          <h2 className="max-w-[17ch] text-4xl leading-[1.06] font-[520] md:text-6xl">
            不是给抽烟做打卡，是给抵抗留一条记录。
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-[#1c1b19]/15 pt-8 md:grid-cols-2">
            <p className="text-base leading-8 text-stone-600">
              “忍住了”和“抽了一根”同样重要。你不只在失手时打开应用，也能在想抽但没有抽的时候，给自己一个明确的动作。
            </p>
            <p className="text-base leading-8 text-stone-600">
              没有积分、排名或口号。只留下时间、金钱和趋势，让变化自己说话。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function TimeSection() {
  return (
    <section id="record" className="overflow-hidden bg-[#f7f6f2] text-[#1c1b19]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 px-5 py-24 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-32 xl:px-14">
        <div className="relative min-h-[620px] md:min-h-[760px]">
          <div className="absolute inset-y-0 left-0 w-[72%] bg-[#252321]" />
          <PhoneShot
            src="/images/stats.png"
            alt="Stopmoke 统计页展示每周趋势、时间分布和记录热力图"
            className="absolute top-1/2 right-0 w-[270px] -translate-y-1/2 md:right-[7%] md:w-[340px]"
          />
          <div className="absolute bottom-[6%] left-[5%] hidden max-w-44 border-l border-[#d86d39] pl-4 md:block">
            <p className="text-xs leading-5 text-stone-400">按周和月看变化，不拿单日波动给自己下结论。</p>
          </div>
        </div>
        <div className="md:pl-6">
          <p className="section-kicker">02 / 看见变化</p>
          <h2 className="mt-7 max-w-[12ch] text-4xl leading-[1.05] font-[520] md:text-6xl">趋势比某一天更诚实。</h2>
          <p className="mt-8 max-w-[34rem] text-base leading-8 text-stone-600">
            每周抽了多少、在哪些时段更容易点烟、比上一周少了几根，都从你的记录里直接算出来。
          </p>
          <ul className="mt-10 divide-y divide-[#1c1b19]/10 border-y border-[#1c1b19]/10">
            {[
              ['周与月', '把变化放回更长的时间里看'],
              ['时段分布', '找出最容易被烟牵着走的时刻'],
              ['混合记录', '同一条时间线看见抽烟与忍住'],
            ].map(([title, copy]) => (
              <li key={title} className="grid grid-cols-[8rem_1fr] gap-4 py-5 text-sm">
                <span className="font-medium text-stone-900">{title}</span>
                <span className="leading-6 text-stone-600">{copy}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ConsequenceSection() {
  return (
    <section className="bg-[#201f1d] text-stone-100">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 px-5 py-24 md:grid-cols-[0.8fr_1.2fr] md:px-10 md:py-32 xl:px-14">
        <div>
          <p className="section-kicker section-kicker-dark">03 / 换算代价</p>
          <h2 className="mt-7 max-w-[12ch] text-4xl leading-[1.05] font-[520] md:text-6xl">抽象的代价，换成你熟悉的单位。</h2>
          <p className="mt-8 max-w-[34rem] text-base leading-8 text-stone-400">
            钱、时间和累计坚持来自同一份事件记录。数字会跟着真实历史重算，不用夸张的预测替你制造焦虑。
          </p>
          <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-6 text-sm text-stone-400">
            <ClockCounterClockwise size={20} className="text-[#d86d39]" />
            每一条记录都可以回看和纠正
          </div>
        </div>
        <div className="relative min-h-[620px] md:min-h-[760px]">
          <div className="absolute top-[8%] right-0 h-[84%] w-[76%] border border-white/10" />
          <PhoneShot
            src="/images/reveal.png"
            alt="Stopmoke 把过往抽烟换算成数量、金钱与寿命时间"
            className="absolute top-1/2 left-[7%] w-[270px] -translate-y-1/2 md:w-[340px]"
          />
          <p className="absolute right-[4%] bottom-[11%] hidden max-w-[13rem] text-sm leading-7 text-stone-500 md:block">
            先看清已经发生的，再决定下一根要不要点。
          </p>
        </div>
      </div>
    </section>
  )
}

function PrivacySection() {
  const points = [
    {
      icon: LockKey,
      title: '本地先记',
      copy: '设备里保留完整记录，断网也能正常使用。',
    },
    {
      icon: ClockCounterClockwise,
      title: '异步同步',
      copy: '云端副本用于换设备和重装找回，不让界面等网络。',
    },
    {
      icon: ChartBar,
      title: '只算事实',
      copy: '统计从事件记录实时演算，不预设你应该成为谁。',
    },
  ]

  return (
    <section id="privacy" className="bg-[#efede8] text-[#1c1b19]">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32 xl:px-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.75fr_1.25fr]">
          <p className="section-kicker">04 / 数据与隐私</p>
          <div>
            <h2 className="max-w-[16ch] text-4xl leading-[1.06] font-[520] md:text-6xl">记录属于你，网络只是备份路径。</h2>
            <div className="mt-12 divide-y divide-[#1c1b19]/15 border-y border-[#1c1b19]/15">
              {points.map(({ icon: Icon, title, copy }) => (
                <div key={title} className="grid grid-cols-[3rem_1fr] gap-5 py-7 md:grid-cols-[4rem_0.42fr_0.58fr] md:items-center">
                  <Icon size={23} className="mt-0.5 text-[#b65b32] md:mt-0" />
                  <h3 className="text-lg font-medium">{title}</h3>
                  <p className="col-start-2 text-sm leading-7 text-stone-600 md:col-start-auto">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Questions() {
  const items = [
    {
      question: 'Stopmoke 是抽烟打卡工具吗？',
      answer: '不是。它是一款戒烟与减量辅助工具。“忍住了”与“抽了一根”具有同等地位，重点是记录对抗过程和长期变化。',
    },
    {
      question: '没有网络还能用吗？',
      answer: '可以。记录先写入设备本地，联网后再异步同步云端副本。日常操作不会等待网络。',
    },
    {
      question: '现在可以下载吗？',
      answer: '客户端仍在完成上架前准备。官网会在可公开下载后更新正式入口，不提供来路不明的安装包。',
    },
  ]

  return (
    <section id="questions" className="bg-[#f7f6f2] text-[#1c1b19]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 py-24 md:grid-cols-[0.75fr_1.25fr] md:px-10 md:py-32 xl:px-14">
        <div>
          <p className="section-kicker">05 / 常见问题</p>
          <h2 className="mt-7 text-4xl leading-none font-[520] md:text-5xl">说清楚几件事。</h2>
        </div>
        <div className="divide-y divide-[#1c1b19]/15 border-y border-[#1c1b19]/15">
          {items.map((item, index) => (
            <details key={item.question} className="group" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-base font-medium marker:hidden">
                {item.question}
                <span className="grid size-8 shrink-0 place-items-center border border-[#1c1b19]/15 text-lg font-light transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-[52rem] pb-7 pr-12 text-sm leading-7 text-stone-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Availability() {
  return (
    <section id="availability" className="bg-[#d86d39] text-[#181716]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 py-20 md:grid-cols-[1.35fr_0.65fr] md:items-end md:px-10 md:py-24 xl:px-14">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] uppercase">Release status</p>
          <h2 className="mt-5 max-w-[14ch] text-4xl leading-[1.02] font-[560] md:text-6xl">先把产品做好，再把下载按钮放出来。</h2>
        </div>
        <div className="border-t border-[#1c1b19]/25 pt-6">
          <div className="flex items-center gap-3 text-sm font-medium">
            <span className="grid size-6 place-items-center border border-[#1c1b19]/30">
              <Check size={14} weight="bold" />
            </span>
            iOS 版本上架准备中
          </div>
          <p className="mt-4 text-sm leading-7 text-[#1c1b19]/75">正式下载地址会在完成上架后出现在这里。</p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#151515] text-stone-400">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10 xl:px-14">
        <Brand />
        <p className="text-xs leading-6">站在戒烟的一侧，记录每一次真实发生。</p>
        <p className="font-mono text-[11px] text-stone-400">© 2026 SYNOPAI</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <TimeSection />
      <ConsequenceSection />
      <PrivacySection />
      <Questions />
      <Availability />
      <Footer />
    </main>
  )
}
