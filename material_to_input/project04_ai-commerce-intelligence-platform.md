## Problem

Online retailers sit on huge volumes of transactional data but rarely convert it into a clear picture of *who* their customers are and *what* drives their value. Using the Olist Brazilian E-Commerce dataset, the goal was to turn raw order, payment, review, and logistics data into actionable customer intelligence: segment customers into meaningful personas, explain what actually drives customer value, and package the findings into a dashboard a business user could explore without touching code.

## Why It Was Hard

- **No labeled ground truth.** There's no "correct" segmentation to validate against, so cluster quality had to be judged through business interpretability (do the personas make sense?) rather than a clean accuracy metric.
- **Data leakage risk.** Early attempts at predictive modeling (repeat-purchase prediction, customer-value classification) looked deceptively strong — investigating why surfaced leakage between features and targets, which meant discarding that direction rather than shipping a model that wouldn't generalize.
- **Messy, multi-table transactional data.** Orders, payments, reviews, and logistics live in separate tables with inconsistent granularity, requiring careful feature engineering to build a single customer-level warehouse without double-counting or leaking future information into historical features.
- **High-dimensional feature space.** Combining RFM-style behavioral features, review sentiment, delivery performance, and financial features created multicollinearity that had to be resolved before clustering would produce stable, separable segments.
- **Explainability over accuracy.** Once the project pivoted away from prediction, the challenge became building a rigorous *explanatory* pipeline (PCA + KMeans + SHAP) rather than an optimization one — a different mindset and different success criteria.

## Approach

1. **Data engineering** — cleaned and joined Olist's relational tables into a unified customer warehouse (v3), aggregating order, payment, review, and delivery history per customer.
2. **Feature engineering** — built behavioral features spanning purchase frequency, basket size, freight cost, installment usage, and review scores.
3. **Dimensionality reduction** — applied PCA to compress the engineered feature space and remove multicollinearity before clustering.
4. **Customer segmentation** — ran KMeans on the reduced feature space and iterated on cluster count until the output mapped cleanly onto interpretable business personas.
5. **Persona definition** — translated the five resulting clusters into named personas (Loyal Customers, VIP Customers, Budget Buyers, Dissatisfied Customers, Failed Order Customers) that a business stakeholder could act on directly.
6. **Explainable AI** — used SHAP on top of the segmentation to rank the true drivers of customer value, rather than relying on assumptions (e.g., testing whether review scores mattered as much as basket size and freight cost).
7. **Dashboard** — built an interactive Streamlit app exposing revenue analysis, segmentation, SHAP explanations, state-level analytics, and individual customer lookup.

## Results

- Identified **5 distinct customer personas** from unsupervised segmentation, each mapped to a clear business action (retain, upsell, win back, etc.).
- Quantified that **customer segment, freight cost, basket size, and purchase frequency** — not review scores — are the strongest drivers of customer value, via SHAP analysis.
- Surfaced that **over 96% of customers purchase only once**, reframing retention (not acquisition) as the primary lever for revenue growth.
- Showed that **revenue is highly concentrated** in a small VIP segment, giving a concrete target for retention and loyalty investment.
- Delivered a working, interactive BI dashboard (overview, segmentation, SHAP, state analytics, customer lookup) that turns the analysis into something explorable rather than a static report.

## What Broke

The original plan was predictive: classify customers as likely repeat purchasers or high-value customers. Those models scored suspiciously well — investigation traced this to **data leakage**, where features encoded information that wouldn't be available at prediction time. Rather than patch around it, the project pivoted: the predictive framing was dropped in favor of **behavior analysis and explainable customer intelligence**, which turned out to be both more honest and more useful to a business audience. Logistic Regression, Random Forest, and XGBoost were kept as documented classification experiments, but the shipped product is the segmentation + SHAP pipeline, not a classifier.

## Stack

**Language:** Python
**Data Processing:** Pandas, NumPy
**Visualization:** Matplotlib, Seaborn, Plotly
**Machine Learning:** Scikit-Learn, XGBoost, SHAP
**Techniques:** PCA (dimensionality reduction), KMeans (clustering), SHAP (explainability)
**Dashboard:** Streamlit
