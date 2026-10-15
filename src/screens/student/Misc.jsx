/* ---------------------------------------------------------------------------
   Smaller student screens that share the same shape: a header, a list and a
   little logic. Kept together so the route map stays readable.
--------------------------------------------------------------------------- */

import { useRef, useState } from 'react'
import { Link, useParams } from '../../components/appRouter'
import {
  CheckCircle2, ChevronRight, Download, FileText, Lock, Phone, Play, Send,
  ShieldCheck, Square, SquareCheckBig,
} from 'lucide-react'
import Screen, { ScreenHeader, SectionTitle } from '../../components/Screen'
import useI18n from '../../i18n'
import useStudent from '../../hooks/useStudent'
import {
  courseById, money, recipeById, recipes, supplierContacts,
} from '../../data/catalog'
import { consentDocs } from '../../data/student'
import { Badge, Button, Card, EmptyState, ProductIcon, Sheet } from '../../components/ui'
import Logo from '../../components/Logo'

/* ------------------------------------------------------- welcome video --- */

export function Welcome() {
  const { t, pick } = useI18n()
  const [playing, setPlaying] = useState(false)

  return (
    <>
      <ScreenHeader back title={t('home.watch')} />
      <Screen className="space-y-5">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#0e0e12]">
          <div className="absolute inset-0 grid place-items-center">
            <Logo className="size-16 opacity-40" />
          </div>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="absolute inset-0 grid place-items-center"
            aria-label="Play"
          >
            {!playing && (
              <span className="grid size-16 place-items-center rounded-full bg-white/15 backdrop-blur-sm">
                <Play className="size-7 fill-white text-white" strokeWidth={0} />
              </span>
            )}
          </button>
        </div>

        <div>
          <h1 className="text-[18px] font-semibold leading-snug tracking-[-0.02em] text-ink">
            {t('home.welcomeTitle')}
          </h1>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">
            {pick({
              en: 'Welcome. You have taken the first step towards building your own profitable milk processing unit. Learn one product or all of them — then come to Murgud and build it with us.',
              hi: 'स्वागत है। आपने अपनी मुनाफ़े वाली मिल्क प्रोसेसिंग यूनिट की ओर पहला कदम रखा है। एक प्रोडक्ट सीखें या सभी — फिर मुरगुड आइए और हमारे साथ बनाइए।',
              mr: 'स्वागत आहे. तुम्ही तुमच्या फायदेशीर मिल्क प्रोसेसिंग युनिटकडे पहिले पाऊल टाकले आहे. एक प्रॉडक्ट शिका किंवा सर्व — मग मुरगुडला या आणि आमच्यासोबत उभारा.',
            })}
          </p>
          <p className="mt-3 text-[13px] font-medium text-brand">— {t('brand.owner')}</p>
        </div>

        <Button as={Link} to="/courses" block>
          {t('courses.title')}
          <ChevronRight className="size-4" strokeWidth={2.4} />
        </Button>
      </Screen>
    </>
  )
}

/* ------------------------------------------------------- recipe detail --- */

export function RecipeDetail() {
  const { id } = useParams()
  const { t, pick } = useI18n()
  const student = useStudent()
  const [checkout, setCheckout] = useState(false)
  const [paid, setPaid] = useState(false)

  const recipe = recipeById(id)
  if (!recipe) {
    return (
      <EmptyState
        title={t('courses.noResults')}
        body={t('courses.noResultsBody')}
        action={
          <Button as={Link} to="/courses?tab=recipes" size="sm">
            {t('courses.recipes')}
          </Button>
        }
      />
    )
  }

  const owned = student.ownsRecipe(recipe.id)
  const course = courseById(recipe.courseId)

  const sections = pick({
    en: ['Ingredients and exact quantities', 'Equipment you need', 'Step-by-step method', 'Common mistakes', 'Costing and selling price', 'Storage and shelf life'],
    hi: ['सामग्री और सटीक मात्रा', 'ज़रूरी उपकरण', 'चरण-दर-चरण विधि', 'आम ग़लतियाँ', 'लागत और बिक्री मूल्य', 'भंडारण और शेल्फ लाइफ़'],
    mr: ['साहित्य व नेमके प्रमाण', 'लागणारी उपकरणे', 'टप्प्याटप्प्याने कृती', 'सामान्य चुका', 'खर्च व विक्री किंमत', 'साठवण व टिकाऊपणा'],
  })

  return (
    <>
      <ScreenHeader back title={recipe.native} subtitle={pick(recipe.title)} />

      <Screen className="space-y-5">
        <div className="flex items-center gap-3.5">
          <ProductIcon name={recipe.icon} tint={recipe.tint} size="xl" />
          <div className="min-w-0">
            <p className="text-[13px] text-ink-2 tnum">
              {recipe.pages} {pick({ en: 'pages', hi: 'पन्ने', mr: 'पाने' })}
            </p>
            {owned && (
              <Badge tone="positive" className="mt-1.5">
                <CheckCircle2 className="size-3" strokeWidth={2.6} />
                {t('courses.owned')}
              </Badge>
            )}
          </div>
        </div>

        <section>
          <SectionTitle title={pick({ en: 'What is inside', hi: 'इसमें क्या है', mr: 'यात काय आहे' })} />
          <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {sections.map((s, i) => (
              <li key={s} className="flex items-center gap-3 px-3.5 py-3">
                <span className="w-5 text-center text-[12px] font-semibold text-ink-3 tnum">{i + 1}</span>
                <span className="min-w-0 flex-1 text-[13.5px] text-ink">{s}</span>
                {!owned && i > 0 && <Lock className="size-3.5 shrink-0 text-ink-3" strokeWidth={2.1} />}
              </li>
            ))}
          </ul>
        </section>

        {/* First section readable, the rest gated — the sample that sells. */}
        <section>
          <SectionTitle title={sections[0]} />
          <Card className="overflow-hidden p-4">
            <p className={['text-[13.5px] leading-[1.7] text-ink-2', owned ? '' : 'line-clamp-4'].join(' ')}>
              {pick({
                en: 'Full cream cow milk — 10 litres. Sugar — 800 g, added only after the mix leaves the sides of the pan. Cardamom — 2 g, ground fresh. Keep a heavy-bottomed pan; a thin one scorches the base and the whole batch takes on a burnt note that no amount of sugar hides…',
                hi: 'फुल क्रीम गाय का दूध — 10 लीटर। चीनी — 800 ग्राम, मिश्रण के किनारे छोड़ने के बाद ही डालें। इलायची — 2 ग्राम, ताज़ा पिसी। भारी तले का बर्तन रखें; पतला बर्तन तली जला देता है…',
                mr: 'फुल क्रीम गाईचे दूध — १० लिटर. साखर — ८०० ग्रॅम, मिश्रण कडेला सोडल्यावरच घाला. वेलची — २ ग्रॅम, ताजी दळलेली. जाड बुडाचे पातेले वापरा; पातळ पातेल्याचा तळ जळतो…',
              })}
            </p>
            {!owned && (
              <p className="mt-3 flex items-center gap-1.5 border-t border-line pt-3 text-[12px] font-medium text-ink-3">
                <Lock className="size-3.5" strokeWidth={2.1} />
                {pick({
                  en: 'Buy the recipe to read the rest',
                  hi: 'बाकी पढ़ने के लिए रेसिपी ख़रीदें',
                  mr: 'उर्वरित वाचण्यासाठी रेसिपी घ्या',
                })}
              </p>
            )}
          </Card>
        </section>

        {course && (
          <Card as={Link} to={'/course/' + course.id} interactive className="flex items-center gap-3.5 p-3.5">
            <ProductIcon name={course.icon} tint={course.tint} size="sm" />
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-semibold text-ink">
                {pick({ en: 'Prefer to watch it?', hi: 'वीडियो देखना है?', mr: 'व्हिडिओ पाहायचा?' })}
              </span>
              <span className="block truncate text-[12px] text-ink-3">
                {pick(course.name)} · {money(course.price)}
              </span>
            </span>
            <ChevronRight className="size-5 shrink-0 text-ink-3" strokeWidth={2.2} />
          </Card>
        )}
      </Screen>

      <div className="sticky bottom-0 z-30 border-t border-line bg-surface px-4 py-3">
        {owned ? (
          <Button size="lg" block>
            <Download className="size-4" strokeWidth={2.2} />
            {pick({ en: 'Download PDF', hi: 'PDF डाउनलोड', mr: 'PDF डाउनलोड' })}
          </Button>
        ) : (
          <div className="flex items-center gap-3">
            <p className="text-[17px] font-semibold text-ink tnum">{money(recipe.price)}</p>
            <Button size="lg" className="ml-auto flex-1 @wide:max-w-56" onClick={() => setCheckout(true)}>
              {t('courses.buyRecipe')}
            </Button>
          </div>
        )}
      </div>

      <Sheet
        open={checkout}
        onClose={() => {
          setCheckout(false)
          setPaid(false)
        }}
        title={paid ? t('batch.submitted') : t('courses.buyRecipe')}
        description={paid ? undefined : pick(recipe.title)}
        footer={
          paid ? (
            <Button block size="lg" onClick={() => setCheckout(false)}>
              {t('common.close')}
            </Button>
          ) : (
            <Button
              block
              size="lg"
              onClick={() => {
                student.buy('recipe', recipe.id, recipe.price)
                setPaid(true)
              }}
            >
              {pick({ en: 'Pay with Razorpay', hi: 'Razorpay से भुगतान', mr: 'Razorpay ने भरा' })}{' '}
              {money(recipe.price)}
            </Button>
          )
        }
      >
        {paid ? (
          <div className="flex flex-col items-center py-6 text-center">
            <span className="animate-pop grid size-14 place-items-center rounded-full bg-positive-soft text-positive">
              <CheckCircle2 className="size-7" strokeWidth={2.2} />
            </span>
            <p className="mt-4 text-[15px] font-semibold text-ink">
              {pick({ en: 'Recipe unlocked', hi: 'रेसिपी खुल गई', mr: 'रेसिपी खुली झाली' })}
            </p>
          </div>
        ) : (
          <dl className="space-y-2 rounded-lg bg-muted px-4 py-3 text-[13.5px]">
            <div className="flex justify-between">
              <dt className="text-ink-2">{recipe.native}</dt>
              <dd className="font-medium text-ink tnum">{money(recipe.price)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-2">
              <dt className="font-semibold text-ink">{t('common.total')}</dt>
              <dd className="font-semibold text-ink tnum">{money(recipe.price)}</dd>
            </div>
          </dl>
        )}
      </Sheet>
    </>
  )
}

/* ------------------------------------------------------------- purchases --- */

export function Purchases() {
  const { t, pick } = useI18n()
  const student = useStudent()

  const label = (p) =>
    p.kind === 'course' ? courseById(p.itemId)?.native : recipeById(p.itemId)?.native

  return (
    <>
      <ScreenHeader back title={t('profile.purchases')} />
      <Screen>
        {student.purchases.length === 0 ? (
          <EmptyState title={t('learning.empty')} body={t('learning.emptyBody')} />
        ) : (
          <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {student.purchases.map((p, i) => (
              <div key={p.id} style={{ '--i': i }} className="stagger flex items-center gap-3 px-3.5 py-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-ink-2">
                  <FileText className="size-[17px]" strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium text-ink">
                    {label(p)}{' '}
                    <span className="font-normal text-ink-3">
                      ·{' '}
                      {p.kind === 'course'
                        ? t('courses.online')
                        : t('courses.recipes')}
                    </span>
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-ink-3 tnum">
                    {p.invoice} · {p.date}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[13.5px] font-semibold text-ink tnum">{money(p.amount)}</p>
                  <button type="button" className="mt-0.5 text-[11.5px] font-medium text-brand">
                    {pick({ en: 'Invoice', hi: 'बिल', mr: 'बिल' })}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Screen>
    </>
  )
}

/* ------------------------------------------------------ consent documents --- */

export function Documents() {
  const { t, pick } = useI18n()
  const [accepted, setAccepted] = useState(() =>
    Object.fromEntries(consentDocs.map((d) => [d.id, d.accepted])),
  )

  return (
    <>
      <ScreenHeader back title={t('profile.documents')} />
      <Screen className="space-y-4">
        <p className="text-[12.5px] leading-relaxed text-ink-2">
          {pick({
            en: 'You must accept these before buying a course or applying for a batch. Tap to read the full text.',
            hi: 'कोर्स ख़रीदने या बैच के आवेदन से पहले इन्हें स्वीकार करना ज़रूरी है।',
            mr: 'कोर्स घेण्यापूर्वी किंवा बॅचसाठी अर्ज करण्यापूर्वी हे स्वीकारणे आवश्यक आहे.',
          })}
        </p>

        <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
          {consentDocs.map((d) => (
            <div key={d.id} className="flex items-start gap-3 px-3.5 py-3">
              <button
                type="button"
                aria-pressed={accepted[d.id]}
                onClick={() => setAccepted((p) => ({ ...p, [d.id]: !p[d.id] }))}
                className="mt-0.5 shrink-0"
              >
                {accepted[d.id] ? (
                  <SquareCheckBig className="size-5 text-brand" strokeWidth={2.2} />
                ) : (
                  <Square className="size-5 text-ink-3" strokeWidth={2} />
                )}
              </button>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-medium text-ink">{pick(d.title)}</p>
                <p className="mt-0.5 text-[11.5px] text-ink-3 tnum">
                  {pick({ en: 'Updated', hi: 'अपडेट', mr: 'अपडेट' })} {d.updated}
                </p>
              </div>
              <ChevronRight className="mt-1 size-4 shrink-0 text-ink-3" strokeWidth={2.2} />
            </div>
          ))}
        </div>

        <div className="flex gap-2.5 rounded-lg border border-line px-3.5 py-3">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.1} />
          <p className="text-[11.5px] leading-relaxed text-ink-2">
            {pick({
              en: 'Your Aadhaar is used only to verify your district at admission and is never shared.',
              hi: 'आपका आधार केवल प्रवेश के समय ज़िला जाँचने के लिए, कभी साझा नहीं किया जाता।',
              mr: 'तुमचे आधार फक्त प्रवेशावेळी जिल्हा तपासण्यासाठी, कधीही शेअर केले जात नाही.',
            })}
          </p>
        </div>
      </Screen>
    </>
  )
}

/* ------------------------------------------------------ supplier contacts --- */

export function Contacts() {
  const { t, pick } = useI18n()
  const groups = supplierContacts.reduce((acc, c) => {
    const k = pick(c.category)
    ;(acc[k] ??= []).push(c)
    return acc
  }, {})

  return (
    <>
      <ScreenHeader back title={t('learning.contacts')} />
      <Screen className="space-y-5">
        <p className="text-[12.5px] leading-relaxed text-ink-2">
          {pick({
            en: 'Everything you need to set up your unit, from people we buy from ourselves.',
            hi: 'यूनिट शुरू करने के लिए ज़रूरी सब कुछ — वही लोग जिनसे हम ख़ुद ख़रीदते हैं।',
            mr: 'युनिट सुरू करण्यासाठी लागणारे सर्व — आम्ही स्वतः ज्यांच्याकडून घेतो तेच.',
          })}
        </p>

        {Object.entries(groups).map(([cat, items]) => (
          <section key={cat}>
            <SectionTitle title={cat} />
            <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
              {items.map((c) => (
                <a key={c.id} href={`tel:${c.phone}`} className="flex items-center gap-3 px-3.5 py-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Phone className="size-[17px]" strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-medium text-ink">{c.name}</span>
                    <span className="block text-[11.5px] text-ink-3 tnum">
                      {c.place} · {c.phone}
                    </span>
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-ink-3" strokeWidth={2.2} />
                </a>
              ))}
            </div>
          </section>
        ))}
      </Screen>
    </>
  )
}

/* ---------------------------------------------------------------- support --- */

export function Support() {
  const { t } = useI18n()
  const student = useStudent()
  const [draft, setDraft] = useState('')
  const endRef = useRef(null)

  const send = () => {
    const text = draft.trim()
    if (!text) return
    student.sendMessage(text)
    setDraft('')
    requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }))
  }

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader back title={t('support.title')} subtitle={t('support.replyTime')} />

      <div className="no-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4">
        {student.thread.map((m) => (
          <div
            key={m.id}
            className={['flex', m.from === 'student' ? 'justify-end' : 'justify-start'].join(' ')}
          >
            <div
              className={[
                'max-w-[85%] rounded-xl px-3.5 py-2.5 text-[13.5px] leading-relaxed',
                m.from === 'student'
                  ? 'bg-brand text-brand-ink'
                  : 'border border-line bg-surface text-ink',
              ].join(' ')}
            >
              {m.from === 'admin' && (
                <p className="mb-1 text-[11px] font-semibold text-brand">Godhade Dairy</p>
              )}
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="shrink-0 border-t border-line bg-surface px-3 py-2.5 pb-safe-4">
        <div className="flex items-end gap-2">
          <textarea
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                send()
              }
            }}
            placeholder={t('support.placeholder')}
            className="max-h-24 min-h-10 flex-1 resize-none rounded-lg border border-line bg-canvas px-3 py-2.5 text-[14px] text-ink outline-none focus:border-brand"
          />
          <button
            type="button"
            onClick={send}
            disabled={!draft.trim()}
            aria-label={t('support.send')}
            className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand text-brand-ink transition-opacity disabled:opacity-40"
          >
            <Send className="size-[18px]" strokeWidth={2.1} />
          </button>
        </div>
      </div>
    </div>
  )
}
