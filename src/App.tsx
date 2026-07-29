import { useMemo, useState } from 'react'
import './App.css'
import {
  MYSTERY_OPTIONS,
  buildRosarySteps,
  getDefaultMysteryKey,
  getMystery,
  getStepProgressLabel,
  type MysteryKey,
  type RosaryStep,
} from './data/rosary'

type StepGroup = {
  id: string
  label: string
  detail?: string
  startIndex: number
  endIndex: number
}

function StepCard({
  step,
  progressLabel,
  completionRatio,
  sectionProgressLabel,
  isCompact,
  onToggleCompact,
}: {
  step: RosaryStep
  progressLabel: string
  completionRatio: number
  sectionProgressLabel: string
  isCompact: boolean
  onToggleCompact: () => void
}) {
  return (
    <section className={`step-card${isCompact ? ' compact' : ''}`}>
      <div className="step-progress">
        <div className="step-progress-header">
          <p className="eyebrow">Current prayer</p>
          <div className="step-progress-actions">
            <strong>{progressLabel}</strong>
            <button
              type="button"
              className="compact-toggle"
              onClick={onToggleCompact}
              aria-expanded={!isCompact}
            >
              {isCompact ? 'Show prayer' : 'Compact'}
            </button>
          </div>
        </div>
        <div
          className="progress-bar"
          aria-hidden="true"
          style={{ ['--progress' as string]: `${completionRatio}%` }}
        />
      </div>
      <p className="eyebrow">{step.section}</p>
      <h2>{step.title}</h2>
      <p className="current-bead">{step.beadLabel}</p>
      <p className="section-progress">{sectionProgressLabel}</p>
      {step.mysteryTitle ? (
        <div className="mystery-panel">
          <p className="mystery-label">Mystery</p>
          <h3>{step.mysteryTitle}</h3>
          <p>{step.mysteryFocus}</p>
        </div>
      ) : null}
      {isCompact ? null : (
        <>
          <p className="step-instruction">{step.instruction}</p>
          <div className="prayer-block">
            <p className="prayer-label">Prayer</p>
            <p>{step.prayer}</p>
          </div>
        </>
      )}
    </section>
  )
}

function App() {
  const [selectedMystery, setSelectedMystery] = useState<MysteryKey>(
    getDefaultMysteryKey(new Date()),
  )
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isCompactMode, setIsCompactMode] = useState(false)
  const [isHighContrastMode, setIsHighContrastMode] = useState(false)

  const mystery = useMemo(() => getMystery(selectedMystery), [selectedMystery])
  const steps = useMemo(() => buildRosarySteps(mystery), [mystery])
  const currentStep = steps[currentStepIndex]
  const progressLabel = getStepProgressLabel(currentStepIndex, steps.length)
  const completionRatio = ((currentStepIndex + 1) / steps.length) * 100
  const stepGroups = useMemo(() => {
    return steps.reduce<StepGroup[]>((groups, step, index) => {
      const lastGroup = groups[groups.length - 1]
      if (lastGroup && lastGroup.id === step.groupId) {
        lastGroup.endIndex = index
        return groups
      }

      groups.push({
        id: step.groupId,
        label: step.groupLabel,
        detail: step.mysteryTitle,
        startIndex: index,
        endIndex: index,
      })

      return groups
    }, [])
  }, [steps])

  const activeGroup = stepGroups.find(
    (group) =>
      currentStepIndex >= group.startIndex && currentStepIndex <= group.endIndex,
  )

  const sectionProgressLabel = useMemo(() => {
    if (!activeGroup) {
      return ''
    }

    const currentInGroup = currentStepIndex - activeGroup.startIndex + 1
    const totalInGroup = activeGroup.endIndex - activeGroup.startIndex + 1

    if (activeGroup.id.startsWith('decade-') && currentStep.title === 'Hail Mary') {
      return `${activeGroup.label} • Hail Mary ${currentInGroup - 1} of 10`
    }

    return `${activeGroup.label} • ${currentInGroup} of ${totalInGroup}`
  }, [activeGroup, currentStep.title, currentStepIndex])

  function selectMystery(nextMystery: MysteryKey) {
    setSelectedMystery(nextMystery)
    setCurrentStepIndex(0)
  }

  function moveStep(direction: 'back' | 'forward') {
    setCurrentStepIndex((current) => {
      if (direction === 'back') {
        return Math.max(0, current - 1)
      }

      return Math.min(steps.length - 1, current + 1)
    })
  }

  return (
    <main
      className={`app-shell${isHighContrastMode ? ' high-contrast' : ''}`}
    >
      <div className="background-glow background-glow-left" />
      <div className="background-glow background-glow-right" />

      <section className="hero-card">
        <div className="hero-toolbar">
          <button
            type="button"
            className={`toolbar-toggle${isHighContrastMode ? ' active' : ''}`}
            onClick={() => setIsHighContrastMode((current) => !current)}
            aria-pressed={isHighContrastMode}
          >
            {isHighContrastMode ? 'Standard contrast' : 'High contrast'}
          </button>
        </div>
        <p className="hero-kicker">Pocket Rosary</p>
        <h1>A calm, tap-by-tap rosary companion for daily prayer.</h1>
        <p className="hero-copy">
          Follow each bead, keep your place, and stay with the mystery in front
          of you.
        </p>

        <div className="hero-meta">
          <div>
            <span className="meta-label">Suggested today</span>
            <strong>{mystery.name}</strong>
          </div>
          <div>
            <span className="meta-label">Progress</span>
            <strong>{progressLabel}</strong>
          </div>
          <div>
            <span className="meta-label">Current bead</span>
            <strong>{currentStep.beadLabel}</strong>
          </div>
        </div>
      </section>

      <section className="mystery-selector">
        {MYSTERY_OPTIONS.map((option) => (
          <button
            key={option.key}
            type="button"
            className={option.key === selectedMystery ? 'selected' : ''}
            onClick={() => selectMystery(option.key)}
          >
            <span>{option.name}</span>
            <small>{option.scheduleLabel}</small>
          </button>
        ))}
      </section>

      <StepCard
        step={currentStep}
        progressLabel={progressLabel}
        completionRatio={completionRatio}
        sectionProgressLabel={sectionProgressLabel}
        isCompact={isCompactMode}
        onToggleCompact={() => setIsCompactMode((current) => !current)}
      />

      <section className="progress-card">
        <div className="progress-header">
          <div>
            <p className="eyebrow">Rosary path</p>
            <h2>Jump to any bead</h2>
          </div>
          <p className="progress-copy">
            The active step stays above. Use this list only when you want to
            move around the rosary.
          </p>
        </div>

        <ol className="bead-track" aria-label="Rosary sections">
          {stepGroups.map((group) => (
            <li key={group.id}>
              <button
                type="button"
                className={activeGroup?.id === group.id ? 'active' : ''}
                onClick={() => setCurrentStepIndex(group.startIndex)}
                aria-current={activeGroup?.id === group.id ? 'step' : undefined}
              >
                <span className="bead-dot" />
                <span className="bead-text">
                  <strong>{group.label}</strong>
                  <small>{group.detail ?? `${group.endIndex - group.startIndex + 1} prayers`}</small>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      <section className="control-row">
        <button
          type="button"
          className="secondary"
          onClick={() => moveStep('back')}
          disabled={currentStepIndex === 0}
        >
          Previous bead
        </button>
        <button
          type="button"
          className="primary"
          onClick={() => moveStep('forward')}
          disabled={currentStepIndex === steps.length - 1}
        >
          {currentStepIndex === steps.length - 1
            ? 'Rosary complete'
            : 'Mark bead prayed'}
        </button>
      </section>

      <section className="notes-grid">
        <article>
          <p className="eyebrow">Why this format</p>
          <h2>Phone-first, but restrained</h2>
          <p>
            This first version keeps the experience simple: mystery selection,
            prayer text, and bead progress without menus or clutter.
          </p>
        </article>
        <article>
          <p className="eyebrow">Next ideas</p>
          <h2>Ready for expansion</h2>
          <p>
            Audio guidance, meditations, streaks, chaplets, and parish-specific
            prayer resources can layer on later without changing the core flow.
          </p>
        </article>
      </section>

      <footer className="app-footer">
        <p>Pocket Rosary v0.1.0</p>
        <p>Made with ❤️, TypeScript, and a little help from AI.</p>
      </footer>
    </main>
  )
}

export default App
