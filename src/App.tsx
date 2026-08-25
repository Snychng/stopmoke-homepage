import { useEffect, useState, type ReactNode } from 'react'
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
  { label: '方法', href: '#method' },
  { label: '数据', href: '#record' },
  { label: '隐私', href: '#privacy' },
  { label: '常见问题', href: '#questions' },
]

const modes = [
  {
    id: 'today',
    label: '今天',
    title: '先看当下这一刻。',
    copy: '距上次抽烟多久、今天忍住几次、少花了多少钱，都在打开应用后的第一屏。',
    image: '/images/home.png',
    alt: 'Stopmoke 今天页面',
  },
  {
    id: 'stats',
    label: '统计',
    title: '把变化放回更长的时间里。',
    copy: '用周、月和时段分布理解习惯，不拿一次失手给整个过程下结论。',
    image: '/images/stats.png',
    alt: 'Stopmoke 统计页面',
  },
  {
    id: 'history',
    label: '回看',
    title: '已经发生的，值得看清楚。',
    copy: '数量、花费和累计时间来自真实记录，随历史修正一起重新计算。',
    image: '/images/reveal.png',
    alt: 'Stopmoke 历史换算页面',
  },
]

function Brand() {
  return (
    <a href="#top" className="brand" aria-label="返回 Stopmoke 首页">
      <img src="/images/stopmoke-icon.png" alt="" className="brand-logo" />
      <span>Stopmoke</span>
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
    <header className="site-header">
      <nav className="site-nav" aria-label="主导航">
        <Brand />
        <div className="nav-links">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </div>
        <div className="nav-actions">
          <a className="button button-outline nav-secondary" href="#availability">了解进度</a>
          <a className="button button-dark nav-primary" href="#product">查看产品<ArrowDown size={15} /></a>
          <button
            type="button"
            className="menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? '关闭导航' : '打开导航'}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </nav>
      {open && (
        <nav id="mobile-navigation" className="mobile-navigation" aria-label="移动端导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}<ArrowRight size={16} />
            </a>
          ))}
          <a href="#availability" onClick={() => setOpen(false)}>上架进度<ArrowRight size={16} /></a>
        </nav>
      )}
    </header>
  )
}

function HeroAppShowcase() {
  return (
    <div className="app-showcase" role="group" aria-label="Stopmoke 手机 App 原型界面预览">
      <div className="showcase-phone showcase-left phone-shell">
        <img src="/images/stats.png" alt="Stopmoke 原型统计页面" />
      </div>
      <div className="showcase-phone showcase-center phone-shell">
        <img src="/images/home.png" alt="Stopmoke 原型主屏显示距上次抽烟时间和今日记录" />
      </div>
      <div className="showcase-phone showcase-right phone-shell">
        <img src="/images/reveal.png" alt="Stopmoke 原型展示历史抽烟数量、花费和时间换算" />
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="smoke-field" aria-hidden="true"><SmokeVeil /></div>
      <Header />
      <div className="hero-copy">
        <a className="announcement" href="#availability">
          <span>EARLY ACCESS</span><strong>Stopmoke 正在准备</strong><i>·</i><em>查看进度</em><b>↗</b>
        </a>
        <h1>Meet <img src="/images/stopmoke-icon.png" alt="" className="hero-logo" /> Stopmoke</h1>
        <p>
          记录每一次忍住与抽烟，看见坚持多久、少花多少钱，<br />
          再从真实趋势理解变化，不把一次失手当作结论。
        </p>
        <div className="hero-actions">
          <a className="button button-dark button-large" href="#product">查看产品<ArrowDown size={17} /></a>
          <a className="button button-muted button-large" href="#method">它如何工作</a>
        </div>
      </div>
      <HeroAppShowcase />
    </section>
  )
}

function Principle() {
  return (
    <section id="method" className="principle-section page-section">
      <div className="principle-panel">
        <div className="principle-copy">
          <h2>像记录时间一样，记录每次抵抗</h2>
          <p>想抽但没有抽，是戒烟过程中真实发生的一件事。Stopmoke 把它和抽烟记录放在一起，让变化来自事实，而不是口号。</p>
        </div>
        <img className="principle-logo" src="/images/stopmoke-icon.png" alt="" />
      </div>
    </section>
  )
}

function FeatureCard({ title, copy, children, className = '' }: { title: string; copy: string; children: ReactNode; className?: string }) {
  return (
    <article className={`feature-card ${className}`}>
      <div className="feature-card-copy"><h3>{title}</h3><p>{copy}</p></div>
      <div className="feature-art">{children}</div>
    </article>
  )
}

function Features() {
  return (
    <section id="product" className="features-section page-section">
      <div className="section-heading centered-heading">
        <h2>把长期变化，拆成每一次选择</h2>
        <p>打开、记录、继续生活。Stopmoke 把所有计算留在后台，只把当下需要知道的放在眼前。</p>
      </div>
      <div className="feature-grid">
        <FeatureCard title="忍住了，也值得记下来" copy="不只记录抽烟。每一次主动抵抗都会进入同一条时间线。">
          <div className="choice-demo">
            <div className="choice-demo-header"><span>刚刚发生了什么？</span><small>18:42</small></div>
            <button type="button"><Check size={19} weight="bold" />忍住了</button>
            <button type="button" className="choice-secondary">抽了一根</button>
            <p>记录先保存在设备里</p>
          </div>
        </FeatureCard>
        <FeatureCard title="趋势比某一天更诚实" copy="按周、月和时段看变化，不让一次波动盖住整个过程。">
          <img className="feature-phone" src="/images/stats.png" alt="Stopmoke 周趋势与时段统计" />
        </FeatureCard>
        <FeatureCard title="代价换成熟悉的单位" copy="数量、花费和累计时间，都从真实历史记录重新计算。">
          <img className="feature-phone" src="/images/reveal.png" alt="Stopmoke 数量、花费和时间换算" />
        </FeatureCard>
        <FeatureCard title="记录完成后，再同步到云端" copy="本地数据库先准备好，换设备恢复时再使用云端副本。" className="privacy-card">
          <img className="feature-phone" src="/images/sync.png" alt="Stopmoke 原型首次同步完成页面" />
        </FeatureCard>
      </div>
    </section>
  )
}

function RecordModes() {
  const [activeId, setActiveId] = useState(modes[0].id)
  const active = modes.find((mode) => mode.id === activeId) ?? modes[0]

  return (
    <section id="record" className="record-section page-section">
      <div className="section-heading centered-heading">
        <h2>同一份记录，三种看法</h2>
        <p>今天解决当下，统计解释趋势，回看帮助你修正已经发生的记录。</p>
      </div>
      <div className="mode-switch" role="tablist" aria-label="产品页面预览">
        {modes.map((mode) => (
          <button key={mode.id} type="button" role="tab" aria-selected={active.id === mode.id} onClick={() => setActiveId(mode.id)}>
            {mode.label}
          </button>
        ))}
      </div>
      <div className="mode-panel">
        <div className="mode-copy">
          <span>STOPMOKE / {active.label}</span>
          <h3>{active.title}</h3>
          <p>{active.copy}</p>
          <ul>
            <li><Check size={17} weight="bold" />无需等待网络</li>
            <li><Check size={17} weight="bold" />历史记录可以纠正</li>
            <li><Check size={17} weight="bold" />所有统计来自真实事件</li>
          </ul>
        </div>
        <div className="mode-device phone-shell" key={active.id}><img src={active.image} alt={active.alt} /></div>
      </div>
    </section>
  )
}

function Privacy() {
  const items = [
    { icon: LockKey, title: '本地先记', copy: '完整记录先进入设备，断网时也能继续使用。' },
    { icon: ClockCounterClockwise, title: '异步同步', copy: '云端副本用于换设备和重装找回，不让界面等待网络。' },
    { icon: ChartBar, title: '只算事实', copy: '趋势从事件记录实时演算，不预设你应该成为谁。' },
  ]

  return (
    <section id="privacy" className="privacy-section page-section">
      <div className="section-heading centered-heading"><h2>记录属于你</h2><p>网络只是备份路径。日常记录和统计不依赖持续在线。</p></div>
      <div className="privacy-grid">
        {items.map(({ icon: Icon, title, copy }) => (
          <article key={title}><span className="privacy-icon"><Icon size={22} /></span><h3>{title}</h3><p>{copy}</p></article>
        ))}
      </div>
    </section>
  )
}

function Availability() {
  return (
    <section id="availability" className="availability-section page-section">
      <div className="section-heading centered-heading">
        <h2>下载 Stopmoke</h2>
        <p>iOS 版本正在完成上架前准备。正式下载地址会在审核通过后更新。</p>
      </div>
      <div className="availability-actions">
        <span className="button button-dark button-large is-disabled"><Check size={17} weight="bold" />iOS 上架准备中</span>
        <a className="button button-muted button-large" href="#questions">查看常见问题</a>
      </div>
    </section>
  )
}

function Questions() {
  const items = [
    { question: 'Stopmoke 是抽烟打卡工具吗？', answer: '不是。它是一款戒烟与减量辅助工具。“忍住了”与“抽了一根”具有同等地位，重点是记录对抗过程和长期变化。' },
    { question: '没有网络还能用吗？', answer: '可以。记录先写入设备本地，联网后再异步同步云端副本，日常操作不会等待网络。' },
    { question: '现在可以下载吗？', answer: '客户端仍在完成上架前准备。官网会在可公开下载后更新正式入口，不提供来路不明的安装包。' },
  ]

  return (
    <section id="questions" className="questions-section page-section">
      <div className="questions-layout">
        <h2>常见问题</h2>
        <div className="question-list">
          {items.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}<span>+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCallout() {
  return (
    <section className="final-section page-section">
      <div className="final-panel">
        <div className="final-copy">
          <h2>从下一次想抽烟开始</h2>
          <p>先记下一次真实选择，再让时间给你答案。</p>
          <div>
            <a className="button button-dark button-large" href="#top">回到产品预览</a>
            <a className="button button-outline button-large" href="#availability">查看上架进度</a>
          </div>
        </div>
        <img className="final-logo" src="/images/stopmoke-icon.png" alt="" />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-inner"><Brand /><p>站在戒烟的一侧，记录每一次真实发生。</p><span>© 2026 SYNOPAI</span></div>
    </footer>
  )
}

export default function App() {
  return (
    <main>
      <Hero />
      <Principle />
      <Features />
      <RecordModes />
      <Privacy />
      <Availability />
      <Questions />
      <FinalCallout />
      <Footer />
    </main>
  )
}
