import React from "react"

const CategoryPageShowcase = ({ actualCategory }: { actualCategory: string }) => {
  return (
    <section className="category-showcase" style={{ backgroundImage: "linear-gradient(to right, hsla(0, 0%, 0%, 1), hsla(0, 0%, 0%, 0.5)), url(/category-showcase.webp)" }}>
      <div className="container">
        <div className="category-showcase-content">
          <h1>
            {actualCategory}
            <span>.</span>
          </h1>
          <p>Let your love spark with our thrilling romantic stories</p>
        </div>
      </div>
    </section>
  )
}

export default CategoryPageShowcase
