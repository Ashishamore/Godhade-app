import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, BookMarked, ChevronRight, GraduationCap, Lock, Phone } from 'lucide-react'
import Screen, { ScreenHeader } from '../../components/Screen'
import useI18n from '../../i18n'
import useStudent from '../../hooks/useStudent'
import { courseById, courses, recipeById, recipes } from '../../data/catalog'
import { Badge, Button, Card, EmptyState, ProductIcon, Segmented } from '../../components/ui'
import { Meter } from '../../components/charts'

function CourseItem({ course, index }) {
  const { t, pick } = useI18n()
  const student = useStudent()
  const p = student.courseProgress(course.id)
  const done = p.total > 0 && p.done === p.total
  const locked = student.isLocked(course.id)

  return (
    <Card
      as={Link}
      to={'/course/' + course.id}
      interactive
      style={{ '--i': index }}
      className="stagger block p-3.5"
    >
      <div className="flex items-center gap-3.5">
        <ProductIcon name={course.icon} tint={course.tint} size="md" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-[14.5px] font-semibold text-ink">{course.native}</p>
            {locked && (
              <Badge tone="critical">
                <Lock className="size-3" strokeWidth={2.6} />
                {t('learning.locked')}
              </Badge>
            )}
            {done && !locked && (
              <Badge tone="positive">
                <Award className="size-3" strokeWidth={2.4} />
                {t('learning.certificate')}
              </Badge>
            )}
          </div>
          <p className="mt-0.5 truncate text-[12px] text-ink-3">{pick(course.name)}</p>
          <div className="mt-2">
            <Meter value={p.pct} />
            <p className="mt-1 text-[11px] text-ink-3 tnum">
              {p.done}/{p.total} {t('courses.lessons')} · {p.pct}%
            </p>
          </div>
        </div>
        <ChevronRight className="size-5 shrink-0 text-ink-3" strokeWidth={2.2} />
      </div>
    </Card>
  )
}

export default function Learning() {
  const { t, pick } = useI18n()
  const student = useStudent()
  const [tab, setTab] = useState('progress')

  const owned = courses.filter((c) => student.ownsCourse(c.id))
  const inProgress = owned.filter((c) => !student.isCourseComplete(c.id))
  const completed = owned.filter((c) => student.isCourseComplete(c.id))
  const myRecipes = recipes.filter((r) => student.ownsRecipe(r.id))

  const list = tab === 'progress' ? inProgress : tab === 'done' ? completed : []

  return (
    <>
      <ScreenHeader
        title={t('learning.title')}
        subtitle={`${owned.length} ${t('courses.title').toLowerCase()} · ${myRecipes.length} ${t('courses.recipes').toLowerCase()}`}
        below={
          <Segmented
            value={tab}
            onChange={setTab}
            options={[
              { id: 'progress', label: t('learning.inProgress'), count: inProgress.length },
              { id: 'done', label: t('learning.completed'), count: completed.length },
              { id: 'recipes', label: t('learning.recipes'), count: myRecipes.length },
            ]}
          />
        }
      />

      <Screen className="space-y-6">
        {tab !== 'recipes' &&
          (list.length === 0 ? (
            <EmptyState
              icon={<GraduationCap className="size-6" strokeWidth={1.9} />}
              title={t('learning.empty')}
              body={t('learning.emptyBody')}
              action={
                <Button as={Link} to="/courses" size="sm">
                  {t('learning.browse')}
                </Button>
              }
            />
          ) : (
            <div className="space-y-3 @wide:grid @wide:grid-cols-2 @wide:gap-3 @wide:space-y-0">
              {list.map((c, i) => (
                <CourseItem key={c.id} course={c} index={i} />
              ))}
            </div>
          ))}

        {tab === 'recipes' &&
          (myRecipes.length === 0 ? (
            <EmptyState
              icon={<BookMarked className="size-6" strokeWidth={1.9} />}
              title={t('learning.empty')}
              body={t('learning.emptyBody')}
              action={
                <Button as={Link} to="/courses?tab=recipes" size="sm">
                  {t('learning.browse')}
                </Button>
              }
            />
          ) : (
            <div className="space-y-3">
              {myRecipes.map((r, i) => (
                <Card
                  key={r.id}
                  as={Link}
                  to={'/recipe/' + r.id}
                  interactive
                  style={{ '--i': i }}
                  className="stagger flex items-center gap-3.5 p-3.5"
                >
                  <ProductIcon name={r.icon} tint={r.tint} size="md" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14.5px] font-semibold text-ink">{r.native}</span>
                    <span className="block truncate text-[12px] text-ink-3">{pick(r.title)}</span>
                  </span>
                  <ChevronRight className="size-5 shrink-0 text-ink-3" strokeWidth={2.2} />
                </Card>
              ))}
            </div>
          ))}

        {/* ------------------------------------------- supplier contacts --- */}
        <section>
          <Card
            as={student.attendedOffline ? Link : 'div'}
            {...(student.attendedOffline ? { to: '/contacts', interactive: true } : {})}
            className="flex items-center gap-3.5 p-3.5"
          >
            <span
              className={[
                'grid size-10 shrink-0 place-items-center rounded-lg',
                student.attendedOffline ? 'bg-brand-soft text-brand' : 'bg-muted text-ink-3',
              ].join(' ')}
            >
              {student.attendedOffline ? (
                <Phone className="size-5" strokeWidth={1.9} />
              ) : (
                <Lock className="size-5" strokeWidth={1.9} />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-semibold text-ink">
                {t('learning.contacts')}
              </span>
              <span className="mt-0.5 block text-[12px] leading-relaxed text-ink-3">
                {student.attendedOffline
                  ? pick({
                      en: 'Machinery, ingredients, packaging and compliance',
                      hi: 'मशीनरी, सामग्री, पैकेजिंग और अनुपालन',
                      mr: 'मशिनरी, साहित्य, पॅकेजिंग व नियम',
                    })
                  : t('learning.contactsBody')}
              </span>
            </span>
            {student.attendedOffline && (
              <ChevronRight className="size-5 shrink-0 text-ink-3" strokeWidth={2.2} />
            )}
          </Card>
        </section>
      </Screen>
    </>
  )
}
