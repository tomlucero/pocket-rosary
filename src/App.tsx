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

function StepCard({ step }: { step: RosaryStep }) {
  return (
    <section className="step-card">
      <p className="eyebrow">{step.section}</p>
      <h2>{step.title}</h2>
      <p className="step-instruction">{step.instruction}</p>
      {step.mysteryTitle ? (
        <div className="mystery-panel">
          <p className="mystery-label">Mystery</p>
          <h3>{step.mysteryTitle}</h3>
          <p>{step.mysteryFocus}</p>
        </div>
      ) : null}
      <div className="prayer-block">
        <p className="prayer-label">Prayer</p>
        <p>{step.prayer}</p>
      </div>
    </section>
  )
}

function App() {
  const [selectedMystery, setSelectedMystery] = useState<MysteryKey>(
    getDefaultMysteryKey(new Date()),
  )
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const mystery = useMemo(() => getMystery(selectedMystery), [selectedMystery])
  const steps = useMemo(() => buildRosarySteps(mystery), [mystery])
  const currentStep = steps[currentStepIndex]
  const progressLabel = getStepProgressLabel(currentStepIndex, steps.length)
  const completionRatio = ((currentStepIndex + 1) / steps.length) * 100

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
    <main className="app-shell">
      <div className="background-glow background-glow-left" />
      <div className="background-glow background-glow-right" />

      <section className="hero-card">
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

      <section className="progress-card">
        <div className="progress-header">
          <div>
            <p className="eyebrow">Rosary path</p>
            <h2>{mystery.name}</h2>
          </div>
          <p className="progress-copy">
            Tap each bead as you finish the prayer. The next step is always
            ready.
          </p>
        </div>

        <div
          className="progress-bar"
          aria-hidden="true"
          style={{ ['--progress' as string]: `${completionRatio}%` }}
        />

        <ol className="bead-track" aria-label="Rosary steps">
          {steps.map((step, index) => (
            <li key={`${step.title}-${index}`}>
              <button
                type="button"
                className={index === currentStepIndex ? 'active' : ''}
                onClick={() => setCurrentStepIndex(index)}
                aria-current={index === currentStepIndex ? 'step' : undefined}
              >
                <span className="bead-dot" />
                <span className="bead-text">
                  <strong>{step.beadLabel}</strong>
                  <small>{step.title}</small>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      <StepCard step={currentStep} />

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
    </main>
  )
}

export default App
