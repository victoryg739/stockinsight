// Define types for the distribution parameters
export interface NormalParams {
    mean: number;
    stdDev: number;
}

export interface UniformParams {
    min: number;
    max: number;
}

export interface TriangularParams {
    min: number;
    mode: number;
    max: number;
}

export interface LogisticParams {
    location: number;
    scale: number;
}

export interface ExponentialParams {
    rate: number;
}

export interface LognormalParams {
    mu: number;
    sigma: number;
}

export interface MinExtremeParams {
    location: number;
    scale: number;
}

// Union type for all possible distribution parameters
export type DistributionParams =
    | NormalParams
    | UniformParams
    | TriangularParams
    | LogisticParams
    | ExponentialParams
    | LognormalParams
    | MinExtremeParams;

// Type for distribution types
export type DistributionType = "Normal" | "Uniform" | "Triangular" | "Logistic" | "Exponential" | "Lognormal" | "Min Extreme";

// Define the data point type
export interface DataPoint {
    x: number;
    y: number;
    isControlPoint?: boolean;
}