# RegimeHMM

## Problem

Financial markets constantly switch between different underlying regimes
(bull, bear, sideways, high-volatility, low-volatility), but these
regimes are not directly observable. Most retail trading strategies
assume that market behavior is stationary, leading to poor performance
when conditions change. The goal of RegimeHMM was to automatically infer
hidden market regimes from historical price data and provide a
probabilistic view of the current market state.

## Why It Was Hard

-   Market regimes are hidden and cannot be labeled directly.
-   Financial time series are noisy and non-stationary.
-   Different assets exhibit different statistical characteristics.
-   Choosing the number of hidden states required experimentation.
-   Preventing overfitting while preserving meaningful regime separation
    was challenging.
-   Translating model output into interpretable trading insights
    required additional analysis.

## Approach

1.  Collected historical OHLCV market data.
2.  Engineered statistical features such as returns, rolling volatility,
    moving averages, momentum, and volume-based indicators.
3.  Normalized features before training.
4.  Trained a Gaussian Hidden Markov Model (HMM) to learn latent market
    states.
5.  Used the Viterbi algorithm to infer the most likely hidden state
    sequence.
6.  Analyzed transition probabilities to understand regime persistence.
7.  Visualized predicted regimes over historical price charts.
8.  Evaluated regime consistency using market behavior rather than raw
    prediction accuracy.

## Results

-   Successfully identified distinct latent market regimes.
-   Produced probabilistic regime predictions instead of hard-coded
    classifications.
-   Enabled visualization of regime transitions across historical
    periods.
-   Improved interpretability of changing market conditions.
-   Created a reusable pipeline that can be extended with additional
    indicators or integrated into quantitative trading strategies.

## What Broke

-   Some assets collapsed into similar hidden states because of weak
    feature separation.
-   Results were sensitive to feature engineering and the selected
    number of hidden states.
-   Rapid market shocks occasionally caused delayed regime transitions.
-   Missing values and inconsistent historical data required
    preprocessing.
-   Initialization randomness sometimes produced different local optima,
    requiring multiple training runs.

## Stack

### Languages

-   Python

### Libraries

-   hmmlearn
-   NumPy
-   Pandas
-   scikit-learn
-   Matplotlib
-   SciPy

### Data

-   Historical OHLCV market data

### Concepts

-   Hidden Markov Models (HMM)
-   Time Series Analysis
-   Feature Engineering
-   Probabilistic Modeling
-   Regime Detection
-   Statistical Learning
