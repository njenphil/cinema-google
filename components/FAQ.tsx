import React from "react"
import { FAQs } from "../data"

export type TFAQ = {
  id: string
  question: string
  answer: string
  markAsActive: Boolean
}

const FAQCard = ({ faq }: { faq: TFAQ }) => {
  const { id, question, answer, markAsActive } = faq

  return (
    <div>
      {markAsActive ? <input type="radio" name="example_accordion" id={`section${id}`} className="accordion__input" defaultChecked /> : <input type="radio" name="example_accordion" id={`section${id}`} className="accordion__input" />}
      <label htmlFor={`section${id}`} className="accordion__label">
        <div className="question">
          <span></span>
          <span className="second"></span>
          <h3>{question}</h3>
        </div>
      </label>
      <div className="jumbotron-card">
        <div id="tab1" className="jumbtron-para">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  )
}

const FAQ = () => {
  return (
    <section className="faq | section-padding">
      <div className="container">
        <h2 className="section-heading">Frequently Asked Questions</h2>
        <div className="faq-body">
          <div className="jumbotron">{FAQs && FAQs.map(faq => <FAQCard key={faq.id} faq={faq} />)}</div>
          <div className="faq-icon">
            <img src="./faq-icon.svg" alt="FAQ Icon" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
