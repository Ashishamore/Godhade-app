import { Link } from 'react-router-dom'
import {
  BadgeCheck, ChevronRight, FileText, Headphones, LogOut, Monitor, Moon, Receipt,
  ShieldCheck, Sun,
} from 'lucide-react'
import Screen, { ScreenHeader, SectionTitle } from '../../components/Screen'
import { useShell } from '../../components/AppShell'
import useI18n, { LANGUAGES } from '../../i18n'
import useStudent from '../../hooks/useStudent'
import { courses, money, recipes, socialLinks } from '../../data/catalog'
import { consentDocs } from '../../data/student'
import { Avatar, Badge, Card, Row, RowGroup, Segmented } from '../../components/ui'
import SocialRow from '../../components/SocialRow'

const THEMES = [
  { id: 'system', icon: Monitor },
  { id: 'light', icon: Sun },
  { id: 'dark', icon: Moon },
]

export default function Profile() {
  const { t, pick, lang, setLang } = useI18n()
  const { theme } = useShell()
  const student = useStudent()

  const owned = courses.filter((c) => student.ownsCourse(c.id))
  const myRecipes = recipes.filter((r) => student.ownsRecipe(r.id))
  const spend = student.purchases.reduce((s, p) => s + p.amount, 0)
  const pendingConsent = consentDocs.filter((d) => !d.accepted).length

  return (
    <>
      <ScreenHeader title={t('profile.title')} />

      <Screen className="space-y-6">
        {/* ----------------------------------------------------- identity --- */}
        <Card style={{ '--i': 0 }} className="stagger p-4">
          <div className="flex items-center gap-3.5">
            <Avatar name={student.profile.name} size="xl" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-[16.5px] font-semibold tracking-[-0.015em] text-ink">
                  {student.profile.name}
                </p>
                <BadgeCheck className="size-4 shrink-0 text-brand" strokeWidth={2.2} />
              </div>
              <p className="mt-0.5 truncate text-[12.5px] text-ink-3 tnum">
                {student.profile.phone}
              </p>
              <p className="mt-0.5 truncate text-[12px] text-ink-3">
                {student.profile.district}, {student.profile.state} · {t('profile.member')}{' '}
                {new Date(student.profile.joined).toLocaleDateString('en-IN', {
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-3 divide-x divide-line rounded-lg border border-line">
            {[
              [t('courses.title'), owned.length],
              [t('courses.recipes'), myRecipes.length],
              [t('common.total'), money(spend)],
            ].map(([label, value]) => (
              <div key={label} className="px-2 py-2.5 text-center">
                <dd className="text-[15px] font-semibold text-ink tnum">{value}</dd>
                <dt className="mt-0.5 text-[10.5px] uppercase tracking-[0.05em] text-ink-3">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </Card>

        {/* ----------------------------------------------------- language --- */}
        <section>
          <SectionTitle title={t('profile.language')} />
          <Segmented
            value={lang}
            onChange={setLang}
            options={LANGUAGES.map((l) => ({ id: l.id, label: l.label }))}
            className="w-full"
          />
        </section>

        {/* --------------------------------------------------- appearance --- */}
        <section>
          <SectionTitle title={t('profile.appearance')} />
          <Segmented
            value={theme.mode}
            onChange={theme.setMode}
            options={THEMES.map((x) => ({
              id: x.id,
              label: pick({
                en: x.id === 'system' ? 'System' : x.id === 'light' ? 'Light' : 'Dark',
                hi: x.id === 'system' ? 'सिस्टम' : x.id === 'light' ? 'लाइट' : 'डार्क',
                mr: x.id === 'system' ? 'सिस्टम' : x.id === 'light' ? 'लाइट' : 'डार्क',
              }),
            }))}
            className="w-full"
          />
        </section>

        {/* -------------------------------------------------------- rows --- */}
        <div className="space-y-5">
          <RowGroup title={pick({ en: 'Account', hi: 'खाता', mr: 'खाते' })}>
            <Row
              as={Link}
              to="/purchases"
              icon={<Receipt className="size-[18px]" strokeWidth={2} />}
              label={t('profile.purchases')}
              value={String(student.purchases.length)}
            />
            <Row
              as={Link}
              to="/purchases"
              icon={<FileText className="size-[18px]" strokeWidth={2} />}
              label={t('profile.invoices')}
            />
            <Row
              as={Link}
              to="/documents"
              icon={<ShieldCheck className="size-[18px]" strokeWidth={2} />}
              label={t('profile.documents')}
              value={pendingConsent ? String(pendingConsent) : undefined}
            />
          </RowGroup>

          <RowGroup title={pick({ en: 'Support', hi: 'सहायता', mr: 'सहाय्य' })}>
            <Row
              as={Link}
              to="/support"
              icon={<Headphones className="size-[18px]" strokeWidth={2} />}
              label={t('profile.support')}
              hint={t('support.replyTime')}
            />
          </RowGroup>

          <section>
            <SectionTitle title={t('profile.social')} />
            <SocialRow links={socialLinks} />
          </section>

          <RowGroup>
            <Row
              as="button"
              icon={<LogOut className="size-[18px]" strokeWidth={2} />}
              label={t('profile.signOut')}
              className="[&_span]:text-critical"
            />
          </RowGroup>

          <p className="pt-1 text-center text-[11.5px] text-ink-3">
            {t('brand.name')} · {t('common.demo')} v0.1
          </p>
        </div>
      </Screen>
    </>
  )
}
